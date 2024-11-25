import { describe, it, expect, vi } from 'vitest';
import { apiClient } from './apiClient';
import { API_BASE_URL } from '@/configs/constants';

describe('apiClient', () => {
  const mockResponse = { data: 'test' };
  const mockBlob = new Blob(['test'], { type: 'application/pdf' });

  describe('get', () => {
    it('should make successful GET request', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await apiClient.get('/test');

      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/test`, {
        method: 'GET',
        headers: {},
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle API error', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(apiClient.get('/test')).rejects.toThrow('API error: 404');
    });
  });

  describe('getBlob', () => {
    it('should make successful blob request', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        blob: () => Promise.resolve(mockBlob),
      });

      const result = await apiClient.getBlob('/test');

      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/test`, {
        method: 'GET',
        headers: {},
      });
      expect(result).toEqual(mockBlob);
    });
  });

  describe('post', () => {
    it('should make successful POST request', async () => {
      const requestBody = JSON.stringify({ test: 'data' });
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await apiClient.post('/test', requestBody);

      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/test`, {
        method: 'POST',
        body: requestBody,
        headers: {},
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('delete', () => {
    it('should make successful DELETE request', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await apiClient.delete('/test');

      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/test`, {
        method: 'DELETE',
        headers: {},
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
