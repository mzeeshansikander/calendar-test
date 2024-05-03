// React Query 
import { useQuery, UseQueryResult } from "@tanstack/react-query";

// API & Service 
import { GET } from "../../axios.services";
import { URL } from "../../api-base-urls";

// Types 
import { EventResponseT } from "../../../Types/types/response-interface/event.response";


export const GetAllEvents = (
): UseQueryResult<EventResponseT, Error> => {

  const GetAllEventsFn = async (): Promise<EventResponseT> => {
    const response = await GET(
      URL.GET_ALL_EVENTS,""
    );
    return response as EventResponseT;
  };

  return useQuery({
    queryFn: GetAllEventsFn,
    queryKey: ["events"],
  });
};
