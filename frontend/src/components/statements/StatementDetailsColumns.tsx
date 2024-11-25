import { ColumnDef } from '@tanstack/react-table';
import { ValidatedStatements, ValidationError } from '@/configs/types';
import { ArrowUpDown } from 'lucide-react';

export const statementDetailsColumns: ColumnDef<ValidatedStatements>[] = [
  {
    accessorKey: 'transactionReference',
    header: 'Reference',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    id: 'errorType',
    accessorKey: 'validationErrors',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Error Type
          <ArrowUpDown className="ml-2 size-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const errors = row.getValue('validationErrors') as ValidationError[];
      return errors?.map((error) => <p key={error.typeOfError}>{error.typeOfError}</p>);
    },
  },
  {
    id: 'validationErrors',
    accessorKey: 'validationErrors',
    header: 'Error Message',
    cell: ({ row }) => {
      const errors = row.getValue('validationErrors') as ValidationError[];
      return errors?.map((error) => <p key={error.errorMessage}>{error.errorMessage}</p>);
    },
  },
];
