import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FlowProvider from '@components/Flow/FlowProvider';
import EmailStep from '@components/Flow/Steps/EmailStep';
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
      <EmailStep />
    </WrapperComponent>
  );
  const button = screen.getByRole('button');
  const input = screen.getByLabelText('email-input');

  return {
    button,
    input,
    ...utils,
  };
};

const validEmail = 'a@a.com';
const invalidEmail = 'a';

describe('EmailStep', () => {
  it('keeps next button disabled until the form is invalid', () => {
    const { button, input } = setup();

    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: validEmail } });

    expect(button).toBeEnabled();
  });

  it('displays an error message if form is invalid', async () => {
    const { input } = setup();

    expect(screen.queryByText('Not valid email')).not.toBeInTheDocument;

    fireEvent.change(input, { target: { value: invalidEmail } });

    expect(screen.getByText('Not valid email')).toBeInTheDocument();
  });

  it('calls provided next function if form is valid', async () => {
    const { input, button } = setup();
    const nextMock = jest.fn();
    jest.spyOn(useFlowNext, 'useFlowNext').mockImplementation(() => ({
      next: nextMock,
    }));

    fireEvent.change(input, { target: { value: validEmail } });
    await userEvent.click(button);

    expect(nextMock).toHaveBeenCalled();
    expect(nextMock).toHaveBeenCalledWith('email', { email: validEmail });
  });
});
