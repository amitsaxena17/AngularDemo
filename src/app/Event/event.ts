// export class Event {
//   public id: number;
//   public title: string;
//   public description: string;
//   public startDate: Date;
//   public endDate: Date;
  

//    constructor(
//      id: number,
//      title: string,
//      description: string,
//      startDate: Date,
//      endDate: Date){}
//   }

export class EventColl {
  total: number;
  items?: (Event)[] | null;
}
export class Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}
