// React
import React from "react";

// Layout Import
import UnprotectedLayout from "../../components/UnprotectedLayout";

// Formik
import { useFormik } from "formik";
import { registerSchema } from "../../Schema/register.schema";
import { UserRegistrationMutationHook } from "../../Services/react-query-client/auth/user.register";
import { useNavigation } from "react-router-dom";

const RegisterView = () => {

  const router = useNavigation()
  // Mutation
  const { mutateAsync, isPending } = UserRegistrationMutationHook();

  // Initial Values Types
  type initialValuesT = {
    name: string;
    email: string;
    password: string;
  };

  // Formik Initial Values
  const initialValues: initialValuesT = {
    name: "",
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
    onSubmit: async (values) => {
      console.log("$ Submitted", values);
      const register = await mutateAsync(values);
      console.log("$ Register", register);
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
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Username"
              ></input>
              {errors.name && touched.name && (
                <p className="text-red-600 text-sm">{errors.name}</p>
              )}
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
                className="border border-black rounded-md h-[40px]"
              >
                {`Sign Up`}
              </button>
            </div>
          </div>
        </form>
      </>
    </UnprotectedLayout>
  );
};

export default RegisterView;
