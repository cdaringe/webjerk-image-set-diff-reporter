import React, { Component } from 'react'
import './App.css'
import SlideyThing from './SlideyThing'
import axios from 'axios'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentWillMount () {
    axios.get(process.env.REACT_APP_DIFFS)
    .then(res => {
      this.setState(Object.assign({}, this.state, { diffs: res.data }))
    })
  }
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Image Difference Report</h2>
        </div>
        <p className='content'>
          {(this.state.diffs || []).map((diff, i) => {
            return (
              <div>
                <h4>{diff.name}</h4>
                <SlideyThing diff={diff} />
              </div>
            )
          })}
        </p>
      </div>
    )
  }
}

export default App
