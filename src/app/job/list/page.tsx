"use client"; // Add this directive at the top

import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';  
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import JobForm from './JobForm';

// Define the Job interface for typing the jobs data
interface Job {
  id: number;
  title: string;
  jobMode: string;
  uploadedFileName: string;
}

const JobListPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // Set the state with Job type
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
        accessor: 'title' as const, // Access job title
      },
      {
        Header: 'Job Mode',
        accessor: 'jobMode' as const, // Access job mode (Remote/Onsite)
      },
      {
        Header: 'Uploaded File',
        accessor: 'uploadedFileName' as const, // Access uploaded file name
        Cell: ({ value }: { value: string }) => ( // Type 'value' as string
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
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: jobs,
    }
  );

  // Handle the drawer toggle
  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  // Handle form submission (creating or editing job)
  const handleFormSubmit = async (data: { title: string; jobMode: string }) => {
    const payload = {
      title: data.title,
      jobMode: data.jobMode,
    };

    try {
      await axios.post('/api/job/create', payload, {
        headers: {
          'Content-Type': 'application/json',
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
            {headerGroups.map((headerGroup, headerIndex) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerIndex} className="bg-gray-200">
                {headerGroup.headers.map((column, colIndex) => (
                  <th
                    {...column.getHeaderProps()}
                    key={colIndex} // Add key for each column header
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={rowIndex} className="border-t">
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      {...cell.getCellProps()}
                      key={cellIndex} // Add key for each cell
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
      </div>

      {/* Drawer for Adding New Job */}
      <Drawer open={isDrawerOpen} onClose={toggleDrawer} direction="right" size={400}>
         
          <h2 className="text-lg font-bold mb-4">Create New Job</h2>
          <JobForm onSubmit={handleFormSubmit} />
        
      </Drawer>

    </DefaultLayout>
  );
};

export default JobListPage;
