import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable } from './DataTable';
import { ColumnDef } from '@tanstack/react-table';

interface TestData {
  id: number;
  name: string;
  age: number;
}

describe('DataTable', () => {
  const mockData: TestData[] = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
  ];

  const columns: ColumnDef<TestData>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'age',
      header: 'Age',
    },
  ];

  const mockOnRowClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render table with data', () => {
    render(<DataTable data={mockData} columns={columns} />);

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  it('should render empty state when no data is provided', () => {
    render(<DataTable data={[]} columns={columns} />);

    expect(screen.getByText('No data.')).toBeInTheDocument();
  });

  it('should handle row click', () => {
    render(<DataTable data={mockData} columns={columns} onRowClickHandler={mockOnRowClick} />);

    const firstRow = screen.getByText('John').closest('tr');
    fireEvent.click(firstRow!);

    expect(mockOnRowClick).toHaveBeenCalledWith(mockData[0]);
  });

  it('should render filter input', () => {
    render(<DataTable data={mockData} columns={columns} />);

    expect(screen.getByPlaceholderText('Filter...')).toBeInTheDocument();
  });

  it('should filter data based on input', async () => {
    render(<DataTable data={mockData} columns={columns} />);

    const filterInput = screen.getByPlaceholderText('Filter...');
    fireEvent.change(filterInput, { target: { value: 'John' } });

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.queryByText('Jane')).not.toBeInTheDocument();
  });

  it('should sort columns when clicking on sortable headers', () => {
    const sortableColumns: ColumnDef<TestData>[] = [
      {
        accessorKey: 'name',
        header: ({ column }) => <button onClick={() => column.toggleSorting()}>Name</button>,
      },
      {
        accessorKey: 'age',
        header: 'Age',
      },
    ];

    render(<DataTable data={mockData} columns={sortableColumns} />);

    const sortButton = screen.getByRole('button', { name: 'Name' });
    fireEvent.click(sortButton);

    // Verify the order after sorting
    const cells = screen.getAllByRole('cell');
    expect(cells[0]).toHaveTextContent('Jane');
    expect(cells[2]).toHaveTextContent('John');
  });

  it('should apply custom header rendering', () => {
    const customColumns: ColumnDef<TestData>[] = [
      {
        accessorKey: 'name',
        header: () => <span>Custom Name Header</span>,
      },
      {
        accessorKey: 'age',
        header: 'Age',
      },
    ];

    render(<DataTable data={mockData} columns={customColumns} />);

    expect(screen.getByText('Custom Name Header')).toBeInTheDocument();
  });

  it('should apply custom cell rendering', () => {
    const customColumns: ColumnDef<TestData>[] = [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <span>{`Custom: ${row.original.name}`}</span>,
      },
      {
        accessorKey: 'age',
        header: 'Age',
      },
    ];

    render(<DataTable data={mockData} columns={customColumns} />);

    expect(screen.getByText('Custom: John')).toBeInTheDocument();
    expect(screen.getByText('Custom: Jane')).toBeInTheDocument();
  });
});
