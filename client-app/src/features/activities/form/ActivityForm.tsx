import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'

import { FunctionWithoutArgs } from '@/@types'
import useRequest, { DoRequestType } from '@/hooks/useRequest'
import { IActivity } from '@/models/activity'

interface ActivityFormProps {
  cancelEdit: FunctionWithoutArgs<void>
  editedActivity: IActivity | null
  refreshData: DoRequestType
}

interface ValueData {
  name?: keyof IActivity
  value?: string | Date | number
}

export default memo(function ActivityForm({
  cancelEdit,
  editedActivity,
  refreshData,
}: ActivityFormProps) {
  const initialState = editedActivity ?? {
    id: '',
    title: '',
    category: '',
    city: '',
    date: '',
    description: '',
    venue: '',
  }

  const [activity, setActivity] = useState<IActivity>(initialState)
  const {
    loading: updatingActivity,
    error: updateActivityError,
    doRequest: updateActivity,
  } = useRequest<void>({
    url: `/activities/${activity?.id}`,
    method: 'PUT',
    onSuccess: () => refreshData(),
  })

  const {
    loading: creatingActivity,
    error: createActivityError,
    doRequest: createActivity,
  } = useRequest<void>({
    url: `/activities`,
    method: 'POST',
    onSuccess: () => refreshData(),
  })

  useEffect(() => {
    setActivity(initialState)
  }, [editedActivity])

  const handleChange = (
    _event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    { name, value }: ValueData
  ) => {
    if (name) {
      setActivity({ ...activity, [name]: value })
    }
  }

  const handleSubmit = useCallback(() => {
    if (activity?.id) {
      updateActivity(activity)
    } else {
      createActivity({ ...activity, id: uuid() })
    }
  }, [activity])

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
          floated="right"
          positive
          type="submit"
          content="Submit"
          disabled={updatingActivity || creatingActivity}
        />
        <Button floated="right" type="button" content="Cancel" onClick={cancelEdit} />
      </Form>

      {Boolean(updateActivityError) && <div>Error: {updateActivityError}</div>}
      {Boolean(createActivityError) && <div>Error: {createActivityError}</div>}
    </Segment>
  )
})
