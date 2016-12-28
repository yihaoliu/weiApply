import React, {Component, PropTypes} from 'react';

import './index.less';


import {
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	IconButton,
	Divider,
} from 'material-ui';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


export default class Section extends Component {

	static propTypes = {
		children: React.PropTypes.node,
		title:React.PropTypes.string.isRequired,
		description: React.PropTypes.string,
		leftIcon: React.PropTypes.node,
		rightMenu: React.PropTypes.node,
		height:React.PropTypes.number,
		style:React.PropTypes.object,
		headerStyle:React.PropTypes.object,
		hide:React.PropTypes.bool,
		bodyPadding:React.PropTypes.string
	};

	constructor(props){
		super(props);

		this.renderSectionTitle = this.renderSectionTitle.bind(this);
		this.renderHeaderLeftIcon = this.renderHeaderLeftIcon.bind(this);
		this.renderDescription = this.renderDescription.bind(this);

		this.touchHeaderTitle = this.touchHeaderTitle.bind(this);
		this.renderRightElement  = this.renderRightElement.bind(this);

		this.state = {
			openBody:true
		}

	}


	renderRightElement(){

		if(!this.props.rightElement){
			return null;
		}

		return(
			<div className="right-element">
					{this.props.rightMenu}
			</div>
		);

	}
	renderRightMenu(){

		if(!this.props.rightMenu){
			return null;
		}

		return(
			<div className="right-menu">
				<IconMenu
				iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
				anchorOrigin={{horizontal: 'left', vertical: 'top'}}
				targetOrigin={{horizontal: 'left', vertical: 'top'}}
				>
					{this.props.rightMenu}
				</IconMenu>
			</div>
		);
	}

	renderHeaderLeftIcon(){

		if(!this.props.leftIcon){
			return null;
		}

		return (
				<div className="left-icon">
					{this.props.leftIcon}
				</div>
		);

	}
	touchHeaderTitle(){
		this.setState({
			openBody:!this.state.openBody
		});
	}

	renderSectionTitle(){

		if(!this.props.title){
			return null;
		}

		return (
				<div className="section-title">

					{this.renderHeaderLeftIcon()}

					<div className="title" onTouchTap={this.touchHeaderTitle}>
						{this.props.title}
					</div>

					<div className="right-element">
						{this.renderRightElement()}
					</div>

					<div className="right-menu">
						{this.renderRightMenu()}
					</div>

				</div>
		);
	}

	renderBody(){

		const {children,bodyPadding} = this.props;

		if(!this.state.openBody){
			return null;
		}
		const {height} = this.props;
		const bodyStyles = {
			height:'auto'
		};

		if(height){
			bodyStyles.height = height+'px';
			bodyStyles.overflowY = 'auto';
		}
		if(bodyPadding){
			bodyStyles.padding = bodyPadding;
		}

		return (

			  <div className="section-body" style={bodyStyles} >
				  {this.props.children}
			  </div>
		);

	}

	renderDescription(){

		return(
			<div className="section-description">
				{this.props.description}
			</div>
		);

	}

	  render() {

	  	const {style,hide,children,headerStyle} = this.props;


		  if(hide){
			  return (
				  <div>
					  {children}
				  </div>
			  );
		  }
		


		return (

		  <div className="section" style={style}>

			  <div className="section-header" style={headerStyle}>

				  {this.renderSectionTitle()}
				  {this.renderDescription()}
			  </div>

			  {this.renderBody()}

		  </div>

		);
	  }

}




