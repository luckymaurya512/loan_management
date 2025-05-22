import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoan } from '../../contexts/LoanContext';
import { 
  SearchIcon, 
  FilterIcon,
  SortAscendingIcon,
  SortDescendingIcon
} from '@heroicons/react/outline';

const LoanApplications = () => {
  const { loans, loading } = useLoan();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle status filter change
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Handle type filter change
  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
  };

  // Handle sort change
  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort loans
  const filteredLoans = loans
    .filter(loan => {
      // Apply search filter
      if (searchTerm && !loan.type.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !loan.purpose.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Apply status filter
      if (statusFilter !== 'all' && loan.status !== statusFilter) {
        return false;
      }
      
      // Apply type filter
      if (typeFilter !== 'all' && loan.type !== typeFilter) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortField === 'amount') {
        return sortDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      } else if (sortField === 'createdAt') {
        return sortDirection === 'asc' 
          ? new Date(a.createdAt) - new Date(b.createdAt) 
          : new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortField === 'type') {
        return sortDirection === 'asc' 
          ? a.type.localeCompare(b.type) 
          : b.type.localeCompare(a.type);
      }
      return 0;
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Loan Applications</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage all your loan applications
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <div className="mt-1 flex rounded-md shadow-sm">
              <div className="relative flex items-stretch flex-grow focus-within:z-10">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                  placeholder="Search by loan type or purpose"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <button
                type="button"
                className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              >
                <FilterIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                <span>Filter</span>
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
            <div>
              <label htmlFor="status-filter" className="sr-only">
                Filter by Status
              </label>
              <select
                id="status-filter"
                name="status-filter"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                value={statusFilter}
                onChange={handleStatusFilterChange}
              >
                <option value="all">All Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="type-filter" className="sr-only">
                Filter by Type
              </label>
              <select
                id="type-filter"
                name="type-filter"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                value={typeFilter}
                onChange={handleTypeFilterChange}
              >
                <option value="all">All Types</option>
                <option value="Personal">Personal</option>
                <option value="Business">Business</option>
                <option value="Mortgage">Mortgage</option>
                <option value="Student">Student</option>
              </select>
            </div>
            
            <Link
              to="/new-loan-application"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              New Application
            </Link>
          </div>
        </div>
      </div>

      {/* Loans Table */}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortChange('type')}
                    >
                      <div className="flex items-center">
                        Loan Type
                        {sortField === 'type' && (
                          sortDirection === 'asc' 
                            ? <SortAscendingIcon className="ml-1 h-4 w-4" /> 
                            : <SortDescendingIcon className="ml-1 h-4 w-4" />
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortChange('amount')}
                    >
                      <div className="flex items-center">
                        Amount
                        {sortField === 'amount' && (
                          sortDirection === 'asc' 
                            ? <SortAscendingIcon className="ml-1 h-4 w-4" /> 
                            : <SortDescendingIcon className="ml-1 h-4 w-4" />
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Term
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortChange('createdAt')}
                    >
                      <div className="flex items-center">
                        Date
                        {sortField === 'createdAt' && (
                          sortDirection === 'asc' 
                            ? <SortAscendingIcon className="ml-1 h-4 w-4" /> 
                            : <SortDescendingIcon className="ml-1 h-4 w-4" />
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Purpose
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLoans.length > 0 ? (
                    filteredLoans.map((loan) => (
                      <tr key={loan.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {loan.type} Loan
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${loan.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {loan.term} months
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            loan.status === 'Approved' 
                              ? 'bg-green-100 text-green-800' 
                              : loan.status === 'Pending' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {loan.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {loan.createdAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {loan.purpose}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to={`/loan/${loan.id}`} className="text-primary-600 hover:text-primary-900">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                        No loan applications found. 
                        <Link to="/new-loan-application" className="ml-1 text-primary-600 hover:text-primary-500">
                          Apply for a loan
                        </Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanApplications;