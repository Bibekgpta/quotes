export type ChildComponent = JSX.Element | JSX.Element[] | string;

export type AnyObject = { [key: string]: any };

export interface ICololumnConfig {
  width: number;
  flexGrow?: number;
  label: string;
  key: string;
  isNumeric?: boolean;
  render?: (row: AnyObject) => ChildComponent;
}
