import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { clsx } from 'clsx';
import type { GridState } from './types';
import { COLS, ROWS } from './constants';

export function DashyControl({
  gridState,
  setGridState,
}: {
  gridState: GridState;
  setGridState: (gridState: GridState) => void;
}) {
  return (
    <div
      className={clsx(
        'flex flex-row items-start gap-5 p-2 mb-2 rounded border text-sm',
        {
          'bg-gray-100': gridState.editMode,
        }
      )}
    >
      <div className="flex flex-col gap-1">
        <span>Edit</span>
        <Switch
          checked={gridState.editMode}
          onCheckedChange={() =>
            setGridState({ ...gridState, editMode: !gridState.editMode })
          }
        />
      </div>
      <div className="flex flex-col gap-1">
        <span
          className={clsx({ 'text-muted-foreground': !gridState.editMode })}
        >
          Columns
        </span>
        <Select
          disabled={!gridState.editMode}
          value={gridState.columns}
          onValueChange={(value) =>
            setGridState({ ...gridState, columns: value })
          }
        >
          <SelectTrigger className="">
            <SelectValue placeholder={gridState.columns} />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(COLS).map((col, index) => (
              <SelectItem key={index} value={col}>
                {COLS[col as keyof typeof COLS]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <span
          className={clsx({ 'text-muted-foreground': !gridState.editMode })}
        >
          Rows
        </span>
        <Select
          disabled={!gridState.editMode}
          value={gridState.rows}
          onValueChange={(value) => setGridState({ ...gridState, rows: value })}
        >
          <SelectTrigger className="">
            <SelectValue placeholder={gridState.rows} />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(ROWS).map((row, index) => (
              <SelectItem key={index} value={row}>
                {ROWS[row as keyof typeof ROWS]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <span
          className={clsx({ 'text-muted-foreground': !gridState.editMode })}
        >
          Items
        </span>

        <Input
          value={gridState.itemCount}
          type="number"
          className="w-20"
          disabled={!gridState.editMode}
          onChange={(e) =>
            setGridState({ ...gridState, itemCount: Number(e.target.value) })
          }
          min={1}
          max={
            COLS[gridState.columns as keyof typeof COLS] *
            ROWS[gridState.rows as keyof typeof ROWS]
          }
        />
      </div>

      <div className="flex flex-col gap-1">
        <span
          className={clsx({ 'text-muted-foreground': !gridState.editMode })}
        >
          Flow
        </span>
        <Select
          disabled={!gridState.editMode}
          value={gridState.flow}
          onValueChange={(value: 'row' | 'column') =>
            setGridState({ ...gridState, flow: value })
          }
        >
          <SelectTrigger className="">
            <SelectValue placeholder={gridState.flow} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="row">Row</SelectItem>
            <SelectItem value="column">Column</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
