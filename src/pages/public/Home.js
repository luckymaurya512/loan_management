import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CashIcon, 
  ShieldCheckIcon, 
  ClockIcon, 
  ChartBarIcon,
  CreditCardIcon,
  UserGroupIcon,
  CheckCircleIcon,
  MenuIcon,
  XIcon,
  UserIcon
} from '@heroicons/react/outline';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Features section data
  const features = [
    {
      name: 'Multiple Loan Types',
      description: 'Choose from personal, business, mortgage, and student loans to meet your specific needs.',
      icon: CreditCardIcon,
    },
    {
      name: 'Quick Approval Process',
      description: 'Get your loan application reviewed and approved in as little as 24 hours.',
      icon: ClockIcon,
    },
    {
      name: 'Competitive Interest Rates',
      description: 'Enjoy some of the most competitive interest rates in the market, tailored to your credit profile.',
      icon: ChartBarIcon,
    },
    {
      name: 'Secure Application',
      description: 'Your personal and financial information is protected with bank-level security.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Easy Repayment Options',
      description: 'Flexible repayment options that fit your budget and financial situation.',
      icon: CashIcon,
    },
    {
      name: 'Dedicated Support',
      description: '24/7 customer support to assist you throughout your loan journey.',
      icon: UserGroupIcon,
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      content: 'The loan application process was incredibly smooth. I got approved within 48 hours and the funds were in my account the next day.',
      author: 'Sarah Johnson',
      role: 'Small Business Owner',
    },
    {
      content: 'I was able to consolidate all my high-interest debts into one manageable monthly payment. The interest rate was much better than what I had before.',
      author: 'Michael Chen',
      role: 'Software Engineer',
    },
    {
      content: 'The mortgage loan I got helped me purchase my dream home. The team was very helpful in explaining all the terms and conditions.',
      author: 'Emily Rodriguez',
      role: 'Teacher',
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: 'What types of loans do you offer?',
      answer: 'We offer a variety of loan types including personal loans, business loans, mortgage loans, and student loans. Each loan type is designed to meet specific financial needs and comes with its own terms and conditions.',
    },
    {
      question: 'How long does the approval process take?',
      answer: 'Our approval process typically takes 24-48 hours for personal and business loans. Mortgage loans may take 3-5 business days due to additional verification requirements. Once approved, funds are usually disbursed within 1-2 business days.',
    },
    {
      question: 'What documents do I need to apply for a loan?',
      answer: 'Required documents vary by loan type but generally include proof of identity (government-issued ID), proof of income (pay stubs, tax returns), bank statements, and credit history. For specific loans like mortgages, additional documentation such as property details may be required.',
    },
    {
      question: 'How are interest rates determined?',
      answer: 'Interest rates are determined based on several factors including your credit score, loan amount, loan term, and current market conditions. We offer competitive rates that are personalized to your financial profile.',
    },
    {
      question: 'Can I pay off my loan early?',
      answer: 'Yes, you can pay off your loan early without any prepayment penalties. Early repayment can help you save on interest costs over the life of the loan.',
    },
  ];

  return (
    <div className="bg-white">
      {/* Header/Navigation */}
      <header className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to="/">
                <span className="sr-only">LoanManager</span>
                <h1 className="text-3xl font-bold text-primary-600">LoanManager</h1>
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <button
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                onClick={() => setIsMenuOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <nav className="hidden md:flex space-x-10">
              <Link to="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Home
              </Link>
              <Link to="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
                About
              </Link>
              <Link to="/contact" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Contact
              </Link>
            </nav>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link to="/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                Sign in
              </Link>
              <Link
                to="/register"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-primary-600">LoanManager</h1>
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <Link
                    to="/"
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="ml-3 text-base font-medium text-gray-900">Home</span>
                  </Link>
                  <Link
                    to="/about"
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="ml-3 text-base font-medium text-gray-900">About</span>
                  </Link>
                  <Link
                    to="/contact"
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="ml-3 text-base font-medium text-gray-900">Contact</span>
                  </Link>
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div>
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?{' '}
                  <Link to="/login" className="text-primary-600 hover:text-primary-500" onClick={() => setIsMenuOpen(false)}>
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Financial solutions</span>{' '}
                  <span className="block text-primary-600 xl:inline">tailored for you</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Get the funds you need with our easy-to-use loan management platform. Apply online, track your application, and manage your payments all in one place.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/about"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Person working on finances"
          />
        </div>
      </div>

      {/* Loan Types Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Loan Options</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Find the right loan for your needs
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We offer a variety of loan types to help you achieve your financial goals, whether you're looking to buy a home, start a business, or fund your education.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Personal Loan */}
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                        <CashIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Personal Loans</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Flexible financing for your personal needs, from debt consolidation to major purchases.
                    </p>
                    <div className="mt-5">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                          </div>
                          <p className="ml-3 text-sm text-gray-700">$1,000 - $50,000</p>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                          </div>
                          <p className="ml-3 text-sm text-gray-700">6 - 60 months</p>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                          </div>
                          <p className="ml-3 text-sm text-gray-700">From 5.99% APR</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Loan */}
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                        <ChartBarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Business Loans</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Capital to grow your business, purchase equipment, or manage cash flow.
                    </p>
                    <div className="mt-5">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                          </div>
                          <p className="ml-3 text-sm text-gray-700">$5,000 - $250,000</p>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                          </div>
                          <p className="ml-3 text-sm text-gray-700">12 - 84 months</p>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                          </div>
                          <p className="ml-3 text-sm text-gray-700">From 7.49% APR</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mortgage Loan */}
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                        <HomeIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Mortgage Loans</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Financing options for buying a new home or refinancing your current mortgage.
                    </p>
                    <div className="mt-5">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                          </div>
                          <p className="ml-3 text-sm text-gray-700">$50,000 - $1,000,000</p>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                          </div>
                          <p className="ml-3 text-sm text-gray-700">5 - 30 years</p>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                          </div>
                          <p className="ml-3 text-sm text-gray-700">From 4.25% APR</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Student Loan */}
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                        <AcademicCapIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Student Loans</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Affordable financing for education expenses, tuition, and books.
                    </p>
                    <div className="mt-5">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                          </div>
                          <p className="ml-3 text-sm text-gray-700">$1,000 - $100,000</p>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                          </div>
                          <p className="ml-3 text-sm text-gray-700">1 - 10 years</p>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                          </div>
                          <p className="ml-3 text-sm text-gray-700">From 3.99% APR</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to manage your loans
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform offers a comprehensive suite of tools to help you apply for, track, and manage your loans with ease.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Process</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              How it works
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our streamlined process makes getting a loan quick and hassle-free.
            </p>
          </div>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-gray-50 text-lg font-medium text-gray-900">Simple 4-step process</span>
              </div>
            </div>

            <div className="mt-10 max-w-lg mx-auto grid gap-5 lg:grid-cols-4 lg:max-w-none">
              {/* Step 1 */}
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mx-auto">
                      <span className="text-lg font-bold">1</span>
                    </div>
                    <p className="mt-3 text-xl font-semibold text-gray-900 text-center">Apply Online</p>
                    <p className="mt-3 text-base text-gray-500 text-center">
                      Fill out our simple online application form with your personal and financial details.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mx-auto">
                      <span className="text-lg font-bold">2</span>
                    </div>
                    <p className="mt-3 text-xl font-semibold text-gray-900 text-center">Get Approved</p>
                    <p className="mt-3 text-base text-gray-500 text-center">
                      Our team reviews your application and provides a quick decision, often within 24 hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mx-auto">
                      <span className="text-lg font-bold">3</span>
                    </div>
                    <p className="mt-3 text-xl font-semibold text-gray-900 text-center">Receive Funds</p>
                    <p className="mt-3 text-base text-gray-500 text-center">
                      Once approved, the loan amount is deposited directly into your bank account.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mx-auto">
                      <span className="text-lg font-bold">4</span>
                    </div>
                    <p className="mt-3 text-xl font-semibold text-gray-900 text-center">Manage Repayments</p>
                    <p className="mt-3 text-base text-gray-500 text-center">
                      Use our dashboard to track and manage your loan repayments with ease.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What our customers say
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 rounded-lg shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-gray-900">{testimonial.author}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">FAQ</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Frequently asked questions
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Find answers to common questions about our loan services.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-6 divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <div key={index} className="pt-6">
                  <dt className="text-lg">
                    <span className="font-medium text-gray-900">{faq.question}</span>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-primary-200">Apply for a loan today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
              >
                Get started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            <div className="px-5 py-2">
              <Link to="/" className="text-base text-gray-500 hover:text-gray-900">
                Home
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link to="/about" className="text-base text-gray-500 hover:text-gray-900">
                About
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link to="/contact" className="text-base text-gray-500 hover:text-gray-900">
                Contact
              </Link>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Terms & Conditions
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Privacy Policy
              </a>
            </div>
          </nav>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2023 LoanManager. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Define AcademicCapIcon since it's not imported
const AcademicCapIcon = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  );
};

// Define HomeIcon since it's not imported
const HomeIcon = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
};

export default Home;