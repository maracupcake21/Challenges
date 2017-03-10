import React from 'react';

var maxRequests = 100;

var Header = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Performance Test</h1>
      </div>
    );
  }
});

var Body = React.createClass({
 
  start: function() {
  },

  onKeyPress: event => {
    if(event.charCode  >= 48 && event.charCode  <= 57) { 
      if (event.target.value == "" && event.charCode  == 48) {
         event.preventDefault();
      }
      else{
        if (Number(event.target.value + event.key) <= maxRequests){
            this.setState({ value: event.target.value })
        }
        else{
            event.preventDefault();
        }
      }
    } 
    else
    {
        event.preventDefault();
    }
  },

  render: function() {
    return (
      <div>
        <h4>Host</h4>
        <input id="hostinput" ref="text"/>
        <h4>Number of requests</h4>
        <input id="rquestnumberinput" type="text" onKeyPress={this.onKeyPress}/>
        <button id="btnstart" onClick={this.start}>Start!</button>
      </div>
    );
  }
});

const RequestView = React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        <Body />
      </div>
    );
  }
});

export default RequestView;
