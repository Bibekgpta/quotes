import { CellMeasurerCache, Masonry, Positioner, Size } from 'react-virtualized';
import { resetParams } from 'react-virtualized/dist/es/Masonry';
import createCellPositioner from './cellposition';

export type InfinitGridState = { [key: string]: unknown };
export interface GridItem {
  id: string;
  imageUrl?: string;
  coverUrl?: string;
  pictureUrl?: string;
}

export interface ItemsWithSizes {
  item: GridItem;
  size: { width: number; height: number };
}

export interface InfinitGridStaticState {
  cache: CellMeasurerCache;
  cellPositioner: Positioner;
  columnCount: number;
  selected: { [key: string]: unknown };
  width: number;
}

export const columnWidth = 200;
export const defaultHeight = 200;
export const defaultWidth = columnWidth;
export const gutterSize = 20;
export const containerMargin = 10;

export const keyMapper = (item: GridItem) => item.imageUrl;

export const initStaticState = (width: number): InfinitGridStaticState => {
  const cache = new CellMeasurerCache({
    defaultHeight,
    defaultWidth,
    fixedWidth: true,
    fixedHeight: true,
  });

  const columnCount = Math.floor((width - 2 * containerMargin) / (columnWidth + gutterSize));
  // columnCount =
  const cellPositioner = createCellPositioner({
    cellMeasurerCache: cache,
    columnCount: columnCount,
    columnWidth,
    spacer: gutterSize,
    containerWidth: width,
  });

  return { cache, cellPositioner, columnCount, selected: {}, width };
};

export const resetAll = (staticState: React.MutableRefObject<InfinitGridStaticState>, masonryRef: React.MutableRefObject<Masonry>) => {
  if (!staticState.current || !masonryRef.current) return;
  staticState.current.cache.clearAll();
  masonryRef.current.clearCellPositions();
  const columnCount = Math.floor((staticState.current.width - 2 * containerMargin) / (columnWidth + gutterSize));
  staticState.current.columnCount = columnCount;
  staticState.current.cellPositioner.reset({
    columnCount,
    columnWidth,
    spacer: gutterSize,
    containerWidth: staticState.current.width,
  } as resetParams);
  masonryRef.current.recomputeCellPositions();
};

export const onResize = (staticState: React.MutableRefObject<InfinitGridStaticState>, masonryRef: React.MutableRefObject<Masonry>) => ({
  width,
}: Size) => {
  if (!staticState.current || !masonryRef.current) return;
  requestAnimationFrame(() => {
    const columnCount = Math.floor((width - 2 * containerMargin) / (columnWidth + gutterSize));
    staticState.current.cache.clearAll();
    masonryRef.current.clearCellPositions();
    staticState.current.columnCount = columnCount;
    staticState.current.cellPositioner.reset({
      columnCount,
      columnWidth,
      spacer: gutterSize,
      containerWidth: width,
    } as resetParams);
    masonryRef.current.recomputeCellPositions();
  });
};

export const deleteProp = (obj: { [key: string]: unknown }, prop: string) => {
  delete obj[prop];
  return obj;
};
