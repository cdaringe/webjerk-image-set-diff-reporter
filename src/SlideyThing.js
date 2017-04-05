import React, { Component } from 'react'
import ImageDiff from 'react-image-diff'

export default class SlideyThing extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleInputChange.bind(this)
  }
  handleInputChange (evt) {
    this.setState(Object.assign({}, this.state, {
      value: parseFloat(evt.target.value, 10)
    }))
  }
  render () {
    const diff = this.props.diff
    const value = typeof this.state.value === 'number' ? this.state.value : 0.5
    // https://github.com/cezary/react-image-diff/blob/gh-pages/index.html
    return (
      <div>
        <ImageDiff before={`a-${diff.name}`} after={`b-${diff.name}`} type='swipe' value={value} />
        <br />
        <input
          type='range'
          defaultValue={value}
          min={0}
          max={1}
          step={0.01}
          onChange={this.handleInputChange.bind(this)}
          disabled={this.state.type === 'difference'}
        />
        <pre>{JSON.stringify(diff, null, 2)}</pre>
      </div>
    )
  }
}

