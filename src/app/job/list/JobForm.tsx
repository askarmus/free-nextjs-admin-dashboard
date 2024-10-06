import React, { useState } from 'react';

interface JobFormProps {
  onSubmit: (data: { title: string; jobMode: string }) => void;
}

const JobForm: React.FC<JobFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [jobMode, setJobMode] = useState('Remote');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      title,
      jobMode,
    };
    onSubmit(formData);
  };

  return (
    <div>
      <h3 className="font-medium text-black dark:text-white">Job Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Job Title
            </label>
            <input
              type="text"
              placeholder="Enter job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Job Mode
            </label>
            <select
              value={jobMode}
              onChange={(e) => setJobMode(e.target.value)}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option value="Remote">Remote</option>
              <option value="Onsite">Onsite</option>
            </select>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
