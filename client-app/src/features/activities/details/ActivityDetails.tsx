import format from 'date-fns/format'
import { Button, Card, Image } from 'semantic-ui-react'

import { IActivity } from '@/models/activity'

type IActivityDetailsProps = {
  activity: IActivity
}

export default function ActivityDetails({ activity }: IActivityDetailsProps) {
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
          <Button basic color="blue" content="Edit" />
          <Button basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  )
}
