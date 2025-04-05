import { ComponentDefinition } from '../types/component-definition.type';

export abstract class BaseComponent {
  constructor(protected definition: ComponentDefinition) {}

  public getDefinition(): ComponentDefinition {
    return this.definition;
  }

  public abstract render(ctx: CanvasRenderingContext2D, x: number, y: number, selected: boolean): void;

  public isPointInside(x: number, y: number, componentX: number, componentY: number): boolean {
    const width = parseInt(this.definition.styles.width, 10);
    const height = parseInt(this.definition.styles.height, 10);

    return x >= componentX && x <= componentX + width && y >= componentY && y <= componentY + height;
  }

  public getInputPositions(x: number, y: number): { id: string; x: number; y: number }[] {
    const height = parseInt(this.definition.styles.height, 10);
    const inputs = this.definition.properties.inputs;
    const spacing = height / (inputs.length + 1);

    return inputs.map((input, index) => {
      return {
        id: input.id,
        x,
        y: y + spacing * (index + 1),
      };
    });
  }

  public getOutputPositions(x: number, y: number): { id: string; x: number; y: number }[] {
    const width = parseInt(this.definition.styles.width, 10);
    const height = parseInt(this.definition.styles.height, 10);
    const outputs = this.definition.properties.outputs;
    const spacing = height / (outputs.length + 1);

    return outputs.map((output, index) => {
      return {
        id: output.id,
        x: x + width,
        y: y + spacing * (index + 1),
      };
    });
  }
}
