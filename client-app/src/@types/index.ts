export enum City {
  London = 'London',
  Paris = 'Paris',
}

export interface IActivity {
  id: string
  title: string
  date: Date
  description: string
  category: string
  city: City
  venue: string
}

export type ActivitiesResponseType = ReadonlyArray<IActivity>
