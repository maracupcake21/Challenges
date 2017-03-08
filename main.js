//ReactDOM.render(<h1>Performance Test</h1>, document.getElementById('root'));

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
        if (Number(event.target.value + event.key)<=100){
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
        <button onClick={this.start}>Start!</button>
      </div>
    );
  }
});

ReactDOM.render(
  <div><div><Header /></div><div><Body /></div></div>,
  document.getElementById('container')
);