import { Kernel } from '../core/kernel';

export interface Plugin {
  name: string;
  version: string;
  initialize: (kernel: Kernel) => void;
}
