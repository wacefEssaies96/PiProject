import { Component } from 'react'
import Navigation from '../components/Navigation'

// import Navigation from '../components/Navigation'
// import { login } from '../utils/auth'

// set up cookies

export default class Index extends Component {
  render() {
    return (
      <div>
        <h1>Main page</h1>
        
        <Navigation />
      </div>
    )
  }
}
