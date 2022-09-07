import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

import Loader from '@/app/layout/Loader'
import { useStore } from '@/app/stores'

import ActivityDetailedChat from './ActivityDetailedChat'
import ActivityDetailedHeader from './ActivityDetailedHeader'
import ActivityDetailedInfo from './ActivityDetailedInfo'
import ActivityDetailedSidebar from './ActivityDetailedSidebar'

export default observer(function ActivityDetails() {
  const { activityStore } = useStore()

  const { selectedActivity, loadActivity, loadingInitial } = activityStore

  const { id } = useParams()

  useEffect(() => {
    const controller = new AbortController()
    if (Boolean(id) && id != null)
      loadActivity(id, controller.signal).catch((e) => console.error(e))

    return () => {
      controller.abort()
    }
  }, [id, loadActivity])

  if (loadingInitial || selectedActivity == null) {
    return <Loader />
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={selectedActivity} />
        <ActivityDetailedInfo activity={selectedActivity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar />
      </Grid.Column>
    </Grid>
  )
})
