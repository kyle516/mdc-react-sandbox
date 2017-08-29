import React, { PureComponent as Component } from 'react'

export default class Button extends Component {
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
    const classes = ['mdc-button', 'mdc-elevation--z2']

    if (this.props.ripple) {
      classes.push('mdc-ripple-surface')
    }

    return classes.join(' ')
  }

  render() {
    const { ripple, className, ...rest } = this.props
    return <button type="button" ref="root" className={this.className} {...rest} />
  }
}
