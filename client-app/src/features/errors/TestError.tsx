import axios from 'axios'
import React, { useState } from 'react'
import { Button, Header, Segment } from 'semantic-ui-react'

import ValidationErrors from './ValidationErrors'

export default function TestErrors() {
  const baseUrl = import.meta.env.VITE_API_URL
  const [errors, setErrors] = useState<string[] | null>(null)

  const handleNotFound = () => {
    axios.get(`${baseUrl}buggy/not-found`).catch((err) => console.error(err.response))
  }

  const handleBadRequest = () => {
    axios.get(`${baseUrl}buggy/bad-request`).catch((err) => console.error(err.response))
  }

  const handleServerError = () => {
    axios.get(`${baseUrl}buggy/server-error`).catch((err) => console.error(err.response))
  }

  const handleUnauthorized = () => {
    axios.get(`${baseUrl}buggy/unauthorized`).catch((err) => console.error(err.response))
  }

  const handleBadGuid = () => {
    axios.get(`${baseUrl}activities/notaguid`).catch((err) => console.error(err))
  }

  const handleValidationError = () => {
    axios.post(`${baseUrl}activities`, {}).catch((err) => setErrors(err))
  }

  return (
    <>
      <Header as="h1" content="Test Error component" />
      <Segment>
        <Button.Group widths="7">
          <Button onClick={handleNotFound} content="Not Found" basic primary />
          <Button onClick={handleBadRequest} content="Bad Request" basic primary />
          <Button
            onClick={handleValidationError}
            content="Validation Error"
            basic
            primary
          />
          <Button onClick={handleServerError} content="Server Error" basic primary />
          <Button onClick={handleUnauthorized} content="Unauthorized" basic primary />
          <Button onClick={handleBadGuid} content="Bad Guid" basic primary />
        </Button.Group>
      </Segment>
      {Boolean(errors) && <ValidationErrors errors={errors} />}
    </>
  )
}
