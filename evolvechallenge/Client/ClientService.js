import React from 'react'

var constants  = require('../helpers/const');

class ClientService extends React.Component {

  constructor(props) {
    super(props)
    this.state = { response: [] }
  }

  componentWillMount() {
    fetch(constants.serviceRestFullUrl)
      .then((response) => {
        return response.json()
      })
  }

  render() {
    return (
        <div>
            <h1>llega</h1>                         
        </div>
    )
  }
}

export default ClientService