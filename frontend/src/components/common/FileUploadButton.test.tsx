import { render, screen, fireEvent } from '@testing-library/react';
import { FileUploadButton } from './FileUploadButton';

describe('FileUploadButton', () => {
  const mockHandleFile = vi.fn();
  const file = new File(['test'], 'test.csv', { type: 'text/csv' });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders upload button', () => {
    render(<FileUploadButton handleFile={mockHandleFile} />);

    expect(screen.getByRole('button')).toHaveTextContent('Upload');
  });

  it('contains hidden file input', () => {
    render(<FileUploadButton handleFile={mockHandleFile} />);

    const fileInput = screen.getByRole('button').nextElementSibling as HTMLInputElement;
    expect(fileInput).toHaveClass('hidden');
    expect(fileInput.type).toBe('file');
  });

  it('triggers file input click when button is clicked', () => {
    render(<FileUploadButton handleFile={mockHandleFile} />);

    const fileInput = screen.getByRole('button').nextElementSibling as HTMLInputElement;
    const clickSpy = vi.spyOn(fileInput, 'click');

    fireEvent.click(screen.getByRole('button'));
    expect(clickSpy).toHaveBeenCalled();
  });

  it('calls handleFile when file is selected', () => {
    render(<FileUploadButton handleFile={mockHandleFile} />);

    const fileInput = screen.getByRole('button').nextElementSibling as HTMLInputElement;

    fireEvent.change(fileInput, {
      target: { files: [file] },
    });

    expect(mockHandleFile).toHaveBeenCalledWith(file);
  });
});
