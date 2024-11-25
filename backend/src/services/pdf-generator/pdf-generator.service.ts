import jsPDF from 'jspdf';
import { autoTable, RowInput } from 'jspdf-autotable';
import { ValidatedStatementsResponse } from '../../types/types';
import 'jspdf-autotable';

export const pdfGeneratorService = (statement: ValidatedStatementsResponse) => {
  const doc = new jsPDF();

  doc.setFontSize(18);

  const invalidStatements = statement.validatedStatements.filter((statement) => !statement.isValid); //TODO: dont want this

  if (!invalidStatements.length) {
    doc.text(`No Invalid Statements for ${statement.fileName}`, 14, 22);
    return doc;
  }

  doc.text(`Invalid Statements for ${statement.fileName}`, 14, 22);

  const tableData = invalidStatements.map((statement) => [
    statement.transactionReference,
    statement.description,
    statement.validationErrors?.map((error) => error.typeOfError).join(', '),
    statement.validationErrors?.map((error) => error.errorMessage).join('; '),
  ]);

  (doc as jsPDF & { autoTable: autoTable }).autoTable({
    startY: 30,
    head: [['Reference', 'Description', 'Error Type', 'Error Message']],
    body: tableData as RowInput[],
    headStyles: {
      fillColor: [0, 0, 93],
    },
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 3,
      overflow: 'linebreak',
    },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 50 },
      2: { cellWidth: 30 },
      3: { cellWidth: 80 },
    },
  });

  const timestamp = new Date().toLocaleString();
  doc.setFontSize(10);
  doc.text(`Generated on: ${timestamp}`, 14, doc.internal.pageSize.height - 10);

  return doc;
};
