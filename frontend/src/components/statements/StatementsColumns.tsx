import { ColumnDef } from '@tanstack/react-table';
import { StatementsColumnsActions } from '@/components/statements/StatementsColumnsActions';
import { ValidatedStatementsResponse } from '@/configs/types';
import { formatTimestamp } from '@/utils/utils';

export const statementsColumns: ColumnDef<ValidatedStatementsResponse>[] = [
  {
    accessorKey: 'fileName',
    header: 'File Name',
  },
  {
    header: 'Validation Errors',
    cell: ({ row }) => {
      const { validatedStatements } = row.original;
      const amountOfErrors = validatedStatements.filter((statement) => !statement.isValid)?.length;
      return <p>{amountOfErrors}</p>;
    },
  },
  {
    accessorKey: 'timestamp',
    header: 'Uploaded at',
    cell: ({ row }) => {
      const { timestamp } = row.original;
      return <p>{formatTimestamp(timestamp)}</p>;
    },
  },
  {
    id: 'actions',
    header: 'Options',
    cell: ({ row }) => {
      const statement = row.original;
      return <StatementsColumnsActions statement={statement} />;
    },
  },
];
