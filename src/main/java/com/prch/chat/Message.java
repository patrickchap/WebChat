package com.prch.chat;

public class Message {

    private String message;
    private String room;
    private String user;
   

    public Message(String message, String room, String user) {
        this.message = message;
        this.room = room;
        this.user = user;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public Message() {
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
