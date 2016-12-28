//日期格式工具
import dateFormat from 'dateformat';

export function DateFormat(value,format){
    return dateFormat(value,format);
}
export function DateCompareValue(start,end){
    start=Date.parse(dateFormat(start,"yyyy-mm-dd hh:MM:ss"));
    end=Date.parse(dateFormat(end,"yyyy-mm-dd hh:MM:ss"));
    if(start>=end){
      return false;
    }
    return true;
}
