import { memo, useCallback, useState } from 'react'
import { Grid } from 'semantic-ui-react'

import { DoRequestType } from '@/hooks/useRequest'
import { IActivity } from '@/models/activity'

import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface IActivityDashboardProps {
  activities: ReadonlyArray<IActivity>
  refreshData: DoRequestType
}

export default memo(function ActivityDashboard({
  activities,
  refreshData,
}: IActivityDashboardProps) {
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null)
  const [editMode, setEditMode] = useState<boolean>(false)

  const handleSelectActivity = useCallback((newSelectedActivity: IActivity) => {
    setSelectedActivity(newSelectedActivity)
  }, [])

  const handleEnableEditMode = useCallback(() => {
    setEditMode(true)
  }, [])

  const handleCancelEditMode = useCallback(() => {
    setEditMode(false)
  }, [])

  const handleCancelSelectActivity = useCallback(() => {
    setSelectedActivity(null)
    setEditMode(false)
  }, [])

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} setActivity={handleSelectActivity} />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && (
          <ActivityDetails
            selectedActivity={selectedActivity}
            cancelSetActivity={handleCancelSelectActivity}
            enableEditMode={handleEnableEditMode}
          />
        )}
        {editMode && (
          <ActivityForm
            editedActivity={selectedActivity}
            cancelEdit={handleCancelEditMode}
            refreshData={refreshData}
          />
        )}
      </Grid.Column>
    </Grid>
  )
})
