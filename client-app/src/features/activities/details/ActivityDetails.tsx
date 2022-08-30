import format from 'date-fns/format'
import { memo } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

import { Activity } from '@/models/activity'

type IActivityDetailsProps = {
  activity: Activity
  cancelSelectActivity: () => void
  openForm: (id: string) => void
}

export default memo(function ActivityDetails({
  activity,
  cancelSelectActivity,
  openForm,
}: IActivityDetailsProps) {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{format(new Date(activity.date), 'MMM dd, yyyy')}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(activity.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button onClick={cancelSelectActivity} basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  )
})
