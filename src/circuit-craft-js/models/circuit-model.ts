import { ComponentInstance } from '../types/options.type';
import { ComponentModel } from './component-model';
import { ConnectorModel } from './connector-model';

export interface Connection {
  id: string;
  sourceComponentId: string;
  sourcePortId: string;
  targetComponentId: string;
  targetPortId: string;
}

export class CircuitModel {
  private components: ComponentModel[] = [];
  private connections: ConnectorModel[] = [];

  public setComponents(components: ComponentInstance[]): void {
    this.components = components.map(comp => new ComponentModel(comp.id, comp.component, comp.position));
  }

  public getComponents(): ComponentModel[] {
    return this.components;
  }

  public getComponent(id: string): ComponentModel | undefined {
    return this.components.find(comp => comp.getId() === id);
  }

  public addComponent(component: ComponentModel): void {
    this.components.push(component);
  }

  public removeComponent(id: string): void {
    // Remove all connections to/from this component
    this.connections = this.connections.filter(
      conn => conn.getSourceComponentId() !== id && conn.getTargetComponentId() !== id
    );

    // Remove the component
    this.components = this.components.filter(comp => comp.getId() !== id);
  }

  public setConnections(connections: Connection[]): void {
    this.connections = connections.map(
      conn =>
        new ConnectorModel(
          conn.id,
          conn.sourceComponentId,
          conn.sourcePortId,
          conn.targetComponentId,
          conn.targetPortId
        )
    );
  }

  public getConnections(): ConnectorModel[] {
    return this.connections;
  }

  public addConnection(connection: ConnectorModel): void {
    this.connections.push(connection);
  }

  public removeConnection(id: string): void {
    this.connections = this.connections.filter(conn => conn.getId() !== id);
  }
}
