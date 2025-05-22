import React, { useState } from 'react';
import { useLoan } from '../../contexts/LoanContext';
import { 
  CheckIcon, 
  XIcon, 
  EyeIcon, 
  DocumentDownloadIcon,
  SearchIcon,
  FilterIcon,
  SortAscendingIcon,
  SortDescendingIcon
} from '@heroicons/react/outline';
import { Dialog, Transition } from '@headlessui/react';

const AdminApprovals = () => {
  const { pendingApprovals, approveLoan, rejectLoan, loading } = useLoan();
  const [searchTerm, setSearchTerm] = useState('');
  const [loanTypeFilter, setLoanTypeFilter] = useState('all');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [processingLoanId, setProcessingLoanId] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle loan type filter change
  const handleLoanTypeFilterChange = (e) => {
    setLoanTypeFilter(e.target.value);
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

  // Open loan details modal
  const openLoanDetails = (loan) => {
    setSelectedLoan(loan);
    setIsDetailsModalOpen(true);
  };

  // Handle loan approval
  const handleApproveLoan = async (loanId) => {
    try {
      setError('');
      setSuccess('');
      setProcessingLoanId(loanId);
      
      await approveLoan(loanId);
      
      setSuccess('Loan approved successfully!');
      setIsDetailsModalOpen(false);
    } catch (error) {
      setError('Failed to approve loan. Please try again.');
    } finally {
      setProcessingLoanId(null);
    }
  };

  // Handle loan rejection
  const handleRejectLoan = async (loanId) => {
    try {
      setError('');
      setSuccess('');
      setProcessingLoanId(loanId);
      
      await rejectLoan(loanId);
      
      setSuccess('Loan rejected successfully!');
      setIsDetailsModalOpen(false);
    } catch (error) {
      setError('Failed to reject loan. Please try again.');
    } finally {
      setProcessingLoanId(null);
    }
  };

  // Filter and sort loans
  const filteredLoans = pendingApprovals
    .filter(loan => {
      // Apply search filter
      if (searchTerm && !loan.userName.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !loan.id.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Apply loan type filter
      if (loanTypeFilter !== 'all' && loan.type !== loanTypeFilter) {
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
      } else if (sortField === 'userName') {
        return sortDirection === 'asc' 
          ? a.userName.localeCompare(b.userName) 
          : b.userName.localeCompare(a.userName);
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
        <h1 className="text-2xl font-semibold text-gray-900">Loan Approvals</h1>
        <p className="mt-1 text-sm text-gray-500">
          Review and manage pending loan applications
        </p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        </div>
      )}

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
                  placeholder="Search by applicant name or ID"
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
          
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <div>
              <label htmlFor="loan-type-filter" className="sr-only">
                Filter by Loan Type
              </label>
              <select
                id="loan-type-filter"
                name="loan-type-filter"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                value={loanTypeFilter}
                onChange={handleLoanTypeFilterChange}
              >
                <option value="all">All Loan Types</option>
                <option value="Personal">Personal</option>
                <option value="Business">Business</option>
                <option value="Mortgage">Mortgage</option>
                <option value="Student">Student</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Approvals Table */}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Application ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortChange('userName')}
                    >
                      <div className="flex items-center">
                        Applicant
                        {sortField === 'userName' && (
                          sortDirection === 'asc' 
                            ? <SortAscendingIcon className="ml-1 h-4 w-4" /> 
                            : <SortDescendingIcon className="ml-1 h-4 w-4" />
                        )}
                      </div>
                    </th>
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
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLoans.length > 0 ? (
                    filteredLoans.map((loan) => (
                      <tr key={loan.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {loan.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {loan.userName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {loan.type} Loan
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${loan.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {loan.createdAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-3">
                            <button
                              type="button"
                              onClick={() => openLoanDetails(loan)}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              <EyeIcon className="h-5 w-5" />
                              <span className="sr-only">View details</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleApproveLoan(loan.id)}
                              disabled={processingLoanId === loan.id}
                              className="text-green-600 hover:text-green-900 disabled:opacity-50"
                            >
                              {processingLoanId === loan.id ? (
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              ) : (
                                <CheckIcon className="h-5 w-5" />
                              )}
                              <span className="sr-only">Approve</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRejectLoan(loan.id)}
                              disabled={processingLoanId === loan.id}
                              className="text-red-600 hover:text-red-900 disabled:opacity-50"
                            >
                              {processingLoanId === loan.id ? (
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              ) : (
                                <XIcon className="h-5 w-5" />
                              )}
                              <span className="sr-only">Reject</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                        No pending loan applications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Details Modal */}
      <Transition show={isDetailsModalOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsDetailsModalOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                {selectedLoan && (
                  <>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                    >
                      <span>Loan Application Details</span>
                      <span className="text-sm font-normal text-gray-500">ID: {selectedLoan.id}</span>
                    </Dialog.Title>
                    
                    <div className="mt-4">
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-lg">
                        <dt className="text-sm font-medium text-gray-500">Applicant Name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedLoan.userName}</dd>
                      </div>
                      
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Loan Type</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedLoan.type} Loan</dd>
                      </div>
                      
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-lg">
                        <dt className="text-sm font-medium text-gray-500">Loan Amount</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${selectedLoan.amount.toLocaleString()}</dd>
                      </div>
                      
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Term</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedLoan.term} months</dd>
                      </div>
                      
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-lg">
                        <dt className="text-sm font-medium text-gray-500">Interest Rate</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedLoan.interestRate}%</dd>
                      </div>
                      
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Purpose</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedLoan.purpose}</dd>
                      </div>
                      
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-lg">
                        <dt className="text-sm font-medium text-gray-500">Credit Score</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedLoan.creditScore}</dd>
                      </div>
                      
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Annual Income</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${selectedLoan.income.toLocaleString()}</dd>
                      </div>
                      
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-lg">
                        <dt className="text-sm font-medium text-gray-500">Application Date</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedLoan.createdAt}</dd>
                      </div>
                      
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Documents</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                            {selectedLoan.documents.map((document, index) => (
                              <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                <div className="w-0 flex-1 flex items-center">
                                  <DocumentDownloadIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                  <span className="ml-2 flex-1 w-0 truncate">{document}</span>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                                    View
                                  </a>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        onClick={() => setIsDetailsModalOpen(false)}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRejectLoan(selectedLoan.id)}
                        disabled={processingLoanId === selectedLoan.id}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                      >
                        {processingLoanId === selectedLoan.id ? (
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <XIcon className="-ml-1 mr-2 h-4 w-4" />
                        )}
                        Reject Loan
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApproveLoan(selectedLoan.id)}
                        disabled={processingLoanId === selectedLoan.id}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                      >
                        {processingLoanId === selectedLoan.id ? (
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <CheckIcon className="-ml-1 mr-2 h-4 w-4" />
                        )}
                        Approve Loan
                      </button>
                    </div>
                  </>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AdminApprovals;