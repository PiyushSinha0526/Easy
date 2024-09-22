import { Link, useNavigate } from "react-router-dom";
import {
  SignupInput,
  SigninInput,
  signupInput,
  signinInput,
} from "@alone_npm/easy-common";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "../store/AuthStore";
import { useShallow } from "zustand/react/shallow";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const schema = type === "signup" ? signupInput : signinInput;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<
    typeof schema extends typeof signupInput ? SignupInput : SigninInput
  >({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const { signup, signin } = useAuthStore(
    useShallow((state) => ({ signup: state.signup, signin: state.signin })),
  );

  const sendRequest = async (data: SignupInput) => {
    try {
      if (type === "signin") {
        await signin(data as SigninInput);
      } else {
        await signup(data as SignupInput);
      }
      navigate("/");
    } catch (error: any) {
      console.log(error.response?.data?.error || error.message);
      setError("root", {
        message: error.response?.data?.error || error.message,
      });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex w-80 flex-col justify-center">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold">
            {type === "signup" ? "Create an Account" : "Sign In"}
          </h2>
          {type === "signup" ? (
            <div className="">
              Already have an account?
              <Link to="/signin" className="underline">
                Login
              </Link>
            </div>
          ) : (
            <div>
              Don't have an account?
              <Link to="/signup" className="underline">
                Sign Up
              </Link>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit(sendRequest)} noValidate>
          {type === "signup" && (
            <LabelledInput
              type="text"
              label="name"
              placeholder="your name ..."
              register={register}
              errors={errors}
            />
          )}
          <LabelledInput
            type="email"
            label="email"
            placeholder="email ..."
            register={register}
            errors={errors}
          />
          <LabelledInput
            type="password"
            label="password"
            placeholder="password ..."
            register={register}
            errors={errors}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`me-2 mt-5 w-full rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 ${isSubmitting ? "opacity-50" : ""}`}
          >
            {isSubmitting
              ? "Loading..."
              : type === "signin"
                ? "Sign In"
                : "Sign Up"}
          </button>
          {errors.root && (
            <div className="pl-2 text-red-500">{errors.root.message}</div>
          )}
        </form>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  register: any;
  errors: any;
}

function LabelledInput({
  label,
  placeholder,
  type = "text",
  register,
  errors,
}: LabelledInputType) {
  return (
    <div className="pt-5">
      <label
        htmlFor={label}
        className="mb-2 block text-sm font-medium capitalize text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        {...register(label)}
        id={label}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        placeholder={placeholder}
        required
      />
      {errors[label] && (
        <p className="pl-2 text-[12px] text-red-500">
          {errors[label]?.message}
        </p>
      )}
    </div>
  );
}

export default Auth;
