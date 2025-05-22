// Simulated backend service for loan management
// This service uses localStorage to persist data across sessions

// Keys for localStorage
const KEYS = {
  PENDING_APPROVALS: 'loanSystem_pendingApprovals',
  USER_LOANS: 'loanSystem_userLoans',
  APPROVED_LOANS: 'loanSystem_approvedLoans',
  REJECTED_LOANS: 'loanSystem_rejectedLoans',
  AUDIT_LOG: 'loanSystem_auditLog'
};

// Initialize data if not exists
const initializeData = () => {
  if (!localStorage.getItem(KEYS.PENDING_APPROVALS)) {
    localStorage.setItem(KEYS.PENDING_APPROVALS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.USER_LOANS)) {
    localStorage.setItem(KEYS.USER_LOANS, JSON.stringify({}));
  }
  if (!localStorage.getItem(KEYS.APPROVED_LOANS)) {
    localStorage.setItem(KEYS.APPROVED_LOANS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.REJECTED_LOANS)) {
    localStorage.setItem(KEYS.REJECTED_LOANS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.AUDIT_LOG)) {
    localStorage.setItem(KEYS.AUDIT_LOG, JSON.stringify([]));
  }
};

// Initialize on import
initializeData();

// Add audit log entry
const addAuditLog = (action, details) => {
  const logs = JSON.parse(localStorage.getItem(KEYS.AUDIT_LOG));
  const logEntry = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    action,
    details
  };
  logs.push(logEntry);
  localStorage.setItem(KEYS.AUDIT_LOG, JSON.stringify(logs));
  console.log(`AUDIT: ${action}`, details);
  return logEntry;
};

// Get all pending loan approvals
export const getPendingApprovals = () => {
  return JSON.parse(localStorage.getItem(KEYS.PENDING_APPROVALS)) || [];
};

// Get user's loans
export const getUserLoans = (userId) => {
  const userLoans = JSON.parse(localStorage.getItem(KEYS.USER_LOANS));
  return userLoans[userId] || [];
};

// Apply for a new loan
export const applyForLoan = (loanData, user) => {
  // Create new loan object with default values for all required fields
  const newLoan = {
    id: Date.now().toString(),
    userId: user.id,
    userName: user.name,
    status: 'Pending',
    createdAt: new Date().toISOString().split('T')[0],
    payments: [],
    amount: 0,
    term: 0,
    interestRate: 0,
    purpose: '',
    creditScore: 0,
    income: 0,
    documents: [],
    ...loanData
  };

  // Add to user's loans
  const userLoans = JSON.parse(localStorage.getItem(KEYS.USER_LOANS));
  if (!userLoans[user.id]) {
    userLoans[user.id] = [];
  }
  userLoans[user.id].push(newLoan);
  localStorage.setItem(KEYS.USER_LOANS, JSON.stringify(userLoans));

  // Add to pending approvals
  const pendingApprovals = JSON.parse(localStorage.getItem(KEYS.PENDING_APPROVALS));
  pendingApprovals.push(newLoan);
  localStorage.setItem(KEYS.PENDING_APPROVALS, JSON.stringify(pendingApprovals));

  // Add audit log
  if (user.role === 'admin') {
    addAuditLog('Admin Loan Application', {
      loanId: newLoan.id,
      adminId: user.id,
      adminName: user.name,
      loanType: newLoan.type,
      amount: newLoan.amount
    });
  } else {
    addAuditLog('User Loan Application', {
      loanId: newLoan.id,
      userId: user.id,
      userName: user.name,
      loanType: newLoan.type,
      amount: newLoan.amount
    });
  }

  return newLoan;
};

// Approve a loan
export const approveLoan = (loanId, admin) => {
  // Find the loan in pending approvals
  const pendingApprovals = JSON.parse(localStorage.getItem(KEYS.PENDING_APPROVALS));
  const loanIndex = pendingApprovals.findIndex(loan => loan.id === loanId);
  
  if (loanIndex === -1) {
    throw new Error("Loan not found");
  }
  
  const loanToApprove = pendingApprovals[loanIndex];
  
  // Check if admin is trying to approve their own loan
  if (loanToApprove.userId === admin.id) {
    throw new Error("You cannot approve your own loan application");
  }
  
  // Update loan status
  const approvedLoan = {
    ...loanToApprove,
    status: 'Approved',
    approvedAt: new Date().toISOString().split('T')[0],
    approvedBy: admin.id,
    approverName: admin.name
  };
  
  // Remove from pending approvals
  pendingApprovals.splice(loanIndex, 1);
  localStorage.setItem(KEYS.PENDING_APPROVALS, JSON.stringify(pendingApprovals));
  
  // Add to approved loans
  const approvedLoans = JSON.parse(localStorage.getItem(KEYS.APPROVED_LOANS));
  approvedLoans.push(approvedLoan);
  localStorage.setItem(KEYS.APPROVED_LOANS, JSON.stringify(approvedLoans));
  
  // Update user's loan
  const userLoans = JSON.parse(localStorage.getItem(KEYS.USER_LOANS));
  if (userLoans[loanToApprove.userId]) {
    const userLoanIndex = userLoans[loanToApprove.userId].findIndex(loan => loan.id === loanId);
    if (userLoanIndex !== -1) {
      userLoans[loanToApprove.userId][userLoanIndex] = approvedLoan;
      localStorage.setItem(KEYS.USER_LOANS, JSON.stringify(userLoans));
    }
  }
  
  // Add audit log
  addAuditLog('Loan Approval', {
    loanId,
    adminId: admin.id,
    adminName: admin.name,
    userId: loanToApprove.userId,
    userName: loanToApprove.userName,
    loanType: loanToApprove.type,
    amount: loanToApprove.amount
  });
  
  return approvedLoan;
};

