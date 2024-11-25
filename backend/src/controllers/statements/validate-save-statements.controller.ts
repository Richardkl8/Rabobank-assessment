import { saveStatement } from '../../services/statements/statements.service';
import { NextFunction, Request, Response } from 'express';
import { parseXMLBuffer } from '../../services/parsers/xml-parser.service';
import { parseCSVBuffer } from '../../services/parsers/csv-parser.service';
import { v4 as uuid } from 'uuid';
import { ValidatedStatementsResponse } from '../../types/types';
import { validatorService } from '../../services/validators/validator.service';

export const validateSaveStatementsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const fileType = req.file.mimetype;

    let statements;
    if (fileType === 'text/xml') {
      statements = await parseXMLBuffer(req.file.buffer);
    } else {
      statements = parseCSVBuffer(req.file.buffer);
    }

    const validatedStatements = validatorService(statements);

    const validationResult: ValidatedStatementsResponse = {
      id: uuid(),
      timestamp: new Date(),
      fileName: req.file.originalname,
      fileType,
      validatedStatements,
    };

    saveStatement(validationResult);

    res.json(validationResult);
  } catch (error) {
    next(error);
  }
};
