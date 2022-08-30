import { memo } from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

type NavBarProps = {
  openForm: () => void
}

export default memo(function NavBar({ openForm }: NavBarProps) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button onClick={openForm} positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  )
})
