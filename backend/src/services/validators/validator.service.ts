import { ParsedStatement, ValidatedStatements, ValidationError } from '../../types/types';

const validateTransactionReference = (
  statement: ValidatedStatements,
  referenceMap: Set<number>,
): ValidationError | null => {
  const hasReferenceError = referenceMap.has(statement.transactionReference);

  if (hasReferenceError) {
    return {
      typeOfError: 'Reference',
      errorMessage: `Duplicate Transaction Reference: ${statement.transactionReference}`,
    };
  }

  referenceMap.add(statement.transactionReference);
  return null;
};

function validateEndBalance(statement: ValidatedStatements): ValidationError | null {
  const mutationAmount = parseFloat(statement.mutation);
  const expectedEndBalance = parseFloat((statement.startBalance + mutationAmount).toFixed(2));
  const hasEndBalanceError = Math.abs(expectedEndBalance - statement.endBalance) > 0.01;

  if (hasEndBalanceError) {
    return {
      typeOfError: 'Balance',
      errorMessage: `Expected end balance: ${expectedEndBalance}, Actual end balance: ${statement.endBalance}`,
    };
  }

  return null;
}

export const validatorService = (statements: ParsedStatement[]): ValidatedStatements[] => {
  const referenceMap = new Set<number>();

  return statements.map((statement) => {
    const validatedStatement: ValidatedStatements = { ...statement };
    validatedStatement.validationErrors = [];
    validatedStatement.isValid = true;

    const referenceError = validateTransactionReference(statement, referenceMap);
    if (referenceError) {
      validatedStatement.isValid = false;
      validatedStatement.validationErrors.push(referenceError);
    }

    const balanceError = validateEndBalance(statement);
    if (balanceError) {
      validatedStatement.isValid = false;
      validatedStatement.validationErrors.push(balanceError);
    }

    return validatedStatement;
  });
};
