import React from 'react';

import Input from '../Input';

export default class Field extends React.Component{

  static displayName = 'Field';

  static propTypes = {
     name:React.PropTypes.string,
     component:React.PropTypes.any
  }

  static contextTypes =  {
      blur: React.PropTypes.func.isRequired,
      focus: React.PropTypes.func.isRequired,
      error: React.PropTypes.func.isRequired,
      change: React.PropTypes.func.isRequired,
      initializeField:React.PropTypes.func.isRequired,
      syncErrors:React.PropTypes.object.isRequired,
      fields:React.PropTypes.object.isRequired,
      initializeValidations:React.PropTypes.func.isRequired,
      values:React.PropTypes.object.isRequired,
  }

	constructor(props,context){
		super(props, context);

    const {name} = this.props;

    this.name = name;
    this.value = '';

	}

  onFocus =  ()=>{
    const {focus} = this.context;
    focus && focus(this.props.name);
  }

  onBlur = ()=>{

  }

  onError = (message)=>{

    const {error} = this.context;
    const {name} = this.props;
    error && error(name,message);

  }


  onChange =(value)=>{

    const {change} = this.context;
    const {name,onChange} = this.props;

    change && change(name,value);
    onChange && onChange(value);

  }

  componentDidMount(){

      const {initializeField,initializeValidations} = this.context;
      const {name,defaultValue} = this.props;
      initializeField && initializeField(name,defaultValue);

      let props = this.props;
      let {errors} = this.props;

      if(!errors){
          return ;
      }
      let validationKeys = Object.keys(errors);

      let validation = {
          errors,
      };

      validationKeys.map(function(item,index){
         if(item && props.hasOwnProperty(item)){
            validation[item] = props[item];
         }
      });

      initializeValidations &&  initializeValidations(name,validation);
  }

  renderComponent = (component)=>{

    const {syncErrors,fields,values} = this.context;
    const {name} = this.props;


    const input = {
      name:this.props.name,
      value:values[name],
      onChange:this.onChange,
      onBlur:this.oBlur,
      onFocus:this.onFocus,
      onError:this.onError,
    };



    let field = {
      touched:false,
      active:false,
    };

    if(fields && fields.hasOwnProperty(name)){
      field = fields[name];
    }

    const meta = {
      dirty:false,
      autofilled:false,
      error:'',
      warning:'',
      pristine:false,
      invalid:false,
      valid:false,
      visited:false,
      active:field.active,
      touched:field.touched,
      error:syncErrors[this.props.name]
    };

    const props = Object.assign({},{
      ref:name,
      input,
      meta,
    },{...this.props});

    const handles = {

    };

    if(typeof component === 'undefined' || typeof component === 'string'){
      return <Input name={name}  type="text"  {...props} {...handles} />
    }


  return React.createElement(component,{
      ...props,
      ...handles
  });

  }

	render(){

    const {name,children,minLength,maxLength,errors,requiredValue,component} = this.props;

	  return (
      <span>
       {this.renderComponent(component)}
     </span>
	 );
	}

}
