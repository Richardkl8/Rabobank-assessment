import { globalFilter } from './global-filter';
import { Row } from '@tanstack/react-table';

describe('globalFilter', () => {
  const createMockRow = <TData>(data: TData): Row<TData> =>
    ({
      original: data,
    }) as Row<TData>;

  interface TestData {
    id: number;
    name: string;
    age: number;
    tags?: string[];
    details?: {
      department: string;
      location: string;
    };
  }

  const mockData: TestData = {
    id: 1,
    name: 'John Doe',
    age: 25,
    tags: ['developer', 'frontend'],
    details: {
      department: 'IT',
      location: 'Amsterdam',
    },
  };

  it('should return true when filterValue is empty', () => {
    const result = globalFilter(createMockRow(mockData), '', '');
    expect(result).toBe(true);
  });

  it('should find match in simple properties', () => {
    const result = globalFilter(createMockRow(mockData), '', 'John');
    expect(result).toBe(true);
  });

  it('should find match in array values', () => {
    const result = globalFilter(createMockRow(mockData), '', 'developer');
    expect(result).toBe(true);
  });

  it('should find match in nested object values', () => {
    const result = globalFilter(createMockRow(mockData), '', 'Amsterdam');
    expect(result).toBe(true);
  });

  it('should be case insensitive', () => {
    const result = globalFilter(createMockRow(mockData), '', 'john');
    expect(result).toBe(true);
  });

  it('should return false when no match is found', () => {
    const result = globalFilter(createMockRow(mockData), '', 'invalid');
    expect(result).toBe(false);
  });

  it('should handle partial matches', () => {
    const result = globalFilter(createMockRow(mockData), '', 'dev');
    expect(result).toBe(true);
  });
});
