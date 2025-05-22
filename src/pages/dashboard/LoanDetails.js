import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLoan } from '../../contexts/LoanContext';
import { 
  CashIcon, 
  ClockIcon, 
  DocumentTextIcon, 
  CalendarIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon
} from '@heroicons/react/outline';
import { Dialog, Transition } from '@headlessui/react';

const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getLoanById, makePayment } = useLoan();
  const loan = getLoanById(id);
  
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Calculate loan details
  const calculateLoanDetails = () => {
    if (!loan) return null;
    
    const monthlyRate = loan.interestRate / 100 / 12;
    const monthlyPayment = loan.amount * monthlyRate * Math.pow(1 + monthlyRate, loan.term) / (Math.pow(1 + monthlyRate, loan.term) - 1);
    const totalPayment = monthlyPayment * loan.term;
    const totalInterest = totalPayment - loan.amount;
    
    const paidPayments = loan.payments.filter(payment => payment.status === 'Paid');
    const totalPaid = paidPayments.reduce((sum, payment) => sum + payment.amount, 0);
    const remainingBalance = loan.amount + totalInterest - totalPaid;
    
    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPaid: totalPaid.toFixed(2),
      remainingBalance: remainingBalance.toFixed(2),
      paidCount: paidPayments.length,
      remainingCount: loan.term - paidPayments.length
    };
  };

  // Handle payment submission
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    if (!paymentAmount || isNaN(paymentAmount) || Number(paymentAmount) <= 0) {
      setError('Please enter a valid payment amount');
      return;
    }
    
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      
      await makePayment(id, Number(paymentAmount));
      
      setSuccess('Payment processed successfully!');
      setPaymentAmount('');
      setIsPaymentModalOpen(false);
    } catch (error) {
      setError('Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // If loan not found
  if (!loan) {
    return (
      <div className="text-center py-12">
        <ExclamationCircleIcon className="mx-auto h-12 w-12 text-red-500" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">Loan not found</h3>
        <p className="mt-1 text-sm text-gray-500">The loan you're looking for doesn't exist or you don't have access to it.</p>
        <div className="mt-6">
          <Link to="/loan-applications" className="text-primary-600 hover:text-primary-500">
            Back to Loans
          </Link>
        </div>
      </div>
    );
  }

  const loanDetails = calculateLoanDetails();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Loan Details</h1>
          <p className="mt-1 text-sm text-gray-500">
            View detailed information about your {loan.type.toLowerCase()} loan
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => navigate('/loan-applications')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Back to Loans
          </button>
        </div>
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

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {loan.type} Loan
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Application ID: {loan.id}
            </p>
          </div>
          <div>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              loan.status === 'Approved' 
                ? 'bg-green-100 text-green-800' 
                : loan.status === 'Pending' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-red-100 text-red-800'
            }`}>
              {loan.status}
            </span>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Loan Amount</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${loan.amount.toLocaleString()}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Interest Rate</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{loan.interestRate}%</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Term</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{loan.term} months</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Monthly Payment</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${loanDetails.monthlyPayment}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Total Payment</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${loanDetails.totalPayment}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Total Interest</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${loanDetails.totalInterest}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Application Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{loan.createdAt}</dd>
            </div>
            {loan.approvedAt && (
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Approval Date</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{loan.approvedAt}</dd>
              </div>
            )}
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Purpose</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{loan.purpose}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Loan Progress */}
      {loan.status === 'Approved' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Loan Progress
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Track your loan repayment progress
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Repayment Progress</h4>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-primary-600 h-2.5 rounded-full" 
                  style={{ width: `${(loanDetails.paidCount / loan.term) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{loanDetails.paidCount} of {loan.term} payments made</span>
                <span>{Math.round((loanDetails.paidCount / loan.term) * 100)}% complete</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <CashIcon className="h-8 w-8 text-primary-600" />
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500">Total Paid</h4>
                    <p className="text-lg font-semibold text-gray-900">${loanDetails.totalPaid}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <CurrencyDollarIcon className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500">Remaining Balance</h4>
                    <p className="text-lg font-semibold text-gray-900">${loanDetails.remainingBalance}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <CheckCircleIcon className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500">Payments Made</h4>
                    <p className="text-lg font-semibold text-gray-900">{loanDetails.paidCount}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <ClockIcon className="h-8 w-8 text-red-500" />
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500">Remaining Payments</h4>
                    <p className="text-lg font-semibold text-gray-900">{loanDetails.remainingCount}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setIsPaymentModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <CurrencyDollarIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Make a Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment History */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Payment History
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Record of all payments for this loan
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200">
          {loan.payments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loan.payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.id}
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-4 text-center text-sm text-gray-500">
              No payment records found for this loan.
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      <Transition show={isPaymentModalOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsPaymentModalOpen(false)}
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Make a Payment
                </Dialog.Title>
                
                <form onSubmit={handlePaymentSubmit}>
                  <div className="mt-4">
                    <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700">
                      Payment Amount
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        id="paymentAmount"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Suggested payment: ${loanDetails.monthlyPayment}
                    </p>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      onClick={() => setIsPaymentModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      disabled={loading}
                    >
                      {loading ? (
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : null}
                      Process Payment
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default LoanDetails;