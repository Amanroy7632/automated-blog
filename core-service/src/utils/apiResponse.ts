export class ApiResponse {
  public readonly statusCode: number;
  public readonly data: any;
  public readonly message?: string;

  constructor(statusCode: number, data: any, message?: string) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message || "success";
  }
}
export  class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errors?: any[];
  public readonly success: boolean;
  public readonly data: string | null;
  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors?: any[],
    stack?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.data = null;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
