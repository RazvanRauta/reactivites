import axios from 'axios'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'

import Loader from '@/app/layout/Loader'
import { useStore } from '@/app/stores'

import ActivityList from './ActivityList'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore()

  const { loadActivities, activityRegistry } = activityStore

  useEffect(() => {
    const controller = new AbortController()
    if (activityRegistry.size <= 1) loadActivities(controller.signal)

    return () => {
      controller.abort()
    }
  }, [activityRegistry.size, loadActivities])

  if (activityStore.loadingInitial) {
    return <Loader content="Loading app" />
  }

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <h2>Activity Filters</h2>
      </Grid.Column>
    </Grid>
  )
})
