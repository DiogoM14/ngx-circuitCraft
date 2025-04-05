export class ConnectorModel {
  constructor(
    private id: string,
    private sourceComponentId: string,
    private sourcePortId: string,
    private targetComponentId: string,
    private targetPortId: string
  ) {}

  public getId(): string {
    return this.id;
  }

  public getSourceComponentId(): string {
    return this.sourceComponentId;
  }

  public getSourcePortId(): string {
    return this.sourcePortId;
  }

  public getTargetComponentId(): string {
    return this.targetComponentId;
  }

  public getTargetPortId(): string {
    return this.targetPortId;
  }
}
