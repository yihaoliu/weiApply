import {
	Link
} from 'react-router';

import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'react-redux';

import {
	AppBar,
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	Paper,
	IconButton,
	RaisedButton,
	Drawer,
	Divider,
	FontIcon,
	FloatingActionButton,
} from 'material-ui';

import {
	List,
	ListItem
} from 'kr-ui';

import './index.less';



import {
	Toolbar,
	ToolbarGroup,
	ToolbarSeparator,
	ToolbarTitle
} from 'material-ui/Toolbar';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';


import {
	MakeSelectable
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

let SelectableList = MakeSelectable(List);

function wrapState(ComposedComponent) {

	return class SelectableList extends Component {

		static propTypes = {
			children: PropTypes.node.isRequired,
			defaultValue: PropTypes.number.isRequired,
			selectedItemStyle: PropTypes.object,
		};

		componentWillMount() {
			this.setState({
				selectedIndex: this.props.defaultValue,
			});
		}

		handleRequestChange = (event, index) => {
			this.setState({
				selectedIndex: index,
			});
		};

		render() {
			return ( < ComposedComponent value = {
					this.state.selectedIndex
				}
				onChange = {
					this.handleRequestChange
				}
				selectedItemStyle = {
					{
						backgroundColor: '#328ECC',
						color: '#fff'
					}
				} > {
					this.props.children
				} < /ComposedComponent>
			);
		}
	};
}

SelectableList = wrapState(SelectableList);

export default class SidebarNav extends Component {

	PropTypes = {
		items: React.PropTypes.isArray,
		current_parent: React.PropTypes.string,
		current_child: React.PropTypes.string,
	}

	constructor(props, context) {
		super(props, context);
	}

	renderMenuItem(item, index, parentIndex) {


		let {
			current_router,
			current_child
		} = this.props;
		var childStyles = {};
		let initiallyOpen = false;
		let parentStyles = {
			fontSize: '16px',
			marginTop: '0px',
			marginLeft: '-20px',
			width: "180px",
			color: '#999'
		};



		let jumpUrl = '';

		if (item.originUrl) {
			jumpUrl = item.originUrl;
		} else {
			jumpUrl = './#' + item.router;
		}

		var styles = {};

		childStyles.fontSize = '14px';
		childStyles.color = '#333';
		childStyles.paddingLeft = "20px";
		childStyles.width = "180px";

		var isSelected = false;

		isSelected = item.active;

		if (isSelected) {
			childStyles.backgroundColor = '#328ECC';
			childStyles.color = '#fff';
		} else {
			childStyles.backgroundColor = '#fff';
		}
/*
		if (item.router === current_router) {
			childStyles.backgroundColor = '#328ECC';
			childStyles.color = '#fff';
		} else {
			childStyles.backgroundColor = '#fff';
		}
		*/

		if (item.menuItems && item.menuItems.length) {
			return (

				<ListItem
					key={index}
					style={parentStyles}
					initiallyOpen={true}
					value={index}
					open={true}
					primaryText={item.primaryText}
					primaryTogglesNestedList={false}
					autoGenerateNestedIndicator={false}
					disabled={true}

					leftIcon={<FontIcon  className={item.iconName} color={item.iconColor} style={{fontSize:18,position: 'absolute',margin:'15px 0 0 44px' }}/>
			}

			nestedItems = {
				item.menuItems.map((it, ind) => this.renderMenuItem(it, ind, index))
			}

			/>

		);
	}
	return (
		<ListItem
					primaryText={item.primaryText}
					key={index}
					value={parentIndex+'-'+index}
					href={jumpUrl}
					style={childStyles}
			   	/>
	);

}

openUrl() {

}


render() {

	const style = {
		margin: '20px 0 0 0 ',
		display: 'inline-block',
		boxShadow: ' 0 0 0 0',
		width: 120,
	};


	return (

		<div>
						<SelectableList defaultValue={1000} >
				{/*

						  <ListItem
							value={1}
							primaryText="Brendan Lim"
							nestedItems={[
							  <ListItem
								value={2}
								primaryText="Grace Ng"
							  />,
							]}
						  />
				*/}

					{this.props.items.map((item,index)=>this.renderMenuItem(item,index))}
						</SelectableList>
			</div>
	);

}
}
