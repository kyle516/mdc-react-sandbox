import React, { PureComponent as Component } from 'react'
import { Button, LegacyButton } from 'modules/button'

export default class App extends Component {
  render() {
    return (
      <div>
        <section>
          <h1>Buttons w/ foundation</h1>
          <Button>Default Button</Button>
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
