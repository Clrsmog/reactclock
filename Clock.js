import moment from 'moment';
import React from 'react';
import './Clock.css'

const black = "#000000"
const white = "#ffffff"

const colorset = [[black,white],[white,black]];

class Time extends React.Component{
	componentDidMount(){
		this.resizeClock();
		window.addEventListener("resize",this.resizeClock);
	}
	
	resizeClock(){
		document.getElementById('Time').style.fontSize = String((document.getElementById('Clock').clientWidth/5))+"px";
		document.getElementById('Date').style.fontSize = String((document.getElementById('Clock').clientWidth/25))+"px";
		document.getElementById('Time').getElementsByTagName('div')[0].style.width = String((document.getElementById('Clock').clientWidth/5*4))+"px";
	}
	
	render(){
		return(
			<div className="Clock" id="Clock">
				<div className="DateTimeContainer" id="DateTimeContainer">
					<div className="Time" id="Time">
						<div className="clockChar">
							<span>{this.props.time.format('HH').charAt(0)}</span>
							<span>{this.props.time.format('HH').charAt(1)}</span>
							<span>{this.props.time.format('mm').charAt(0)}</span>
							<span>{this.props.time.format('mm').charAt(1)}</span>
							<span>{this.props.time.format('ss').charAt(0)}</span>
							<span>{this.props.time.format('ss').charAt(1)}</span>
						</div>
					</div>
					<div className="Date" id="Date">
						<div className="clockChar">{this.props.time.format('DDMMMYYYY ddd')}</div>
					</div>
				</div>
			</div>
		)
	}	
}

class Clock extends React.Component{
	constructor(props){
		super(props);
		var time;
		if (this.props.time) time = this.props.time;
		else time = moment(Date.now());
		if (this.props.match.params.LimitCut) this.LimitCut = parseInt(this.props.match.params.LimitCut);
		else this.LimitCut = 0;
		this.renewSecond = 5;
		this.state = {time:time,colorsetIndex:0,lastSecond:""};
	}
	componentDidMount(){
		if (this.LimitCut === 1) this.initColor();
		this.interval = setInterval(
			() => this.renewTime(),
			50
		);
	}
	
	componentWillUnmount(){
		clearInterval(this.interval);
	}

	initColor(){
		document.getElementById('Clock').style.backgroundColor=colorset[0][0];
		var clockCharElements = document.getElementsByClassName('clockChar');
		for (var i = 0; i < clockCharElements.length; i++) clockCharElements[i].style.color=colorset[0][1];	
	}
	
	renewTime(){
		const currentSecond = parseInt(this.state.time.format('ss'));
		//Change Background color and font color per (renewSecond)
		//Not to change if LimitCut = 0 or not exist
		if (this.LimitCut === 1) if (currentSecond % this.renewSecond === 0 && currentSecond !== this.state.lastSecond){
			const colorsetIndex = (this.state.colorsetIndex+1)%(colorset.length);
			this.setState({colorsetIndex:colorsetIndex});
			document.getElementById('Clock').style.backgroundColor=colorset[colorsetIndex][0];
			var clockCharElements = document.getElementsByClassName('clockChar');
			for (var i = 0; i < clockCharElements.length; i++) clockCharElements[i].style.color=colorset[colorsetIndex][1];
		}
		if (this.props.time) this.setState({time:this.props.time,lastSecond:currentSecond});
		else this.setState({time:moment(Date.now()),lastSecond:currentSecond});
	}

	render(){
		return(
			<Time time={this.state.time}/>
		)
	}
}

export default Clock;
