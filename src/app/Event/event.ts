
export class EventColl {
  total: number;
  items?: (Event)[] | null;
}
export class Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}