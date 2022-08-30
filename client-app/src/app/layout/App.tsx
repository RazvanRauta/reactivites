import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Container } from 'semantic-ui-react'

import ActivityDashboard from '@/features/activities/dashboard/ActivityDashboard'

import { useStore } from '../stores'
import Loader from './Loader'
import NavBar from './NavBar'

function App() {
  const {
    activityStore: { loadActivities, loadingInitial },
  } = useStore()

  useEffect(() => {
    let ignore = false
    const controller = new AbortController()
    if (!ignore) loadActivities(controller.signal)

    return () => {
      ignore = true
      controller.abort()
    }
  }, [loadActivities])

  if (loadingInitial) {
    return <Loader content="Loading app" />
  }

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>
    </>
  )
}

export default observer(App)
