import { memo } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

interface Props {
  inverted?: boolean
  content?: string
}

function LoaderComponent({ inverted, content }: Props) {
  return (
    <Dimmer active inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  )
}

LoaderComponent.defaultProps = {
  inverted: true,
  content: 'Loading...',
}

export default memo(LoaderComponent)
