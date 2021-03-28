import { CompatClient } from "@stomp/stompjs/esm6";
import "./Room.css";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useStoreState } from "../../Store";
import Header from "./Header/Header";
import MessageList from "./MessageList/MessageList";
import SideBar from "./SideBar/SideBar";

interface props {
  stompClient: CompatClient;
}

type inputs = {
  message: string;
  name: string;
};

const Room: React.FC<props> = ({ stompClient }) => {
  const { register, handleSubmit } = useForm<inputs>();
  const room = useStoreState((state) => state.roomstate);

  const sendMessage = (d: { message: string }) => {
    stompClient.send(
      `/app/message/${room?.room}`,
      {},
      JSON.stringify({ message: d.message, room: room?.room, user: room?.name })
    );

    stompClient.send(
      `/app/send/users/${room?.room}`,
      {},
      JSON.stringify({ message: d.message, room: room?.room, user: room?.name })
    );
  };

  return (
    <div className="room">
      <div className="room__header">{room && <Header room={room.room} />}</div>
      <div className="room_messages">
        <SideBar stompClient={stompClient} />
        <MessageList />
      </div>
      <div className="room__sendMessage">
        <form onSubmit={handleSubmit((d) => sendMessage(d))}>
          <input type="text" name="message" ref={register} />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Room;
