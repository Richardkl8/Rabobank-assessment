import { Request, Response } from 'express';
import { getStatementById } from '../../services/statements/statements.service';
import { pdfGeneratorService } from '../../services/pdf-generator/pdf-generator.service';

export const getReportController = (req: Request, res: Response) => {
  const statementId = String(req.params.statementId);

  if (!statementId) {
    res.status(400).json({ error: 'Missing param: id' });
    return;
  }

  const statements = getStatementById(statementId);

  if (!statements) {
    res.status(404).json({ error: `No statement found by id ${statementId}` });
    return;
  }

  const pdf = pdfGeneratorService(statements);

  const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${statements.fileName}.pdf`);
  res.send(pdfBuffer);
};
