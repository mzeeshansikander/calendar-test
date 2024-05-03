import React, { useState } from "react";

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
// import { GetAllEvents } from "../../Services/react-query-client/events/get.events";
import { Event } from "../../Types/types/response-interface/event.response";
import { CreateEventHook } from "../../Services/react-query-client/events/create.event";
import { useSelector } from "react-redux";
import { GetMyAllEvents } from "../../Services/react-query-client/events/get.myevents";
import toast from "react-hot-toast";
import { DeleteEventHook } from "../../Services/react-query-client/events/delete.event";
import { UpdateEventHook } from "../../Services/react-query-client/events/update.event";
import { Input } from "../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "../../components/ui/dialog";

// Interface
interface EventsViewT {}

const EventsView: React.FC<EventsViewT> = () => {
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const [eventSheetOpen, setEventSheetOpen] = React.useState(false);

  // User (Redux)
  const { user, token } = useSelector((state: any) => state.userSlice);

  console.log("user , token", user, token);

  // Events data fetching
  const { data, isPending } = GetMyAllEvents(token as string);

  // Event Create Service
  const { mutateAsync, isPending: creationPending } = CreateEventHook(
    token as string
  );

  interface TransformedEvent {
    title: string;
    date: string;
    description: string;
    price: number;
  }

  // Utility to transform our data from Api to the format that FullCalendar understands
  function transformEvents(events: Event[]): TransformedEvent[] {
    return events.map((event) => {
      // Generate a random color using Math.floor and Math.random
      const randomColor = `rgb(
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)}
      )`;
  
      return {
        _id: event._id,
        title: event.description,
        date: event.at.split("T")[0],
        at: event.at.split("T")[0],
        description: event.description,
        price: event.price,
        color: event.color,
      };
    });
  }
  

  const allEvents =
    data && data.events.length > 0 ? transformEvents(data.events) : [];

  interface initialValuesT {
    description: string;
    price: number;
    at: string;
  }

  const initialValues: initialValuesT = {
    description: "",
    price: 0,
    at: "",
  };

  const [eventToDisplay, setEventToDisplay] = React.useState();

  const {
    values,
    errors,
    touched,
    resetForm,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
  } = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: eventSchema,
    onSubmit: (values) => {
      try {
        console.log("$ Submitted", values);
        const createEvent = mutateAsync(values);
        console.log("$ Create Event", createEvent);
        toast.success("Event Created Successfully");
        setSheetOpen(false);
        resetForm();
      } catch (err) {
        toast.error((err as any).response.data.message);
      }
    },
  });

  const handleSubmitClick = () => {
    handleSubmit();
  };

  console.log("$ Data", data);

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
              <div className="grid gap-4 py-4 w-full">
                <div className="flex md:flex-row flex-col gap-3 justify-between">
                  <label htmlFor="start" className="text-left">
                    Date:
                  </label>
                  <div className="flex flex-col gap-2 w-full max-w-[220px]">
                    <Input
                      required
                      id="at"
                      name="at"
                      type="date"
                      value={values.at}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="max-w-[320px]"
                    />
                    {errors.at && touched.at && (
                      <p className="text-sm py-1 text-red-600 w-full">
                        {errors.at}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex md:flex-row flex-col gap-3 justify-between">
                  <label htmlFor="description" className="text-left">
                    Description:
                  </label>
                  <div className="flex flex-col gap-2">
                    <Input
                      required
                      id="description"
                      type="text"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="max-w-[220px]"
                    />
                    {errors.description && touched.description && (
                      <p className="text-sm py-1 text-red-600 w-full">
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex md:flex-row flex-col gap-3 justify-between">
                  <label htmlFor="price" className="text-left">
                    Price:
                  </label>
                  <div className="flex flex-col gap-2">
                    <Input
                      required
                      id="price"
                      type="number"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="max-w-[220px]"
                    />
                    {errors.price && touched.price && (
                      <p className="text-sm py-1 text-red-600">
                        {errors.price}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  className="h-[40px] bg-slate-400 rounded-xl border px-3 font-semibold"
                  onClick={handleSubmitClick}
                  type="submit"
                >
                  Save changes
                </button>
              </div>
              {/* <SheetFooter>
              <SheetClose asChild>
                
              </SheetClose>
            </SheetFooter> */}
            </SheetContent>
          </Sheet>

          <div className="w-full max-w-[1000px] md:px-0 px-5">
            {/* <h1 className="border-2">Todays date</h1> */}
            <FullCalendar
              height={700}
              dayCellClassNames={"dayCell"}
              eventClassNames={"events"}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              weekends={true}
              events={allEvents}
              dateClick={(e) => {
                console.log(e.dateStr);
                setFieldValue("at", e.dateStr);
                setSheetOpen(true);
              }}
              eventClick={(e) => {
                console.log("Event's e", e);
                setEventToDisplay(
                  e.event._def.extendedProps as unknown as undefined
                );
                setEventSheetOpen(true);
              }}
            />
          </div>
        </form>
      </div>
      <EventSheet
        EventSheetOpen={eventSheetOpen}
        setEventSheetOpen={setEventSheetOpen}
        eventData={eventToDisplay}
      />
    </>
  );
};

export default EventsView;

// Interface for Event Sheet
interface EventSheetT {
  EventSheetOpen: boolean;
  setEventSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  eventData?: any;
}

// Sheet component for Existing Event
export const EventSheet: React.FC<EventSheetT> = ({
  EventSheetOpen,
  setEventSheetOpen,
  eventData,
}) => {
  // Edit Mode State
  const [editMode, setEditMode] = React.useState<boolean>(false);

  // DeleteModal state
  const [showModal, setShowModal] = React.useState<boolean>(false);

  // User/Token from redux
  const { user, token } = useSelector((state: any) => state.userSlice);

  // Edit/Delete Services
  const { mutateAsync: updateEvent, isPending: eventPending } = UpdateEventHook(
    token as string,
    eventData?._id
  );

  const { mutateAsync: deleteEvent, isPending: deletePending } =
    DeleteEventHook(token as string, eventData?._id);

  interface initialValuesT {
    description: string;
    price: number;
    at: string;
  }

  const initialValues: initialValuesT = {
    description: eventData?.description ? eventData.description : "",
    price: eventData?.price ? eventData.price : 0,
    at: eventData?.at ? eventData.at : "",
  };

  const {
    values,
    errors,
    touched,
    resetForm,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
  } = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: eventSchema,
    onSubmit: (values) => {
      try {
        console.log("$ Submitted", values);
        const updatingEvent = updateEvent(values);
        console.log("$ Create Event", updatingEvent);
        toast.success("Event Updated Successfully");
        // setSheetOpen(false);
        resetForm();
      } catch (err) {
        toast.error((err as any).response.data.message);
      }
    },
  });

  // Delete Click Fn
  const handleDeleteClick = async () => {
    try {
      // @ts-ignore
      const deleteEvents = deleteEvent();
      console.log("$ Delete Event", deleteEvent);
      toast.success("Event Deleted Successfully");
      setEventSheetOpen(false);
      setShowModal(false);
    } catch (err) {
      toast.error((err as any).response.data.message);
      setEventSheetOpen(false);
      setShowModal(false);
    }
  };

  // Edit Click Fn
  const handleEditClick = () => {
    setEditMode(true);
  };

  // Cancel Click Fn
  const handleCancelClick = () => {
    setEditMode(false);
  };

  // Save Click Fn
  const handleSaveClick = () => {
    handleSubmit();
    setEditMode(false);
    setEventSheetOpen(false);
  };

  console.log("event---data", eventData);

  return (
    <Sheet open={EventSheetOpen} onOpenChange={setEventSheetOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{eventData?.description}</SheetTitle>
          <SheetDescription>
            Event details can be edited or deleted below
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <div className="flex md:flex-row flex-col gap-3 justify-between">
            <label htmlFor="start" className="text-left">
              Date:
            </label>
            <div className="flex flex-col gap-2 max-w-[220px] w-full">
            <Input
              required
              id="at"
              name="at"
              type="date"
              value={values.at}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={!editMode}
              className="w-full"
            />
            {errors.at && touched.at && (
              <p className="text-sm py-1 text-red-600">{errors.at}</p>
            )}
            </div>
          </div>

          <div className="flex md:flex-row flex-col gap-3 justify-between">
            <label htmlFor="description" className="text-left mr-3">
              Description:
            </label>
            <div className="flex flex-col gap-2">
              <Input
                required
                id="description"
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className="max-w-[220px]"
                disabled={!editMode}
              />
              {errors.description && touched.description && (
                <p className="text-sm py-1 text-red-600">
                  {errors.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-3 justify-between">
            <label htmlFor="price" className="text-left">
              Price:
            </label>
            <div className="flex flex-col gap-2">
              <Input
                required
                id="price"
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                className="max-w-[220px]"
                disabled={!editMode}
              />
              {errors.price && touched.price && (
                <p className="text-sm py-1 text-red-600">{errors.price}</p>
              )}
            </div>
          </div>
          {/* Normal mode buttons */}
          {!editMode && (
            <div className="flex justify-around flex-row gap-2">
              <button
                className="h-[40px] bg-slate-400 rounded-xl border px-3 font-semibold"
                onClick={handleEditClick}
                type="button"
              >
                Edit
              </button>
              <button
                className="h-[40px] bg-red-500 text-white rounded-xl border px-3 font-semibold"
                onClick={() => {
                  setShowModal(true);
                }}
                type="button"
              >
                Delete
              </button>
            </div>
          )}
          {/* Edit Mode buttons */}
          {editMode && (
            <div className="flex justify-around flex-row gap-2">
              <button
                className="h-[40px] bg-slate-100 rounded-xl border px-3 font-semibold"
                onClick={handleCancelClick}
                type="button"
              >
                Cancel
              </button>
              <button
                className="h-[40px] bg-slate-400 rounded-xl border px-3 font-semibold"
                onClick={handleSaveClick}
                type="submit"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </SheetContent>
      {/* Modal for deletion */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogDescription>
              Are you sure you want to delete this event?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4"></div>
          <DialogFooter>
            <div className="w-full flex flex-row gap-2 justify-around ">
              <button
                className="h-[40px] bg-slate-400 rounded-xl border px-3 font-semibold"
                onClick={() => {
                  setShowModal(false);
                }}
                type="button"
              >
                Cancel
              </button>

              <button
                className="h-[40px] bg-slate-400 rounded-xl border px-3 font-semibold"
                onClick={handleDeleteClick}
                type="button"
              >
                Confirm
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Sheet>
  );
};

// const [myEvents, setMyEvents] = React.useState([
//   {
//     title: "event 1",
//     date: "2024-04-30",
//     description: "This is a description",
//     price: 600,
//   },
//   {
//     title: "event 2",
//     start: "2024-04-29",
//     end: "2024-05-05",
//     description: "This is a description",
//     price: 600,
//   },
// ]);
