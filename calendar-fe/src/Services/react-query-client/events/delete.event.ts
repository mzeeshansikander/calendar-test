// React Query Imports
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";

// Service 
import { DELETE } from "../../axios.services";
import { URL } from "../../api-base-urls";

// Types
// import { Event } from "../../../Types/types/response-interface/event.response";
import { CustomAxiosErrorType } from "../../../Types/types/shared.types";

export const DeleteEventHook = (
  token: string,
  id:string
): UseMutationResult<unknown, Error> => {

  const DeleteEventFn = async (): Promise<unknown> => {
    const response = await DELETE(URL.DELETE_EVENT(id), token);
    return response;
  };

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteEventFn,
    onSuccess: (message, variables, context) => {
      // toast.success("Document deleted successfully");
      return {
        message,
        variables,
        context,
      };
    },
    onError: (error: CustomAxiosErrorType) => {
      console.error({ error });
      // toast.error(error?.response?.data?.message ?? "Something went wrong");
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
