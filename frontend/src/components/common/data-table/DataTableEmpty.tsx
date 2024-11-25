import { Table, TableBody, TableCell, TableRow } from '@/components/common/Table';
import { FC } from 'react';

interface EmptyDataTableProps {
  columnLength: number;
}

export const DataTableEmpty: FC<EmptyDataTableProps> = ({ columnLength }) => (
  <div className="my-4 rounded-md border">
    <Table>
      <TableBody>
        <TableRow>
          <TableCell colSpan={columnLength} className="h-24 text-center">
            No data.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
);
