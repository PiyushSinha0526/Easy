import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@alone_npm/easy-common";

import useAuthStore from "../store/AuthStore";
import { useShallow } from "zustand/react/shallow";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [authInput, setAuthInput] = useState<SignupInput>({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();
  const { signup, signin } = useAuthStore(
    useShallow((state) => ({ signup: state.signup, signin: state.signin })),
  );
  async function sendRequest(type: "signup" | "signin") {
    try {
      if (type == "signin") {
        signin(authInput);
      } else signup(authInput);
      navigate("/");
    } catch (error) {}
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex w-80 flex-col justify-center">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold">Create an Account</h2>
          {type == "signup" ? (
            <div className="">
              Already have an account?
              <Link to={"/signin"} className="underline">
                Login
              </Link>
            </div>
          ) : (
            <div>
              Don't have an account?
              <Link to={"/signup"} className="underline">
                signup
              </Link>
            </div>
          )}
        </div>
        <form>
          {type == "signup" ? (
            <LabelledInput
              type="text"
              label="name"
              placeholder="your name ..."
              onChange={(e) => {
                setAuthInput((prev) => ({ ...prev, name: e.target.value }));
              }}
            />
          ) : null}
          <LabelledInput
            type="email"
            label="email"
            placeholder="email ..."
            onChange={(e) => {
              setAuthInput((prev) => ({ ...prev, email: e.target.value }));
            }}
          />
          <LabelledInput
            type="password"
            label="password"
            placeholder="password ..."
            onChange={(e) => {
              setAuthInput((prev) => ({ ...prev, password: e.target.value }));
            }}
          />
          <button
            type="button"
            onClick={() => sendRequest(type == "signin" ? "signin" : "signup")}
            className="mb-2 me-2 mt-5 w-full rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            {type == "signin" ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({
  label,
  placeholder,
  type,
  onChange,
}: LabelledInputType) {
  return (
    <div className="pt-5">
      <label
        htmlFor={label}
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={type || "text"}
        onChange={onChange}
        id={label}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Auth;
