import { BaseComponent } from '../base-component';

export class AndGate extends BaseComponent {
  public render(ctx: CanvasRenderingContext2D, x: number, y: number, selected: boolean): void {
    // For now, we'll use the default rendering
    // In a more complete implementation, this would have custom drawing
    // for AND gate symbol

    const def = this.getDefinition();
    const width = parseInt(def.styles.width, 10);
    const height = parseInt(def.styles.height, 10);

    // Apply styles
    ctx.fillStyle = def.styles.backgroundColor || '#fff';
    ctx.strokeStyle = selected ? '#ff0000' : def.styles.borderColor || '#000';
    ctx.lineWidth = parseInt(def.styles.borderWidth || '1', 10);

    // Draw AND gate shape
    ctx.beginPath();
    // Draw a line from top-left to bottom-left
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + height);

    // Draw a line from bottom-left to halfway of the right side
    // with a curve for the AND gate
    ctx.lineTo(x + width / 2, y + height);

    // Draw a semicircle for the right side of the AND gate
    ctx.arc(x + width / 2, y + height / 2, height / 2, Math.PI / 2, -Math.PI / 2, true);

    // Close the path back to the top-left
    ctx.lineTo(x, y);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

    // Draw component name
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(def.name, x + width / 3, y + height / 2);

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

    // Draw output port
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
