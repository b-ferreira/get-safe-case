import React from 'react';

import { FlowContext } from '@components/Flow/FlowProvider';

export const useFlowNext = () => {
  const context = React.useContext(FlowContext);

  if (!context) {
    throw new Error('useSideMenuState must be used within a SideMenuProvider');
  }

  return { next: context.next };
};
