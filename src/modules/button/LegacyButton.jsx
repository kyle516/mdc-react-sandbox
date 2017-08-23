import React, { PureComponent as Component } from 'react'

export default class LegacyButton extends Component {
  componentDidMount() {
    if (this.props.ripple) {
      this.ripple = window.mdc.ripple.MDCRipple.attachTo(this.refs.root)
    }
  }

  componentWillUnmount() {
    if (this.ripple) {
      this.ripple.destroy()
    }
  }

  get className() {
    const classes = ['mdc-button']

    if (this.props.ripple) {
      classes.push('mdc-ripple-surface')
    }

    return classes.join(' ')
  }

  render() {
    const { children } = this.props
    return <button ref="root" className={this.className}>{children}</button>
  }
}
