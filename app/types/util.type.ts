export type JsonObject = {
  [Key in string]: JsonValue;
} & {
  [Key in string]?: JsonValue | undefined;
};
export type JsonArray = JsonValue[] | readonly JsonValue[];

type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
