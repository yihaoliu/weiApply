import React, {
  Component,
  PropTypes
} from 'react';
import {
  connect
} from 'kr/Redux';
import {
  bindActionCreators
} from 'redux';
import {
  reduxForm,
  formValueSelector,
  change
} from 'redux-form';
import * as actionCreators from 'kr-ui/../Redux/Actions';
import dateFormat from 'dateformat';
import {
  Actions,
  Store
} from 'kr/Redux';

import {
  Dialog,
  Snackbar,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
  Section,
  KrField,
  LabelText,
  Grid,
  Row,
  Col,
  Button,
  BreadCrumbs,
  Loading,
  Notify,
  KrDate,
  ButtonGroup,
  Title,
} from 'kr-ui';
import './index.less';

let SettingCreateForm = function(props) {

  const {
    error,
    handleSubmit,
    pristine,
    reset,
    submitting,
    communitys,
    onSubmit,
    cityName,
    onCancel
  } = props;

  return (

    <form className="listPorp" onSubmit={handleSubmit(onSubmit)}>

      <KrField grid={1/2} name="dicName" type="text" right={22} component="input" label="字段名称" requireLabel={true}/>
       <KrField grid={1/2} name="enableFlag" component="group" label="是否有效"  >
         <div className="listRadio">
            <KrField name="enableFlag" label="是" component="radio" type="radio" value="ENABLE"  />
            <KrField name="enableFlag" label="否" component="radio"  type="radio" value="DISENABLE"/>
        </div>
        </KrField>
     <KrField name="remark" type="textarea" component="textarea" label="备注"  placeholder="备注信息" />

        <Grid style={{marginTop:0,marginBottom:5}}>
          <Row>
            <Col md={12} align="center">
                <ButtonGroup>
                <span className="lyh-marginRight-15">
                    <Button label="确定" type="submit" joinEditForm />
                </span>
                <span className="lyh-marginLeft-15">
                    <Button className="lyh-cancel"  label="取消" type="button" onTouchTap={onCancel} cancle={true}/>
                </span>

                </ButtonGroup>
            </Col>
          </Row>
        </Grid>
    </form>
  );
}

const settingCreateFormValidate = values => {
  const errors = {}
  if (!values.dicName) {
    errors.dicName = '请输入字段名称';
  }
  return errors
}

SettingCreateForm = reduxForm({
  form: 'settingCreateForm',
  initialValues: {
    enableFlag: 'ENABLE'
  },
  validate: settingCreateFormValidate
})(SettingCreateForm);



const SettingViewForm = (props) => {
  const {
    items
  } = props;
  return (
    <div className="listPorp">

        <KrField grid={1/2} inline={false} name="corporationName" component="labelText"  label="字段名称" value={items.sp.dicName}/>
        <KrField grid={1/2} inline={false} name="enableFlag" component="labelText"  label="是否有效" value={items.sp.enableFlag=="ENABLE"?'是':'否'}/>
        <KrField inline={false} name="corporationDesc" component="labelText" label="备注" value={items.sp.remark}/>
  </div>
  );
}

const SettingChildViewForm = (props) => {
  const {
    items
  } = props;
  return (
    <div className="listPorp">

        <KrField grid={1/2} inline={false}  name="corporationName" right={22} component="labelText"  label="字段名称" value={items.dicName} requireLabel={true}/>
        <KrField grid={1/2} inline={false} name="enableFlag" component="labelText"  label="是否有效" value={items.enableFlag=="ENABLE"?'是':'否'} requireLabel={true}/>
        <KrField grid={1/2} inline={false} name="corporationDesc" component="labelText" label="备注" value={items.remark} requireLabel={true}/>
  </div>
  );
}



