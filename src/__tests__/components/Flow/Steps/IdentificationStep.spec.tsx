import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import IdentificationStep from '@components/Flow/Steps/IdentificationStep';

const setup = (next = jest.fn) => {
  const utils = render(<IdentificationStep next={next} />);
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
    const nextCallback = jest.fn();
    const { firstNameInput, lastNameInput, button } = setup(nextCallback);

    fireEvent.change(firstNameInput, { target: { value: 'Jhon' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    await userEvent.click(button);

    expect(nextCallback).toHaveBeenCalled();
    expect(nextCallback).toHaveBeenCalledWith('identification', {
      identification: {
        firstName: 'Jhon',
        lastName: 'Doe',
      },
    });
  });
});
