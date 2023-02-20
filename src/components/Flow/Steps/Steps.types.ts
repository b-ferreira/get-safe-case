import { z } from 'zod';

import { AgeSchema, EmailSchema, IdentificationSchema } from './Steps.schema';

export type AvailableSteps = 'email' | 'age' | 'identification';

export type NextStepFn = (id: AvailableSteps, data: any) => void;

export type FlowStep = {
  next: NextStepFn;
};

export type AgeStepType = z.infer<typeof AgeSchema>;

export type EmailStepType = z.infer<typeof EmailSchema>;

export type IdentificationType = z.infer<typeof IdentificationSchema>;

export type FlowData = AgeStepType & EmailStepType & IdentificationType;
