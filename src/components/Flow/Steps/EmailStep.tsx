import React from 'react';

import { useFormValidation } from '@hooks/useFormValidation';

import { EmailSchema } from './Steps.schema';
import { FlowStep } from './Steps.types';

const EmailStep: React.FC<FlowStep> = ({ next }) => {
  const { validationStatus, validate } = useFormValidation(EmailSchema);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validate({ email: e.target.value ?? '' });
  };

  const handleNextClick = () => {
    if (validationStatus?.type === 'valid') {
      next('email', validationStatus.data);
    }
  };

  return (
    <>
      <div>
        Email:{' '}
        <input
          aria-label="email-input"
          type="email"
          onChange={handleEmailChange}
        ></input>
      </div>

      {validationStatus?.type !== 'invalid' ? null : (
        <div>{validationStatus?.message}</div>
      )}

      <button
        disabled={
          validationStatus === null || validationStatus.type === 'invalid'
        }
        onClick={handleNextClick}
      >
        Next
      </button>
    </>
  );
};

export default EmailStep;
