import { useState } from "react";
import axiosClient from "../../config/axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const credetentials = {
      email,
      password,
    };
    
    try {
      await axiosClient.post("/auth/login", credetentials).then((response) => {
        console.log(response);
      });
      setEmail("");
      setPassword("");  
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="flex h-screen flex-col justify-center px-6 py-24 lg:px-8 font-Mulish">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex items-center justify-center gap-2">
          <img
            className="h-10"
            src="/src/assets/icon-restaurant.png"
            alt="Gourmet Restaurant"
          />
          <h4 className="font-Dancing text-4xl font-bold">Gourmet</h4>
        </div>

        <h2 className="mt-10 text-center text-xl font-semibold leading-9 tracking-tight text-gray-900">
          Sign in
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              User
            </label>
            <div className="mt-2 relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="ri-user-3-line absolute text-gray-500 text-lg top-[5px] right-5"></i>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="ri-lock-line absolute text-gray-500 text-lg top-[5px] right-5"></i>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={(e) => handleLogin(e)}
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="flex justify-center items-center gap-2 mt-10 text-sm text-gray-500">
          Not registered yet?
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