let SettingUpdateForm = function(props) {

  const {
    items,
    error,
    handleSubmit,
    pristine,
    reset,
    submitting,
    communitys,
    onSubmit,
    onCancel
  } = props;

  return (

    <form className="listPorp" onSubmit={handleSubmit(onSubmit)}>
              <KrField  name="id" type="hidden" label="id"  />
              <KrField grid={1/2} name="dicName" right={22} type="text" component="input" label="字段名称" requireLabel={true} />
              <KrField grid={1/2} right={22} name="enableFlag" component="group" label="是否有效" >
              <div className="listRadio">
                <KrField name="enableFlag" label="是" component="radio" type="radio" value="ENABLE"/>
                <KrField name="enableFlag" label="否" component="radio" type="radio" value="DISENABLE" />
              </div>
              </KrField>
               <KrField name="remark" component="textarea" label="备注"  placeholder="备注信息"/>

              <Grid style={{marginTop:0,marginBottom:5}}>
                <Row>
                <Col md={12} align="center">
                    <ButtonGroup>
                    <span className="lyh-marginRight-15">
                        <Button  label="确定" type="submit" joinEditForm />
                    </span>
                    <span className="lyh-marginLeft-15">
                        <Button  label="取消" type="button"  onTouchTap={onCancel} cancle={true} />
                    </span>
                    </ButtonGroup>
                </Col>
                </Row>
              </Grid>
        </form>
  );
}
const settingUpdateForm = values => {
  const errors = {}
  if (!values.dicName) {
    errors.dicName = '请输入字段名称';
  }
  return errors
}



SettingUpdateForm = reduxForm({
  form: 'settingUpdateForm',

  validate: settingUpdateForm
})(SettingUpdateForm);

let SettingChildUpdateForm = function(props) {
  const {
    items,
    error,
    handleSubmit,
    pristine,
    reset,
    submitting,
    communitys,
    onSubmit,
    onCancel
  } = props;

  return (

    <form className="listPorp" onSubmit={handleSubmit(onSubmit)}>
              <KrField name="id" type="hidden" label="id"  />
              <KrField grid={1/2} right={22} name="dicName" type="text" component="input" label="字段名称" requireLabel={true} />
              <KrField className="radioAll" grid={1/2} right={22} name="enableFlag" component="group" label="是否有效" requireLabel={true}>
              <div className="listRadio">
                <KrField name="enableFlag" label="是" component="radio" type='radio' value="ENABLE" requireLabel={true}/>
                <KrField name="enableFlag" label="否" component="radio"  type='radio'  value="DISENABLE" requireLabel={true}/>
              </div>
              </KrField>
               <KrField name="remark" component="textarea" label="备注"  placeholder="备注信息" requireLabel={true}/>

              <Grid style={{marginTop:0,marginBottom:5}}>
                <Row >
                <Col md={12} align="center">
                    <ButtonGroup>
                  <span className="lyh-marginRight-15">
                        <Button  label="确定" type="submit" joinEditForm />
                        </span>
                        <span className="lyh-marginLeft-15">
                        <Button  label="取消" type="button"  onTouchTap={onCancel} cancle={true} />
                        </span>
                    </ButtonGroup>
                </Col>
                </Row>
              </Grid>
        </form>
  );
}

SettingChildUpdateForm = reduxForm({
  form: 'settingChildUpdateForm',
})(SettingChildUpdateForm);

