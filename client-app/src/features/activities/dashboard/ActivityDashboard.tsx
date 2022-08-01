import { useState } from 'react'
import { Grid } from 'semantic-ui-react'

import { IActivity } from '@/models/activity'

import ActivityDetails from '../details/ActivityDetails'
import ActivityList from './ActivityList'

interface IActivityDashboardProps {
  activities: ReadonlyArray<IActivity>
}

export default function ActivityDashboard({ activities }: IActivityDashboardProps) {
  const [activity, setActivity] = useState<IActivity | null>(null)
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} setActivity={setActivity} />
      </Grid.Column>
      <Grid.Column width="6">
        {activity && <ActivityDetails activity={activity} />}
      </Grid.Column>
    </Grid>
  )
}
