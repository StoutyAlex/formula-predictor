import { ErrorResponse, type ErrorResponseBody, type ErrorResponseData } from './base-error.response';
import { z } from 'zod';

export interface FormFieldErrorData extends ErrorResponseData {
  fields: Record<string, string>;
}

export class FormFieldErrorResponse extends ErrorResponse<FormFieldErrorData> {
  public static readonly id: string = 'error_form_field';

  constructor(FormFieldErrorData: Omit<FormFieldErrorData, 'id'>) {
    const data: FormFieldErrorData = {
      id: FormFieldErrorResponse.id,
      ...FormFieldErrorData,
    };

    super(data, 400);
  }

  static isError(data: any): data is FormFieldErrorResponse {
    return data?.error?.id === FormFieldErrorResponse.id;
  }

  static fromZodError(zodError: z.ZodError): FormFieldErrorResponse {
    const fields: Record<string, string> = {};

    zodError.errors.forEach((error) => {
      if (error.path.length > 0) {
        const field = error.path[0];
        const message = error.message;
        fields[field] = message;
      }
    });

    const data: FormFieldErrorData = {
      id: FormFieldErrorResponse.id,
      message: 'Invalid form data',
      fields,
    };

    return new FormFieldErrorResponse(data);
  }
}
