import React, { PropsWithChildren, ReactNode } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from '../pages/Home'
import Nav from '../components/Nav'

export default function Root({children}:PropsWithChildren<ReactNode>) {
  return <>
  <Router>
    <Nav />
    <Switch>
       <Route exact path={'/'} render={(props) => <Home {...props} />} />
    </Switch>
  </Router>
  </>;
}
