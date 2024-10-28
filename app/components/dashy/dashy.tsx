'use client';

import { clsx } from 'clsx';
import { createSwapy, type Swapy } from 'swapy';
import { DashySlot } from './dashySlot';
import { DashyItem } from './dashyItem';
import { useState, useEffect } from 'react';
import { COLS, COLSPAN, ROWS, MAX_COLS, MAX_ROWS, ROWSPAN } from './constants';
import { Button } from '@/components/ui/button';
import {
  ArrowDownToLine,
  ArrowLeftToLine,
  ArrowRightToLine,
  ArrowUpToLine,
} from 'lucide-react';
import { DashyControl } from './dashControl';
import { GridState } from './types';

export function Dashy() {
  const [swapyInstance, setSwapyInstance] = useState<Swapy | undefined>();
  const [gridState, setGridState] = useState<GridState>({
    flow: 'row',
    editMode: false,
    columns: Object.keys(COLS)[1],
    rows: Object.keys(ROWS)[0],
    itemCount:
      COLS[Object.keys(COLS)[1] as keyof typeof COLS] *
      ROWS[Object.keys(ROWS)[0] as keyof typeof ROWS],
  });

  const [colSpans, setColSpans] = useState(
    Object.assign(
      {},
      [...Array(gridState.itemCount)].map(() => 0)
    )
  );
  const [rowSpans, setRowSpans] = useState(
    Object.assign(
      {},
      [...Array(gridState.itemCount)].map(() => 0)
    )
  );

  // console.log('colSpans=', colSpans);
  // console.log('rowSpans=', rowSpans);
  useEffect(() => {
    console.log('initiating swapy..........');
    const container = document.querySelector('.dashycontainer') as HTMLElement;
    let swapy;
    if (container) {
      swapy = createSwapy(container, {
        swapMode: 'hover',
        animation: 'dynamic',
      });
      setSwapyInstance(swapy);
    }
    if (!swapy) return;
    swapy.onSwapStart(() => {
      console.log('swap start', gridState);
    });
    swapy.onSwap(({ data }) => {
      console.log('onSwap', data);
    });
    swapy.onSwapEnd(() => {
      console.log('swap end');
    });
    setColSpans(
      Object.assign(
        {},
        [...Array(gridState.itemCount)].map(() => 0)
      )
    );
    setRowSpans(
      Object.assign(
        {},
        [...Array(gridState.itemCount)].map(() => 0)
      )
    );
    return () => {
      swapy.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridState.itemCount]);

  useEffect(() => {
    if (gridState.editMode) {
      swapyInstance?.enable(false);
    } else {
      swapyInstance?.enable(true);
    }
  }, [swapyInstance, gridState.editMode]);

  return (
    <div>
      <DashyControl gridState={gridState} setGridState={setGridState} />
      <div
        className={clsx('grid gap-1 dashycontainer p-2', {
          'bg-dashy': gridState.editMode,
          'grid-flow-col': gridState.flow === 'column',
          'grid-flow-row': gridState.flow === 'row',
          [gridState.columns]: true,
          [gridState.rows]: true,
        })}
      >
        {[
          ...Array(
            // COLS[gridState.columns as keyof typeof COLS] *
            //   ROWS[gridState.rows as keyof typeof ROWS]
            gridState.itemCount
          ),
        ].map((_, i) => {
          return (
            <div
              key={i}
              className={clsx('flex flex-row', {
                [COLSPAN[colSpans[i]]]: true,
                [ROWSPAN[rowSpans[i]]]: true,
              })}
            >
              {gridState.editMode && (
                <div
                  className={clsx(
                    'flex flex-col items-end gap-1 transition-opacity duration-300 w-7 mt-2 -mr-7 z-10'
                  )}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-5 h-5"
                    onClick={() => {
                      setRowSpans({
                        ...rowSpans,
                        [i]: rowSpans[i] > 0 ? rowSpans[i] - 1 : rowSpans[i],
                      });
                    }}
                  >
                    <ArrowUpToLine className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-5 h-5"
                    size="icon"
                    onClick={() => {
                      setColSpans({
                        ...colSpans,
                        [i]: colSpans[i] > 0 ? colSpans[i] - 1 : colSpans[i],
                      });
                    }}
                  >
                    <ArrowLeftToLine className="h-4 w-4 text-muted-foreground" />
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-5 h-5"
                    size="icon"
                    onClick={() => {
                      setColSpans({
                        ...colSpans,
                        [i]:
                          colSpans[i] <= MAX_COLS
                            ? colSpans[i] + 1
                            : colSpans[i],
                      });
                    }}
                  >
                    <ArrowRightToLine className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-5 h-5"
                    onClick={() => {
                      setRowSpans({
                        ...rowSpans,
                        [i]:
                          rowSpans[i] <= MAX_ROWS
                            ? rowSpans[i] + 1
                            : rowSpans[i],
                      });
                    }}
                  >
                    <ArrowDownToLine className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              )}
              <DashySlot key={i} className="bg-transparent">
                <DashyItem
                  className={clsx(
                    'flex items-center justify-center rounded h-full border border-gray-400'
                  )}
                >
                  <div>{i + 1}</div>
                </DashyItem>
              </DashySlot>
            </div>
          );
        })}
      </div>
    </div>
  );
}
