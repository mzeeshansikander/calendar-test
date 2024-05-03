// React Query Imports
import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";

// Types
import { EventPayloadT } from "../../../Types/types/payload-types/event.payload";
import { CustomAxiosErrorType } from "../../../Types/types/shared.types";

// Utils
import { URL } from "../../api-base-urls";
import { POST } from "../../axios.services";

export const CreateEventHook = (
  token: string
): UseMutationResult<unknown, Error, EventPayloadT> => {
  const queryClient = useQueryClient();

  const CreateEventFn = async (payload: EventPayloadT): Promise<unknown> => {
    const response = await POST(URL.CREATE_EVENT, payload, token);
    return response;
  };

  return useMutation({
    mutationFn: CreateEventFn,
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
