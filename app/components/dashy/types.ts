import { COLS, ROWS } from './constants';

export interface GridState {
  flow: 'row' | 'column';
  editMode: boolean;
  columns: keyof typeof COLS | string;
  rows: keyof typeof ROWS | string;
  itemCount: number;
}