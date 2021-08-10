import { makeStyles } from '@material-ui/core';
import { columnWidth, defaultHeight } from './helper';

export const useMasnoryGridStyles = makeStyles((theme) => ({
  root: {
    '& .ReactVirtualized__Masonry__innerScrollContainer': {
      overflowX: 'hidden!important',
    },
  },
  page: {
    position: 'relative',
    '& .ReactVirtualized__Masonry__innerScrollContainer': {
      marginTop: 55,
      overflowX: 'hidden!important',
    },
  },
  cell: {
    boxShadow: '0 0 2px 1px black',
    padding: 10,
    position: 'absolute',
    width: columnWidth,
    height: defaultHeight,
  },
  image: {
    width: '100%',
    objectFit: 'contain',
  },
  title: {
    position: 'absolute',
    bottom: 5,
    maxHeight: 40,
    overflow: 'hidden',
  },

  check: {
    position: 'absolute',
    left: 0,
    top: 0,
    background: '#0000008c',
  },
  imageWrapper: {
    background: 'black',
    height: 140,
  },
}));
