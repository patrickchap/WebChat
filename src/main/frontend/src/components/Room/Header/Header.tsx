import Button from "@material-ui/core/Button";
import React from "react";
import { useStoreActions } from "../../../Store";

interface props {
  room: string;
}

const Header: React.FC<props> = ({ room }) => {
  const leaveRoom = useStoreActions((action) => action.leaveRoom);

  const leave = () => {
    leaveRoom();
  };
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__name">{room}</div>
        <div className="header__logout">
          <Button variant="contained" className="logout_btn" onClick={leave}>
            Leave Room
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
