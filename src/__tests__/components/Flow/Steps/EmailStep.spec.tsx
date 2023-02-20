import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EmailStep from '@components/Flow/Steps/EmailStep';

const setup = (next = jest.fn) => {
  const utils = render(<EmailStep next={next} />);
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
    const nextCallback = jest.fn();
    const { input, button } = setup(nextCallback);

    fireEvent.change(input, { target: { value: validEmail } });
    await userEvent.click(button);

    expect(nextCallback).toHaveBeenCalled();
    expect(nextCallback).toHaveBeenCalledWith('email', { email: validEmail });
  });
});
