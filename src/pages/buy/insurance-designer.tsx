import Flow from '@components/Flow';
import FlowProvider from '@components/Flow/FlowProvider';
import AgeStep from '@components/Flow/Steps/AgeStep';
import EmailStep from '@components/Flow/Steps/EmailStep';
import IdentificationStep from '@components/Flow/Steps/IdentificationStep';

export default function InsuranceDesigner() {
  return (
    <FlowProvider
      steps={[
        {
          id: 'age',
          stepComponent: AgeStep,
        },
        {
          id: 'email',
          stepComponent: EmailStep,
        },
        {
          id: 'identification',
          stepComponent: IdentificationStep,
        },
      ]}
    >
      <Flow />
    </FlowProvider>
  );
}
