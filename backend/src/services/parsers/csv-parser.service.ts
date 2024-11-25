import { parse } from 'csv-parse/sync';
import { CSVStatement, ParsedStatement } from '../../types/types';
import { decode } from 'iconv-lite';

export const parseCSVBuffer = (buffer: Buffer): ParsedStatement[] => {
  try {
    const content = decode(buffer, 'ISO-8859-1');
    const rawRecords: CSVStatement[] = parse(content, { columns: true });

    return rawRecords.map((record) => ({
      transactionReference: parseInt(record.Reference),
      accountNumber: record['Account Number'],
      startBalance: parseFloat(record['Start Balance']),
      mutation: record.Mutation,
      description: record.Description,
      endBalance: parseFloat(record['End Balance']),
    }));
  } catch (error) {
    throw new Error(
      `Failed to parse XML: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};
