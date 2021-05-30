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
      <Route exact path={match.url} component={MainUser} />
      <Route path={`${match.url}/edit`} component={MainEditUser} />
      <Route path={`${match.url}/:editId`} component={MainEditUser} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default User;
