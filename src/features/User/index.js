import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import NotFound from "components/NotFound";
import MainAddInfo from "./page/MainAddInfo";
import MainUser from "./page/MainUser";

function User(props) {
  const match = useRouteMatch();
  console.log({ match });
  return (
    <Switch>
      <Redirect exact from="/user" to="/" />
      <Route exact path={`${match.url}/:userId`} component={MainUser} />
      <Route path={`${match.url}/add/:userId`} component={MainAddInfo} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default User;
