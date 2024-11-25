import express from 'express';
import { upload } from '../middleware/file-upload.middleware';
import { validateSaveStatementsController } from '../controllers/statements/validate-save-statements.controller';
import { getStatementController } from '../controllers/statements/get-statement.controller';
import { getAllStatementsController } from '../controllers/statements/get-all-statements.controller';
import { deleteStatementController } from '../controllers/statements/delete-statement.controller';
import { getReportController } from '../controllers/statements/get-report.controller';

const router = express.Router();

router.post('/statements', upload.single('statement'), validateSaveStatementsController);

router.get('/statements', getAllStatementsController);

router.get('/statements/:statementId', getStatementController);

router.delete('/statements/:statementId', deleteStatementController);

router.get('/statements/report/:statementId', getReportController);

export { router };
