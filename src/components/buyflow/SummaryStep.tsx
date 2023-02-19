import Link from 'next/link';
import React from 'react';

interface SummaryStepProps {
  collectedData: {
    email: string;
    age: number;
  };
}

const SummaryStep: React.FC<SummaryStepProps> = (props) => {
  return (
    <>
      <div>Email: {props.collectedData.email}</div>
      <div>Age: {props.collectedData.age}</div>
      <div>
        <Link href="/">Purchase</Link>
      </div>
    </>
  );
};

export default SummaryStep;