let SettingAddForm = function(props) {

  const {
    error,
    handleSubmit,
    pristine,
    reset,
    submitting,
    communitys,
    onSubmit,
    onCancel,
    dicName
  } = props;
  if (props.dicName == '付款方式') {
    return (

      <form className="listPorp" onSubmit={handleSubmit(onSubmit)}>
                  <KrField name="id" type="hidden" component="input" label="id"/>
                  <KrField grid={1/2} right={22} name="dicName" type="text" label="子项名称" requireLabel={true}/>
                  <KrField grid={1/2} right={22} inline={false}  type="labelText" label="字段名称" value={props.dicName} />
                 <KrField grid={1/2} right={22} name="enableFlag" component="group" label="是否有效" requireLabel={true}>
                    <KrField name="enableFlag" label="是" type="radio" value="ENABLE" />
                    <KrField name="enableFlag" label="否" type="radio" value="DISENABLE" />
                  </KrField>
                   <KrField name="remark" component="textarea" label="备注"  placeholder="备注信息" requireLabel={true}/>
                  <Grid style={{marginTop:0,marginBottom:5}}>
                    <Row>
                    <Col md={12} align="center">
                        <ButtonGroup>
                        <span className="lyh-marginRight-15">
                             <Button  label="确定" type="submit" joinEditForm />
                             </span>
                             <span className="lyh-marginLeft-15">
                             <Button  label="取消" type="button"  onTouchTap={onCancel} cancle={true} />
                             </span>
                        </ButtonGroup>
                    </Col>
                    </Row>
                  </Grid>
            </form>
    );
  }
  return (

    <form className="listPorp" onSubmit={handleSubmit(onSubmit)}>
              <KrField grid={1/2} right={22} name="id" type="hidden" component="input" label="id"/>
              <KrField grid={1/2} right={22} name="dicName" type="text" label="子项名称" requireLabel={true}/>
              <KrField grid={1/2} right={22} inline={false} type="labelText" label="字段名称" value={props.dicName} />
              <KrField grid={1/2} right={22} name="round" type="text" label="拆分周期" requireLabel={true} />
              <KrField grid={1/2} right={22} inline={false} name="enableFlag" component="group" label="是否有效" requireLabel={true}>
              <div className="listRadio">
                <KrField name="enableFlag" label="是" type="radio" value="ENABLE"/>
                <KrField name="enableFlag" label="否" type="radio" value="DISENABLE" />
              </div>
              </KrField>
               <KrField name="remark" component="textarea" label="备注"  placeholder="备注信息" requireLabel={true}/>
              <Grid style={{marginTop:0,marginBottom:5}}>
                <Row>
                <Col md={12} align="center">
                    <ButtonGroup>
                    <span className="lyh-marginRight-15">
                        <Button  label="确定" type="submit" joinEditForm />
                    </span>
                    <span className="lyh-marginLeft-15">
                         <Button  label="取消" type="button"  onTouchTap={onCancel} cancle={true} />
                    </span>
                    </ButtonGroup>
                </Col>
                </Row>
              </Grid>
        </form>
  );


}
const SettingAddFormvalidate = values => {
  const errors = {}
  if (!values.dicName) {
    errors.dicName = '请输入子项名称';
  }
  if (!values.enableFlag) {
    errors.enableFlag = '请选择是否有效';
  }
  if (!values.remark) {
    errors.remark = '请输入备注信息';
  }

  if (values.round && !values.round) {
    errors.round = '请输入拆分周期';
  }

  return errors
}
SettingAddForm = reduxForm({
  form: 'settingAddForm',
  validate: SettingAddFormvalidate
})(SettingAddForm);



export default class SettingList extends Component {

  constructor(props, context) {
    super(props, context);

    this.confirmSubmit = this.confirmSubmit.bind(this);

    this.confirmUpdateSubmit = this.confirmUpdateSubmit.bind(this);
    this.openCreateDialog = this.openCreateDialog.bind(this);
    this.renderCustomerItem = this.renderCustomerItem.bind(this);
    this.confirmUpdateChildSubmit = this.confirmUpdateChildSubmit.bind(this);

    this.openUpdateDialog = this.openUpdateDialog.bind(this);
    this.getListData = this.getListData.bind(this);
    this.openAddDialog = this.openAddDialog.bind(this);
    this.openViewDialog = this.openViewDialog.bind(this);
    this.openAdd = this.openAdd.bind(this);
    this.renderItemChild = this.renderItemChild.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.openUpdateChildDialog = this.openUpdateChildDialog.bind(this);
    this.openViewChildDialog = this.openViewChildDialog.bind(this);

    this.state = {
      open: false,
      openCreate: false,
      openView: false,
      openUpdate: false,
      openChildView: false,
      openChildUpdate: false,
      openAdddate: false,
      dicName: 'sss',
      pageSize: 15,
      page: 1,
      totalCount: 1,

    }

    this.getListData();

  }

