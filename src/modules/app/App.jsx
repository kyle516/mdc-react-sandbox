import React, { PureComponent as Component } from 'react'
import { Button, ButtonWithFoundation } from 'modules/button'
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

  buttonStyle = {
    width: '100%',
    height: '100px',
    marginBottom: '1em',
    display: 'block'
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
          <h1>Buttons without foundation</h1>
          <Button style={this.buttonStyle}>Default Button</Button>
          <Button ripple style={this.buttonStyle}>Ripple Button (good on iOS)</Button>
        </section>
        <section>
          <h1>Buttons with foundation</h1>
          <ButtonWithFoundation style={this.buttonStyle}>Default Button</ButtonWithFoundation>
          <ButtonWithFoundation ripple style={this.buttonStyle}>Ripple Button (won't work on iOS)</ButtonWithFoundation>
        </section>
      </div>
    )
  }
}
