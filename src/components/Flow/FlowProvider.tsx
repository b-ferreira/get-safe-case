import React, { useMemo, useState } from 'react';

import { FlowData, NextStepFn, StepItem } from './Steps/Steps.types';

interface FlowProviderProps {
  children: React.ReactNode;
  steps: StepItem[];
}

interface FlowState {
  collectedData: DeepPartial<FlowData>;
  currentStep: StepItem;
  next: NextStepFn;
  steps: StepItem[];
}

export const FlowContext = React.createContext<FlowState | null>(null);

const FlowProvider: React.FC<FlowProviderProps> = ({ children, steps }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [collectedData, setCollectedData] = useState<DeepPartial<FlowData>>({});

  const uniqMaps = useMemo(
    () => [...new Map(steps.map((v) => [v.id, v])).values()],
    [steps]
  );

  const handleNextStepCall: NextStepFn = (id, data) => {
    setCollectedData((x) => ({
      ...x,
      [id]: data?.[id],
    }));
    setCurrentStepIndex((x) => x + 1);
  };

  return (
    <FlowContext.Provider
      value={{
        steps: uniqMaps,
        collectedData,
        currentStep: steps[currentStepIndex],
        next: handleNextStepCall,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

export default FlowProvider;
