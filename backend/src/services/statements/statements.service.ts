import { ValidatedStatementsResponse } from '../../types/types';
import { statements } from '../../models/statements.model';

export const saveStatement = (result: ValidatedStatementsResponse): void => {
  statements.set(result.id, result);
};

export const getStatementById = (id: string): ValidatedStatementsResponse | undefined => {
  return statements.get(id);
};

export const deleteStatementById = (id: string): void => {
  statements.delete(id);
};

export const getStatements = (): ValidatedStatementsResponse[] => {
  return Array.from(statements.values());
};
