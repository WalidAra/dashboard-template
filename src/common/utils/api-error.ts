export type CodeError =
  | "BAD_REQUEST" // 400
  | "UNAUTHORIZED" // 401
  | "FORBIDDEN" // 403
  | "NOT_FOUND" // 404
  | "METHOD_NOT_ALLOWED" // 405
  | "CONFLICT" // 409
  | "UNPROCESSABLE_ENTITY" // 422
  | "TOO_MANY_REQUESTS" // 429
  | "INTERNAL_SERVER_ERROR" // 500
  | "BAD_GATEWAY" // 502
  | "SERVICE_UNAVAILABLE" // 503
  | "GATEWAY_TIMEOUT" // 504
  | "REFRESH_EXPIRED" // Custom app-specific error
  | "TOKEN_INVALID" // Custom: invalid JWT or similar
  | "VALIDATION_ERROR" // Custom: form or data validation error
  | "UNKNOWN_ERROR"; // Fallback catch-all error

export class ApiError extends Error {
  code: CodeError;
  details: string;

  constructor(params: {
    message: string;
    error: {
      code: CodeError;
      details: string;
    };
  }) {
    const {
      message,
      error: { details, code },
    } = params;
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
