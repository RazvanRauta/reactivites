import { Message } from 'semantic-ui-react'

interface Props {
  errors: string[] | null
}

export default function ValidationErrors({ errors }: Props) {
  return (
    <Message error>
      {Boolean(errors) && (
        <Message.List>
          {errors?.map((err, i) => (
            <Message.Item key={`key-${i}`}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  )
}
