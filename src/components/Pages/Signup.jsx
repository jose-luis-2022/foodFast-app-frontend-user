import { useState } from "react";
import Swal from "sweetalert2";
import axiosClient from "../../config/axios";

function SignUp() {
  const [names, setNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsError(false);

    if (
      names === "" ||
      lastNames === "" ||
      email === "" ||
      phone === "" ||
      password === ""
    ) {
      return Swal.fire({
        customClass: {
          title: "text-[20px]",
          popup: "text-sm",
          confirmButton: "px-3 py-1",
        },
        icon: "error",
        title: "Error",
        text: "All fields are required",
      });
    }

    await axiosClient.get(`/clients/${email}`).then(async (response) => {
      if (response.data.clients > 0) {
        setIsError(true);
        return Swal.fire({
          customClass: {
            title: "text-[20px]",
            popup: "text-sm",
            confirmButton: "px-3 py-1",
          },
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      } else {
        setIsError(false);
        await axiosClient
          .post("/clients", {
            names,
            lastNames,
            email,
            phone,
            password,
          })
          .then((response) => {
            if (response.status === 201) {
              setNames("");
              setLastNames("");
              setEmail("");
              setPhone("");
              setPassword("");
              localStorage.setItem(
                "messageClient",
                JSON.stringify(response.data.message)
              );
              window.location.href = "/login";
            }
          });
      }
    });
  }

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
              htmlFor="names"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Names
            </label>
            <div className="mt-2 relative">
              <input
                id="names"
                name="names"
                type="text"
                required
                className="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                onChange={(e) => setNames(e.target.value)}
              />
              <i className="ri-user-3-line absolute text-gray-500 text-lg top-[5px] right-5"></i>
            </div>
          </div>

          <div>
            <label
              htmlFor="lastnames"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last Names
            </label>
            <div className="mt-2 relative">
              <input
                id="lastnames"
                name="lastnames"
                type="text"
                required
                className="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                onChange={(e) => setLastNames(e.target.value)}
              />
              <i className="ri-user-3-line absolute text-gray-500 text-lg top-[5px] right-5"></i>
            </div>
          </div>

          <div>
            <label
              htmlFor="phone_number"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Phone Number
            </label>
            <div className="mt-2 relative">
              <input
                id="phone_number"
                name="phone_number"
                type="text"
                required
                className="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                onChange={(e) => setPhone(e.target.value)}
              />
              <i className="ri-phone-line absolute text-gray-500 text-lg top-[5px] right-5"></i>
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2 relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`${
                  isError ? "border-[1px] border-red-400" : "border-none"
                } block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="ri-mail-line absolute text-gray-500 text-lg top-[5px] right-5"></i>
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
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
              onClick={(e) => handleSubmit(e)}
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
}

export default SignUp;
