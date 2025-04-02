import zod, { z } from 'zod';

export const createConstructorSchema = zod.object({
  name: z.string().min(1, { message: 'Name is required' }),
  fullName: z.string().min(1, { message: 'Full name is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  principal: z.string().min(1, { message: 'Principal is required' }),
  colour: z.string().min(1, { message: 'Colour is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  drivers: z.array(z.string()).optional(),
});

export const updateConstructorSchema = createConstructorSchema.extend({
  id: z.string().min(1, { message: 'ID is required' }),
});

export const deleteConstructorSchema = zod.object({
  id: z.string().min(1, { message: 'ID is required' }),
});

export type UpdateConstructorData = z.infer<typeof updateConstructorSchema>;
export type CreateConstructorData = z.infer<typeof createConstructorSchema>;
export type DeleteConstructorData = z.infer<typeof deleteConstructorSchema>;

export class ConstructorSchema {
  static validateUpdate = (data: Record<string, unknown>) => {
    const result = updateConstructorSchema.safeParse(data);

    return {
      valid: result.success,
      data: result.data as UpdateConstructorData,
      errors: result.error?.format(),
    };
  };

  static validateDelete = (data: Record<string, unknown>) => {
    const result = updateConstructorSchema.safeParse(data);

    return {
      valid: result.success,
      data: result.data as DeleteConstructorData,
      errors: result.error?.format(),
    };
  };

  static validateCreate = (data: Record<string, unknown>) => {
    const result = createConstructorSchema.safeParse(data);

    return {
      valid: result.success,
      data: result.data as CreateConstructorData,
      errors: result.error?.format(),
    };
  };
}
