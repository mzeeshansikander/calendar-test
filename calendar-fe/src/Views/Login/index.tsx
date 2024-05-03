// React
import React from "react";

// Layout Import
import UnprotectedLayout from "../../components/UnprotectedLayout";

// Formik
import { useFormik } from "formik";
import { loginSchema } from "../../Schema/login.schema";

// React-Query
import { UserLoginMutationHook } from "../../Services/react-query-client/auth/user.login";

// Toast
import toast from "react-hot-toast";

// React-Router-DOM
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateToken, updateUser } from "../../redux/slices/user.slice";

const LoginView = () => {
  // Navigate
  const navigate = useNavigate();

  // Mutation
  const { mutateAsync, isPending } = UserLoginMutationHook();

  // Initial Values Types
  type initialValuesT = {
    email: string;
    password: string;
  };

  // Formik Initial Values
  const initialValues: initialValuesT = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();

  // const user = useSelector((state: any) => state.user);

  // Formik
  const {
    values,
    errors,
    touched,
    resetForm,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const login: any = await mutateAsync(values);
        // Updating user state/token in redux
        dispatch(updateUser(login.admin));
        dispatch(updateToken(login.accessToken));
        console.log("$ Submitted", values);
        resetForm();
        toast.success("Login Successful");
        navigate("/");
      } catch (err) {
        toast.error((err as any).response.data.message);
      }
    },
  });

  return (
    <UnprotectedLayout>
      <>
        <form
          autoComplete="off"
          className="w-full flex items-center justify-center md:h-fit h-full"
          onSubmit={handleSubmit}
        >
          <div className="bg-gray-200 md:rounded-[30px] h-full md:h-fit flex items-center justify-center w-full max-w-[800px] shadow-lg py-20 px-5">
            <div className="w-full max-w-[570px] flex flex-col gap-[20px]">
              <h1 className="text-[50px] font-bold md:mb-0 mb-10 md:text-left text-center">
                Login
              </h1>
              <input
                className="rounded-sm h-[42px] px-3"
                placeholder="Email"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {errors.email && touched.email && (
                <p className="text-red-600 text-sm">{errors.email}</p>
              )}
              <input
                className="rounded-sm h-[42px] px-3"
                placeholder="Password"
                name="password"
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {errors.password && touched.password && (
                <p className="text-red-600 text-sm">{errors.password}</p>
              )}
              <button
                type="submit"
                className="border border-black rounded-md h-[40px] "
              >
                {isPending ? "Loading..." : "Log In"}
              </button>
              <p>
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="cursor-pointer text-blue-950"
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </form>
      </>
    </UnprotectedLayout>
  );
};

export default LoginView;
