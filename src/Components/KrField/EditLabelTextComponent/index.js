import React from 'react';

import WrapComponent from '../WrapComponent';
import Input from '../../Input';

import Tooltip from '../../Tooltip';
import './index.less';
import ReactTooltip from 'react-tooltip'

export default class InputComponent extends React.Component {

	static defaultProps = {

		tooltip: '',
	}

	static PropTypes = {
		tooltip: React.PropTypes.string,
		defaultValue: React.PropTypes.string,
		ajaxUrlName: React.PropTypes.string,
		ajaxParams: React.PropTypes.object,


	}

	constructor(props, context) {
		super(props, context)
		this.state = {
			editOpen: false,
			oldtext: props.oldText
		}
	}
	onEdit = () => {
		let {
			oldtext
		} = this.state;

		this.setState({
			editOpen: true
		}, function() {

			document.getElementById('focus').focus();
			document.getElementById('focus').value = oldtext;
			document.getElementsByClassName('contract')[0].style.display = "none"

		})
	}
	onSave = () => {
		var _this = this;
		this.setState({
			editOpen: false,
			oldtext: document.getElementById('focus').value
		}, function() {

			document.getElementsByClassName('contract')[0].style.display = "inline-block";

			_this.props.save(_this.state.oldtext);
		})
	}
	componentDidMount() {

	}

	render() {
		let {
			input,
			label,
			type,
			requireLabel,
			disabled,
			placeholder,
			style,
			inline,
			alignRight,
			simple,
			heightStyle,
			tooltip,
			...other
		} = this.props;
		let className = '';


		return (
			<WrapComponent  label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} wrapStyle={style} alignRight={alignRight}>
					
						{!this.state.editOpen && <span className="edit" onTouchTap={this.onEdit}></span>}
						{this.state.editOpen && <input id="focus" onBlur={this.onSave} className={className}  defaultValue={this.state.oldtext}  />}
						<span className="editContent">
						<span  className="ui-label-text" data-tip data-for={`${tooltip}`}>
							<ReactTooltip id={`${tooltip}`}>
								<p style={{margin:0}}>{this.state.oldtext}</p>
							</ReactTooltip>
							<span className="contract">{this.state.oldtext}</span>
						</span>
						</span>
						



				</WrapComponent>

		);
	}
}
