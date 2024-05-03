/**
 * Base URL that will be treated as global start-point.
 */
export const BASE_URL = process.env.REACT_APP_BASE_URL as string;

export const URL = {
  // User Authentication

  USER_LOGIN: `${BASE_URL}/v1/auth/user/login`,
  USER_REGISTER: `${BASE_URL}/v1/auth/user/register`,

  //   Events
  CREATE_EVENT: `${BASE_URL}/v1/event`,
  GET_ALL_EVENTS: `${BASE_URL}/v1/event`,
  UPDATE_EVENT: (id: string) => `${BASE_URL}/v1/event/${id}`,
  DELETE_EVENT: (id: string) => `${BASE_URL}/v1/event/${id}`,
  GET_MY_EVENTS: `${BASE_URL}/v1/event/my?limit=100`,
} as const;
