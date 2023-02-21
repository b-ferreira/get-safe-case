import Flow from '@components/Flow';
import FlowProvider from '@components/Flow/FlowProvider';
import AgeStep from '@components/Flow/Steps/AgeStep';
import EmailStep from '@components/Flow/Steps/EmailStep';

export default function InsuranceDev() {
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
      ]}
    >
      <Flow />
    </FlowProvider>
  );
}
