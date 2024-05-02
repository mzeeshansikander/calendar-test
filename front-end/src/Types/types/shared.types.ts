import { AxiosError } from "axios";

export type CustomAxiosErrorType = AxiosError<{
  message: string;
  status?: number;
  statusCode?: number;
}>;
