// React Query Imports
import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";

//   Types
import { EventPayloadT } from "../../../Types/types/payload-types/event.payload";
import { CustomAxiosErrorType } from "../../../Types/types/shared.types";

// Utils
import { URL } from "../../api-base-urls";
import { PUT } from "../../axios.services";

export const UpdateEventHook = (
  token: string,
  id: string
): UseMutationResult<unknown, Error, EventPayloadT> => {
  const queryClient = useQueryClient();

  const UpdateEventFn = async (payload: EventPayloadT): Promise<unknown> => {
    const response = await PUT(URL.UPDATE_EVENT(id), payload, token);
    return response;
  };

  return useMutation({
    mutationFn: UpdateEventFn,
    onSuccess: (message, variables, context) => {
      return {
        message,
        variables,
        context,
      };
    },
    onError: (error: CustomAxiosErrorType) => {
      console.error({ error });
      return {
        error:
          error?.response?.data?.message ??
          "Can't access the server, please try again later.",
      };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
