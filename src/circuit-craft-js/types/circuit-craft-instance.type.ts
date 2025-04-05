import { CircuitCraftOptions } from './options.type';

export interface CircuitCraftInstance {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  setOptions: (options: CircuitCraftOptions) => void;
  render: () => void;
  getViewModel: () => any;
  getCanvas: () => HTMLCanvasElement;
  addComponent: (definitionId: string, x: number, y: number) => void;
  removeSelectedComponent: () => void;
  // Add any other methods exposed by your CircuitCraft instance
}
