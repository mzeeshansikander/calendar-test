// React Query 
import { useQuery, UseQueryResult } from "@tanstack/react-query";

// API & Service 
import { GET } from "../../axios.services";
import { URL } from "../../api-base-urls";

// Types 
import { EventResponseT } from "../../../Types/types/response-interface/event.response";


export const GetMyAllEvents = (
): UseQueryResult<EventResponseT, Error> => {

  const GetMyAllEventsFn = async (): Promise<EventResponseT> => {
    const response = await GET(URL.GET_MY_EVENTS,"")
    return response as EventResponseT;
  };

  return useQuery({
    queryFn: GetMyAllEventsFn,
    queryKey: ["events"],
  });
};
