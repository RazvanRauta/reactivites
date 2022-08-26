import { useEffect } from 'react'
import { Container } from 'semantic-ui-react'

import { ActivitiesResponseType } from '@/@types'
import ActivityDashboard from '@/features/activities/dashboard/ActivityDashboard'
import useRequest from '@/hooks/useRequest'

import NavBar from './NavBar'

function App() {
  const { data, loading, error, doRequest } = useRequest<ActivitiesResponseType>({
    url: '/activities',
    method: 'GET',
  })

  useEffect(() => {
    let ignore = false
    if (!ignore) {
      doRequest()
    }

    return () => {
      ignore = true
    }
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (data && data.length) {
    return (
      <>
        <NavBar />
        <Container style={{ marginTop: '7em' }}>
          <ActivityDashboard activities={data} refreshData={doRequest} />
        </Container>
      </>
    )
  }

  return <div>No data...</div>
}

export default App
