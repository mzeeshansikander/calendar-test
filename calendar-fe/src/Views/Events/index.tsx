import React from "react";

// Calendar Components
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Sheet,
  // SheetClose,
  SheetContent,
  SheetDescription,
  // SheetFooter,
  SheetHeader,
  SheetTitle,

  // SheetTrigger,
} from "../../components/ui/sheet";

// Formik
import { useFormik } from "formik";
import { eventSchema } from "../../Schema/even.schema";

// Components
import Navbar from "../../components/custom/Navbar";

// Interface
interface EventsViewT{}

const EventsView:React.FC<EventsViewT> = () => {
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const [myEvents, setMyEvents] = React.useState([
    {
      title: "event 1",
      date: "2024-04-30",
      description: "This is a description",
      price: 600,
    },
    {
      title: "event 2",
      start: "2024-04-29",
      end: "2024-05-05",
      description: "This is a description",
      price: 600,
    },
  ]);

  const handleAddEvents = (newEvent: any) => {
    setMyEvents([...myEvents, newEvent]);
    setSheetOpen(false);
  };

  interface initialValuesT {
    title: string;
    start: string;
    end: string;
    description: string;
    price: string;
  }

  const initialValues: initialValuesT = {
    title: "",
    start: "",
    end: "",
    description: "",
    price: "",
  };

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
    validationSchema: eventSchema,
    onSubmit: (values) => {
      console.log("$ Submitted", values);
      handleAddEvents(values);
      resetForm();
    },
  });

  console.log("Errors", errors);

  const handleSubmitClick = () => {
    handleSubmit();
  };

  return (
    <>
      <div className="">
        <Navbar />
        <form
          className="flex items-center h-[90dvh] justify-center overflow-auto"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            {/* <SheetTrigger asChild>
            <button>Open</button>
          </SheetTrigger> */}
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add Event</SheetTitle>
                <SheetDescription>
                  Create a event here by adding the following information
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="title" className="text-right">
                    Title
                  </label>
                  <input
                    required
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="col-span-3"
                  />
                  {errors.title && touched.title && (
                    <p className="text-sm py-1 text-red-600">{errors.title}</p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="start" className="text-right">
                    Start Date
                  </label>
                  <input
                    required
                    id="start"
                    name="start"
                    type="date"
                    value={values.start}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="col-span-3"
                  />
                  {errors.start && touched.start && (
                    <p className="text-sm py-1 text-red-600">{errors.start}</p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="end" className="text-right">
                    End Date
                  </label>
                  <input
                    required
                    id="end"
                    name="end"
                    type="date"
                    value={values.end}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="col-span-3"
                  />
                  {errors.end && touched.end && (
                    <p className="text-sm py-1 text-red-600">{errors.end}</p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="description" className="text-right">
                    Description
                  </label>
                  <input
                    required
                    id="description"
                    type="text"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="col-span-3"
                  />
                  {errors.description && touched.description && (
                    <p className="text-sm py-1 text-red-600">
                      {errors.description}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="price" className="text-right">
                    Price
                  </label>
                  <input
                    required
                    id="price"
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="col-span-3"
                  />
                  {errors.price && touched.price && (
                    <p className="text-sm py-1 text-red-600">{errors.price}</p>
                  )}
                </div>
                <button onClick={handleSubmitClick} type="submit">
                  Save changes
                </button>
              </div>
              {/* <SheetFooter>
              <SheetClose asChild>
                
              </SheetClose>
            </SheetFooter> */}
            </SheetContent>
          </Sheet>
          <div className="w-full max-w-[1000px]">
            <FullCalendar
              height={700}
              dayCellClassNames={"dayCell"}
              eventClassNames={"events"}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              weekends={false}
              events={myEvents}
              dateClick={(e) => {
                console.log(e.dateStr);
                setSheetOpen(true);
              }}
            />
          </div>
        </form>
        
      </div>
    </>
  );
};

export default EventsView;
