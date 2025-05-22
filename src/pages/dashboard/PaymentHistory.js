import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoan } from '../../contexts/LoanContext';
import { 
  SearchIcon, 
  FilterIcon,
  DownloadIcon,
  CalendarIcon,
  SortAscendingIcon,
  SortDescendingIcon
} from '@heroicons/react/outline';

const PaymentHistory = () => {
  const { loans, loading } = useLoan();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  // Extract all payments from all loans
  const allPayments = loans.reduce((payments, loan) => {
    const loanPayments = loan.payments.map(payment => ({
      ...payment,
      loanId: loan.id,
      loanType: loan.type
    }));
    return [...payments, ...loanPayments];
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle date filter change
  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
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

  // Filter payments by date
  const getFilteredPayments = () => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
    const ninetyDaysAgo = new Date(now.setDate(now.getDate() - 60)); // 30 + 60 = 90 days ago
    
    return allPayments.filter(payment => {
      // Apply search filter
      if (searchTerm && !payment.id.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !payment.loanType.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Apply date filter
      if (dateFilter !== 'all') {
        const paymentDate = new Date(payment.date);
        
        if (dateFilter === 'last30days' && paymentDate < thirtyDaysAgo) {
          return false;
        }
        
        if (dateFilter === 'last90days' && paymentDate < ninetyDaysAgo) {
          return false;
        }
      }
      
      return true;
    }).sort((a, b) => {
      // Apply sorting
      if (sortField === 'amount') {
        return sortDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      } else if (sortField === 'date') {
        return sortDirection === 'asc' 
          ? new Date(a.date) - new Date(b.date) 
          : new Date(b.date) - new Date(a.date);
      } else if (sortField === 'loanType') {
        return sortDirection === 'asc' 
          ? a.loanType.localeCompare(b.loanType) 
          : b.loanType.localeCompare(a.loanType);
      }
      return 0;
    });
  };

  const filteredPayments = getFilteredPayments();

  // Calculate total paid amount
  const totalPaid = filteredPayments.reduce((sum, payment) => {
    return payment.status === 'Paid' ? sum + payment.amount : sum;
  }, 0);

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
        <h1 className="text-2xl font-semibold text-gray-900">Payment History</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and track all your loan payments
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
              <CalendarIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Payments</h3>
              <p className="text-lg font-semibold text-gray-900">{filteredPayments.length}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
              <DownloadIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Amount Paid</h3>
              <p className="text-lg font-semibold text-gray-900">${totalPaid.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
              <FilterIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Active Loans</h3>
              <p className="text-lg font-semibold text-gray-900">{loans.filter(loan => loan.status === 'Approved').length}</p>
            </div>
          </div>
        </div>
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
                  placeholder="Search by payment ID or loan type"
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
              <label htmlFor="date-filter" className="sr-only">
                Filter by Date
              </label>
              <select
                id="date-filter"
                name="date-filter"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                value={dateFilter}
                onChange={handleDateFilterChange}
              >
                <option value="all">All Time</option>
                <option value="last30days">Last 30 Days</option>
                <option value="last90days">Last 90 Days</option>
              </select>
            </div>
            
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <DownloadIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Payments Table */}
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
                      Payment ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortChange('loanType')}
                    >
                      <div className="flex items-center">
                        Loan Type
                        {sortField === 'loanType' && (
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
                      onClick={() => handleSortChange('date')}
                    >
                      <div className="flex items-center">
                        Date
                        {sortField === 'date' && (
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
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {payment.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.loanType} Loan
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${payment.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            payment.status === 'Paid' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to={`/loan/${payment.loanId}`} className="text-primary-600 hover:text-primary-900">
                            View Loan
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                        No payment records found.
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

export default PaymentHistory;