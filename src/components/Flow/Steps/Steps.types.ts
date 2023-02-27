import { z } from 'zod';

import { AgeSchema, EmailSchema, IdentificationSchema } from './Steps.schema';

export type AvailableSteps = 'email' | 'age' | 'identification';

export type NextStepFn = <T extends Partial<Record<AvailableSteps, unknown>>>(
  id: AvailableSteps,
  data: T
) => void;

export interface StepItem {
  id: AvailableSteps;
  stepComponent: React.FC;
}

export type AgeStepType = z.infer<typeof AgeSchema>;

export type EmailStepType = z.infer<typeof EmailSchema>;

export type IdentificationType = z.infer<typeof IdentificationSchema>;

export type FlowData = AgeStepType & EmailStepType & IdentificationType;
