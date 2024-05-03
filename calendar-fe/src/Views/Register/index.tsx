// React
import React from "react";

// Layout Import
import UnprotectedLayout from "../../components/UnprotectedLayout";

// Formik
import { useFormik } from "formik";
import { registerSchema } from "../../Schema/register.schema";

// React-Query
import { UserRegistrationMutationHook } from "../../Services/react-query-client/auth/user.register";

// Toast
import toast from "react-hot-toast";

// React-Router-DOM
import { useNavigate } from "react-router-dom";

const RegisterView = () => {
  //
  const navigate = useNavigate();

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
      try {
        const register = await mutateAsync(values);
        console.log("$ Register", register);
        toast.success("Registration Successful");
        resetForm();
        navigate("/login");
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
          <div className="bg-gray-200 rounded-[30px] w-full max-w-[800px] flex items-center justify-center shadow-lg py-20 px-5 h-full md:h-fit">
            <div className="w-full max-w-[570px] flex flex-col gap-[20px]">
              <h1 className="text-[50px] font-bold md:mb-0 mb-10 md:text-left text-center">Register</h1>
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
                type="password"
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
                {isPending ?"Loading..." :`Sign Up`}
              </button>
              <p>
                Already have an account?{" "}
                <span onClick={()=>navigate("/login")} className="cursor-pointer text-blue-950">Log In</span>
              </p>
            </div>
          </div>
        </form>
      </>
    </UnprotectedLayout>
  );
};

export default RegisterView;
