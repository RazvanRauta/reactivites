import format from 'date-fns/format'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, Image } from 'semantic-ui-react'

import Loader from '@/app/layout/Loader'
import { useStore } from '@/app/stores'

export default observer(function ActivityDetails() {
  const { activityStore } = useStore()

  const { selectedActivity, loadActivity, loadingInitial } = activityStore

  const { id } = useParams()

  useEffect(() => {
    const controller = new AbortController()
    if (id) loadActivity(id, controller.signal)

    return () => {
      controller.abort()
    }
  }, [id, loadActivity])

  if (loadingInitial || !selectedActivity) {
    return <Loader />
  }

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
            as={Link}
            to={`/manage/${selectedActivity.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button as={Link} to="/activities" basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  )
})
