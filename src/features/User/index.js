import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NotFound from "components/NotFound";
import MainEditUser from "./page/MainEditUser";
import MainUser from "./page/MainUser"

function User(props) {
  const match = useRouteMatch();
  console.log({ match });
  return (
    <Switch>
      <Route exact path={`${match.url}/:userId`} component={MainUser} />
      <Route path={`${match.url}/:userUd/edit`} component={MainEditUser} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default User;
