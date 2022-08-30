import format from 'date-fns/format'
import { observer } from 'mobx-react-lite'
import { SyntheticEvent, useCallback, useState } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'

import { useStore } from '@/app/stores'

export default observer(function ActivityList() {
  const {
    activityStore: { activitiesByDate, selectActivity, loading, deleteActivity },
  } = useStore()

  const [target, setTarget] = useState('')

  const handleActivityDelete = useCallback(
    (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
      setTarget(e.currentTarget.name)
      deleteActivity(id)
    },
    []
  )

  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{format(new Date(activity.date), 'MMM dd, yyyy')}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectActivity(activity.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={activity.id}
                  loading={loading && target === activity.id}
                  onClick={(e) => handleActivityDelete(e, activity.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
})
