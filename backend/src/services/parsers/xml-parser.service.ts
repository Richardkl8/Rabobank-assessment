import * as xml2js from 'xml2js';
import { ParsedStatement, XMLStatement } from '../../types/types';

export const parseXMLBuffer = async (buffer: Buffer): Promise<ParsedStatement[]> => {
  try {
    const content = buffer.toString('utf-8');
    const parser = new xml2js.Parser({
      trim: true,
    });

    const result = await parser.parseStringPromise(content);

    return result.records.record.map((record: XMLStatement) => ({
      transactionReference: parseInt(record['$'].reference, 10),
      accountNumber: record.accountNumber,
      startBalance: parseFloat(record.startBalance),
      mutation: record.mutation,
      description: record.description,
      endBalance: parseFloat(record.endBalance),
    }));
  } catch (error) {
    throw new Error(
      `Failed to parse XML: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};
