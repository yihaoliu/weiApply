import React from 'react';

import {
  KrField,
} from 'kr-ui';



export default class AppBarExampleSimple extends React.Component{


    render(){


        return (

            <div>
                <KrField label="姓名" component="labelText" defaultValue="无" value="张三"/>
            </div>
        );
    }

}
