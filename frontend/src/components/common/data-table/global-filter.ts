import { Row } from '@tanstack/react-table';

export const globalFilter = <TData>(row: Row<TData>, _: string, filterValue: string): boolean => {
  const searchValue = filterValue.toLowerCase().trim();

  if (!searchValue) return true;

  const checkValue = (value: unknown): boolean => {
    if (Array.isArray(value)) {
      return value.some((item) => checkValue(item));
    }

    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some((item) => checkValue(item));
    }

    return String(value).toLowerCase().includes(searchValue);
  };

  return checkValue(row.original);
};
