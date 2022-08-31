import axios from 'axios'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'

import Loader from '@/app/layout/Loader'
import { useStore } from '@/app/stores'

import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore()

  useEffect(() => {
    const controller = new AbortController()
    activityStore.loadActivities(controller.signal)

    return () => {
      controller.abort()
    }
  }, [activityStore])

  if (activityStore.loadingInitial) {
    return <Loader content="Loading app" />
  }

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        {activityStore.selectedActivity && !activityStore.editMode && <ActivityDetails />}
        {activityStore.editMode && <ActivityForm />}
      </Grid.Column>
    </Grid>
  )
})
