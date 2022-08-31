import { memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import ActivityDashboard from '@/features/activities/dashboard/ActivityDashboard'
import ActivityForm from '@/features/activities/form/ActivityForm'
import HomePage from '@/features/home/HomePage'

import Layout from './Layout'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="activities" element={<ActivityDashboard />} />
        <Route path="createActivity" element={<ActivityForm />} />
        <Route path="*" element={<p>There&apos;s nothing here: 404!</p>} />
      </Route>
    </Routes>
  )
}

export default memo(App)
