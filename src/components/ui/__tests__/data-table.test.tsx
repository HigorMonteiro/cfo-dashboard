import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable } from '../data-table';

describe('DataTable Component', () => {
  const mockColumns = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'age',
      header: 'Age',
    },
  ];

  const mockData = [
    { name: 'John Doe', age: 30 },
    { name: 'Jane Smith', age: 25 },
    { name: 'Bob Johnson', age: 35 },
  ];

  it('should render table with data', () => {
    // Arrange
    const testId = 'test-table';

    // Act
    render(
      <DataTable
        data-testid={testId}
        columns={mockColumns}
        data={mockData}
        searchKey="name"
      />
    );

    // Assert
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('should filter data based on search input', () => {
    // Arrange
    const testId = 'test-table';

    // Act
    render(
      <DataTable
        data-testid={testId}
        columns={mockColumns}
        data={mockData}
        searchKey="name"
      />
    );

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    // Assert
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();
  });

  it('should sort data when clicking on column header', () => {
    // Arrange
    const testId = 'test-table';

    // Act
    render(
      <DataTable
        data-testid={testId}
        columns={mockColumns}
        data={mockData}
        searchKey="name"
      />
    );

    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);

    // Assert
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Bob Johnson');
    expect(rows[2]).toHaveTextContent('Jane Smith');
    expect(rows[3]).toHaveTextContent('John Doe');
  });

  it('should change page size when selecting from dropdown', () => {
    // Arrange
    const testId = 'test-table';

    // Act
    render(
      <DataTable
        data-testid={testId}
        columns={mockColumns}
        data={mockData}
        searchKey="name"
        pageSize={2}
      />
    );

    const pageSizeSelect = screen.getByRole('combobox');
    fireEvent.change(pageSizeSelect, { target: { value: '5' } });

    // Assert
    expect(screen.getAllByRole('row')).toHaveLength(4); // Header + 3 data rows
  });

  it('should navigate between pages', () => {
    // Arrange
    const testId = 'test-table';
    const largeDataSet = Array.from({ length: 10 }, (_, i) => ({
      name: `Person ${i + 1}`,
      age: 20 + i,
    }));

    // Act
    render(
      <DataTable
        data-testid={testId}
        columns={mockColumns}
        data={largeDataSet}
        searchKey="name"
        pageSize={3}
      />
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    // Assert
    expect(screen.getByText('Person 4')).toBeInTheDocument();
    expect(screen.getByText('Person 5')).toBeInTheDocument();
    expect(screen.getByText('Person 6')).toBeInTheDocument();
  });

  it('should display no results message when filtered data is empty', () => {
    // Arrange
    const testId = 'test-table';

    // Act
    render(
      <DataTable
        data-testid={testId}
        columns={mockColumns}
        data={mockData}
        searchKey="name"
      />
    );

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'NonExistent' } });

    // Assert
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });
}); 