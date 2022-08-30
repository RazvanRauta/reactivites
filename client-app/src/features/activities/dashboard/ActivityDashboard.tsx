import axios from 'axios'
import { observer } from 'mobx-react-lite'
import { Grid } from 'semantic-ui-react'

import { useStore } from '@/app/stores'

import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

export default observer(function ActivityDashboard() {
  const {
    activityStore: { selectedActivity, editMode },
  } = useStore()

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && <ActivityForm />}
      </Grid.Column>
    </Grid>
  )
})
