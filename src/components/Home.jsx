import React, { Component } from 'react'
import img from '../assets/images/series-tv.jpg'

export default class Home extends Component {
  render() {
    return (
      <div className='container'><img src={img} alt="" height="300px" /></div>
    )
  }
}
