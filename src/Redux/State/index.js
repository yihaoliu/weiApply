/*
 *
 * 字典文件
 *
 */

import navs from './Navs';
import memo from './Memo';
import plan from './Plan';
import notify from './Notify';

module.exports = {
	navs,
	plan,
	memo,
	notify,
	header_nav:{
		switch_value:true,
	},
	sidebar_nav:{
		switch_value:true,
	},
	bottom_nav:{
		switch_value:false,
		anchor_el:undefined
	},
}






