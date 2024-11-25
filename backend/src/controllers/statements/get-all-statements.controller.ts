import { Request, Response } from 'express';
import { getStatements } from '../../services/statements/statements.service';

export const getAllStatementsController = (_: Request, res: Response) => {
  const results = getStatements();
  res.json(results);
};
