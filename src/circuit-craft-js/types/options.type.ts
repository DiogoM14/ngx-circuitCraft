import { ComponentDefinition } from './component-definition.type';

export interface ComponentInstance {
  component: ComponentDefinition;
  position: { x: number; y: number };
  id: string;
}

export interface CircuitCraftOptions {
  toolbox?: {
    show: boolean;
    components: ComponentDefinition[];
  };
  dataset?: ComponentInstance[];
  plugins?: string[];
}
