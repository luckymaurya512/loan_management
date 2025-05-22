import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheckIcon, 
  UserGroupIcon, 
  LightBulbIcon, 
  CurrencyDollarIcon,
  MenuIcon,
  XIcon
} from '@heroicons/react/outline';

const About = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Team members data
  const teamMembers = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      bio: 'John has over 20 years of experience in the financial industry and founded LoanManager to make loan management more accessible to everyone.',
    },
    {
      name: 'Sarah Johnson',
      role: 'Chief Financial Officer',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      bio: 'With a background in investment banking, Sarah oversees all financial operations and ensures we offer competitive rates to our customers.',
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      bio: 'Michael leads our technology team, building innovative solutions that make loan management simple and secure for our users.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Customer Success Director',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      bio: 'Emily ensures that every customer has an exceptional experience with our platform, from application to final payment.',
    },
  ];

  // Values data
  const values = [
    {
      name: 'Transparency',
      description: 'We believe in complete transparency in all our operations. No hidden fees, no confusing terms.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Customer-First',
      description: 'Our customers are at the heart of everything we do. We design our products and services with your needs in mind.',
      icon: UserGroupIcon,
    },
    {
      name: 'Innovation',
      description: 'We continuously innovate to provide the best loan management experience using the latest technology.',
      icon: LightBulbIcon,
    },
    {
      name: 'Financial Inclusion',
      description: 'We are committed to making financial services accessible to everyone, regardless of their background.',
      icon: CurrencyDollarIcon,
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
              <Link to="/about" className="text-base font-medium text-gray-900">
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
                  <span className="block xl:inline">About</span>{' '}
                  <span className="block text-primary-600 xl:inline">LoanManager</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  We're on a mission to make loan management simple, transparent, and accessible to everyone. Learn more about our story, our team, and our values.
                </p>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
            alt="Team working together"
          />
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Our Story</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              How we started
            </p>
          </div>

          <div className="mt-10">
            <div className="prose prose-lg text-gray-500 mx-auto lg:max-w-none">
              <p>
                LoanManager was founded in 2018 with a simple mission: to make loan management accessible, transparent, and hassle-free for everyone. Our founder, John Smith, experienced firsthand the challenges of navigating complex loan processes and saw an opportunity to create a better solution.
              </p>
              <p className="mt-4">
                What started as a small team of financial experts and developers has grown into a comprehensive loan management platform serving thousands of customers. We've built our platform from the ground up with a focus on user experience, security, and innovation.
              </p>
              <p className="mt-4">
                Today, LoanManager offers a wide range of loan products and services, from personal loans to mortgages, all managed through our intuitive online platform. We're proud to have helped our customers achieve their financial goals, whether it's buying a home, starting a business, or consolidating debt.
              </p>
              <p className="mt-4">
                As we continue to grow, we remain committed to our core values of transparency, customer-first approach, innovation, and financial inclusion. We believe that everyone deserves access to fair and transparent financial services, and we're working every day to make that a reality.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Our Values</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What drives us
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our core values guide everything we do, from product development to customer service.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {values.map((value) => (
                <div key={value.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <value.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{value.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{value.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Our Team</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Meet the people behind LoanManager
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our diverse team of experts is dedicated to providing the best loan management experience.
            </p>
          </div>

          <div className="mt-10">
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((person) => (
                <li key={person.name} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                  <div className="w-full flex items-center justify-between p-6 space-x-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-gray-900 text-sm font-medium truncate">{person.name}</h3>
                      </div>
                      <p className="mt-1 text-gray-500 text-sm truncate">{person.role}</p>
                    </div>
                    <img className="w-16 h-16 rounded-full flex-shrink-0" src={person.imageUrl} alt="" />
                  </div>
                  <div>
                    <div className="-mt-px flex">
                      <div className="w-full border-t border-gray-200 px-4 py-4">
                        <p className="text-sm text-gray-500">{person.bio}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by thousands of customers
            </h2>
            <p className="mt-3 text-xl text-primary-200 sm:mt-4">
              Our numbers speak for themselves
            </p>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-primary-200">Customers</dt>
              <dd className="order-1 text-5xl font-extrabold text-white">10,000+</dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-primary-200">Loans Processed</dt>
              <dd className="order-1 text-5xl font-extrabold text-white">$50M+</dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-primary-200">Customer Satisfaction</dt>
              <dd className="order-1 text-5xl font-extrabold text-white">98%</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-primary-600">Join thousands of satisfied customers today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Get started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
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

export default About;