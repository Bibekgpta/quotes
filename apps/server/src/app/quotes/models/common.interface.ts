export enum SortDirOptions {
  ASC,
  DESC,
}

export type SortDirType = keyof typeof SortDirOptions;

export interface IQuery {
  key?: string;
  page?: number;
  pageSize?: number;
  start?: Date;
  end: Date;
}
