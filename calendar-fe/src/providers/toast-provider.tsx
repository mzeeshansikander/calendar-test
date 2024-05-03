// React Imports
import { Fragment } from "react";

// React Hot Toast Imports
import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Fragment>
      <Toaster position="top-right" reverseOrder={false} />
    </Fragment>
  );
}
