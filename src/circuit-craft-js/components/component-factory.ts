import { ComponentDefinition } from '../types/component-definition.type';
import { BaseComponent } from './base-component';
import { Registry } from '../core/registry';
import { AndGate } from './standard/and-gate';

export class ComponentFactory {
  constructor(private registry: Registry) {}

  public createComponent(definitionId: string): BaseComponent | null {
    const definition = this.registry.getComponentDefinition(definitionId);

    if (!definition) {
      console.error(`Component definition not found: ${definitionId}`);
      return null;
    }

    // In a real implementation, we'd have a more sophisticated way to map
    // component definitions to their implementations
    switch (definition.id) {
      case 'and-gate':
        return new AndGate(definition);
      default:
        // Create a default implementation for any registered component
        return new DefaultComponent(definition);
    }
  }
}

// Default component implementation for any registered component
class DefaultComponent extends BaseComponent {
  public render(ctx: CanvasRenderingContext2D, x: number, y: number, selected: boolean): void {
    const def = this.getDefinition();
    const width = parseInt(def.styles.width, 10);
    const height = parseInt(def.styles.height, 10);

    // Apply styles
    ctx.fillStyle = def.styles.backgroundColor || '#fff';
    ctx.strokeStyle = selected ? '#ff0000' : def.styles.borderColor || '#000';
    ctx.lineWidth = parseInt(def.styles.borderWidth || '1', 10);

    // Calculate border radius
    const borderRadius = parseInt(def.styles.borderRadius || '0', 10);

    // Draw rounded rectangle
    ctx.beginPath();
    ctx.moveTo(x + borderRadius, y);
    ctx.lineTo(x + width - borderRadius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
    ctx.lineTo(x + width, y + height - borderRadius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - borderRadius, y + height);
    ctx.lineTo(x + borderRadius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
    ctx.lineTo(x, y + borderRadius);
    ctx.quadraticCurveTo(x, y, x + borderRadius, y);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

    // Draw component name
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(def.name, x + width / 2, y + height / 2);

    // Draw input ports
    const inputPositions = this.getInputPositions(x, y);
    inputPositions.forEach(input => {
      // Draw port circle
      ctx.beginPath();
      ctx.arc(input.x, input.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = '#3498db';
      ctx.fill();
      ctx.stroke();

      // Draw port label
      ctx.fillStyle = '#000';
      ctx.textAlign = 'left';
      ctx.fillText(this.definition.properties.inputs.find(i => i.id === input.id)?.name || '', input.x + 10, input.y);
    });

    // Draw output ports
    const outputPositions = this.getOutputPositions(x, y);
    outputPositions.forEach(output => {
      // Draw port circle
      ctx.beginPath();
      ctx.arc(output.x, output.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = '#e74c3c';
      ctx.fill();
      ctx.stroke();

      // Draw port label
      ctx.fillStyle = '#000';
      ctx.textAlign = 'right';
      ctx.fillText(
        this.definition.properties.outputs.find(o => o.id === output.id)?.name || '',
        output.x - 10,
        output.y
      );
    });
  }
}
