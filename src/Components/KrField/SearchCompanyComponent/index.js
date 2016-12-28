import React from 'react';


import ReactSelectAsync from '../../Select/Async';

import {Actions,Store} from 'kr/Redux';


import WrapComponent from '../WrapComponent';

export default class  SearchCompanyComponent extends React.Component {

	static defaultProps = {
		placeholder:'请输入公司名称'
	}

	static PropTypes = {
		placeholder:React.PropTypes.string,
		inline:React.PropTypes.bool
	}

	constructor(props){
		super(props)

		this.onChange = this.onChange.bind(this);
		this.getOptions = this.getOptions.bind(this);
	}

	componentDidMount(){
		let {input} = this.props;
	}

	onChange(item){
		let {input,onChange} = this.props;
		var value = (item && item.value) || '';
		input.onChange(value);
		onChange && onChange(item);
	}
	getOptions(companyText){
		return new Promise((resolve, reject) => {
			Store.dispatch(Actions.callAPI('getCompanyByCompanyText',{ companyText:companyText })).then(function(response){
				response.forEach(function(item,index){
					item.value = item.id;
					item.label = item.customercompany;
				});
				resolve({options:response});
			}).catch(function(err){
				reject(err);
			});
		});
	}
	render(){
		let { input, label, type, meta: { touched, error },placeholder,children,disabled,style,requireLabel,...other} = this.props;
		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel}>
					<ReactSelectAsync
					name={input.name}
					value={input.value}
					loadOptions={this.getOptions}
					clearable={true}
					clearAllText="清除"
					onChange={this.onChange}
					noResultsText=""
					placeholder={placeholder}/>
			{touched && error && <div className="error-wrap"> <span>{error}</span> </div>}
		</WrapComponent>
		);
	}
}
