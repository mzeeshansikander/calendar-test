// React
import React from "react";

// Layout Import
import UnprotectedLayout from "../../components/UnprotectedLayout";

// Formik
import { useFormik } from "formik";
import { registerSchema } from "../../Schema/register.schema";

const RegisterView = () => {
  // Initial Values Types
  type initialValuesT = {
    username: string;
    email: string;
    password: string;
  };

  // Formik Initial Values
  const initialValues: initialValuesT = {
    username: "",
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
    validationSchema: registerSchema,
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
          <div className="bg-gray-200 rounded-[30px] w-full max-w-[800px] flex items-center justify-center shadow-lg py-20">
            <div className="w-full max-w-[570px] flex flex-col gap-[20px]">
              <h1 className="text-[50px] font-bold">Register</h1>
              <input
                className="rounded-sm h-[42px] px-3"
                name="username"
                id="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Username"
              ></input>
              {errors.username && touched.username && <p className="text-red-600 text-sm">{errors.username}</p>}
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
              <button type="submit" className="border border-black rounded-md h-[40px]">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </>
    </UnprotectedLayout>
  );
};

export default RegisterView;
