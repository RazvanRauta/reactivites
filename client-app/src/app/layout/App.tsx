import { Container } from 'semantic-ui-react'

import { ActivitiesResponseType } from '@/@types'
import ActivityDashboard from '@/features/activities/dashboard/ActivityDashboard'
import useData from '@/hooks/useData'

import NavBar from './NavBar'

function App() {
  const { data, loading, error } = useData<ActivitiesResponseType>('/activities', 'GET')

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
          <ActivityDashboard activities={data} />
        </Container>
      </>
    )
  }

  return <div>No data...</div>
}

export default App
