import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Create the Loan Context
const LoanContext = createContext();

// Custom hook to use the Loan Context
export function useLoan() {
  return useContext(LoanContext);
}

// Loan Provider Component
export function LoanProvider({ children }) {
  const { currentUser } = useAuth();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingApprovals, setPendingApprovals] = useState([]);

  // Mock loan data
  const mockLoans = [
    {
      id: '1',
      userId: '123',
      type: 'Personal',
      amount: 10000,
      term: 12,
      interestRate: 5.5,
      status: 'Approved',
      createdAt: '2023-01-15',
      approvedAt: '2023-01-20',
      purpose: 'Home Renovation',
      payments: [
        { id: 'p1', amount: 879.16, date: '2023-02-20', status: 'Paid' },
        { id: 'p2', amount: 879.16, date: '2023-03-20', status: 'Paid' },
        { id: 'p3', amount: 879.16, date: '2023-04-20', status: 'Upcoming' }
      ]
    },
    {
      id: '2',
      userId: '123',
      type: 'Business',
      amount: 25000,
      term: 36,
      interestRate: 7.2,
      status: 'Pending',
      createdAt: '2023-05-10',
      purpose: 'Inventory Purchase',
      payments: []
    }
  ];

  const mockPendingApprovals = [
    {
      id: '3',
      userId: '456',
      userName: 'Jane Smith',
      type: 'Mortgage',
      amount: 250000,
      term: 360,
      interestRate: 4.5,
      status: 'Pending',
      createdAt: '2023-05-05',
      purpose: 'Home Purchase',
      creditScore: 720,
      income: 85000,
      documents: ['proof_of_income.pdf', 'bank_statements.pdf']
    },
    {
      id: '4',
      userId: '789',
      userName: 'Bob Johnson',
      type: 'Student',
      amount: 15000,
      term: 60,
      interestRate: 3.8,
      status: 'Pending',
      createdAt: '2023-05-08',
      purpose: 'Tuition',
      creditScore: 680,
      income: 35000,
      documents: ['enrollment_verification.pdf', 'financial_aid_letter.pdf']
    }
  ];

  // Load loans when user changes
  useEffect(() => {
    if (currentUser) {
      // Simulate API call to get user's loans
      setTimeout(() => {
        setLoans(mockLoans);
        setPendingApprovals(mockPendingApprovals);
        setLoading(false);
      }, 1000);
    } else {
      setLoans([]);
      setPendingApprovals([]);
      setLoading(false);
    }
  }, [currentUser]);

  // Apply for a new loan
  const applyForLoan = async (loanData) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newLoan = {
          id: Date.now().toString(),
          userId: currentUser.id,
          status: 'Pending',
          createdAt: new Date().toISOString().split('T')[0],
          payments: [],
          ...loanData
        };
        
        setLoans([...loans, newLoan]);
        resolve(newLoan);
      }, 1000);
    });
  };

  // Approve a loan (admin only)
  const approveLoan = async (loanId) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Find the loan in pending approvals
        const loanIndex = pendingApprovals.findIndex(loan => loan.id === loanId);
        if (loanIndex !== -1) {
          const approvedLoan = {
            ...pendingApprovals[loanIndex],
            status: 'Approved',
            approvedAt: new Date().toISOString().split('T')[0]
          };
          
          // Remove from pending approvals
          const newPendingApprovals = [...pendingApprovals];
          newPendingApprovals.splice(loanIndex, 1);
          setPendingApprovals(newPendingApprovals);
          
          resolve(approvedLoan);
        }
      }, 1000);
    });
  };

  // Reject a loan (admin only)
  const rejectLoan = async (loanId) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Find the loan in pending approvals
        const loanIndex = pendingApprovals.findIndex(loan => loan.id === loanId);
        if (loanIndex !== -1) {
          const rejectedLoan = {
            ...pendingApprovals[loanIndex],
            status: 'Rejected',
            rejectedAt: new Date().toISOString().split('T')[0]
          };
          
          // Remove from pending approvals
          const newPendingApprovals = [...pendingApprovals];
          newPendingApprovals.splice(loanIndex, 1);
          setPendingApprovals(newPendingApprovals);
          
          resolve(rejectedLoan);
        }
      }, 1000);
    });
  };

  // Make a payment
  const makePayment = async (loanId, paymentAmount) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Find the loan
        const loanIndex = loans.findIndex(loan => loan.id === loanId);
        if (loanIndex !== -1) {
          const updatedLoan = { ...loans[loanIndex] };
          
          // Add payment
          const newPayment = {
            id: `p${Date.now()}`,
            amount: paymentAmount,
            date: new Date().toISOString().split('T')[0],
            status: 'Paid'
          };
          
          updatedLoan.payments = [...updatedLoan.payments, newPayment];
          
          // Update loans array
          const newLoans = [...loans];
          newLoans[loanIndex] = updatedLoan;
          setLoans(newLoans);
          
          resolve(newPayment);
        }
      }, 1000);
    });
  };

  // Get a single loan by ID
  const getLoanById = (loanId) => {
    return loans.find(loan => loan.id === loanId);
  };

  // Context value
  const value = {
    loans,
    loading,
    pendingApprovals,
    applyForLoan,
    approveLoan,
    rejectLoan,
    makePayment,
    getLoanById
  };

  return (
    <LoanContext.Provider value={value}>
      {children}
    </LoanContext.Provider>
  );
}