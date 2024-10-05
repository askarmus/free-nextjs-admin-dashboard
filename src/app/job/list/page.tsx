"use client"; // Add this directive at the top

import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, usePagination } from 'react-table';
import { TableInstance } from 'react-table'; // Ensure you import the correct type

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);

  // Fetch jobs from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/job');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  // Define table columns
  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title', // Access job title
      },
      {
        Header: 'Job Mode',
        accessor: 'jobMode', // Access job mode (Remote/Onsite)
      },
      {
        Header: 'Uploaded File',
        accessor: 'uploadedFileName', // Access uploaded file name
        Cell: ({ value }) => (
          <a
            href={`https://your-s3-bucket/${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View PDF
          </a>
        ),
      },
    ],
    []
  );

  // React-table hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: jobs,
      initialState: { pageIndex: 0, pageSize: 5 }, // Initial page size
    },
    usePagination
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>

      {/* Table */}
      <table {...getTableProps()} className="min-w-full bg-white">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="py-2 px-4 text-left text-sm font-medium text-gray-700"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-t">
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="py-2 px-4 text-sm text-gray-700"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center py-4">
        <div>
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
          >
            First
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
          >
            Next
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
          >
            Last
          </button>
        </div>

        <div className="text-sm text-gray-700">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </div>

        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
        >
          {[5, 10, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default JobListPage;
