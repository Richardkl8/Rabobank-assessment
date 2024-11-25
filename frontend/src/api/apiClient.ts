import { API_BASE_URL } from '@/configs/constants';

interface RequestConfig {
  method: 'GET' | 'POST' | 'DELETE';
  body?: BodyInit;
  headers?: HeadersInit;
}

const createFetch = async <T>(
  endpoint: string,
  config: RequestConfig,
  responseType: 'JSON' | 'BLOB' = 'JSON',
): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...config,
      headers: {
        ...config.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }

    if (responseType === 'JSON') {
      return await response.json();
    }

    return (await response.blob()) as unknown as T;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`API request failed: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const apiClient = {
  get: <T>(endpoint: string): Promise<T> => {
    return createFetch<T>(endpoint, { method: 'GET' });
  },

  getBlob: (endpoint: string): Promise<Blob> => {
    return createFetch<Blob>(endpoint, { method: 'GET' }, 'BLOB');
  },

  post: <T>(endpoint: string, body: BodyInit): Promise<T> => {
    return createFetch<T>(endpoint, { method: 'POST', body });
  },

  delete: <T>(endpoint: string): Promise<T> => {
    return createFetch<T>(endpoint, { method: 'DELETE' });
  },
};
