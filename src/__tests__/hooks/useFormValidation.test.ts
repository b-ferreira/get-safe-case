import { act, renderHook } from '@testing-library/react';

import { EmailSchema } from '@components/Flow/Steps/Steps.schema';
import { EmailStepType } from '@components/Flow/Steps/Steps.types';

import {
  invalidForm,
  useFormValidation,
  validForm,
} from '@hooks/useFormValidation';

describe('useFormValidation', () => {
  it('returns validationStatus as ValidForm once validate function is called with a valid data', () => {
    const { result } = renderHook(() => useFormValidation(EmailSchema));
    const formData: EmailStepType = { email: 'test@test.com' };

    act(() => {
      result.current.validate(formData);
    });

    expect(result.current.validationStatus).toStrictEqual(validForm(formData));
  });

  it('returns validationStatus as InvalidForm once validation function is called with invalid data', () => {
    const { result } = renderHook(() => useFormValidation(EmailSchema));
    const formData: EmailStepType = { email: 'test' };

    act(() => {
      result.current.validate(formData);
    });

    expect(result.current.validationStatus).toStrictEqual(
      invalidForm('Not valid email', formData)
    );
  });
});
