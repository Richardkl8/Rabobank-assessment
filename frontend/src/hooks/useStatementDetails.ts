import { useQuery } from '@tanstack/react-query';
import { getStatementById } from '@/api/statements';
import { ValidatedStatementsResponse } from '@/configs/types';
import { STATEMENTS_QUERY_KEY } from '@/configs/constants';

export const useStatementDetails = (fileId: string | undefined) => {
  const {
    data: statement,
    isLoading,
    isError,
    error,
  } = useQuery<ValidatedStatementsResponse | undefined, Error>({
    queryKey: [STATEMENTS_QUERY_KEY, fileId],
    queryFn: () => getStatementById(fileId || ''),
    enabled: !!fileId,
  });

  return {
    statement,
    isLoading,
    isError,
    error,
  };
};
