import React, { useEffect, useRef } from "react";
import { useStoreActions, useStoreState } from "../../../Store";
import SockJsClient from "react-stomp";
import "./MessageList.css";
import Message from "../Message/Message";

const MessageList: React.FC = () => {
  const messages = useStoreState((state) => state.messages);
  const updateMessages = useStoreActions((action) => action.updateMessages);
  const room = useStoreState((state) => state.roomstate);

  // const myRef = useRef<HTMLInputElement>(null);
  const myRef = React.createRef<HTMLDivElement>();

  // const executeScroll = () => {
  //   window.scrollTo({ top: myRef.current?.offsetTop });
  // };

  useEffect(() => {
    console.log(myRef);
    if (myRef.current) {
      console.log("curretn");
      myRef.current.scrollIntoView();
    }
  }, [messages, myRef]);

  return (
    <div className="meassageList">
      {room && (
        <SockJsClient
          url="http://localhost:8080/webchat"
          topics={[`/topic/message/${room.room}`]}
          onMessage={(msg: any) => {
            updateMessages(msg);
          }}
          ref={(client: any) => {
            // console.log(client);
          }}
        />
      )}
      {room && (
        <SockJsClient
          url="http://localhost:8080/webchat"
          topics={[`/app//getAll/${room.room}`]}
          onMessage={(msg: any) => {
            updateMessages(msg);
          }}
          ref={(client: any) => {
            // console.log(client);
          }}
        />
      )}
      {messages.map((msg, index) => {
        console.log(index === messages.length - 2);
        return index === messages.length - 1 ? (
          <div ref={myRef}>
            <Message room={room} msg={msg} />
          </div>
        ) : (
          <Message room={room} msg={msg} />
        );
      })}
    </div>
  );
};

export default MessageList;
