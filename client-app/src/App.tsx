import { Header, List } from 'semantic-ui-react'

import { ActivitiesResponseType } from './@types'
import useData from './hooks/useDate'

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
      <div>
        <Header as="h2" icon="users" content="Reactivities" />
        <List>
          {data.map((activity) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
      </div>
    )
  }

  return <div>No data...</div>
}

export default App
