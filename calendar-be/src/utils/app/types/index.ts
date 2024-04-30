export interface GenerateOTPOptions {
  digits: boolean;
  lowerCaseAlphabets: boolean;
  upperCaseAlphabets: boolean;
  specialChars: boolean;
}

export interface PaginationResponse<T> {
  meta: Metadata;
  data: T[];
}

export interface Metadata {
  count: number;
  limit: number;
  page: number;
  totalPages: number;
}

export enum AuthorizationHeader {
  BEARER = 'Bearer Authorization',
  BASIC = 'Authorization',
}

export enum RegexError {
  ALPHABETIC = 'must only contain letters and spaces',
  ALPHANUMERIC = 'must only contain letters, numbers, and spaces',
  NUMERIC = 'must only contain numbers',
}
