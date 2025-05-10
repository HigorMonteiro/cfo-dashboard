import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '../table';

describe('Table Components', () => {
  describe('Table', () => {
    it('should render table with children', () => {
      // Arrange
      const testId = 'test-table';
      
      // Act
      render(
        <Table data-testid={testId}>
          <tbody>
            <tr>
              <td>Test Content</td>
            </tr>
          </tbody>
        </Table>
      );

      // Assert
      const table = screen.getByTestId(testId);
      expect(table).toBeInTheDocument();
      expect(table).toHaveClass('w-full');
    });
  });

  describe('TableHeader', () => {
    it('should render table header with children', () => {
      // Arrange
      const testId = 'test-header';
      
      // Act
      render(
        <TableHeader data-testid={testId}>
          <tr>
            <th>Header Content</th>
          </tr>
        </TableHeader>
      );

      // Assert
      const header = screen.getByTestId(testId);
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('[&_tr]:border-b');
    });
  });

  describe('TableBody', () => {
    it('should render table body with children', () => {
      // Arrange
      const testId = 'test-body';
      
      // Act
      render(
        <TableBody data-testid={testId}>
          <tr>
            <td>Body Content</td>
          </tr>
        </TableBody>
      );

      // Assert
      const body = screen.getByTestId(testId);
      expect(body).toBeInTheDocument();
      expect(body).toHaveClass('[&_tr:last-child]:border-0');
    });
  });

  describe('TableFooter', () => {
    it('should render table footer with children', () => {
      // Arrange
      const testId = 'test-footer';
      
      // Act
      render(
        <TableFooter data-testid={testId}>
          <tr>
            <td>Footer Content</td>
          </tr>
        </TableFooter>
      );

      // Assert
      const footer = screen.getByTestId(testId);
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('bg-primary');
    });
  });

  describe('TableRow', () => {
    it('should render table row with children', () => {
      // Arrange
      const testId = 'test-row';
      
      // Act
      render(
        <TableRow data-testid={testId}>
          <td>Row Content</td>
        </TableRow>
      );

      // Assert
      const row = screen.getByTestId(testId);
      expect(row).toBeInTheDocument();
      expect(row).toHaveClass('border-b');
    });
  });

  describe('TableHead', () => {
    it('should render table head with children', () => {
      // Arrange
      const testId = 'test-head';
      
      // Act
      render(
        <TableHead data-testid={testId}>
          Header Content
        </TableHead>
      );

      // Assert
      const head = screen.getByTestId(testId);
      expect(head).toBeInTheDocument();
      expect(head).toHaveClass('h-12');
    });
  });

  describe('TableCell', () => {
    it('should render table cell with children', () => {
      // Arrange
      const testId = 'test-cell';
      
      // Act
      render(
        <TableCell data-testid={testId}>
          Cell Content
        </TableCell>
      );

      // Assert
      const cell = screen.getByTestId(testId);
      expect(cell).toBeInTheDocument();
      expect(cell).toHaveClass('p-4');
    });
  });

  describe('TableCaption', () => {
    it('should render table caption with children', () => {
      // Arrange
      const testId = 'test-caption';
      
      // Act
      render(
        <TableCaption data-testid={testId}>
          Caption Content
        </TableCaption>
      );

      // Assert
      const caption = screen.getByTestId(testId);
      expect(caption).toBeInTheDocument();
      expect(caption).toHaveClass('mt-4');
    });
  });
}); 