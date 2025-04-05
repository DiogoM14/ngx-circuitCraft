import { BaseComponent } from '../components/base-component';
import { ComponentInstance } from '../types/options.type';

export class ComponentRenderer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  public renderComponent(component: ComponentInstance, componentImpl: BaseComponent, selected: boolean = false): void {
    componentImpl.render(this.ctx, component.position.x, component.position.y, selected);
  }
}
