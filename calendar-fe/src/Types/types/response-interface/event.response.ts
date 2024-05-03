export interface Event {
  _id: string;
  owner: string;
  description: string;
  price: number;
  at: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface Meta {
  total: number;
  limit: number;
  offset: number;
  page: number;
}

export interface EventResponseT {
  events: Event[];
  meta: Meta;
}
