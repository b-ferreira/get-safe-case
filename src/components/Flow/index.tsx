import Link from 'next/link';
import React from 'react';

import { useFlow } from '@hooks/useFlow';

import Summary from './Sumary';

const Flow: React.FC = () => {
  const { currentStep, steps } = useFlow();

  if (steps?.length === 0) {
    return (
      <>
        <div>
          <span aria-label="no-steps-message">No steps provided</span>
        </div>
        <div>
          <Link href="/">Go back</Link>
        </div>
      </>
    );
  }

  if (currentStep) {
    const Step = currentStep.stepComponent;
    return <Step />;
  }

  return <Summary />;
};

export default Flow;
