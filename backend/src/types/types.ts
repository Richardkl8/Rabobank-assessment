export interface CSVStatement {
  Reference: string;
  'Account Number': string;
  'Start Balance': string;
  Mutation: string;
  Description: string;
  'End Balance': string;
}

export interface XMLStatement {
  $: {
    reference: string;
  };
  accountNumber: string;
  startBalance: string;
  mutation: string;
  description: string;
  endBalance: string;
}

export interface ParsedStatement {
  transactionReference: number;
  accountNumber: string;
  startBalance: number;
  mutation: string;
  description: string;
  endBalance: number;
}

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
