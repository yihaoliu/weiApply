import React from 'react';

import {
  KrDate
} from 'kr-ui';


export default class ExampleSimple extends React.Component{

    render(){

        return (
            <div>
             <KrDate value={new Date}  format="yyyy-mm-dd"/>
            </div>
        );
    }

}
