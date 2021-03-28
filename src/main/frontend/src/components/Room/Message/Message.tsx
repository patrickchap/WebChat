import { Card, CardContent, Divider } from "@material-ui/core";
import React from "react";
import "./Message.css";

type inputs = {
  name: string;
  room: string;
};

interface messagesReturn {
  message: string;
  room: string;
  user: string;
}

interface props {
  room: undefined | inputs;
  msg: messagesReturn;
}

const getDateTime = () => {
  let date = new Date();
  let formattedDate = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  return formattedDate;
};

const Message: React.FC<props> = ({ room, msg }) => {
  return (
    <div className={`message`}>
      <Card>
        <CardContent>
          <div className="message__nameAndTime">{`${
            msg?.user
          } ${getDateTime()}`}</div>
          <div className="message__msg">{msg.message}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Message;
