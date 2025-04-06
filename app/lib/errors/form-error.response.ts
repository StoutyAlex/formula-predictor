import { ErrorResponse, type ErrorResponseData } from './base-error.response';

export type FormErrorData = ErrorResponseData;

export class FormErrorResponse extends ErrorResponse<FormErrorData> {
  public static readonly id: string = 'error_form';

  constructor(FormErrorData: Omit<FormErrorData, 'id'>, statusCode: number = 400) {
    const data: FormErrorData = {
      id: FormErrorResponse.id,
      ...FormErrorData,
    };

    super(data, statusCode);
  }

  static isError(data: any): data is FormErrorResponse {
    return data?.error?.id === FormErrorResponse.id;
  }
}
