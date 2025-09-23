package com.jobspring.controller;

import com.jobspring.Dto.MessageDto;
import com.jobspring.model.Message;
import com.jobspring.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // -------------------------
    // 1. REST Endpoints
    // -------------------------

    @PostMapping("/send")
    public MessageDto sendMessage(@RequestBody MessageDto messageDto) {
        Message savedMessage = messageService.saveMessage(messageDto);
        MessageDto savedMessageDto = MessageDto.fromEntity(savedMessage);

        // Notify recipient in real-time via WebSocket
        messagingTemplate.convertAndSendToUser(
                savedMessageDto.getReceiverUsername(),
                "/queue/messages",
                savedMessageDto
        );
        return savedMessageDto;
    }

    @GetMapping("/user/{username}")
    public List<MessageDto> getUserMessages(@PathVariable String username) {
        return messageService.getMessagesForUserDto(username);
    }

    // -------------------------
    // 2. WebSocket Mappings
    // -------------------------

    // Public chat room
    @MessageMapping("/chat/{room}")
    @SendTo("/topic/{room}")
    public MessageDto sendToRoom(@DestinationVariable String room, MessageDto messageDto) {
        Message savedMessage = messageService.saveMessage(messageDto);
        return MessageDto.fromEntity(savedMessage);
    }

    // Private messaging
    @MessageMapping("/private")
    public void sendPrivateMessage(MessageDto messageDto) {
        Message savedMessage = messageService.saveMessage(messageDto);
        MessageDto savedMessageDto = MessageDto.fromEntity(savedMessage);

        messagingTemplate.convertAndSendToUser(
                savedMessageDto.getReceiverUsername(),
                "/queue/messages",
                savedMessageDto
        );
    }

}
