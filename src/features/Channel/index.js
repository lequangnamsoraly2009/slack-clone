import NotFound from "components/NotFound";
import Chat from "features/Channel/components/Chat";
import SideBar from "features/Channel/components/SideBar";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import MainChat from "./page/MainChat";

function Channel() {
  const match = useRouteMatch();
  console.log({ match });
  return (
    <>
      <SideBar />
      <Switch>
        <Route exact path={`${match.url}/:channelId`} component={Chat} />
        <Route path={`${match.url}`} component={MainChat} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default Channel;
