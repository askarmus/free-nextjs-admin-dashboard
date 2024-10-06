"use client"; // Add this directive at the top

import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, usePagination } from 'react-table';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';  
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import JobForm from './JobForm';

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  // Handle the drawer toggle
  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  // Handle form submission (creating or editing job)
  const handleFormSubmit = async (data: { title: string; jobMode: string; file: File | null }) => {
    // Create a plain object (without FormData)
    const payload = {
      title: data.title,
      jobMode: data.jobMode,
      // Remove the file property if not needed in the JSON
    };
  
    try {
      // Send the request as JSON
      await axios.post('/api/job/create', payload, {
        headers: {
          'Content-Type': 'application/json', // Ensure the content type is JSON
        },
      });
      alert('Job created successfully!');
      setIsDrawerOpen(false);
      
      // Re-fetch jobs to update the list
      const response = await axios.get('/api/job');
      setJobs(response.data);
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };
  
  return (
    <DefaultLayout> 
      <Breadcrumb pageName="Job Listings" />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        
        {/* Add New Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleDrawer}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add New
          </button>
        </div>

        {/* Table */}
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200">
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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

      {/* Drawer for Adding New Job */}
      <Drawer open={isDrawerOpen} onClose={toggleDrawer} direction="right">
        <div className="p-4 w-400">
          <h2 className="text-lg font-bold mb-4">Create New Job</h2>
          <JobForm onSubmit={handleFormSubmit} />
        </div>
      </Drawer>

    </DefaultLayout>
  );
};

export default JobListPage;
