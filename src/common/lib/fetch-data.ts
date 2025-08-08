import { AxiosError, type AxiosRequestConfig, type Method } from "axios";
import api from "@/common/utils/axios.ts";
import { ApiError, type CodeError } from "@/common/utils/api-error.ts";

export type FetchDataProps = {
  endpoint: string;
  accessToken?: string;
  feature: string;
  method: Method;
  isPublic: boolean;
  payload?: Record<string, any>;
};

export type FetchDataResponse<T> = {
  data: T;
  message: string;
};

export type FetchDataError = {
  message: string;
  error: {
    code: CodeError;
    details: string;
  };
};

export const fetchData = async <T>({
  payload,
  feature,
  isPublic,
  method,
  endpoint,
  accessToken,
}: FetchDataProps) => {
  try {
    const url = `/api/${feature}/${isPublic ? "public" : "private"}/${endpoint}`;

    const axiosConfig: AxiosRequestConfig = {
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        ...(!isPublic && { Authorization: `Bearer ${accessToken}` }),
      },
      withCredentials: true,
      data: payload,
    };

    const res = await api(axiosConfig);
    return res.data as FetchDataResponse<T>;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const err = error.response?.data as FetchDataError;
      throw new ApiError(err);
    }
  }
};
