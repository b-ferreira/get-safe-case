import React from 'react';

import { FlowContext } from '@components/Flow/FlowProvider';

export const useFlow = () => {
  const context = React.useContext(FlowContext);

  if (!context) {
    throw new Error('useSideMenuState must be used within a SideMenuProvider');
  }

  return {
    currentStep: context.currentStep,
    data: context.collectedData,
    steps: context.steps,
  };
};
