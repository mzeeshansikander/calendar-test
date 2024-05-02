import * as Yup from "yup";

export const eventSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  start: Yup.string().required("Start Date is required"),
  end: Yup.string().required("End Date is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
});