  componentDidMount() {

    var _this = this;

    Store.dispatch(Actions.callAPI('sysDicPaymentList', {
      page: _this.state.page,
      pageSize: _this.state.pageSize,
      totalCount: _this.state.totalCount
    })).then(function(response) {
      _this.setState({
        items: response
      });

    }).catch(function(err) {
      Notify.show([{
        message: '报错了',
        type: 'danger',
      }]);
    });

  }


  getListData() {
    var {
      actions
    } = this.props;
    var _this = this;
  }


  confirmSubmit(values) {
    console.log('添加子项', values)
    Store.dispatch(Actions.callAPI('addSysDicPayment', {}, values)).then(function(response) {
      Notify.show([{
        message: '创建成功!',
        type: 'success',
      }]);
    }).catch(function(err) {
      Notify.show([{
        message: err.message,
        type: 'danger',
      }]);
      console.log(err.message)
    })
    this.openCreateDialog();

    window.setTimeout(function() {
      window.location.reload();
    }, 0);


  }

  confirmUpdateSubmit(values) {

    Store.dispatch(Actions.callAPI('editSysDicPayment', {}, values)).then(function(response) {
      Notify.show([{
        message: '编辑成功!',
        type: 'success',
      }]);
      setTimeout(function() {
        window.location.reload();
      }, 0)

    }).catch(function(err) {
      Notify.show([{
        message: err.message,
        type: 'danger',
      }]);
    });

    this.openUpdateDialog();

  }
  confirmUpdateChildSubmit(values) {

    Store.dispatch(Actions.callAPI('editSysDicPayment', {}, values)).then(function(response) {
      Notify.show([{
        message: '编辑成功!',
        type: 'success',
      }]);
    }).catch(function(err) {
      Notify.show([{
        message: err.message,
        type: 'danger',
      }]);
    });
    window.setTimeout(function() {
      window.location.reload();
    }, 0);
    this.openUpdateChildDialog();

  }


  openViewChildDialog(item) {

    this.setState({
      item: item,
      openChildView: !this.state.openChildView
    });

  };
  openUpdateChildDialog(item) {
    this.setState({
      openChildUpdate: !this.state.openChildUpdate
    });



    Store.dispatch(change('settingChildUpdateForm', 'id', item.id));
    Store.dispatch(change('settingChildUpdateForm', 'dicName', item.dicName));
    Store.dispatch(change('settingChildUpdateForm', 'enableFlag', item.enableFlag));
    Store.dispatch(change('settingChildUpdateForm', 'remark', item.remark));

  }
  openAddDialog(item) {
    this.setState({
      openAdddate: !this.state.openAdddate,
      dicName: item.sp.dicName
    });

    Store.dispatch(change('settingAddForm', 'id', item.id));


  }
  openAdd() {
    this.setState({
      openAdddate: !this.state.openAdddate,

    });
  }

  openCreateDialog() {

    this.setState({
      openCreate: !this.state.openCreate
    });

  }

  openViewDialog(index) {
    const list = this.state.items;
    this.setState({
      item: list[index],
      openView: !this.state.openView
    });

  }

  openUpdateDialog(index) {
    const list = this.state.items;

    this.setState({
      openUpdate: !this.state.openUpdate
    });

    Store.dispatch(change('settingUpdateForm', 'id', list[index].sp.id));
    Store.dispatch(change('settingUpdateForm', 'dicName', list[index].sp.dicName));
    Store.dispatch(change('settingUpdateForm', 'enableFlag', list[index].sp.enableFlag));
    Store.dispatch(change('settingUpdateForm', 'remark', list[index].sp.remark));
  };


