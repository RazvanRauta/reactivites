import { observer } from 'mobx-react-lite'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Form, Segment } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'

import Loader from '@/app/layout/Loader'
import { Activity } from '@/app/models/activity'
import { useStore } from '@/app/stores'

export default observer(function ActivityForm() {
  const initialState = {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  }

  const {
    activityStore: {
      updateActivity,
      createActivity,
      loading,
      loadActivity,
      loadingInitial,
    },
  } = useStore()
  const { id } = useParams()
  const navigate = useNavigate()

  const [activity, setActivity] = useState<Activity>(initialState)

  const handleSubmit = useCallback(() => {
    if (activity?.id?.length > 0) {
      updateActivity(activity)
        .then(() => {
          navigate(`/activities/${activity.id}`)
        })
        .catch((e) => console.error(e))
    } else {
      const newActivity = { ...activity, id: uuid() }
      createActivity(newActivity)
        .then(() => {
          navigate(`/activities/${newActivity.id}`)
        })
        .catch((e) => console.error(e))
    }
  }, [activity])

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target
      setActivity({ ...activity, [name]: value })
    },
    [activity]
  )

  useEffect(() => {
    const controller = new AbortController()
    let ignore = false

    if (Boolean(id) && id != null)
      loadActivity(id, controller.signal)
        .then((act) => {
          if (!ignore) setActivity(act ?? initialState)
        })
        .catch((e) => console.error(e))
    else setActivity(initialState)

    return () => {
      controller.abort()
      ignore = true
    }
  }, [id, loadActivity])

  if (loadingInitial || activity == null) {
    return <Loader />
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          name="title"
          value={activity?.title}
          onChange={handleChange}
        />
        <Form.TextArea
          placeholder="Description"
          name="description"
          value={activity?.description}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Category"
          name="category"
          value={activity?.category}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Date"
          name="date"
          type="date"
          value={activity?.date}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="City"
          name="city"
          value={activity?.city}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Venue"
          name="venue"
          value={activity?.venue}
          onChange={handleChange}
        />

        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          as={Link}
          to="/activities"
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  )
})
