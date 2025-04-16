import { http } from "@api/request/axios";

type Result = {
  message: string;
  data: Array<any>;
  code: number;
};

export const getAsyncRoutes = () => {
  return http.get<Result>("/getAsyncRoutes");
};
