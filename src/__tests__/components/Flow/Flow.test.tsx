import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Flow from '@components/Flow';
import { AvailableSteps } from '@components/Flow/Steps/Steps.types';

const setup = (steps: AvailableSteps[] = ['age', 'email']) => {
  const utils = render(<Flow steps={steps} />);

  return {
    ...utils,
  };
};

const validEmail = 'a@a.com';

describe('Flow', () => {
  it('navigates through steps when user clicks on next button once step form is valid', async () => {
    setup();

    // First step is age...
    const ageInput = screen.getByLabelText('age-input');
    fireEvent.change(ageInput, { target: { value: 10 } });

    // Clicks onto the next button
    await userEvent.click(screen.getByRole('button'));

    // Next step is email
    expect(screen.getByText(/Email:/)).toBeInTheDocument();
  });

  it('displays the summary with all collected data once user is done with all steps', async () => {
    setup();

    // First step is age...
    const ageInput = screen.getByLabelText('age-input');
    fireEvent.change(ageInput, { target: { value: 10 } });

    // Clicks onto the next button
    await userEvent.click(screen.getByRole('button'));

    // Next step is email
    const emailInput = screen.getByLabelText('email-input');
    fireEvent.change(emailInput, { target: { value: validEmail } });

    // Clicks onto the next button
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText(/Age: 10/)).toBeInTheDocument();
    expect(screen.getByText(`Email: ${validEmail}`)).toBeInTheDocument();
    expect(screen.getByText(/Purchase/)).toBeInTheDocument();
  });

  it('displays a message and a link to the home page if no steps are provided', () => {
    setup([]);

    expect(screen.getByLabelText('no-steps-message')).toBeInTheDocument();
    expect(screen.getByText(/Go back/)).toBeInTheDocument();
  });
});
