import React, { PureComponent as Component } from 'react'
import { strings } from '@material/drawer/temporary/constants'


export default class Wrapper extends Component {
  state = {
    open: false
  }

  emit = (nextState = !this.state.open) => {
    this.setState({
      open: nextState
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      this.emit()
    }
  }

  render() {
    return <Drawer {...this.props} open={this.state.open} emit={this.emit} />
  }

}


class Drawer extends Component {
  componentDidMount() {
    this.init()
  }

  componentWillUnmount() {
    this.destroy()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open && this.drawer.open !== nextProps.open) {
      this.drawer.open = nextProps.open
    }
  }

  init() {
    this.drawer = window.mdc.drawer.MDCTemporaryDrawer.attachTo(this.refs.root)
    this.drawer.listen(strings.OPEN_EVENT, () => this.props.emit(true))
    this.drawer.listen(strings.CLOSE_EVENT, () => this.props.emit(false))
  }

  destroy() {
    this.drawer.destroy()
  }

  render() {
    const { children, title } = this.props
    return (
      <aside ref="root" className="mdc-temporary-drawer mdc-typography">
        <nav className="mdc-temporary-drawer__drawer">
          <header className="mdc-temporary-drawer__header" style={{ background: '#009688', color: '#fff' }}>
            <div className="mdc-temporary-drawer__header-content">
              {title}
            </div>
          </header>
          <nav className="mdc-temporary-drawer__content mdc-list">
            {children}
          </nav>
        </nav>
      </aside>
    )
  }
}
