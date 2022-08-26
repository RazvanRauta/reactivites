import { IActivity } from '@/models/activity'

export type ActivitiesResponseType = ReadonlyArray<IActivity>

export type FunctionWithoutArgs<T> = () => T
