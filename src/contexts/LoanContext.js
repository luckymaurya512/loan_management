import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import * as loanService from '../services/loanService';

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

  // Load loans when user changes
  useEffect(() => {
    if (currentUser) {
      // Simulate API call to get user's loans
      setTimeout(() => {
        // Add mock data for first-time users
        if (localStorage.getItem('firstTimeLoad') !== 'false') {
          loanService.addMockData();
          localStorage.setItem('firstTimeLoad', 'false');
        }
        
        // Get user's loans
        const userLoans = loanService.getUserLoans(currentUser.id);
        setLoans(userLoans);
        
        // If user is admin, get pending approvals
        if (currentUser.role === 'admin') {
          const approvals = loanService.getPendingApprovals();
          setPendingApprovals(approvals);
          console.log("Admin loaded pending approvals:", approvals);
        }
        
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
        try {
          // Use the loan service to apply for a loan
          const newLoan = loanService.applyForLoan(loanData, currentUser);
          
          // Update local state
          setLoans([...loans, newLoan]);
          
          // If user is admin, update pending approvals too
          if (currentUser.role === 'admin') {
            const approvals = loanService.getPendingApprovals();
            setPendingApprovals(approvals);
          }
          
          console.log("Applied for new loan:", newLoan);
          resolve(newLoan);
        } catch (error) {
          console.error("Error applying for loan:", error);
          throw error;
        }
      }, 1000);
    });
  };

  // Approve a loan (admin only)
  const approveLoan = async (loanId) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Use the loan service to approve the loan
          const approvedLoan = loanService.approveLoan(loanId, currentUser);
          
          // Update local state
          const newPendingApprovals = pendingApprovals.filter(loan => loan.id !== loanId);
          setPendingApprovals(newPendingApprovals);
          
          console.log("Approved loan:", approvedLoan);
          resolve(approvedLoan);
        } catch (error) {
          console.error("Error approving loan:", error);
          reject(error);
        }
      }, 1000);
    });
  };

  // Reject a loan (admin only)
  const rejectLoan = async (loanId) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Use the loan service to reject the loan
          const rejectedLoan = loanService.rejectLoan(loanId, currentUser);
          
          // Update local state
          const newPendingApprovals = pendingApprovals.filter(loan => loan.id !== loanId);
          setPendingApprovals(newPendingApprovals);
          
          console.log("Rejected loan:", rejectedLoan);
          resolve(rejectedLoan);
        } catch (error) {
          console.error("Error rejecting loan:", error);
          reject(error);
        }
      }, 1000);
    });
  };

  // Make a payment
  const makePayment = async (loanId, paymentAmount) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Use the loan service to make a payment
          const payment = loanService.makePayment(loanId, paymentAmount, currentUser.id);
          
          // Update local state
          const updatedLoans = loanService.getUserLoans(currentUser.id);
          setLoans(updatedLoans);
          
          console.log("Made payment:", payment);
          resolve(payment);
        } catch (error) {
          console.error("Error making payment:", error);
          reject(error);
        }
      }, 1000);
    });
  };

  // Get a single loan by ID
  const getLoanById = (loanId) => {
    return loanService.getLoanById(loanId, currentUser?.id);
  };

  // Refresh pending approvals (for admins)
  const refreshPendingApprovals = () => {
    if (currentUser?.role === 'admin') {
      const approvals = loanService.getPendingApprovals();
      setPendingApprovals(approvals);
      return approvals;
    }
    return [];
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
    getLoanById,
    refreshPendingApprovals
  };

  return (
    <LoanContext.Provider value={value}>
      {children}
    </LoanContext.Provider>
  );
}