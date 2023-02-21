import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FlowProvider from '@components/Flow/FlowProvider';
import IdentificationStep from '@components/Flow/Steps/IdentificationStep';
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
      <IdentificationStep />
    </WrapperComponent>
  );
  const button = screen.getByRole('button');
  const firstNameInput = screen.getByLabelText('first-name-input');
  const lastNameInput = screen.getByLabelText('last-name-input');

  return {
    button,
    firstNameInput,
    lastNameInput,
    ...utils,
  };
};

describe('EmailStep', () => {
  it('keeps next button disabled until both fields are filled', () => {
    const { button, firstNameInput, lastNameInput } = setup();

    expect(button).toBeDisabled();

    fireEvent.change(firstNameInput, { target: { value: 'Jhon' } });
    expect(button).toBeDisabled();

    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    expect(button).toBeEnabled();
  });

  it('displays an error message if any of the fields are invalid', async () => {
    const { firstNameInput, lastNameInput } = setup();

    expect(screen.queryByText(/Required/)).not.toBeInTheDocument;

    fireEvent.change(firstNameInput, { target: { value: 'Jhon' } });

    expect(screen.getByText(/Required/)).toBeInTheDocument();

    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    expect(screen.queryByText(/Required/)).not.toBeInTheDocument;
  });

  it('calls provided next function if form is valid', async () => {
    const { firstNameInput, lastNameInput, button } = setup();
    const nextMock = jest.fn();
    jest.spyOn(useFlowNext, 'useFlowNext').mockImplementation(() => ({
      next: nextMock,
    }));

    fireEvent.change(firstNameInput, { target: { value: 'Jhon' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    await userEvent.click(button);

    expect(nextMock).toHaveBeenCalled();
    expect(nextMock).toHaveBeenCalledWith('identification', {
      identification: {
        firstName: 'Jhon',
        lastName: 'Doe',
      },
    });
  });
});
