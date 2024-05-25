import React from'react';

function SignUp(){
    return (
        <div className="flex h-screen flex-col justify-center px-6 pt-8 lg:px-8 font-Mulish">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex items-center justify-center gap-2">
              <img
                className="h-10"
                src="/src/assets/icon-restaurant.png"
                alt="Gourmet Restaurant"
              />
              <h4 className="font-Dancing text-4xl font-bold">Fast Food</h4>
            </div>
    
            <h2 className="mt-5 text-center text-xl font-semibold leading-9 tracking-tight text-gray-900">
              Sign up
            </h2>
          </div>
    
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-3" action="#" method="POST">
              <div>
                <label
                  for="names"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Names
                </label>
                <div className="mt-2 relative">
                  <input
                    id="names"
                    name="names"
                    type="text"
                    required
                    class="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                  <i className="ri-user-3-line absolute text-gray-500 text-lg top-[5px] right-5"></i>
                </div>
              </div>

              <div>
                <label
                  for="lastnames"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last Names
                </label>
                <div className="mt-2 relative">
                  <input
                    id="lastnames"
                    name="lastnames"
                    type="text"
                    required
                    class="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                  <i className="ri-user-3-line absolute text-gray-500 text-lg top-[5px] right-5"></i>
                </div>
              </div>

              <div>
                <label
                  for="phone_number"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone Number
                </label>
                <div className="mt-2 relative">
                  <input
                    id="phone_number"
                    name="phone_number"
                    type="text"
                    required
                    class="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                  <i class="ri-phone-line absolute text-gray-500 text-lg top-[5px] right-5"></i>
                </div>
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                  <i class="ri-mail-line absolute text-gray-500 text-lg top-[5px] right-5"></i>
                </div>
              </div>
    
              <div>
                  <label
                    for="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                  <i class="ri-lock-line absolute text-gray-500 text-lg top-[5px] right-5"></i>
                </div>
              </div>
    
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>
    
            <p className="flex justify-center items-center gap-2 mt-3 text-sm text-gray-500">
              Already have an account?
              <a
                href="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      );
};

export default SignUp;