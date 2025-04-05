import { ComponentDefinition } from '../types/component-definition.type';

export class ComponentModel {
  constructor(
    private id: string,
    private definition: ComponentDefinition,
    private position: { x: number; y: number }
  ) {}

  public getId(): string {
    return this.id;
  }

  public getDefinition(): ComponentDefinition {
    return this.definition;
  }

  public getPosition(): { x: number; y: number } {
    return { ...this.position };
  }

  public setPosition(x: number, y: number): void {
    this.position.x = x;
    this.position.y = y;
  }
}
