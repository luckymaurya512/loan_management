import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { 
  UserIcon, 
  MailIcon, 
  LockClosedIcon, 
  PhoneIcon, 
  HomeIcon,
  IdentificationIcon,
  CreditCardIcon
} from '@heroicons/react/outline';

const Profile = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Personal Information Schema
  const personalInfoSchema = Yup.object({
    name: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits'),
    address: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    zipCode: Yup.string().matches(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format'),
  });

  // Security Schema
  const securitySchema = Yup.object({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      )
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  // Financial Information Schema
  const financialInfoSchema = Yup.object({
    employmentStatus: Yup.string().required('Employment status is required'),
    employer: Yup.string().when('employmentStatus', {
      is: (val) => val && val !== 'Unemployed' && val !== 'Retired' && val !== 'Student',
      then: Yup.string().required('Employer name is required'),
    }),
    annualIncome: Yup.number().required('Annual income is required'),
    bankName: Yup.string().required('Bank name is required'),
    accountType: Yup.string().required('Account type is required'),
    accountNumber: Yup.string()
      .matches(/^\d{4}$/, 'Please enter last 4 digits of your account')
      .required('Account number is required'),
  });

  // Handle personal info form submission
  const handlePersonalInfoSubmit = async (values, { setSubmitting }) => {
    try {
      setError('');
      setSuccess('');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Personal information updated successfully!');
    } catch (error) {
      setError('Failed to update personal information. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle security form submission
  const handleSecuritySubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setError('');
      setSuccess('');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Password updated successfully!');
      resetForm();
    } catch (error) {
      setError('Failed to update password. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle financial info form submission
  const handleFinancialInfoSubmit = async (values, { setSubmitting }) => {
    try {
      setError('');
      setSuccess('');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Financial information updated successfully!');
    } catch (error) {
      setError('Failed to update financial information. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account information and settings
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

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('personal')}
              className={`${
                activeTab === 'personal'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              <UserIcon className="h-5 w-5 mx-auto mb-1" />
              Personal Information
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`${
                activeTab === 'security'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              <LockClosedIcon className="h-5 w-5 mx-auto mb-1" />
              Security
            </button>
            <button
              onClick={() => setActiveTab('financial')}
              className={`${
                activeTab === 'financial'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              <CreditCardIcon className="h-5 w-5 mx-auto mb-1" />
              Financial Information
            </button>
          </nav>
        </div>

        <div className="px-4 py-5 sm:p-6">
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <Formik
              initialValues={{
                name: currentUser.name || '',
                email: currentUser.email || '',
                phone: '',
                address: '',
                city: '',
                state: '',
                zipCode: '',
              }}
              validationSchema={personalInfoSchema}
              onSubmit={handlePersonalInfoSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <Field
                          type="text"
                          name="name"
                          id="name"
                          className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          placeholder="John Doe"
                        />
                      </div>
                      <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          placeholder="john@example.com"
                        />
                      </div>
                      <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <Field
                          type="text"
                          name="phone"
                          id="phone"
                          className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          placeholder="1234567890"
                        />
                      </div>
                      <ErrorMessage name="phone" component="div" className="mt-1 text-sm text-red-600" />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Street Address
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <HomeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <Field
                          type="text"
                          name="address"
                          id="address"
                          className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          placeholder="123 Main St"
                        />
                      </div>
                      <ErrorMessage name="address" component="div" className="mt-1 text-sm text-red-600" />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <Field
                        type="text"
                        name="city"
                        id="city"
                        className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="New York"
                      />
                      <ErrorMessage name="city" component="div" className="mt-1 text-sm text-red-600" />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <Field
                        type="text"
                        name="state"
                        id="state"
                        className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="NY"
                      />
                      <ErrorMessage name="state" component="div" className="mt-1 text-sm text-red-600" />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                        ZIP Code
                      </label>
                      <Field
                        type="text"
                        name="zipCode"
                        id="zipCode"
                        className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="10001"
                      />
                      <ErrorMessage name="zipCode" component="div" className="mt-1 text-sm text-red-600" />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : null}
                      Save Changes
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <Formik
              initialValues={{
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
              }}
              validationSchema={securitySchema}
              onSubmit={handleSecuritySubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <Field
                        type="password"
                        name="currentPassword"
                        id="currentPassword"
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter your current password"
                      />
                    </div>
                    <ErrorMessage name="currentPassword" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <Field
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter your new password"
                      />
                    </div>
                    <ErrorMessage name="newPassword" component="div" className="mt-1 text-sm text-red-600" />
                    <p className="mt-2 text-sm text-gray-500">
                      Password must be at least 8 characters and include uppercase, lowercase, number, and special character.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <Field
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Confirm your new password"
                      />
                    </div>
                    <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : null}
                      Update Password
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}

          {/* Financial Information Tab */}
          {activeTab === 'financial' && (
            <Formik
              initialValues={{
                employmentStatus: '',
                employer: '',
                annualIncome: '',
                bankName: '',
                accountType: '',
                accountNumber: '',
              }}
              validationSchema={financialInfoSchema}
              onSubmit={handleFinancialInfoSubmit}
            >
              {({ values, isSubmitting }) => (
                <Form className="space-y-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-700">
                        Employment Status
                      </label>
                      <div className="mt-1">
                        <Field
                          as="select"
                          name="employmentStatus"
                          id="employmentStatus"
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
                      </div>
                      <ErrorMessage name="employmentStatus" component="div" className="mt-1 text-sm text-red-600" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="employer" className="block text-sm font-medium text-gray-700">
                        Employer
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <IdentificationIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <Field
                          type="text"
                          name="employer"
                          id="employer"
                          disabled={['Unemployed', 'Retired', 'Student'].includes(values.employmentStatus)}
                          className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="Company name"
                        />
                      </div>
                      <ErrorMessage name="employer" component="div" className="mt-1 text-sm text-red-600" />
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
                          name="annualIncome"
                          id="annualIncome"
                          className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                          aria-describedby="price-currency"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm" id="price-currency">
                            USD
                          </span>
                        </div>
                      </div>
                      <ErrorMessage name="annualIncome" component="div" className="mt-1 text-sm text-red-600" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
                        Bank Name
                      </label>
                      <Field
                        type="text"
                        name="bankName"
                        id="bankName"
                        className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter your bank name"
                      />
                      <ErrorMessage name="bankName" component="div" className="mt-1 text-sm text-red-600" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">
                        Account Type
                      </label>
                      <Field
                        as="select"
                        name="accountType"
                        id="accountType"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      >
                        <option value="">Select account type</option>
                        <option value="Checking">Checking</option>
                        <option value="Savings">Savings</option>
                      </Field>
                      <ErrorMessage name="accountType" component="div" className="mt-1 text-sm text-red-600" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                        Last 4 Digits of Account Number
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CreditCardIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <Field
                          type="text"
                          name="accountNumber"
                          id="accountNumber"
                          className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          placeholder="Last 4 digits only"
                          maxLength="4"
                        />
                      </div>
                      <ErrorMessage name="accountNumber" component="div" className="mt-1 text-sm text-red-600" />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : null}
                      Save Financial Information
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;