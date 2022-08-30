import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'

import { Activity } from '@/models/activity'

interface ActivityFormProps {
  activity: Activity | undefined
  closeForm: () => void
  createOrEdit: (activity: Activity) => void
  submitting: boolean
}

export default memo(function ActivityForm({
  activity: selectedActivity,
  closeForm,
  createOrEdit,
  submitting,
}: ActivityFormProps) {
  const initialState = {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  }

  const [activity, setActivity] = useState(initialState)

  const handleSubmit = useCallback(() => {
    createOrEdit(activity)
  }, [activity])

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target
      setActivity({ ...activity, [name]: value })
    },
    [activity]
  )

  useEffect(() => {
    let ignore = false

    if (!ignore) setActivity(selectedActivity ?? initialState)

    return () => {
      ignore = true
    }
  }, [selectedActivity])

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
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button onClick={closeForm} floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  )
})
