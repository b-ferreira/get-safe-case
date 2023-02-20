import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AgeStep from '@components/Flow/Steps/AgeStep';

const setup = (next = jest.fn) => {
  const utils = render(<AgeStep next={next} />);
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

  it('calls provided next function if form is valid', async () => {
    const nextCallback = jest.fn();
    const { input, button } = setup(nextCallback);

    fireEvent.change(input, { target: { value: 10 } });
    await userEvent.click(button);

    expect(nextCallback).toHaveBeenCalled();
    expect(nextCallback).toHaveBeenCalledWith('age', { age: 10 });
  });
});
