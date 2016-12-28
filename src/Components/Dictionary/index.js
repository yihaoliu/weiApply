import React from 'react';

import DictionaryConfigs from '../../Configs/dictionary';

export default class Dictionary extends React.Component {

	static displayName = 'Dictionary';

	static propTypes = {
		/**
		 *值
		 */
		type: React.PropTypes.string,
		/**
		 * yyyy-mm-dd hh:MM:ss
		 */
		value: React.PropTypes.string
	};


  getDictionary = (type,value)=>{

    var result = '';

    var dics = DictionaryConfigs[type];

    if(Object.prototype.toString.call(dics) !== '[object Array]'){
      return result;
    }

    for(var i = 0;i<dics.length;i++){
        var item = dics[i];
        if(item.value === value){
            result = item.desc;
            break;
        };
    }

    return result;

  }

	render() {

		let {
			className,
      type,
			value,
		} = this.props;

		return (
			<span>{this.getDictionary(type,value)}</span>
		);

	}
}
