import format from 'date-fns/format'
import { observer } from 'mobx-react-lite'
import { Button, Card, Image } from 'semantic-ui-react'

import { useStore } from '@/app/stores'

export default observer(function ActivityDetails() {
  const {
    activityStore: { selectedActivity, cancelSelectedActivity, openForm },
  } = useStore()

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${selectedActivity?.category}.jpg`} />
      <Card.Content>
        <Card.Header>{selectedActivity?.title}</Card.Header>
        <Card.Meta>
          <span>{format(new Date(selectedActivity?.date || ''), 'MMM dd, yyyy')}</span>
        </Card.Meta>
        <Card.Description>{selectedActivity?.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(selectedActivity?.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button onClick={cancelSelectedActivity} basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  )
})
