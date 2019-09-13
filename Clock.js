import moment from 'moment';
import React from 'react';
import './Clock.css'

const black = "#000000"
const white = "#ffffff"

const colorset = [[black,white],[white,black]];

class Time extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.resizeClock();
		window.addEventListener("resize",this.resizeClock);
	}
	
	resizeClock(){
		document.getElementById('Time').style.fontSize = String((document.getElementById('Clock').clientWidth/5))+"px";
		document.getElementById('Date').style.fontSize = String((document.getElementById('Clock').clientWidth/25))+"px";
	}
	
	render(){
		return(
			<div className="Clock" id="Clock">
				<div className="Time" id="Time">
					<div>
						<span className="clockChar">{this.props.time.format('HH')}{this.props.time.format('mm')}{this.props.time.format('ss')}</span>
					</div>
				</div>
				<div className="Date" id="Date">
					<div className="clockChar">{this.props.time.format('DDMMMYYYY ddd')}</div>
				</div>
			</div>
		)
	}	
}

class Background extends React.Component{
	render(){
		return(
			<div id="clockBackground"></div>
		)
	}
}

class Clock extends React.Component{
	constructor(props){
		super(props);
		if (this.props.match.params.LimitCut) this.LimitCut = this.props.match.params.LimitCut;
		else this.LimitCut = 0;
		this.renewSecond = 5;
		this.state = {time:moment(Date.now()),colorsetIndex:0};
	}
	componentDidMount(){
		if (this.LimitCut == 1) this.initColor();
		this.interval = setInterval(
			() => this.renewTime(),
			1000
		);
	}
	
	componentWillUnmount(){
		clearInterval(this.interval);
	}

	initColor(){
		document.getElementById('clockBackground').style.backgroundColor=colorset[0][0];
		var clockCharElements = document.getElementsByClassName('clockChar');
		for (var i = 0; i < clockCharElements.length; i++) clockCharElements[i].style.color=colorset[0][1];	
	}
	
	renewTime(){
		const currentSecond = new Date(Date.now()).getSeconds();
		if (this.LimitCut == 1 && currentSecond % this.renewSecond === 0){
			const colorsetIndex = (this.state.colorsetIndex+1)%(colorset.length);
			this.setState({colorsetIndex:colorsetIndex});
			document.getElementById('clockBackground').style.backgroundColor=colorset[colorsetIndex][0];
			var clockCharElements = document.getElementsByClassName('clockChar');
			for (var i = 0; i < clockCharElements.length; i++) clockCharElements[i].style.color=colorset[colorsetIndex][1];
		}
		this.setState({time:moment(Date.now())});
	}

	render(){
		return(
			<div>
				<Background />
				<Time time={this.state.time}/>
			</div>
		)
	}
}

export default Clock;