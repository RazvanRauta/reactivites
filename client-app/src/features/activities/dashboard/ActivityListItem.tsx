import { format } from 'date-fns'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Item, Segment } from 'semantic-ui-react'

import { Activity } from '@/app/models/activity'

type ActivityListItemProps = {
  activity: Activity
}

export default memo(function ActivityListItem({ activity }: ActivityListItemProps) {
  // const [target, setTarget] = useState('')

  // const handleActivityDelete = useCallback(
  //   (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
  //     setTarget(e.currentTarget.name)
  //     deleteActivity(id)
  //   },
  //   []
  // )

  return (
    <Segment.Group>
      <Segment>
        {/* {activity.isCancelled &&
                <Label attached='top' color='red' content='Cancelled' style={{textAlign: 'center'}} />
            } */}
        <Item.Group>
          <Item>
            <Item.Image
              style={{ marginBottom: 3 }}
              size="tiny"
              circular
              src="/assets/user.png"
            />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>
                Hosted by Bob
                {/* <Link to={`/profiles/${activity.hostUsername}`}>
                  {activity.host?.displayName}
                </Link> */}
              </Item.Description>
              {/* {activity.isHost && (
                <Item.Description>
                  <Label basic color="orange">
                    You are hosting this activity
                  </Label>
                </Item.Description>
              )}
              {activity.isGoing && !activity.isHost && (
                <Item.Description>
                  <Label basic color="green">
                    You are going to this activity
                  </Label>
                </Item.Description>
              )} */}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {format(new Date(activity.date), 'dd MMM yyyy h:mm aa')}
          <Icon name="marker" /> {activity.venue}
        </span>
      </Segment>
      <Segment secondary>
        Attendees go here
        {/* <ActivityListItemAttendee attendees={activity.attendees!} /> */}
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  )
})
