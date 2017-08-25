import React, { PureComponent as Component } from 'react'
import { Button, LegacyButton } from 'modules/button'
import { Drawer } from 'modules/drawer'
import './style.css'

export default class App extends Component {

  state = {
    isDrawerOpen: false
  }

  toggleDrawer = () => {
    this.setState(state => ({
      isDrawerOpen: !state.isDrawerOpen
    }))
  }

  render() {
    return (
      <div>
        <Drawer open={this.state.isDrawerOpen} title="Drawer w/ foundation">
          <a className="mdc-list-item mdc-permanent-drawer--selected" href="#">
            <i className="material-icons mdc-list-item__start-detail" />
            <span>Inbox</span>
          </a>
          <a className="mdc-list-item" href="#">
            <i className="material-icons mdc-list-item__start-detail" />
            <span>Star</span>
          </a>
        </Drawer>

        <section>
          <h1>Buttons w/ foundation</h1>
          <Button onClick={this.toggleDrawer}>Default Button</Button>
          <Button ripple>Ripple Button</Button>
        </section>
        <section>
          <h1>Buttons without foundation</h1>
          <LegacyButton>Default Button</LegacyButton>
          <LegacyButton ripple>Ripple Button</LegacyButton>
        </section>
      </div>
    )
  }
}
