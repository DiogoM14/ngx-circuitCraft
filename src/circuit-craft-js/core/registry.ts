import { ComponentDefinition } from '../types/component-definition.type';
import { ComponentFactory } from '../components/component-factory';

export class Registry {
  private componentDefinitions: Map<string, ComponentDefinition> = new Map();
  private componentFactory: ComponentFactory;

  constructor() {
    this.componentFactory = new ComponentFactory(this);
  }

  public registerComponent(componentDef: ComponentDefinition): void {
    this.componentDefinitions.set(componentDef.id, componentDef);
  }

  public getComponentDefinition(id: string): ComponentDefinition | undefined {
    return this.componentDefinitions.get(id);
  }

  public getAllComponentDefinitions(): ComponentDefinition[] {
    return Array.from(this.componentDefinitions.values());
  }

  public getComponentFactory(): ComponentFactory {
    return this.componentFactory;
  }
}
