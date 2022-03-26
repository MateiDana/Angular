import { RadioSignature } from '../enums/radio-signature.enum';

export interface RadioSignal {
  value: number;
  signature: RadioSignature;
}
