import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiClient } from './apiClient';
import {
  getAllStatements,
  getStatementById,
  postStatement,
  deleteStatementById,
  getStatementReport,
} from './statements';
import { ValidatedStatementsResponse } from '@/configs/types';

vi.mock('./apiClient');

describe('Statements API', () => {
  const mockValidatedResponse: ValidatedStatementsResponse = {
    id: '123',
    timestamp: new Date(),
    fileName: 'test.csv',
    fileType: 'csv',
    validatedStatements: [
      {
        transactionReference: 1,
        accountNumber: '123456',
        startBalance: 100,
        mutation: '+10',
        description: 'Test transaction',
        endBalance: 110,
        isValid: true,
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllStatements', () => {
    it('should fetch all statements successfully', async () => {
      const mockResponse = [mockValidatedResponse];
      vi.mocked(apiClient.get).mockResolvedValue(mockResponse);

      const result = await getAllStatements();

      expect(apiClient.get).toHaveBeenCalledWith('/statements');
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors', async () => {
      const error = new Error('API request failed: API error: 404');
      vi.mocked(apiClient.get).mockRejectedValue(error);

      await expect(getAllStatements()).rejects.toThrow(error);
    });
  });

  describe('getStatementById', () => {
    it('should fetch a statement by ID successfully', async () => {
      vi.mocked(apiClient.get).mockResolvedValue(mockValidatedResponse);
      const id = '123';

      const result = await getStatementById(id);

      expect(apiClient.get).toHaveBeenCalledWith(`/statements/${id}`);
      expect(result).toEqual(mockValidatedResponse);
    });
  });

  describe('postStatement', () => {
    it('should post a statement file successfully', async () => {
      vi.mocked(apiClient.post).mockResolvedValue(mockValidatedResponse);
      const file = new File(['test content'], 'test.csv', { type: 'text/csv' });
      const formData = new FormData();
      formData.append('statement', file);

      const result = await postStatement(file);

      expect(apiClient.post).toHaveBeenCalledWith('/statements', formData);
      expect(result).toEqual(mockValidatedResponse);
    });
  });

  describe('deleteStatementById', () => {
    it('should delete a statement by ID successfully', async () => {
      const mockResponse = 'Statement deleted';
      vi.mocked(apiClient.delete).mockResolvedValue(mockResponse);
      const id = '123';

      const result = await deleteStatementById(id);

      expect(apiClient.delete).toHaveBeenCalledWith(`/statements/${id}`);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getStatementReport', () => {
    it('should fetch a statement report successfully', async () => {
      const mockBlob = new Blob(['test'], { type: 'application/pdf' });
      vi.mocked(apiClient.getBlob).mockResolvedValue(mockBlob);
      const id = '123';

      const result = await getStatementReport(id);

      expect(apiClient.getBlob).toHaveBeenCalledWith(`/statements/report/${id}`);
      expect(result).toEqual(mockBlob);
    });
  });
});
