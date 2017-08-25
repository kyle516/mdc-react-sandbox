import React, { PureComponent as Component } from 'react'
import { MDCRipple } from '@material/ripple'

export default class LegacyButton extends Component {
  componentDidMount() {
    if (this.props.ripple) {
      this.ripple = new MDCRipple(this.refs.root)
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
    const { ripple, className, ...rest } = this.props
    return <button ref="root" className={this.className} {...rest} />
  }
}
