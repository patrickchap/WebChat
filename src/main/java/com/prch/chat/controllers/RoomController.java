package com.prch.chat.controllers;

import com.prch.chat.Greeting;
import com.prch.chat.HelloMessage;
import com.prch.chat.JoinRoom;
import com.prch.chat.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.util.HtmlUtils;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Controller
public class RoomController {

    private List<Message> db = new ArrayList<Message>();

    private static List<Message> filter(List<Message> db, String filter){
        List<Message> ret = new ArrayList<Message>();
        for(Message msg : db){
            if(msg.getRoom().equals(filter)) {
                ret.add(msg);
            }
        }
        return ret;
    }

    private static List<String> filterUsers(List<Message> db, String room) {
        HashSet<String> set = new HashSet<>();
        for(Message msg : db){
            if(msg.getRoom().equals(room)){
                set.add(msg.getUser());
            }
        }
        List<String> ret = new ArrayList<String>(set);
        return ret;
    }

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        Thread.sleep(1000); // simulated delay
        System.out.println("hello");
        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
    }

    @MessageMapping("/joinRoom")
    @SendTo("/topic/join")
    public JoinRoom joinRoomOrMakeRoom(JoinRoom joinRoom) throws Exception{
        System.out.println("joinRoom");
        System.out.println( HtmlUtils.htmlEscape(joinRoom.getName()));
        System.out.println( HtmlUtils.htmlEscape(joinRoom.getRoom()));
        return  new JoinRoom(joinRoom.getName(), joinRoom.getRoom());
    }

    @MessageMapping("/message/{room}")
    @SendTo("/topic/message/{room}")
    public List<Message>  sendMessageToRoom(@DestinationVariable String room, Message message){
        System.out.println("Message to room <<<<<");
        System.out.println(message.getUser());

        db.add(message);
        List<Message> ret = filter(db, message.getRoom());
        return ret;
    }


    @SubscribeMapping("/getAll/users/{room}")
    public List<String> getUsersByRoom(@DestinationVariable("room") String room){
        List<String> ret = filterUsers(db, room);
        return ret;
    }

    @MessageMapping("/send/users/{room}")
    @SendTo("/topic/users/{room}")
    public List<String> sendUsersByRoom(@DestinationVariable("room") String room, Message message){
        System.out.println("user sent to room test jaldflsdj");
        List<String> ret = filterUsers(db, room);
        return ret;
    }


    @GetMapping("/messages/load/{room}")
    public List<Message> getAllMessagesFromRoom(@PathVariable("room") String room){
        List<Message> ret = filter(db, room);
        return ret;
    }

    @SubscribeMapping("/getAll/{room}")
    public List<Message> getAllMessagesFromRoomSub(@DestinationVariable("room") String room){
        System.out.println("sub >>>>>>");
        List<Message> ret = filter(db, room);
        return ret;
    }

}
