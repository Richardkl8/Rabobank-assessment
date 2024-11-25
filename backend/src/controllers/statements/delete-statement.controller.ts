import { Request, Response } from 'express';
import { deleteStatementById } from '../../services/statements/statements.service';

export const deleteStatementController = (req: Request, res: Response) => {
  const idToRemove = String(req.params.statementId);

  if (!idToRemove) {
    res.status(400).json({ error: 'Missing param: statementId' });
    return;
  }

  deleteStatementById(idToRemove);

  res.status(200).json(idToRemove);
};