  renderItem(item, index) {
    if (index % 2 == 0) {
      return (
        <TableRow key={index} className="odd">
            <TableRowColumn>{item.sp.dicName}</TableRowColumn>
              <TableRowColumn>{item.sp.enableFlag=="ENABLE"?'是':'否'}</TableRowColumn>
              <TableRowColumn>{item.sp.createName}</TableRowColumn>
              <TableRowColumn type="date">
                   <KrDate value={item.sp.createTime}/>
              </TableRowColumn>
              <TableRowColumn>{item.sp.remark}</TableRowColumn>
              <TableRowColumn>
              <Button label="查看" type="link"  onClick={this.openViewDialog.bind(this,index)}/>
              <Button label="编辑" type="link"  onClick={this.openUpdateDialog.bind(this,index)}/>
              <Button label="添加子项" type="link" id={this.state.id}  onClick={this.openAddDialog.bind(this,item)}/>
              <span className="bottomBtn"></span>
            </TableRowColumn>
           </TableRow>
      );
    } else {
      return (
        <TableRow key={index} className="even" >
            <TableRowColumn>{item.sp.dicName}</TableRowColumn>
              <TableRowColumn>{item.sp.enableFlag=="ENABLE"?'是':'否'}</TableRowColumn>
              <TableRowColumn>{item.sp.createName}</TableRowColumn>
              <TableRowColumn type="date">
                   <KrDate value={item.sp.createTime}/>
              </TableRowColumn>
              <TableRowColumn>{item.sp.remark}</TableRowColumn>
              <TableRowColumn>
              <Button label="查看" type="link"  onClick={this.openViewDialog.bind(this,index)}/>
              <Button label="编辑" type="link"  onClick={this.openUpdateDialog.bind(this,index)}/>
              <Button label="添加子项" type="link" id={this.state.id}  onClick={this.openAddDialog.bind(this,item)}/>
              <span className="bottomBtn"></span>
            </TableRowColumn>
           </TableRow>
      );

    }

  }

  renderItemChild(item, index) {


    if (item.length > 0) {
      return (
        <TableRow key={index} >
          <TableRowColumn colSpan={9}>
            <div className="bottom"></div>
            <Table displayCheckbox={false} className="childTable">

              <TableHeader>
                  <TableHeaderColumn>子项名称</TableHeaderColumn>
                  <TableHeaderColumn>是否有效</TableHeaderColumn>
                  <TableHeaderColumn>创建人</TableHeaderColumn>
                  <TableHeaderColumn>创建时间</TableHeaderColumn>
                  <TableHeaderColumn>备注</TableHeaderColumn>
                  <TableHeaderColumn>操作</TableHeaderColumn>
              </TableHeader>
              <TableBody>
             {item.map((item,index)=> <TableRow key={index}>

                        <TableRowColumn>{item.dicName}</TableRowColumn>
                        <TableRowColumn>{item.enableFlag=="ENABLE"?'是':'否'}</TableRowColumn>
                        <TableRowColumn>{item.createName}</TableRowColumn>
                        <TableRowColumn>
                            <KrDate value={item.createTime}/>
                        </TableRowColumn>
                        <TableRowColumn>{item.remark}</TableRowColumn>
                        <TableRowColumn>
                          <Button label="查看" type="link"  onClick={this.openViewChildDialog.bind(this,item)}/>
                          <Button label="编辑" type="link"  onClick={this.openUpdateChildDialog.bind(this,item)}/>
                        </TableRowColumn>
                      </TableRow>


              )}


           </TableBody>
       </Table>
          </TableRowColumn>

         </TableRow>


      );
    }


  }
  renderCustomerItem() {

    let items = this.state.items || [];

    if (!items.length) {
      return (
        <TableBody style={{paddingTop:10}} >
                <TableRow displayCheckbox={false} >
                      <TableRowColumn colSpan={8} >
                        <div style={{textAlign:'center',paddingTop:50,paddingBottom:50}}>
                        暂无数据
                        </div>
                      </TableRowColumn>
                </TableRow>
        </TableBody>

      )

    }


    let allChildren = [];

    var _this = this;

    items.map(function(item, index) {
      allChildren.push(_this.renderItem(item, index));
      allChildren.push(_this.renderItemChild(item.spList, index));
    });

    return (
      <TableBody colSpan={10}>
           {allChildren}
       </TableBody>
    );



  }



