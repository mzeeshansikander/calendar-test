import * as Yup from "yup";

export const eventSchema = Yup.object().shape({
  at: Yup.string().required("Date is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
});
