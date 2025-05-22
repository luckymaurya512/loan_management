import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLoan } from '../../contexts/LoanContext';
import { 
  CashIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  DocumentAddIcon
} from '@heroicons/react/outline';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { loans, loading } = useLoan();

  // Calculate loan statistics
  const totalLoans = loans.length;
  const activeLoans = loans.filter(loan => loan.status === 'Approved').length;
  const pendingLoans = loans.filter(loan => loan.status === 'Pending').length;
  const totalAmount = loans.reduce((sum, loan) => sum + loan.amount, 0);
  
  // Calculate total paid amount
  const totalPaid = loans.reduce((sum, loan) => {
    return sum + loan.payments.reduce((paidSum, payment) => {
      return payment.status === 'Paid' ? paidSum + payment.amount : paidSum;
    }, 0);
  }, 0);

  // Doughnut chart data for loan types
  const loanTypeData = {
    labels: ['Personal', 'Business', 'Mortgage', 'Student'],
    datasets: [
      {
        data: [
          loans.filter(loan => loan.type === 'Personal').length,
          loans.filter(loan => loan.type === 'Business').length,
          loans.filter(loan => loan.type === 'Mortgage').length,
          loans.filter(loan => loan.type === 'Student').length,
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Line chart data for payment history (mock data)
  const paymentHistoryData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Payments Made',
        data: [1200, 1900, 1500, 2000, 1800, 2500],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
    ],
  };

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
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back, {currentUser.name}! Here's an overview of your loans.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Loans */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CashIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Loans
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{totalLoans}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/loan-applications" className="font-medium text-primary-600 hover:text-primary-500">
                View all
              </Link>
            </div>
          </div>
        </div>

        {/* Active Loans */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Loans
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{activeLoans}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/loan-applications" className="font-medium text-primary-600 hover:text-primary-500">
                View active
              </Link>
            </div>
          </div>
        </div>

        {/* Pending Loans */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Loans
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{pendingLoans}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/loan-applications" className="font-medium text-primary-600 hover:text-primary-500">
                View pending
              </Link>
            </div>
          </div>
        </div>

        {/* Total Amount */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ExclamationCircleIcon className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Amount
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">${totalAmount.toLocaleString()}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/payment-history" className="font-medium text-primary-600 hover:text-primary-500">
                Payment history
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Loan Types Chart */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Loan Types</h3>
            <div className="mt-2 h-64 flex items-center justify-center">
              {totalLoans > 0 ? (
                <Doughnut 
                  data={loanTypeData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }}
                />
              ) : (
                <p className="text-gray-500">No loan data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Payment History Chart */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Payment History</h3>
            <div className="mt-2 h-64">
              <Line 
                data={paymentHistoryData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: function(value) {
                          return '$' + value;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DocumentAddIcon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="ml-5">
                  <h4 className="text-lg font-medium text-gray-900">Apply for a New Loan</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Quick and easy application process
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  to="/new-loan-application"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CashIcon className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5">
                  <h4 className="text-lg font-medium text-gray-900">Make a Payment</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Pay your loan installments easily
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  to="/payment-history"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Make Payment
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClockIcon className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="ml-5">
                  <h4 className="text-lg font-medium text-gray-900">Check Loan Status</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    View the status of your applications
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  to="/loan-applications"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Check Status
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Loans */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Loans</h3>
          <Link to="/loan-applications" className="text-sm font-medium text-primary-600 hover:text-primary-500">
            View all
          </Link>
        </div>
        <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Loan Type
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Amount
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {loans.length > 0 ? (
                loans.slice(0, 5).map((loan) => (
                  <tr key={loan.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {loan.type} Loan
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      ${loan.amount.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        loan.status === 'Approved' 
                          ? 'bg-green-100 text-green-800' 
                          : loan.status === 'Pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {loan.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {loan.createdAt}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <Link to={`/loan/${loan.id}`} className="text-primary-600 hover:text-primary-900">
                        View<span className="sr-only">, {loan.id}</span>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-sm text-gray-500">
                    No loans found. <Link to="/new-loan-application" className="text-primary-600 hover:text-primary-500">Apply for a loan</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;