import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { Podcast } from "../pages/podcast";
import {Podcasts} from '../pages/podcasts'
import { User } from "../pages/user";
//import { User } from "../pages/user";

export const Routes = [
  {
    path: "/",
    component: <Podcasts />
  },
  {
    path: "/podcasts/:id",
    component: <Podcast />
  },
  {
    path: '/user',
    component: <User />
  }
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
