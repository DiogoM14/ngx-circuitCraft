import { Kernel } from './core/kernel';
import { CircuitCraftInstance } from './types/circuit-craft-instance.type';
import { CircuitCraftOptions } from './types/options.type';

export function init(domElement: HTMLElement | null, options?: CircuitCraftOptions): CircuitCraftInstance | null {
  if (!domElement) {
    console.error('No DOM element provided for Circuit Craft initialization');
    return null;
  }

  const kernel = new Kernel(domElement, options);

  return {
    setOptions: (newOptions: CircuitCraftOptions) => {
      kernel.setOptions(newOptions);
    },

    getViewModel: () => {
      return kernel.getViewModel();
    },

    getCanvas: () => {
      return kernel.getRenderer().getCanvas();
    },

    // Additional API methods
    addComponent: (definitionId: string, x: number, y: number) => {
      kernel.getViewModel().addComponent(definitionId, x, y);
    },

    removeSelectedComponent: () => {
      kernel.getViewModel().removeSelectedComponent();
    },

    // Add any other methods you want to expose
  } as CircuitCraftInstance;
}
