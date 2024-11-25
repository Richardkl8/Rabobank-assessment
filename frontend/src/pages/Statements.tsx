import { FC } from 'react';
import { statementsColumns } from '@/components/statements/StatementsColumns';
import { FileUploadButton } from '@/components/common/FileUploadButton';
import { DataTable } from '@/components/common/data-table/DataTable';
import { useNavigate } from 'react-router-dom';
import { useStatements } from '@/hooks/useStatement';
import { ValidatedStatementsResponse } from '@/configs/types';
import { Card } from '@/components/common/Card';
import { ROUTES } from '@/configs/constants';

export const Statements: FC = () => {
  const navigate = useNavigate();
  const { statements, uploadStatement } = useStatements();

  const onRowClickHandler = (row: ValidatedStatementsResponse) => {
    navigate(`${ROUTES.STATEMENTS_DETAILS}/${row.id}`);
  };

  return (
    <Card className="mt-8">
      <h1 className="mb-4 text-4xl font-bold">Customer Statement Validator</h1>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full rounded bg-gray-100 p-4 md:w-3/4">
          <p className="mb-2">There are two validations:</p>
          <ul className="mb-2 list-disc pl-5">
            <li>All transaction references should be unique.</li>
            <li>The end balance needs to be validated.</li>
          </ul>
          <p>
            A report can be created which will display both the transaction reference and
            description of each of the failed records.
          </p>
        </div>

        <div className="w-full rounded bg-blue-900 p-4 md:w-1/4 ">
          <h2 className="text-2xl italic text-white">Upload Statements</h2>
          <p className="my-2 text-white"> Upload a CSV or an XML file.</p>
          <FileUploadButton className="mt-4 w-full" handleFile={uploadStatement} />
        </div>
      </div>

      <DataTable
        onRowClickHandler={onRowClickHandler}
        columns={statementsColumns}
        data={statements || []}
      />
    </Card>
  );
};
