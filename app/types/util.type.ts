export type JsonObject = {
  [Key in string]: JsonValue;
} & {
  [Key in string]?: JsonValue | undefined;
};
export type JsonArray = JsonValue[] | readonly JsonValue[];

type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export interface SuccessResult<T> {
  success: true;
  data: T;
  error?: undefined;
}
export interface ErrorResult {
  success: false;
  error: Error;
  data?: undefined;
}

export type Result<T> = SuccessResult<T> | ErrorResult;
