import format from 'date-fns/format'
import { memo } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'

import { IActivity } from '@/models/activity'

interface IActivityListProps {
  activities: ReadonlyArray<IActivity>
  setActivity: (act: IActivity) => void
}

export default memo(function ActivityList({
  activities,
  setActivity,
}: IActivityListProps) {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
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
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => setActivity(activity)}
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
