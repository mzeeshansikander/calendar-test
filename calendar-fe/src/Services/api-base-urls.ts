
/**
 * Live URL that checks if the app is in production or development.
 */
const IS_LIVE = false;
// const IS_LIVE = false;

/**
 * Production URL that will be treated as global start-point and is connected to production backend API.
 */
const PRODUCTION_URL = process.env.NEXT_PUBLIC_API_URL as string;

/**
 * Local URL that will be treated as global start-point and is connected to local backend or AWS Elastic API.
 */
// const LOCAL_URL = "http://192.168.0.158:8080" as string;
const LOCAL_URL = "http://localhost:8080" as string;


/**
 * Base URL that will be treated as global start-point.
 */
export const BASE_URL = IS_LIVE ? PRODUCTION_URL : LOCAL_URL;

export const URL = {
  // User Authentication 

  USER_LOGIN: `${BASE_URL}/v1/auth/user/login`,
  USER_REGISTER: `${BASE_URL}/v1/auth/user/register`,

//   Events
  CREATE_EVENT: `${BASE_URL}/v1/event`,
  GET_ALL_EVENTS : `${BASE_URL}/v1/event`,
  UPDATE_EVENT: (id:string)=> `${BASE_URL}/v1/event/${id}`,
  DELETE_EVENT: (id:string)=> `${BASE_URL}/v1/event/${id}`,
  GET_MY_EVENTS : `${BASE_URL}/v1/event/my?limit=100`

} as const;
