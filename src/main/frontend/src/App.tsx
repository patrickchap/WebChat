import React, { useEffect } from "react";
import "./App.css";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs/esm6/compatibility/stomp";
import { useForm } from "react-hook-form";
import Room from "./components/Room/Room";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";

import { useStoreState, useStoreActions } from "./Store";

type inputs = {
  name: string;
  room: string;
};

const socket = new SockJS("http://localhost:8080/webchat");
var stompClient = Stomp.over(socket);

function App() {
  const { register, handleSubmit } = useForm<inputs>();
  const room = useStoreState((state) => state.roomstate);
  const enterRoom = useStoreActions((actions) => actions.enterRoom);

  const sendRoom = (params: inputs) => {
    enterRoom(params);
  };

  useEffect(() => {
    stompClient.connect(
      {},
      function (frame: any) {
        console.log("connected: " + frame);
      },
      function (err: any) {
        console.log("err", err);
      }
    );
  });

  return (
    <div className="app">
      <CssBaseline />
      {!room ? (
        <div>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={3}>
              <Card id="app__form">
                <CardContent>
                  <h2>Webchat</h2>
                  <form onSubmit={handleSubmit((d) => sendRoom(d))}>
                    <List id="app__list">
                      <ListItem>
                        <div className="app__list__labelAndInput">
                          <label htmlFor="name">UserName</label>
                          <input
                            className="app__form__input text"
                            type="text"
                            name="name"
                            ref={register}
                          />
                        </div>
                      </ListItem>
                      <ListItem>
                        <div className="app__list__labelAndInput">
                          <label htmlFor="room">Room</label>
                          <input
                            className="app__form__input text"
                            type="text"
                            name="room"
                            ref={register}
                          />
                        </div>
                      </ListItem>
                      <ListItem>
                        <div className="app_list__submit">
                          <input
                            className="app__form__input submit"
                            type="submit"
                          />
                        </div>
                      </ListItem>
                    </List>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      ) : (
        <Room stompClient={stompClient} />
      )}
    </div>
  );
}

export default App;
