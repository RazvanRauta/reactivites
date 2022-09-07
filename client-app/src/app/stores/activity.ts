import { AxiosError } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'

import api from '@/app/api'
import { Activity } from '@/app/models/activity'

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>()

  selectedActivity: Activity | undefined = undefined

  editMode = false

  loading = false

  loadingInitial = false

  submitting = false

  constructor() {
    makeAutoObservable(this)
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    )
  }

  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce<Record<string, Activity[]>>((activities, activity) => {
        const { date } = activity
        // eslint-disable-next-line no-param-reassign
        activities[date] = Boolean(activities?.date)
          ? [...activities[date], activity]
          : [activity]
        return activities
      }, {})
    )
  }

  loadActivities = async (abortSignal: AbortSignal) => {
    this.loadingInitial = true
    try {
      const response = await api.Activities.list(abortSignal)

      runInAction(() => {
        response?.forEach((activity) => {
          this.setActivity(activity)
        })
        this.loadingInitial = false
      })
    } catch (err) {
      const error = err as AxiosError
      if (error.code !== 'ERR_CANCELED') console.error(err)
      runInAction(() => {
        this.loadingInitial = false
      })
    }
  }

  loadActivity = async (id: string, abortSignal?: AbortSignal) => {
    let activity = this.getActivity(id)

    if (activity != null) {
      this.selectedActivity = activity
    } else {
      this.loadingInitial = true

      try {
        activity = await api.Activities.details(id, abortSignal)
        runInAction(() => {
          if (activity != null) {
            activity = this.setActivity(activity)
            this.selectedActivity = activity
          }
          this.loadingInitial = false
        })
      } catch (error) {
        console.error(error)
        runInAction(() => {
          this.loadingInitial = false
        })
      }
    }
    return activity
  }

  private readonly getActivity = (id: string) => {
    return this.activityRegistry.get(id)
  }

  private readonly setActivity = (activity: Activity) => {
    const formattedActivity = {
      ...activity,
      date: activity.date.split('T')[0],
    }
    this.activityRegistry.set(activity.id, formattedActivity)

    return formattedActivity
  }

  createActivity = async (activity: Activity) => {
    this.loading = true

    try {
      await api.Activities.create(activity)
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity)
        this.selectedActivity = activity
        this.editMode = false
      })
    } catch (error) {
      console.error(error)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  updateActivity = async (activity: Activity) => {
    this.loading = true

    try {
      await api.Activities.update(activity)
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity)
        this.selectedActivity = activity
        this.editMode = false
      })
    } catch (error) {
      console.error(error)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  deleteActivity = async (id: string) => {
    this.loading = true

    try {
      await api.Activities.delete(id)
      runInAction(() => {
        this.activityRegistry.delete(id)
      })
    } catch (error) {
      console.error(error)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }
}
