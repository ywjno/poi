import SAlert from 'react-s-alert'
import { join } from 'path'
import React from 'react'

class Toastr extends React.Component {
  componentDidMount = () => {
    window.toastInitializer(SAlert)
  }
  render () {
    return (
      <div>
      <link rel="stylesheet" href={join(__dirname, 'assets', 'toast-animate.css')} />
      <link rel="stylesheet" href={join(__dirname, 'assets', 'toast.css')} />
        <SAlert ref="container"
                stack={true}
                className="toast-poi" />
      </div>
    )
  }
}

export { Toastr }
