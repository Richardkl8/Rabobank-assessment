import { describe, it, expect, vi } from 'vitest';
import { cn, downloadBlob, formatTimestamp } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
      expect(cn('foo', { bar: true })).toBe('foo bar');
      expect(cn('foo', { bar: false })).toBe('foo');
      expect(cn('foo', ['bar', 'baz'])).toBe('foo bar baz');
    });
  });

  describe('downloadBlob', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should create and trigger download of blob', () => {
      const blob = new Blob(['test'], { type: 'text/plain' });
      const fileName = 'test.txt';

      // Mock URL.createObjectURL and URL.revokeObjectURL
      const mockUrl = 'blob:test';
      const createObjectURL = vi.spyOn(window.URL, 'createObjectURL').mockReturnValue(mockUrl);
      const revokeObjectURL = vi.spyOn(window.URL, 'revokeObjectURL');

      // Mock document methods
      const mockAnchor = document.createElement('a');
      const clickSpy = vi.spyOn(mockAnchor, 'click');
      const createElement = vi.spyOn(document, 'createElement').mockReturnValue(mockAnchor);
      const appendChild = vi.spyOn(document.body, 'appendChild');
      const removeChild = vi.spyOn(document.body, 'removeChild');

      downloadBlob(blob, fileName);

      expect(createObjectURL).toHaveBeenCalledWith(blob);
      expect(createElement).toHaveBeenCalledWith('a');
      expect(mockAnchor.href).toBe(mockUrl);
      expect(mockAnchor.download).toBe(fileName);
      expect(appendChild).toHaveBeenCalledWith(mockAnchor);
      expect(clickSpy).toHaveBeenCalled();
      expect(removeChild).toHaveBeenCalledWith(mockAnchor);
      expect(revokeObjectURL).toHaveBeenCalledWith(mockUrl);
    });
  });

  describe('formatTimestamp', () => {
    it('should format date string correctly', () => {
      const timestamp = '2024-02-15T10:30:00.000Z';
      expect(formatTimestamp(timestamp)).toBe('15-02-2024');
    });

    it('should format Date object correctly', () => {
      const timestamp = new Date('2024-02-15T10:30:00.000Z');
      expect(formatTimestamp(timestamp)).toBe('15-02-2024');
    });

    it('should handle single digit days and months', () => {
      const timestamp = '2024-01-05T10:30:00.000Z';
      expect(formatTimestamp(timestamp)).toBe('05-01-2024');
    });

    it('should handle end of month dates', () => {
      const timestamp = '2024-12-31T10:30:00.000Z';
      expect(formatTimestamp(timestamp)).toBe('31-12-2024');
    });
  });
});
