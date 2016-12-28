//日期格式工具
import shallowequal from 'shallowequal';

export function ShallowEqual(props,nextProps){

    var isOk = true;

    if(typeof props === 'object' || typeof nextProps === 'object'){
      isOk =  shallowequal(props,nextProps);
    }else if(Object.prototype.toString.call(props) === '[object Array]' && Object.prototype.toString.call(nextProps) === '[object Array]'){

        if(props.length != nextProps.length){
            return isOk = false;
        }

        for(var i = 0;i<props.length;i++){
          if(props[i] != nextProps[i]){
            return isOk = false;
          }
        }

    }

    return isOk;

}
