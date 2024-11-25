import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  postStatement,
  getAllStatements,
  deleteStatementById,
  getStatementReport,
} from '@/api/statements';
import { downloadBlob } from '@/utils/utils';
import { ValidatedStatementsResponse } from '@/configs/types';
import { STATEMENTS_QUERY_KEY } from '@/configs/constants';

export const useStatements = () => {
  const queryClient = useQueryClient();

  const { data: statements, isLoading: isLoadingStatements } = useQuery({
    queryKey: [STATEMENTS_QUERY_KEY],
    queryFn: getAllStatements,
    staleTime: 30000,
    refetchOnMount: false,
  });

  const { mutate: uploadStatement, isPending: isUploadingStatement } = useMutation({
    mutationFn: postStatement,
    onSuccess: (data) => {
      if (data) {
        queryClient.setQueryData<ValidatedStatementsResponse[]>(
          [STATEMENTS_QUERY_KEY],
          (current = []) => [...current, data],
        );
      }
    },
    onError: (error) => {
      console.error('Failed to upload statement:', error);
    },
  });

  const { mutate: deleteStatement, isPending: isDeletingStatement } = useMutation({
    mutationFn: deleteStatementById,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<ValidatedStatementsResponse[]>(
        [STATEMENTS_QUERY_KEY],
        (current = []) => current.filter((statements) => statements.id !== deletedId),
      );
    },
    onError: (error) => {
      console.error('Failed to delete statement:', error);
    },
  });

  const { mutate: downloadStatement, isPending: isDownloadingStatement } = useMutation({
    mutationFn: getStatementReport,
    onSuccess: (blob) => downloadBlob(blob, 'failed_statements.pdf'),
    onError: (error) => {
      console.error('Failed to download statement:', error);
    },
  });

  return {
    statements,
    isLoadingStatements,
    uploadStatement,
    isUploadingStatement,
    deleteStatement,
    isDeletingStatement,
    downloadStatement,
    isDownloadingStatement,
  };
};
