import React, {
	Component
} from 'react';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
} from 'kr-ui';
export default class OrganizationChart extends Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	static defaultProps = {
	}
	static PropTypes = {
		displayCheckbox: false,
	}
  constructor(props, context) {
		super(props, context);
		this.params = this.context.router.params;
		this.state = {
			item: {},
			list: {},
			organizationChart: {
				page: 1,
				pageSize: 15,
				companyId:this.params.companyId
			}
		}
	}
  onLoaded=(response)=>{
		// console.log("this.props.params",this.props.params);
		let list = response;
    // console.log(list,"组织架构list");
		this.setState({
			list
		})
	}
  render(){
    let {
			list
		} = this.state;

		if (!list.totalCount) {
			list.totalCount = 0;
		}
    return (
      <div style={{height:860}}>
      <Table
        className="member-list-table"
          style={{marginTop:10}}
          displayCheckbox={false}
          onLoaded={this.onLoaded}
          ajax={true}
					onProcessData={(state)=>{
						return state;
					}}
          ajaxFieldListName='items'
          ajaxUrlName='getOrganizationChart'
          ajaxParams={this.state.organizationChart}
        >
        <TableHeader>
          <TableHeaderColumn>职位</TableHeaderColumn>
          <TableHeaderColumn>姓名</TableHeaderColumn>
      </TableHeader>

      <TableBody style={{position:'inherit'}}>
          <TableRow displayCheckbox={true}>
              <TableRowColumn name="jobName" ></TableRowColumn>
              <TableRowColumn name="name" ></TableRowColumn>
         </TableRow>
      </TableBody>

      <TableFooter></TableFooter>

      </Table>

      </div>
    )
  }
}
