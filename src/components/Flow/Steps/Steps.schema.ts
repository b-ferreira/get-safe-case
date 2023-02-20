import { z } from 'zod';

export const EmailSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field is required' })
    .email({ message: 'Not valid email' }),
});

export const AgeSchema = z.object({
  age: z.number().positive({ message: 'Age must be greater than zero' }),
});

export const IdentificationSchema = z.object({
  identification: z.object({
    firstName: z.string().min(1, { message: 'Both fields are required' }),
    lastName: z.string().min(1, { message: 'Both fields are required' }),
  }),
});
