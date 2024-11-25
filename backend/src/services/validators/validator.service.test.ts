import { ParsedStatement } from '../../types/types';
import { validatorService } from './validator.service';

describe('validatorService', () => {
  const createMockStatement = (
    reference: number,
    startBalance: number,
    mutation: string,
    endBalance: number,
  ): ParsedStatement => ({
    transactionReference: reference,
    accountNumber: '123456',
    startBalance,
    mutation,
    description: 'Test transaction',
    endBalance,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn(); // Mock console.log
  });

  it('should validate statements without errors', () => {
    const statements: ParsedStatement[] = [
      createMockStatement(1, 100, '+10', 110),
      createMockStatement(2, 200, '-20', 180),
    ];

    const result = validatorService(statements);

    result.forEach((statement) => {
      expect(statement.isValid).toBe(true);
      expect(statement.validationErrors).toHaveLength(0);
    });
  });

  it('should detect duplicate transaction references', () => {
    const statements: ParsedStatement[] = [
      createMockStatement(1, 100, '+10', 110),
      createMockStatement(1, 200, '-20', 180),
    ];

    const result = validatorService(statements);

    expect(result[0].isValid).toBe(true);
    expect(result[1].isValid).toBe(false);
    expect(result[1].validationErrors).toContainEqual({
      typeOfError: 'Reference',
      errorMessage: 'Duplicate Transaction Reference: 1',
    });
  });

  it('should detect incorrect end balance', () => {
    const statements: ParsedStatement[] = [createMockStatement(1, 100, '+10', 115)];

    const result = validatorService(statements);

    expect(result[0].isValid).toBe(false);
    expect(result[0].validationErrors).toContainEqual({
      typeOfError: 'Balance',
      errorMessage: 'Expected end balance: 110, Actual end balance: 115',
    });
  });

  it('should handle multiple validation errors', () => {
    const statements: ParsedStatement[] = [
      createMockStatement(1, 100, '+10', 110),
      createMockStatement(1, 200, '-20', 185),
    ];

    const result = validatorService(statements);

    expect(result[1].isValid).toBe(false);
    expect(result[1].validationErrors).toHaveLength(2);
    expect(result[1].validationErrors).toContainEqual({
      typeOfError: 'Reference',
      errorMessage: 'Duplicate Transaction Reference: 1',
    });
    expect(result[1].validationErrors).toContainEqual({
      typeOfError: 'Balance',
      errorMessage: 'Expected end balance: 180, Actual end balance: 185',
    });
  });

  it('should handle decimal mutations correctly', () => {
    const statements: ParsedStatement[] = [createMockStatement(1, 100.5, '+10.25', 110.75)];

    const result = validatorService(statements);

    expect(result[0].isValid).toBe(true);
    expect(result[0].validationErrors).toHaveLength(0);
  });

  it('should handle negative mutations correctly', () => {
    const statements: ParsedStatement[] = [createMockStatement(1, 100, '-10', 90)];

    const result = validatorService(statements);

    expect(result[0].isValid).toBe(true);
    expect(result[0].validationErrors).toHaveLength(0);
  });

  it('should handle floating point precision', () => {
    const statements: ParsedStatement[] = [createMockStatement(1, 100.01, '+0.02', 100.03)];

    const result = validatorService(statements);

    expect(result[0].isValid).toBe(true);
    expect(result[0].validationErrors).toHaveLength(0);
  });
});
