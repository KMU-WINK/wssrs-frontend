import React from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';

const ApplyTable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <TableContainer>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...rest } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...rest}>
                {headerGroup.headers.map((column) => {
                  const { key, ...rest } = column.getHeaderProps();
                  return (
                    <th key={key} {...rest}>
                      {column.render('Header')}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...rest } = row.getRowProps(); // key를 직접 전달
            return (
              <tr
                key={key} // key를 직접 전달
                {...rest}
                className={row.original.isConfirmed ? 'confirmed' : ''}
              >
                {row.cells.map((cell) => {
                  const { key, ...rest } = cell.getCellProps(); // key를 직접 전달
                  return (
                    <td key={key} {...rest}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableContainer>
  );
};

const TableContainer = styled.div`
  width: 100%;
  margin: 10px 0;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid var(--color-gray-100);
  }

  th {
    background-color: var(--color-gray-200);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-lr);
    border-right: 2px solid var(--color-gray-100);
  }

  td {
    font-size: var(--font-size-lm);
  }

  th:last-child {
    border-right: none;
  }

  .confirmed {
    background-color: var(--color-blue-confirm);
  }
`;

export default ApplyTable;
