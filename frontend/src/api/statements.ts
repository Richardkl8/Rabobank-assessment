import { apiClient } from './apiClient';
import { ValidatedStatementsResponse } from '@/configs/types';

export const getAllStatements = async (): Promise<ValidatedStatementsResponse[]> => {
  return await apiClient.get<ValidatedStatementsResponse[]>('/statements');
};

export const getStatementById = async (id: string): Promise<ValidatedStatementsResponse> => {
  return await apiClient.get<ValidatedStatementsResponse>(`/statements/${id}`);
};

export const postStatement = async (file: File): Promise<ValidatedStatementsResponse> => {
  const formData = new FormData();
  formData.append('statement', file);

  return await apiClient.post<ValidatedStatementsResponse>('/statements', formData);
};

export const deleteStatementById = async (id: string): Promise<string> => {
  return await apiClient.delete<Promise<string>>(`/statements/${id}`);
};

export const getStatementReport = async (id: string): Promise<Blob> => {
  return await apiClient.getBlob(`/statements/report/${id}`);
};
