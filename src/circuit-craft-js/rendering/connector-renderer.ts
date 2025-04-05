export class ConnectorRenderer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  public renderConnection(startX: number, startY: number, endX: number, endY: number, selected: boolean = false): void {
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);

    // Create a nice curve for the connection
    const controlX1 = startX + (endX - startX) / 2;
    const controlY1 = startY;
    const controlX2 = startX + (endX - startX) / 2;
    const controlY2 = endY;

    this.ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);

    this.ctx.strokeStyle = selected ? '#ff0000' : '#666';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }
}
