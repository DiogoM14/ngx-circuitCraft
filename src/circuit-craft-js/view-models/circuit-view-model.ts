import { CircuitModel } from '../models/circuit-model';
import { CanvasRenderer } from '../rendering/canvas-renderer';
import { ComponentRenderer } from '../rendering/component-renderer';
import { ConnectorRenderer } from '../rendering/connector-renderer';
import { Registry } from '../core/registry';
import { ComponentModel } from '../models/component-model';

export class CircuitViewModel {
  private componentRenderer: ComponentRenderer;
  private connectorRenderer: ConnectorRenderer;
  private selectedComponentId: string | null = null;

  constructor(
    private model: CircuitModel,
    private renderer: CanvasRenderer,
    private registry: Registry
  ) {
    this.componentRenderer = new ComponentRenderer(renderer.getContext());
    this.connectorRenderer = new ConnectorRenderer(renderer.getContext());

    // Set up event handlers
    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    const canvas = this.renderer.getCanvas();

    // Mouse click for selection
    canvas.addEventListener('click', this.handleClick.bind(this));

    // Mouse move for drag operations
    canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));

    // Mouse up for ending drag operations
    canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  private handleClick(event: MouseEvent): void {
    const rect = this.renderer.getCanvas().getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if we clicked on a component
    const components = this.model.getComponents();
    for (const component of components) {
      const position = component.getPosition();
      const componentImpl = this.registry.getComponentFactory().createComponent(component.getDefinition().id);

      if (componentImpl && componentImpl.isPointInside(x, y, position.x, position.y)) {
        this.selectedComponentId = component.getId();
        this.update();
        return;
      }
    }

    // If we got here, no component was clicked
    this.selectedComponentId = null;
    this.update();
  }

  private handleMouseMove(event: MouseEvent): void {
    // Implement drag behavior here
  }

  private handleMouseUp(event: MouseEvent): void {
    // End drag operations here
  }

  public update(): void {
    // Clear the canvas
    this.renderer.clear();

    // Render all components
    const components = this.model.getComponents();
    for (const component of components) {
      const componentImpl = this.registry.getComponentFactory().createComponent(component.getDefinition().id);

      if (componentImpl) {
        const isSelected = component.getId() === this.selectedComponentId;
        this.componentRenderer.renderComponent(
          {
            id: component.getId(),
            component: component.getDefinition(),
            position: component.getPosition(),
          },
          componentImpl,
          isSelected
        );
      }
    }

    // Render all connections
    const connections = this.model.getConnections();
    for (const connection of connections) {
      const sourceComponent = this.model.getComponent(connection.getSourceComponentId());
      const targetComponent = this.model.getComponent(connection.getTargetComponentId());

      if (sourceComponent && targetComponent) {
        const sourceComponentImpl = this.registry
          .getComponentFactory()
          .createComponent(sourceComponent.getDefinition().id);
        const targetComponentImpl = this.registry
          .getComponentFactory()
          .createComponent(targetComponent.getDefinition().id);

        if (sourceComponentImpl && targetComponentImpl) {
          const sourcePos = sourceComponent.getPosition();
          const targetPos = targetComponent.getPosition();

          const outputPorts = sourceComponentImpl.getOutputPositions(sourcePos.x, sourcePos.y);
          const inputPorts = targetComponentImpl.getInputPositions(targetPos.x, targetPos.y);

          const sourcePort = outputPorts.find(p => p.id === connection.getSourcePortId());
          const targetPort = inputPorts.find(p => p.id === connection.getTargetPortId());

          if (sourcePort && targetPort) {
            const isSelected = false; // Implement connection selection logic later
            this.connectorRenderer.renderConnection(sourcePort.x, sourcePort.y, targetPort.x, targetPort.y, isSelected);
          }
        }
      }
    }
  }

  public addComponent(definitionId: string, x: number, y: number): void {
    const definition = this.registry.getComponentDefinition(definitionId);
    if (!definition) {
      console.error(`Component definition not found: ${definitionId}`);
      return;
    }

    const component = {
      definition,
      position: { x, y },
    };

    this.model.addComponent(component as unknown as ComponentModel);
    this.update();
  }

  public removeSelectedComponent(): void {
    if (this.selectedComponentId) {
      this.model.removeComponent(this.selectedComponentId);
      this.selectedComponentId = null;
      this.update();
    }
  }
}
