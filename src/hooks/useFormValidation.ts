import { useState } from 'react';
import { ZodSchema } from 'zod';

interface ValidForm<T> {
  type: 'valid';
  data: T;
}

interface InvalidForm<T> {
  type: 'invalid';
  message: string;
  data: DeepPartial<T>;
}

type ValidationStatus<T> = ValidForm<T> | InvalidForm<T>;

export const validForm = <T>(data: T): ValidForm<T> => ({
  type: 'valid',
  data,
});

export const invalidForm = <T>(
  message: string,
  data: DeepPartial<T>
): InvalidForm<T> => ({
  type: 'invalid',
  message,
  data,
});

export const useFormValidation = <T>(formSchema: ZodSchema<T>) => {
  const [
    validationStatus,
    setValidationStatus,
  ] = useState<ValidationStatus<T> | null>(null);

  const validate = (data: DeepPartial<T>) => {
    const parseResult = formSchema.safeParse(data);

    if (parseResult.success) {
      setValidationStatus(validForm(parseResult.data));
    } else {
      setValidationStatus(
        invalidForm(parseResult.error.issues[0]?.message, data)
      );
    }
  };

  return {
    validationStatus,
    validate,
  };
};
