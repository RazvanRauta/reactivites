import { memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import ActivityDashboard from '@/features/activities/dashboard/ActivityDashboard'
import ActivityDetails from '@/features/activities/details/ActivityDetails'
import ActivityForm from '@/features/activities/form/ActivityForm'
import HomePage from '@/features/home/HomePage'

import Layout from './Layout'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route element={<Layout />}>
        <Route path="activities" element={<ActivityDashboard />} />
        <Route path="activities/:id" element={<ActivityDetails />} />
        {['createActivity', 'manage/:id'].map((path) => (
          <Route path={path} element={<ActivityForm />} key={path} />
        ))}
        <Route path="*" element={<p>There&apos;s nothing here: 404!</p>} />
      </Route>
    </Routes>
  )
}

export default memo(App)
