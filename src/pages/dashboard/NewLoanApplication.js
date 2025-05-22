import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoan } from '../../contexts/LoanContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const NewLoanApplication = () => {
  const { applyForLoan } = useLoan();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Loan types with their details
  const loanTypes = [
    { 
      id: 'Personal', 
      name: 'Personal Loan', 
      description: 'For personal expenses, debt consolidation, or major purchases',
      minAmount: 1000,
      maxAmount: 50000,
      minTerm: 6,
      maxTerm: 60,
      baseRate: 5.99
    },
    { 
      id: 'Business', 
      name: 'Business Loan', 
      description: 'For business expansion, equipment, or working capital',
      minAmount: 5000,
      maxAmount: 250000,
      minTerm: 12,
      maxTerm: 84,
      baseRate: 7.49
    },
    { 
      id: 'Mortgage', 
      name: 'Mortgage Loan', 
      description: 'For home purchase or refinancing',
      minAmount: 50000,
      maxAmount: 1000000,
      minTerm: 60,
      maxTerm: 360,
      baseRate: 4.25
    },
    { 
      id: 'Student', 
      name: 'Student Loan', 
      description: 'For education expenses, tuition, and books',
      minAmount: 1000,
      maxAmount: 100000,
      minTerm: 12,
      maxTerm: 120,
      baseRate: 3.99
    }
  ];

  // Initial selected loan type
  const [selectedLoanType, setSelectedLoanType] = useState(loanTypes[0]);

  // Handle loan type change
  const handleLoanTypeChange = (e) => {
    const selected = loanTypes.find(type => type.id === e.target.value);
    setSelectedLoanType(selected);
  };

  // Validation schema
  const validationSchema = Yup.object({
    type: Yup.string().required('Loan type is required'),
    amount: Yup.number()
      .required('Loan amount is required')
      .min(selectedLoanType.minAmount, `Minimum amount is $${selectedLoanType.minAmount.toLocaleString()}`)
      .max(selectedLoanType.maxAmount, `Maximum amount is $${selectedLoanType.maxAmount.toLocaleString()}`),
    term: Yup.number()
      .required('Loan term is required')
      .min(selectedLoanType.minTerm, `Minimum term is ${selectedLoanType.minTerm} months`)
      .max(selectedLoanType.maxTerm, `Maximum term is ${selectedLoanType.maxTerm} months`),
    purpose: Yup.string()
      .required('Loan purpose is required')
      .min(10, 'Please provide more details (at least 10 characters)'),
    employmentStatus: Yup.string().required('Employment status is required'),
    annualIncome: Yup.number()
      .required('Annual income is required')
      .min(12000, 'Annual income must be at least $12,000'),
    creditScore: Yup.number()
      .required('Credit score is required')
      .min(300, 'Credit score must be at least 300')
      .max(850, 'Credit score must be at most 850'),
    agreeTerms: Yup.boolean()
      .required('You must agree to the terms and conditions')
      .oneOf([true], 'You must agree to the terms and conditions')
  });

  // Calculate monthly payment
  const calculateMonthlyPayment = (amount, term, interestRate) => {
    const monthlyRate = interestRate / 100 / 12;
    const payment = amount * monthlyRate * Math.pow(1 + monthlyRate, term) / (Math.pow(1 + monthlyRate, term) - 1);
    return payment.toFixed(2);
  };

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      
      // Add interest rate based on loan type
      const loanData = {
        ...values,
        interestRate: selectedLoanType.baseRate + (850 - values.creditScore) / 100
      };
      
      // Submit loan application
      await applyForLoan(loanData);
      
      setSuccess('Loan application submitted successfully!');
      resetForm();
      
      // Redirect to loan applications page after 2 seconds
      setTimeout(() => {
        navigate('/loan-applications');
      }, 2000);
    } catch (error) {
      setError('Failed to submit loan application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Apply for a New Loan</h1>
        <p className="mt-1 text-sm text-gray-500">
          Fill out the form below to apply for a new loan
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

      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Loan Information</h3>
            <p className="mt-1 text-sm text-gray-500">
              Select the type of loan you want to apply for and provide the necessary details.
            </p>
            
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Loan Types</h3>
              <div className="mt-4 space-y-4">
                {loanTypes.map((type) => (
                  <div key={type.id} className="border rounded-md p-4 hover:border-primary-500 transition-colors">
                    <h4 className="text-md font-medium text-gray-900">{type.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                    <div className="mt-2 text-xs text-gray-500">
                      <p>Amount: ${type.minAmount.toLocaleString()} - ${type.maxAmount.toLocaleString()}</p>
                      <p>Term: {type.minTerm} - {type.maxTerm} months</p>
                      <p>Interest Rate: from {type.baseRate}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-5 md:mt-0 md:col-span-2">
            <Formik
              initialValues={{
                type: selectedLoanType.id,
                amount: selectedLoanType.minAmount,
                term: selectedLoanType.minTerm,
                purpose: '',
                employmentStatus: '',
                annualIncome: '',
                creditScore: '',
                agreeTerms: false
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ values, setFieldValue, isSubmitting }) => {
                // Calculate estimated monthly payment
                const estimatedPayment = calculateMonthlyPayment(
                  values.amount,
                  values.term,
                  selectedLoanType.baseRate + (values.creditScore ? (850 - values.creditScore) / 100 : 0)
                );
                
                return (
                  <Form className="space-y-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                          Loan Type
                        </label>
                        <Field
                          as="select"
                          id="type"
                          name="type"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          onChange={(e) => {
                            handleLoanTypeChange(e);
                            setFieldValue('type', e.target.value);
                            
                            // Reset amount and term to min values of new loan type
                            const newType = loanTypes.find(type => type.id === e.target.value);
                            setFieldValue('amount', newType.minAmount);
                            setFieldValue('term', newType.minTerm);
                          }}
                        >
                          {loanTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="type" component="div" className="mt-1 text-sm text-red-600" />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                          Loan Amount (${values.amount?.toLocaleString()})
                        </label>
                        <input
                          type="range"
                          id="amount"
                          name="amount"
                          min={selectedLoanType.minAmount}
                          max={selectedLoanType.maxAmount}
                          step={1000}
                          value={values.amount || selectedLoanType.minAmount}
                          onChange={(e) => setFieldValue('amount', Number(e.target.value))}
                          className="mt-1 block w-full"
                        />
                        <div className="mt-1 flex justify-between text-xs text-gray-500">
                          <span>${selectedLoanType.minAmount.toLocaleString()}</span>
                          <span>${selectedLoanType.maxAmount.toLocaleString()}</span>
                        </div>
                        <ErrorMessage name="amount" component="div" className="mt-1 text-sm text-red-600" />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="term" className="block text-sm font-medium text-gray-700">
                          Loan Term ({values.term} months)
                        </label>
                        <input
                          type="range"
                          id="term"
                          name="term"
                          min={selectedLoanType.minTerm}
                          max={selectedLoanType.maxTerm}
                          step={selectedLoanType.id === 'Mortgage' ? 12 : 6}
                          value={values.term || selectedLoanType.minTerm}
                          onChange={(e) => setFieldValue('term', Number(e.target.value))}
                          className="mt-1 block w-full"
                        />
                        <div className="mt-1 flex justify-between text-xs text-gray-500">
                          <span>{selectedLoanType.minTerm} months</span>
                          <span>{selectedLoanType.maxTerm} months</span>
                        </div>
                        <ErrorMessage name="term" component="div" className="mt-1 text-sm text-red-600" />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="estimatedPayment" className="block text-sm font-medium text-gray-700">
                          Estimated Monthly Payment
                        </label>
                        <div className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-50 rounded-md shadow-sm sm:text-sm">
                          ${estimatedPayment}
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          This is an estimate based on the information provided
                        </p>
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
                          Loan Purpose
                        </label>
                        <Field
                          as="textarea"
                          id="purpose"
                          name="purpose"
                          rows={3}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          placeholder="Please describe why you need this loan..."
                        />
                        <ErrorMessage name="purpose" component="div" className="mt-1 text-sm text-red-600" />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-700">
                          Employment Status
                        </label>
                        <Field
                          as="select"
                          id="employmentStatus"
                          name="employmentStatus"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        >
                          <option value="">Select status</option>
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Self-employed">Self-employed</option>
                          <option value="Unemployed">Unemployed</option>
                          <option value="Retired">Retired</option>
                          <option value="Student">Student</option>
                        </Field>
                        <ErrorMessage name="employmentStatus" component="div" className="mt-1 text-sm text-red-600" />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700">
                          Annual Income
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <Field
                            type="number"
                            id="annualIncome"
                            name="annualIncome"
                            className="mt-1 block w-full pl-7 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="0.00"
                          />
                        </div>
                        <ErrorMessage name="annualIncome" component="div" className="mt-1 text-sm text-red-600" />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="creditScore" className="block text-sm font-medium text-gray-700">
                          Credit Score
                        </label>
                        <Field
                          type="number"
                          id="creditScore"
                          name="creditScore"
                          min="300"
                          max="850"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          placeholder="Enter your credit score (300-850)"
                        />
                        <ErrorMessage name="creditScore" component="div" className="mt-1 text-sm text-red-600" />
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <Field
                          type="checkbox"
                          id="agreeTerms"
                          name="agreeTerms"
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="agreeTerms" className="font-medium text-gray-700">
                          Terms and Conditions
                        </label>
                        <p className="text-gray-500">
                          I agree to the terms and conditions, privacy policy, and consent to credit check.
                        </p>
                        <ErrorMessage name="agreeTerms" component="div" className="mt-1 text-sm text-red-600" />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        onClick={() => navigate('/loan-applications')}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                      >
                        {loading ? (
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : null}
                        Submit Application
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLoanApplication;