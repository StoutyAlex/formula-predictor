import zod, { z } from 'zod';

export const createDriverSchema = zod.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  abbreviation: z.string().min(1, { message: 'Abbreviation is required' }),
  number: z
    .number()
    .or(z.string())
    .transform((val) => (typeof val === 'string' ? parseInt(val, 10) : val)),
  country: z.string().min(1, { message: 'Country is required' }),
  constructorId: z.string().min(1, { message: 'Constructor ID is required' }),
});

export const updateDriverSchema = createDriverSchema.extend({
  id: z.string().min(1, { message: 'ID is required' }),
});

export const deleteDriverSchema = zod.object({
  id: z.string().min(1, { message: 'ID is required' }),
});

export type UpdateDriverData = z.infer<typeof updateDriverSchema>;
export type CreateDriverData = z.infer<typeof createDriverSchema>;
export type DeleteDriverData = z.infer<typeof deleteDriverSchema>;

export class DriverSchema {
  static validateCreate(data: Record<string, unknown>) {
    console.log('Validating create driver data:', data);
    const result = createDriverSchema.safeParse(data);

    return {
      valid: result.success,
      data: result.data as CreateDriverData,
      errors: result.error?.format(),
    };
  }

  static validateDelete(data: Record<string, unknown>) {
    console.log('Validating delete driver data:', data);
    const result = deleteDriverSchema.safeParse(data);

    return {
      valid: result.success,
      data: result.data as DeleteDriverData,
      errors: result.error?.format(),
    };
  }

  static validateUpdate(data: Record<string, unknown>) {
    console.log('Validating update driver data:', data);
    const result = updateDriverSchema.safeParse(data);

    return {
      valid: result.success,
      data: result.data as UpdateDriverData,
      errors: result.error?.format(),
    };
  }
}
