import React, { useEffect } from "react";
import "./SideBar.css";
import SockJsClient from "react-stomp";
import { useStoreActions, useStoreState } from "../../../Store";
import { CompatClient } from "@stomp/stompjs/esm6";
import PeopleIcon from "@material-ui/icons/People";
//

interface props {
  stompClient: CompatClient;
}

const SideBar: React.FC<props> = ({ stompClient }) => {
  const room = useStoreState((state) => state.roomstate);
  const users = useStoreState((state) => state.users);
  const updateUsers = useStoreActions((action) => action.updateUsers);

  useEffect(() => {
    // if (room) {
    // stompClient.send(`app/send/users/${room.room}`, {}, `${room.name}`);
    //   }
  }, [users]);

  return (
    <div className="sideBar">
      <div className="sideBar__title">
        <PeopleIcon />
        <h3> Users</h3>
      </div>
      {room && (
        <SockJsClient
          url="http://localhost:8080/webchat"
          topics={[`/app/getAll/users/${room.room}`]}
          onMessage={(users: any) => {
            updateUsers(users);
          }}
          ref={(client: any) => {
            // console.log(client);
          }}
        />
      )}
      {room && (
        <SockJsClient
          url="http://localhost:8080/webchat"
          topics={[`/topic/users/${room.room}`]}
          onMessage={(users: any) => {
            updateUsers(users);
          }}
          ref={(client: any) => {
            // console.log(client);
          }}
        />
      )}
      <div className="sideBar__users">
        {users.map((user) => {
          return <div>{user}</div>;
        })}
      </div>
    </div>
  );
};

export default SideBar;
