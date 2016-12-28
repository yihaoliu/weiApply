import * as Company from  './Company/reducers';
import * as Demo from  './Demo/reducers';
import * as Memo from  './Memo/reducers';
import * as Notifiy from  './Notifiy/reducers';
import * as Plan from  './Plan/reducers';
import * as Navs from  './Navs/reducers';
import * as Common from  './Common/reducers';
import * as User from  './User/reducers';

import { reducer as form } from 'redux-form';


module.exports = {
...Company,
...Demo,
...Memo,
...Notifiy,
...Plan,
...Navs,
...Common,
...User,
 form
};
