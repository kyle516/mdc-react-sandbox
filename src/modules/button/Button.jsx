import React, { PureComponent as Component } from 'react'
import { MDCRipple, MDCRippleFoundation } from '@material/ripple'
import without from 'lodash/without'
import forEach from 'lodash/forEach'

export default class Button extends Component {

  // スタイルはstateで管理します。
  state = {
    classes: [
      'mdc-button',
      'mdc-ripple-surface'
    ],
    rippleCss: {}
  }

  // createAdapterでデフォルトのadapterを生成してから上書きします。
  // デフォルトではCSSクラス名もDOMを直接書き換えるので、Reactに任せたい部分はここでリプレイスします。
  rippleFoundation = new MDCRippleFoundation(Object.assign(MDCRipple.createAdapter(this), {
    addClass: className => {
      this.setState(state => ({
        classes: state.classes.concat(className)
      }))
    },
    removeClass: className => {
      this.setState(state => ({
        classes: without(state.classes, className)
      }))
    },
    registerInteractionHandler: (eventType, handler) => {
      if (!this.refs.root) return
      this.refs.root.addEventListener(eventType, handler)
    },
    deregisterInteractionHandler: (eventType, handler) => {
      if (!this.refs.root) return
      this.refs.root.removeEventListener(eventType, handler)
    },
    updateCssVariable: (varName, value) => {
      this.setState(state => ({
        rippleCss: {
          ...state.rippleCss,
          [varName]: value
        }
      }))
    }
  }))

  componentDidMount() {
    if (this.props.ripple) {
      // createAdapterで生成されたadapterは、デフォルトでinstance.root_を参照するのでバインドしておきます。
      this.root_ = this.refs.root
      this.rippleFoundation.init()
    }
  }

  componentDidUpdate() {
    if (this.refs.root) {
      // アニメーションのスタイルはpropsを通して渡すと無視されてしまうので、直接DOMを操作します。
      forEach(this.state.rippleCss, (v, k) => {
        this.refs.root.style.setProperty(k, v)
      })
    }
  }

  componentWillUnmount() {
    if (this.props.ripple) {
      this.rippleFoundation.destroy()
    }
  }

  render() {
    const { ripple, className, ...rest } = this.props
    return <button ref="root" className={this.state.classes.join(' ')} {...rest} />
  }
}
