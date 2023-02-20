import React from 'react';

import { useFormValidation } from '@hooks/useFormValidation';

import { IdentificationSchema } from './Steps.schema';
import { FlowStep, IdentificationType } from './Steps.types';

const IdentificationStep: React.FC<FlowStep> = ({ next }) => {
  const { validationStatus, validate } = useFormValidation(
    IdentificationSchema
  );

  const handleChangeFor = (
    field: keyof IdentificationType['identification']
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    validate({
      identification: {
        ...validationStatus?.data?.identification,
        [field]: e.target.value ?? '',
      },
    });
  };

  const handleNextClick = () => {
    if (validationStatus?.type === 'valid') {
      next('identification', validationStatus.data);
    }
  };

  return (
    <>
      <div>
        <span>First Name:</span>
        <input
          aria-label="first-name-input"
          onChange={handleChangeFor('firstName')}
        ></input>
      </div>

      <div>
        <span>Last Name:</span>
        <input
          aria-label="last-name-input"
          onChange={handleChangeFor('lastName')}
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

export default IdentificationStep;
