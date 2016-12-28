import React from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import ReactDOM from 'react-dom';

import './index.less';
import $ from 'jquery';
import WrapComponent from '../WrapComponent';
import { default as CityData } from './CityData.json';

export default class CityComponent extends React.Component {

	static displayName = 'DateComponent';

	static defaultProps = {
		inline: false
	}

	static PropTypes = {
		defaultValue: React.PropTypes.string,
		onSubmit: React.PropTypes.func,
		inline: React.PropTypes.bool,
		search: React.PropTypes.bool,
	}

	constructor(props) {
		super(props)


		this.isInit = false;
		this.state = {
			value: '',
			showCity:false,
			secondCity:[],
			first:true,
			thirdCity:[],
			firstId:0,
			secondId:0,
			thirdId:0,
			firstName:'',
			secondName:'',
			thirdName:'',
			city:'请选择',
		}

	}

	componentDidMount() {
		// this.setDefaultDate(this.props.input.value);
	}

	componentWillReceiveProps(nextProps) {
		// if (!this.isInit && nextProps.input.value) {
		// 	this.setDefaultDate(nextProps.input.value);
		// }
	}

	firstCityList=()=>{
		var firstCity = [];
		firstCity = CityData.map((item)=>{
			var obj = {};
			obj.id = item.id;
			obj.name = item.name;
			return obj;

		})
		return firstCity;


	}

	secondCityList=(id)=>{
		var secondCity = [];
		CityData.map(item=>{
			if(item.id == id){
				secondCity = item.children;
			}
		})
		return secondCity;
	}
	thirdCityList=(secondCity,id)=>{
		var thirdCity = [];
		secondCity.map(item=>{
			if(item.id == id){
				thirdCity = item.children;
			}
		})
		return thirdCity;
	}
	

	selected=(event)=>{
		event.target.style.background = '#f5f5f5';
		let thirdId = event.target.getAttribute('data-for');
		const target = event.target.getElementsByTagName('span')[0];
		this.setState({
			thirdId,
		});
	}
	leave=(event)=>{
		event.target.style.background = '#fff';
	}
	selectFirstCity=(event)=>{
		let firstCityId = event.target.getAttribute('data-for');
		event.target.style.background = '#f5f5f5';
		const second = ReactDOM.findDOMNode(this.cityList);
		const SecondCity = second.getElementsByClassName('secondCity')[0];
		const target = event.target.getElementsByTagName('span')[0];
		SecondCity.style.display = 'inline-block';
		const ThirdCity = second.getElementsByClassName('thirdCity')[0];
		ThirdCity.style.display = 'none';
		let secondCity = this.secondCityList(firstCityId);

		this.setState({
			secondCity,
			firstId:firstCityId,
			firstName:target.innerHTML
		})

	}
	selectSecondCity=(event)=>{
		let {secondCity} = this.state;
		event.target.style.background = '#f5f5f5';
		let secondCityId = event.target.getAttribute('data-for');
		const third = ReactDOM.findDOMNode(this.cityList);
		const ThirdCity = third.getElementsByClassName('thirdCity')[0];
		ThirdCity.style.display = 'inline-block';
		let thirdCity = this.thirdCityList(secondCity,secondCityId);
		const target = event.target.getElementsByTagName('span')[0];
		if(!thirdCity.length){
			console.log('none');
		}

		this.setState({
			thirdCity,
			secondId:secondCityId,
			secondName:target.innerHTML
		})


	}

	showCity=()=>{
		let {showCity} = this.state;
		if(showCity){
			return;
		}
		this.bodyEvent();
		this.setState({
			showCity:true
		})	
	}

	onSubmit=(event)=>{
		let {thirdId} = this.state;
		const target = event.target.getElementsByTagName('span')[0];
		let {thirdName,firstName,secondName} = this.state;
		let city = `${firstName}/${secondName}/${target.innerHTML}`;
		this.setState({
			city,
			showCity:false
		});

		let {onSubmit} = this.props;
		onSubmit && onSubmit(thirdId);


	}
	bodyEvent=()=>{
		let _this = this;
		$('body').click(function(event){
			if(event.target.className !='city-name'){
				_this.setState({
					showCity:false
				});
			}
		});
	}



	render() {

		let {
			style,
			left,
			right,
			grid = 1,
			className,
			children,
			inline,
			component,
			type,
			requireLabel,
			label,
			value,
			search,
			colorStyle,
			heightStyle,
			lengthClass,
			...other
		} = this.props;
		let {showCity} = this.state;
		let cityDiv = {};
		cityDiv.display = showCity?'block':'none';
		let firstCity = this.firstCityList();
		let {secondCity,thirdCity,firstId,secondId,city,thirdId} = this.state;
		let cityStyle= {
			background:'#fff'
		};
		let selectedCity = {
			background:'#f5f5f5'
		}
		let hoverColor = {};
		


		

		return (

			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
					<div className="city-component" ref={div=>{this.cityContainer = div}} onClick={this.showCity}>
						<input readOnly="true" value={city} ref={input=>{this.input = input}}/>
						<span className="arrow"></span>
						<div className="city-cantainer" style={cityDiv}>
							<ul ref={ul=>{this.cityList = ul}}>
								<li className="firstCity">
									{firstCity.map((item,index)=>{
										hoverColor = (item.id == firstId)?selectedCity:cityStyle;
										return (<div key={index} className='city-name' style={hoverColor} data-for={item.id} onMouseOver={this.selectFirstCity} ><span >{item.name}</span><span className="scroll-div"></span></div>)
									})}
								</li>
								<li className="secondCity">
									{secondCity.map((item,index)=>{
										hoverColor = (item.id == secondId)?selectedCity:cityStyle;
										return (<div key={index} className='city-name' style={hoverColor} data-for={item.id} onMouseOver={this.selectSecondCity}><span >{item.name}</span><span className="scroll-div"></span></div>)
									})}
								</li>
								<li className="thirdCity">
									{thirdCity.map((item,index)=>{
										hoverColor = (item.id == thirdId)?selectedCity:cityStyle;
										return (<div key={index} className='city-name' style={hoverColor} data-for={item.id} onMouseOver={this.selected}  onClick={this.onSubmit}><span >{item.name}</span><span className="scroll-div"></span></div>)
									})}
								</li>
							</ul>
						</div>
					</div>
				</WrapComponent>
		);
	}

}
