import { Request, Response } from 'express';
import { getStatementById } from '../../services/statements/statements.service';

export const getStatementController = (req: Request, res: Response) => {
  const statementId = String(req.params.statementId);

  if (!statementId) {
    res.status(400).json({ error: 'Missing param: id' });
    return;
  }

  const result = getStatementById(statementId);

  if (!result) {
    res.status(404).json({ error: 'Validation result not found' });
    return;
  }

  res.json(result);
};
