import format from 'date-fns/format'
import { memo } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

import { FunctionWithoutArgs } from '@/@types'
import { IActivity } from '@/models/activity'

type IActivityDetailsProps = {
  selectedActivity: IActivity
  cancelSetActivity: FunctionWithoutArgs<void>
  enableEditMode: FunctionWithoutArgs<void>
}

export default memo(function ActivityDetails({
  selectedActivity,
  cancelSetActivity,
  enableEditMode,
}: IActivityDetailsProps) {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${selectedActivity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{selectedActivity.title}</Card.Header>
        <Card.Meta>
          <span>{format(new Date(selectedActivity.date), 'MMM dd, yyyy')}</span>
        </Card.Meta>
        <Card.Description>{selectedActivity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button basic color="blue" content="Edit" onClick={enableEditMode} />
          <Button basic color="grey" content="Cancel" onClick={cancelSetActivity} />
        </Button.Group>
      </Card.Content>
    </Card>
  )
})
