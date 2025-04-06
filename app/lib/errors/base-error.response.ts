export interface ErrorResponseData {
  id: string;
  message: string;
}

export interface ErrorResponseBody<T = ErrorResponseData> {
  error: T;
}

export abstract class ErrorResponse<T = ErrorResponseData> extends Response {
  public static readonly id: string = 'error_response';
  public error: T;

  constructor(error: T, status: number) {
    const data: ErrorResponseBody<T> = { error };
    super(JSON.stringify(data), {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.error = error;
  }
}
