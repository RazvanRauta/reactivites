import { AxiosError } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'
import { v4 as uuid } from 'uuid'

import api from '@/api'
import { Activity } from '@/models/activity'

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>()

  selectedActivity: Activity | undefined = undefined

  editMode = false

  loading = false

  loadingInitial = true

  submitting = false

  constructor() {
    makeAutoObservable(this)
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    )
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state
  }

  loadActivities = async (abortSignal: AbortSignal) => {
    try {
      const response = await api.Activities.list(abortSignal)

      runInAction(() => {
        response?.forEach((activity) => {
          this.activityRegistry.set(activity.id, {
            ...activity,
            date: activity.date.split('T')[0],
          })
        })
      })
    } catch (err) {
      const error = err as AxiosError
      if (error.code !== 'ERR_CANCELED') console.error(err)
    } finally {
      this.setLoadingInitial(false)
    }
  }

  selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id)
  }

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined
  }

  openForm = (id?: string) => {
    // eslint-disable-next-line no-unused-expressions
    id ? this.selectActivity(id) : this.cancelSelectedActivity()
    this.editMode = true
  }

  closeForm = () => {
    this.editMode = false
  }

  createActivity = async (activity: Activity) => {
    this.loading = true

    const newActivity = { ...activity, id: uuid() }

    try {
      await api.Activities.create(newActivity)
      runInAction(() => {
        this.activityRegistry.set(newActivity.id, newActivity)
        this.selectedActivity = newActivity
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
        if (this.selectedActivity?.id === id) {
          this.cancelSelectedActivity()
        }
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
