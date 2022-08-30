import { memo, useCallback, useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'

import api from '@/api'
import ActivityDashboard from '@/features/activities/dashboard/ActivityDashboard'
import { Activity } from '@/models/activity'

import Loader from './Loader'
import NavBar from './NavBar'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(
    undefined
  )
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let ignore = false
    api.Activities.list().then((response) => {
      const activitiesData = response.map((activity) => {
        return { ...activity, date: activity.date.split('T')[0] }
      })
      if (!ignore) {
        setActivities(activitiesData)
        setLoading(false)
      }
    })
    return () => {
      ignore = true
    }
  }, [])

  const handleSelectActivity = useCallback(
    (id: string) => {
      setSelectedActivity(activities.find((x) => x.id === id))
    },
    [activities]
  )

  const handleCancelSelectActivity = useCallback(() => {
    setSelectedActivity(undefined)
  }, [])

  const handleFormOpen = useCallback(
    (id?: string) => {
      // eslint-disable-next-line no-unused-expressions
      id ? handleSelectActivity(id) : handleCancelSelectActivity()
      setEditMode(true)
    },
    [activities]
  )

  const handleFormClose = useCallback(() => {
    setEditMode(false)
  }, [])

  const handleCreateOrEditActivity = useCallback(
    (activity: Activity) => {
      setSubmitting(true)
      if (activity.id) {
        api.Activities.update(activity).then(() => {
          setActivities([...activities.filter((x) => x.id !== activity.id), activity])
          setSelectedActivity(activity)
          setEditMode(false)
          setSubmitting(false)
        })
      } else {
        const activityWithId = { ...activity, id: uuid() }
        api.Activities.create(activityWithId).then(() => {
          setActivities([...activities, activity])
          setSelectedActivity(activityWithId)
          setEditMode(false)
          setSubmitting(false)
        })
      }
    },
    [activities]
  )

  const handleDeleteActivity = useCallback(
    (id: string) => {
      setSubmitting(true)
      api.Activities.delete(id).then(() => {
        setActivities([...activities.filter((x) => x.id !== id)])
        setSubmitting(false)
        if (selectedActivity?.id === id) {
          setSelectedActivity(undefined)
        }
      })
    },
    [activities, selectedActivity]
  )

  if (loading) {
    return <Loader content="Loading app" />
  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  )
}

export default memo(App)
