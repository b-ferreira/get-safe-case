import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import FlowProvider from '@components/Flow/FlowProvider';
import AgeStep from '@components/Flow/Steps/AgeStep';
import { StepItem } from '@components/Flow/Steps/Steps.types';

import * as useFlowNext from '@hooks/useFlowNext';

jest.mock('@hooks/useFlowNext', () => ({
  __esModule: true,
  ...(jest.requireActual('@hooks/useFlowNext') as typeof useFlowNext),
}));

const wrapper = (
  steps: StepItem[]
): React.FC<{ children: React.ReactNode }> => {
  return function InnerWrapper({ children }) {
    return <FlowProvider steps={steps}>{children}</FlowProvider>;
  };
};

const setup = () => {
  const WrapperComponent = wrapper([]);
  const utils = render(
    <WrapperComponent>
      <AgeStep />
    </WrapperComponent>
  );
  const button = screen.getByRole('button');
  const input = screen.getByLabelText('age-input');

  return {
    button,
    input,
    ...utils,
  };
};

describe('AgeStep', () => {
  it('keeps next button disabled until the form is invalid', () => {
    const { button, input } = setup();

    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: 10 } });

    expect(button).toBeEnabled();
  });

  it('displays an error message if form is invalid', async () => {
    const { input } = setup();

    expect(screen.queryByText('Age must be greater than zero')).not
      .toBeInTheDocument;

    fireEvent.change(input, { target: { value: 0 } });

    expect(
      screen.getByText('Age must be greater than zero')
    ).toBeInTheDocument();
  });

  it('calls next function if form is valid on button click', async () => {
    const { input, button } = setup();
    const nextMock = jest.fn();
    jest.spyOn(useFlowNext, 'useFlowNext').mockImplementation(() => ({
      next: nextMock,
    }));

    fireEvent.change(input, { target: { value: 10 } });
    await userEvent.click(button);

    expect(nextMock).toHaveBeenCalled();
    expect(nextMock).toHaveBeenCalledWith('age', { age: 10 });
  });
});
