import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { Podcast } from "../pages/podcast";
import {Podcasts} from '../pages/podcasts'

const Routes = [
  {
    path: "/",
    component: <Podcasts />
  },
  {
    path: "/podcasts/:id",
    component: <Podcast />
  },
];


export const LoggedInRouter = () => {
  return (
    <Router>
      <Switch>
        {Routes.map(route => (
          <Route exact key={route.path} path={route.path}>
            {route.component}
          </Route>
        ))}
      </Switch>
    </Router>
  )
}
