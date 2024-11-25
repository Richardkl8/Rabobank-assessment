import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useStatementDetails } from './useStatementDetails';
import { getStatementById } from '@/api/statements';
import { ValidatedStatementsResponse } from '@/configs/types';

vi.mock('@/api/statements');

describe('useStatementDetails', () => {
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

  it('should fetch statement details successfully', async () => {
    vi.mocked(getStatementById).mockResolvedValue(mockValidatedResponse);

    const { result } = renderHook(() => useStatementDetails('123'), { wrapper });

    await waitFor(() => {
      expect(result.current.statement).toEqual(mockValidatedResponse);
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should not fetch when fileId is undefined', async () => {
    const { result } = renderHook(() => useStatementDetails(undefined), { wrapper });

    expect(result.current.statement).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(getStatementById).not.toHaveBeenCalled();
  });
});
