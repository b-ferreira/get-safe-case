import React from 'react';

import { useFlowNext } from '@hooks/useFlowNext';
import { useFormValidation } from '@hooks/useFormValidation';

import { AgeSchema } from './Steps.schema';

const AgeStep: React.FC = () => {
  const { next } = useFlowNext();
  const { validationStatus, validate } = useFormValidation(AgeSchema);

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validate({ age: e.target.valueAsNumber ?? 0 });
  };

  const handleNextClick = () => {
    if (validationStatus?.type === 'valid') {
      next('age', validationStatus.data);
    }
  };

  return (
    <>
      <div>
        Age:{' '}
        <input
          aria-label="age-input"
          type="number"
          onChange={handleAgeChange}
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

export default AgeStep;
