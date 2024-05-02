// React
import React from "react";

// Layout Import
import UnprotectedLayout from "../../components/UnprotectedLayout";

// Formik
import { useFormik } from "formik";
import { loginSchema } from "../../Schema/login.schema";

const LoginView = () => {
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
    onSubmit: (values) => {
      console.log("$ Submitted", values);
      resetForm();
    },
  });

  return (
    <UnprotectedLayout>
      <>
      <form
          autoComplete="off"
          className="w-full flex items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="bg-gray-200 rounded-[30px] flex items-center justify-center w-full max-w-[800px] shadow-lg py-20">
            <div className="w-full max-w-[570px] flex flex-col gap-[20px]">
              <h1 className="text-[50px] font-bold">Login</h1>
              <input
                className="rounded-sm h-[42px] px-3"
                placeholder="Email"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {errors.email && touched.email && <p className="text-red-600 text-sm">{errors.email}</p>}
              <input
                className="rounded-sm h-[42px] px-3"
                placeholder="Password"
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {errors.password && touched.password && <p className="text-red-600 text-sm">{errors.password}</p>}
              <button
                type="submit"
                className="border border-black rounded-md h-[40px] "
              >
                Log In
              </button>
            </div>
          </div>
        </form>
      </>
    </UnprotectedLayout>
  );
};

export default LoginView;
