import React from 'react';
import constants from '../../helpers/const';
var ClientRestActions = require('../actions/ClientRestActions');
var ChartStore = require('../stores/ChartStore');

var maxRequests = 100;

function compareNumbers(a, b) {
  return a - b;
}

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
 
 getInitialState: function() {
    return {
      hostInputValue: '',
      requestnumberInputValue: '',
      charts: { data: [[0,0,0]], labels: ['Asia', 'Europe', 'America']},
			//series: ['Average request times'],
      //data: [1,1,1],
			series: ['Average time response'],
			labels: ['Asia', 'Europe', 'America'],
			colors: ['#43A19E', '#7B43A1', '#F2317A']
    };
  },

componentDidMount: function() {
        ChartStore.on('change', function(){
          this.setState({
              charts: ChartStore.getChart()
          });
        }.bind(this));

        ClientRestActions.readChart();
    },

  start: function() {

    var requestBody = {
        id: 1,
        host: this.state.hostInputValue,
        requestNumber: this.state.requestnumberInputValue
    };

    fetch(constants.serviceRestFullUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json'},
      //mode: 'no-cors',
      cache: 'default',
      body: JSON.stringify(requestBody)
     })
      .then((resp) => resp.json())
      .then(function(resp) {
        ClientRestActions.createChart(resp);
      }).catch(function(err) {
      // Error :(
      console.log(err);
     });
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

  updateHostInputValue: function(evt) {
    this.setState({
      hostInputValue: evt.target.value
    });
  },

  updateRequestnumberInputValue: function(evt) {
    this.setState({
      requestnumberInputValue: evt.target.value
    });
  },

  render: function() {
    return (
      <div>
        <h4>Host</h4>
        <input id="hostinput" value={this.state.hostInputValue} onChange={this.updateHostInputValue} ref="text"/>
        <h4>Number of requests</h4>
        <input id="requestnumberinput" value={this.state.requestnumberInputValue} onChange={this.updateRequestnumberInputValue} type="text" onKeyPress={this.onKeyPress}/>
        <button id="btnstart" onClick={this.start}>Start!</button>
        <section>
            <Charts
              data={ this.state.charts.data }
              labels={ this.state.series }
              colors={ this.state.colors }
              height={ 250 }
            />
            <Legend labels={ this.state.labels } colors={ this.state.colors } />
			  </section>
      </div>
    );
  }
});

var Legend = React.createClass({
	render: function () {
		var labels = this.props.labels,
			colors = this.props.colors;
		
		return (
		<div className="Legend">
			{ labels.map(function(label, labelIndex) {

        var color = colors[labelIndex], style;
							
        style = {
          backgroundColor: color
        };

				return (
				<div>
					<span id={"legendColor" + labelIndex} className="Legend--color" style={style} />
					<span id={"legendName" + labelIndex} className="Legend--label">{ label }</span>
				</div>
				);
			}) }
		</div>
		);
	}
});

var Charts = React.createClass({
	render: function () {
		var self = this,
			data = this.props.data,
			layered = this.props.grouping === 'layered' ? true : false,
			stacked = this.props.grouping === 'stacked' ? true : false,
			opaque = this.props.opaque,
			max = 0;
		
		for (var i = data.length; i--; ) {
			for (var j = data[i].length; j--; ) {
				if (data[i][j] > max) {
					max = data[i][j];
				}
			}
		}
		
				
		return (
			<div className={ 'Charts' + (this.props.horizontal ? ' horizontal' : '' ) }>
				{ data.map(function (serie, serieIndex) {
				 	var sortedSerie = serie.slice(0),
				 		sum;
				 	
				 	sum = serie.reduce(function (carry, current) {
				 		return carry + current;
					}, 0);
				 	sortedSerie.sort(compareNumbers);				 		
									 
					return (
						<div className={ 'Charts--serie ' + (self.props.grouping) }
				 			key={ serieIndex }
							style={{ height: self.props.height ? self.props.height: 'auto' }}
						>
						<label>{ self.props.labels[serieIndex] }</label>
						{ serie.map(function (item, itemIndex) {
							var color = self.props.colors[itemIndex], style,
								size = item / (stacked ? sum : max) * 100;
							
							style = {
								backgroundColor: color,
								opacity: opaque ? 1 : (item/max + .05),
								zIndex: item
							};
						
							if (self.props.horizontal) {
								style['width'] = size + '%';
							} else {								
								style['height'] = size + '%';						
							}
	
							if (layered && !self.props.horizontal) {
								//console.log(sortedSerie, serie, sortedSerie.indexOf(item));
								style['right'] = ((sortedSerie.indexOf(item) / (serie.length + 1)) * 100) + '%';
								// style['left'] = (itemIndex * 10) + '%';
							}
						
						 return (
							 <div id={"bar" + itemIndex}
							 	className={ 'Charts--item ' + (self.props.grouping) }
							 	style={ style }
								key={ itemIndex }
							>
							 	<b id={"barValue" + itemIndex} style={{ color: color }}>{ item }</b>
							 </div>
						);
						}) }
						</div>
					);
				}) }
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