// Reject a loan
export const rejectLoan = (loanId, admin) => {
  // Find the loan in pending approvals
  const pendingApprovals = JSON.parse(localStorage.getItem(KEYS.PENDING_APPROVALS));
  const loanIndex = pendingApprovals.findIndex(loan => loan.id === loanId);
  
  if (loanIndex === -1) {
    throw new Error("Loan not found");
  }
  
  const loanToReject = pendingApprovals[loanIndex];
  
  // Check if admin is trying to reject their own loan
  if (loanToReject.userId === admin.id) {
    throw new Error("You cannot reject your own loan application");
  }
  
  // Update loan status
  const rejectedLoan = {
    ...loanToReject,
    status: 'Rejected',
    rejectedAt: new Date().toISOString().split('T')[0],
    rejectedBy: admin.id,
    rejectorName: admin.name
  };
  
  // Remove from pending approvals
  pendingApprovals.splice(loanIndex, 1);
  localStorage.setItem(KEYS.PENDING_APPROVALS, JSON.stringify(pendingApprovals));
  
  // Add to rejected loans
  const rejectedLoans = JSON.parse(localStorage.getItem(KEYS.REJECTED_LOANS));
  rejectedLoans.push(rejectedLoan);
  localStorage.setItem(KEYS.REJECTED_LOANS, JSON.stringify(rejectedLoans));
  
  // Update user's loan
  const userLoans = JSON.parse(localStorage.getItem(KEYS.USER_LOANS));
  if (userLoans[loanToReject.userId]) {
    const userLoanIndex = userLoans[loanToReject.userId].findIndex(loan => loan.id === loanId);
    if (userLoanIndex !== -1) {
      userLoans[loanToReject.userId][userLoanIndex] = rejectedLoan;
      localStorage.setItem(KEYS.USER_LOANS, JSON.stringify(userLoans));
    }
  }
  
  // Add audit log
  addAuditLog('Loan Rejection', {
    loanId,
    adminId: admin.id,
    adminName: admin.name,
    userId: loanToReject.userId,
    userName: loanToReject.userName,
    loanType: loanToReject.type,
    amount: loanToReject.amount
  });
  
  return rejectedLoan;
};

// Make a payment
export const makePayment = (loanId, paymentAmount, userId) => {
  // Find the loan in user's loans
  const userLoans = JSON.parse(localStorage.getItem(KEYS.USER_LOANS));
  if (!userLoans[userId]) {
    throw new Error("User has no loans");
  }
  
  const loanIndex = userLoans[userId].findIndex(loan => loan.id === loanId);
  if (loanIndex === -1) {
    throw new Error("Loan not found");
  }
  
  const loan = userLoans[userId][loanIndex];
  
  // Create payment
  const newPayment = {
    id: `p${Date.now()}`,
    amount: paymentAmount,
    date: new Date().toISOString().split('T')[0],
    status: 'Paid'
  };
  
  // Add payment to loan
  loan.payments = [...(loan.payments || []), newPayment];
  userLoans[userId][loanIndex] = loan;
  localStorage.setItem(KEYS.USER_LOANS, JSON.stringify(userLoans));
  
  // Update in approved loans if exists
  const approvedLoans = JSON.parse(localStorage.getItem(KEYS.APPROVED_LOANS));
  const approvedLoanIndex = approvedLoans.findIndex(l => l.id === loanId);
  if (approvedLoanIndex !== -1) {
    approvedLoans[approvedLoanIndex] = loan;
    localStorage.setItem(KEYS.APPROVED_LOANS, JSON.stringify(approvedLoans));
  }
  
  // Add audit log
  addAuditLog('Loan Payment', {
    loanId,
    userId,
    paymentId: newPayment.id,
    amount: paymentAmount,
    date: newPayment.date
  });
  
  return newPayment;
};

// Get loan by ID
export const getLoanById = (loanId, userId) => {
  const userLoans = JSON.parse(localStorage.getItem(KEYS.USER_LOANS));
  if (!userLoans[userId]) {
    return null;
  }
  
  return userLoans[userId].find(loan => loan.id === loanId) || null;
};

// Get audit logs
export const getAuditLogs = () => {
  return JSON.parse(localStorage.getItem(KEYS.AUDIT_LOG)) || [];
};

// Clear all data (for testing)
export const clearAllData = () => {
  localStorage.removeItem(KEYS.PENDING_APPROVALS);
  localStorage.removeItem(KEYS.USER_LOANS);
  localStorage.removeItem(KEYS.APPROVED_LOANS);
  localStorage.removeItem(KEYS.REJECTED_LOANS);
  localStorage.removeItem(KEYS.AUDIT_LOG);
  initializeData();
};

// Add mock data (for testing)
export const addMockData = () => {
  // Add mock pending approvals
  const pendingApprovals = [
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
  
  localStorage.setItem(KEYS.PENDING_APPROVALS, JSON.stringify(pendingApprovals));
  
  // Add mock user loans
  const userLoans = {
    '123': [
      {
        id: '1',
        userId: '123',
        userName: 'Regular User',
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
        userName: 'Regular User',
        type: 'Business',
        amount: 25000,
        term: 36,
        interestRate: 7.2,
        status: 'Pending',
        createdAt: '2023-05-10',
        purpose: 'Inventory Purchase',
        payments: []
      }
    ]
  };
  
  localStorage.setItem(KEYS.USER_LOANS, JSON.stringify(userLoans));
  
  // Add mock approved loans
  const approvedLoans = [
    {
      id: '1',
      userId: '123',
      userName: 'Regular User',
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
    }
  ];
  
  localStorage.setItem(KEYS.APPROVED_LOANS, JSON.stringify(approvedLoans));
};