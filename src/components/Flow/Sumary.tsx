import Link from 'next/link';
import React from 'react';

import { AvailableSteps, FlowData } from './Steps/Steps.types';

interface SummaryProps {
  data: DeepPartial<FlowData>;
}

type SummaryByKeyProps = {
  field: AvailableSteps;
  data: DeepPartial<FlowData>;
};

const SummaryByKey: React.FC<SummaryByKeyProps> = ({ field, data }) => {
  switch (field) {
    case 'age':
      return <div key={field}>Age: {data?.age}</div>;

    case 'email':
      return <div key={field}>Email: {data?.email}</div>;

    case 'identification':
      return (
        <div key={field}>
          <div>First Name: {data?.identification?.firstName}</div>
          <div>Last Name: {data?.identification?.lastName}</div>
        </div>
      );
    default:
      return <></>;
  }
};

const Summary: React.FC<SummaryProps> = ({ data }) => (
  <>
    {Object.keys(data ?? {}).map((x) => (
      <SummaryByKey key={x} field={x} data={data} />
    ))}
    <div>
      <Link href="/">Purchase</Link>
    </div>
  </>
);

export default Summary;
