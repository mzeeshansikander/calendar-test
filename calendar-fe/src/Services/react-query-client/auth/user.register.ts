// React Query Imports
import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";

// API & Service Imports
import { URL } from "../../api-base-urls";
import { POST } from "../../axios.services";

// Toast Import
import toast from "react-hot-toast";

// Custom Types Imports
import { USER_REGISTRATION_PAYLOAD } from "../../../Types/types/payload-types/auth-payload";
import { CustomAxiosErrorType } from "../../../Types/types/shared.types";

export const UserRegistrationMutationHook = (): UseMutationResult<
  unknown,
  Error,
  USER_REGISTRATION_PAYLOAD
> => {
  const queryClient = useQueryClient();

  const userRegisterFn = async (
    payload: USER_REGISTRATION_PAYLOAD
  ): Promise<unknown> => {
    const response = await POST(URL.USER_REGISTER, payload);
    return response;
  };

  return useMutation({
    mutationFn: userRegisterFn,
    onSuccess: (message, variables, context) => {
      return {
        message,
        variables,
        context,
      };
    },
    onError: (error: CustomAxiosErrorType) => {
      console.error({ error });

      toast.error(error?.response?.data?.message ?? "Registration Failed");

      return {
        error:
          error?.response?.data?.message ??
          "Can't access the server, please try again later.",
      };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
