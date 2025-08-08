/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Env } from "../../config/env.ts";

const api = axios.create({ baseURL: Env.VITE_API_URL });

let isRefreshing = false;
let failedRequestsQueue: object[] = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            resolve,
            reject,
            config: originalRequest,
          });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.get(
          `${Env.VITE_API_URL}/api/public/auth/refresh`,
          {
            withCredentials: true,
          },
        );

        const { accessToken } = res.data.data;
        const authHeader = `${Env.VITE_BEARER} ${accessToken}`;

        api.defaults.headers.common[Env.VITE_TOKEN_HIDEOUT] = authHeader;
        originalRequest.headers[Env.VITE_TOKEN_HIDEOUT] = authHeader;

        failedRequestsQueue.forEach(({ config, resolve }: any) => {
          config.headers[Env.VITE_TOKEN_HIDEOUT] = authHeader;
          resolve();
        });

        return api(originalRequest);
      } catch (err) {
        failedRequestsQueue.forEach(({ reject }: any) => reject(err));
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
        failedRequestsQueue = [];
      }
    }
    return Promise.reject(error);
  },
);

export default api;
