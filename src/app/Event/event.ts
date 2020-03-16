
export class EventColl {
  total: number;
  items?: (Event)[] | null;
}
export class Event {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  public constructor(init?: Partial<Event>) {
    Object.assign(this, init);
  }
}