  render() {

    const {
      communitys
    } = this.state;

    const actions = [
      <Button
        label="关闭"
        joinEditForm
         style={{marginLeft:10}}
        onTouchTap={this.openViewDialog.bind(this)}
        />
    ];
    const close = [
      <Button
        label="关闭"
        joinEditForm
         style={{marginLeft:10}}
        onTouchTap={this.openViewChildDialog.bind(this)}
        />
    ]
    return (

      <div>
        		<Title value="基础配置_社区经营"/>
      <BreadCrumbs children={['系统运营','合同信息','基础配置']}/>
      <div className="wrap">
      <Section title="基础配置" description="">

          <Button label="新建" joinEditForm onTouchTap={this.openCreateDialog} />

            <Table style={{marginTop:20}} className="parentTable" toggleVisibility="odd" displayCheckbox={false} page={this.state.page} pageSize={this.state.pageSize} totalCount={this.state.totalCount}>
                <TableHeader>
                  <TableHeaderColumn>字段名称</TableHeaderColumn>
                  <TableHeaderColumn>是否有效</TableHeaderColumn>
                  <TableHeaderColumn>创建人</TableHeaderColumn>
                  <TableHeaderColumn>创建时间</TableHeaderColumn>
                  <TableHeaderColumn>备注</TableHeaderColumn>
                  <TableHeaderColumn>操作</TableHeaderColumn>
                </TableHeader>
                {this.renderCustomerItem()}
             </Table>
      </Section>
      </div>
      <Dialog
        title="新建"
        modal={true}
        open={this.state.openCreate}
        onClose={this.openCreateDialog}
        contentStyle={{width:'687'}}
      >
        <SettingCreateForm onSubmit={this.confirmSubmit} onCancel={this.openCreateDialog}/>
      </Dialog>

      <Dialog
        title="查看"

        modal={true}
        open={this.state.openView}
        onClose={this.openViewDialog}
        contentStyle={{width:'687'}}

      >

      <SettingViewForm items={this.state.item}/>

      </Dialog>
      <Dialog
        title="查看子项"

        modal={true}
        open={this.state.openChildView}
        onClose={this.openViewChildDialog}
        contentStyle={{width:'687'}}

      >

      <SettingChildViewForm items={this.state.item}/>

      </Dialog>



       <Dialog
        title="编辑"

        modal={true}
        open={this.state.openUpdate}
        onClose={this.openUpdateDialog}
        contentStyle={{width:'687'}}

     >
      <SettingUpdateForm items={this.state.item} onSubmit={this.confirmUpdateSubmit} onCancel={this.openUpdateDialog} />
      </Dialog>
       <Dialog
        title="编辑子项"

        modal={true}
        open={this.state.openChildUpdate}
        onClose={this.openUpdateChildDialog}
        contentStyle={{width:'687'}}

     >
      <SettingChildUpdateForm items={this.state.item} onSubmit={this.confirmUpdateChildSubmit} onCancel={this.openUpdateChildDialog} />
      </Dialog>

      <Dialog
        title="添加子项"
        modal={true}
        open={this.state.openAdddate}
        onClose={this.openAdd}
        contentStyle={{width:'687'}}

     >
      <SettingAddForm id={this.state.id} dicName={this.state.dicName} onSubmit={this.confirmSubmit} onCancel={this.openAdd}/>
      </Dialog>

   </div>
    );
  }
}
