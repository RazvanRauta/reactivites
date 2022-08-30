import { Activity } from '@/models/activity'

export type ActivitiesResponseType = ReadonlyArray<Activity>

export type FunctionWithoutArgs<T> = () => T
