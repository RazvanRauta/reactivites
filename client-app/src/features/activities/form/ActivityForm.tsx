import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'

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

export default function ActivityForm({
  cancelEdit,
  editedActivity,
  refreshData,
}: ActivityFormProps) {
  const [updatedActivity, setUpdatedActivity] = useState<IActivity | null>(editedActivity)
  const { loading, error, doRequest } = useRequest<void>({
    url: `/activities/${updatedActivity?.id}`,
    method: 'PUT',
    onSuccess: () => refreshData(),
  })

  useEffect(() => {
    setUpdatedActivity(editedActivity)
  }, [editedActivity])

  const handleChange = (
    _event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    { name, value }: ValueData
  ) => {
    if (name && updatedActivity) {
      setUpdatedActivity({ ...updatedActivity, [name]: value })
    }
  }

  const handleSubmit = useCallback(() => {
    if (updatedActivity) {
      doRequest(updatedActivity)
    }
  }, [updatedActivity])

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Title"
          name="title"
          value={updatedActivity?.title}
          onChange={handleChange}
        />
        <Form.TextArea
          placeholder="Description"
          name="description"
          value={updatedActivity?.description}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Category"
          name="category"
          value={updatedActivity?.category}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Date"
          name="date"
          value={updatedActivity?.date}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="City"
          name="city"
          value={updatedActivity?.city}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Venue"
          name="venue"
          value={updatedActivity?.venue}
          onChange={handleChange}
        />

        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
          disabled={loading}
        />
        <Button floated="right" type="button" content="Cancel" onClick={cancelEdit} />
      </Form>

      {Boolean(error) && <div>Error: {error}</div>}
    </Segment>
  )
}
