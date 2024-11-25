import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useStatements } from './useStatement';
import {
  getAllStatements,
  postStatement,
  deleteStatementById,
  getStatementReport,
} from '@/api/statements';
import { downloadBlob } from '@/utils/utils';
import { ValidatedStatementsResponse } from '@/configs/types';

vi.mock('@/api/statements');
vi.mock('@/utils/utils');

describe('useStatements', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

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
    vi.resetAllMocks();
    queryClient.clear();
  });

  it('should fetch statements successfully', async () => {
    vi.mocked(getAllStatements).mockResolvedValue([mockValidatedResponse]);

    const { result } = renderHook(() => useStatements(), { wrapper });

    await waitFor(() => {
      expect(result.current.statements).toEqual([mockValidatedResponse]);
    });
    expect(result.current.isLoadingStatements).toBe(false);
  });

  it('should upload statement successfully', async () => {
    vi.mocked(postStatement).mockResolvedValue(mockValidatedResponse);
    const file = new File(['test content'], 'test.csv', { type: 'text/csv' });

    const { result } = renderHook(() => useStatements(), { wrapper });

    result.current.uploadStatement(file);

    await waitFor(() => {
      expect(result.current.statements).toEqual([mockValidatedResponse]);
    });
    expect(result.current.isUploadingStatement).toBe(false);
  });

  it('should delete statement successfully', async () => {
    vi.mocked(getAllStatements).mockResolvedValue([mockValidatedResponse]);
    vi.mocked(deleteStatementById).mockResolvedValue('Statement deleted');

    const { result } = renderHook(() => useStatements(), { wrapper });

    await waitFor(() => {
      expect(result.current.statements).toEqual([mockValidatedResponse]);
    });

    result.current.deleteStatement('123');

    await waitFor(() => {
      expect(result.current.statements).toEqual([]);
    });
    expect(result.current.isDeletingStatement).toBe(false);
  });

  it('should download statement report successfully', async () => {
    const mockBlob = new Blob(['test'], { type: 'application/pdf' });
    vi.mocked(getStatementReport).mockResolvedValue(mockBlob);

    const { result } = renderHook(() => useStatements(), { wrapper });

    result.current.downloadStatement('123');

    await waitFor(() => {
      expect(downloadBlob).toHaveBeenCalledWith(mockBlob, 'failed_statements.pdf');
    });
    expect(result.current.isDownloadingStatement).toBe(false);
  });

  it('should handle upload error', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Upload failed');
    vi.mocked(postStatement).mockRejectedValue(error);
    const file = new File(['test content'], 'test.csv', { type: 'text/csv' });

    const { result } = renderHook(() => useStatements(), { wrapper });

    result.current.uploadStatement(file);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith('Failed to upload statement:', error);
    });
  });

  it('should handle delete error', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Delete failed');
    vi.mocked(deleteStatementById).mockRejectedValue(error);

    const { result } = renderHook(() => useStatements(), { wrapper });

    result.current.deleteStatement('123');

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith('Failed to delete statement:', error);
    });
  });

  it('should handle download error', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Download failed');
    vi.mocked(getStatementReport).mockRejectedValue(error);

    const { result } = renderHook(() => useStatements(), { wrapper });

    result.current.downloadStatement('123');

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith('Failed to download statement:', error);
    });
  });
});
