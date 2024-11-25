import { useNavigate, useParams } from 'react-router-dom';
import { statementDetailsColumns } from '@/components/statements/StatementDetailsColumns';
import { DataTable } from '@/components/common/data-table/DataTable';
import { useStatementDetails } from '@/hooks/useStatementDetails';
import { Card } from '@/components/common/Card';
import { FC } from 'react';
import { ROUTES } from '@/configs/constants';

export const StatementsDetails: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { statement } = useStatementDetails(params.fileId);

  const onButtonBack = () => navigate(ROUTES.HOME);

  return (
    <>
      <Card className="mt-8">
        <h1 className="mb-4 text-4xl font-bold">Validation of {statement?.fileName}</h1>
        <DataTable columns={statementDetailsColumns} data={statement?.validatedStatements || []} />
      </Card>

      <button
        onClick={onButtonBack}
        className="mt-8 rounded-md  border-2 border-blue-900 bg-white px-6 py-2 font-semibold text-blue-900 transition duration-200 hover:bg-blue-900 hover:text-white"
      >
        Go back
      </button>
    </>
  );
};
