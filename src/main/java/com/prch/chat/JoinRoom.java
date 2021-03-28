package com.prch.chat;

public class JoinRoom {

    private String name;
    private String room;

    public JoinRoom(String name, String room) {
        this.name = name;
        this.room = room;
    }

    public JoinRoom(){}


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }
}
