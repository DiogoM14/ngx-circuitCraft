export interface ComponentDefinition {
  id: string;
  name: string;
  styles: {
    width: string;
    height: string;
    backgroundColor: string;
    borderColor: string;
    borderWidth: string;
    borderStyle: string;
    borderRadius: string;
    boxShadow: string;
    [key: string]: string;
  };
  properties: {
    inputs: { id: string; name: string }[];
    outputs: { id: string; name: string }[];
    methods: any[];
  };
}
