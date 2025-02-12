export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
}

export interface EventsResponse {
  events: Event[];
  total: number;
}
