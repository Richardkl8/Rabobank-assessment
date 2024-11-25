import { FC } from 'react';
import { useStatements } from '@/hooks/useStatement';
import { ValidatedStatementsResponse } from '@/configs/types';
import { CloudDownload, Trash2 } from 'lucide-react';

interface ColumnsActionsProps {
  statement: ValidatedStatementsResponse;
}

export const StatementsColumnsActions: FC<ColumnsActionsProps> = ({ statement }) => {
  const { deleteStatement, downloadStatement } = useStatements();

  return (
    <div className="flex gap-6">
      <button
        onClick={(event) => {
          event.stopPropagation();
          downloadStatement(statement.id);
        }}
      >
        <CloudDownload width={22} />
      </button>

      <button
        onClick={(event) => {
          event.stopPropagation();
          deleteStatement(statement.id);
        }}
      >
        <Trash2 width={22} />
      </button>
    </div>
  );
};
