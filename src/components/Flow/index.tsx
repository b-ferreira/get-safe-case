import Link from 'next/link';
import React, { useState } from 'react';

import AgeStep from '@components/Flow/Steps/AgeStep';
import EmailStep from '@components/Flow/Steps/EmailStep';
import IdentificationStep from '@components/Flow/Steps/IdentificationStep';
import {
  AvailableSteps,
  FlowData,
  NextStepFn,
} from '@components/Flow/Steps/Steps.types';

import Summary from './Sumary';

interface FlowProps {
  steps: AvailableSteps[];
}

type CollectedData = DeepPartial<FlowData>;

function renderStepById(id: AvailableSteps, next: NextStepFn) {
  switch (id) {
    case 'age':
      return <AgeStep next={next} />;

    case 'email':
      return <EmailStep next={next} />;

    case 'identification':
      return <IdentificationStep next={next} />;

    default:
      return null;
  }
}

const Flow: React.FC<FlowProps> = ({ steps }) => {
  const [collectedData, setCollectedData] = useState<CollectedData>({});
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const uniqSteps = [...new Set<AvailableSteps>(steps)];

  const handleNextStepCall: NextStepFn = (id, data) => {
    setCollectedData((x) => ({
      ...x,
      [id]: data?.[id],
    }));
    setCurrentStepIndex((x) => x + 1);
  };

  if (uniqSteps?.length === 0) {
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

  return currentStepIndex < uniqSteps?.length ? (
    renderStepById(uniqSteps[currentStepIndex], handleNextStepCall)
  ) : (
    <Summary data={collectedData} />
  );
};

export default Flow;
