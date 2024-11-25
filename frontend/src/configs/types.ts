export interface ValidatedStatementsResponse {
  id: string;
  timestamp: Date;
  fileName: string;
  fileType: string;
  validatedStatements: ValidatedStatements[];
}

export interface ValidationError {
  typeOfError: 'Reference' | 'Balance';
  errorMessage: string;
}

export interface ValidatedStatements {
  transactionReference: number;
  accountNumber: string;
  startBalance: number;
  mutation: string;
  description: string;
  endBalance: number;
  isValid?: boolean;
  validationErrors?: ValidationError[];
}
