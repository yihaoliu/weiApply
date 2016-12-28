import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

import Master from './components/Master';

import AppBarPage from './components/pages/components/AppBar/Page';
import CheckboxPage from './components/pages/components/Checkbox/Page';
import DividerPage from './components/pages/components/Divider/Page';

import DialogPage from './components/pages/components/Dialog/Page';
import ButtonPage from './components/pages/components/Button/Page';
import TablePage from './components/pages/components/Table/Page';
import FontIconPage from './components/pages/components/FontIcon/Page';
import LoadingPage from './components/pages/components/Loading/Page';
import KrFieldPage from './components/pages/components/KrField/Page';
import ListPage from './components/pages/components/List/Page';
import ListGroupPage from './components/pages/components/ListGroup/Page';
import SectionPage from './components/pages/components/Section/Page';
import IframeContentPage from './components/pages/components/IframeContent/Page';
import KrDatePage from './components/pages/components/KrDate/Page';

import HomePage from './components/pages/Home';
import UndefinedPage from './components/pages/Undefined';



const AppRoutes = (
  <Route path="/" component={Master}>

    <IndexRoute component={HomePage} />

    <Route path="components">

      <Route path="appbar" component={AppBarPage}/>
      <Route path="button" component={ButtonPage} />
      <Route path="krfield" component={KrFieldPage} />
      <Route path="loading" component={LoadingPage} />
      <Route path="table" component={TablePage} />
      <Route path="list" component={ListPage} />
      <Route path="listgroup" component={ListGroupPage} />
      <Route path="section" component={SectionPage} />
      <Route path="iframecontent" component={IframeContentPage} />
      <Route path="krdate" component={KrDatePage} />
      <Route path="dialog" component={DialogPage} />
      <Route path="checkbox" component={CheckboxPage} />
      <Route path="divider" component={DividerPage} />

    </Route>

  	<Route path="*" component={UndefinedPage}/>


  </Route>
);

export default AppRoutes;
