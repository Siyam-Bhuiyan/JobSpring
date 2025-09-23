package com.jobspring.service;
import com.jobspring.Dto.MessageDto;
import com.jobspring.model.Message;
import com.jobspring.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    // Save a new message
    public Message saveMessage(MessageDto messageDto) {
        return messageRepository.saveAll(messageDto);
    }

    // Get message by ID
    public Optional<Message> getMessageById(Long id) {
        return messageRepository.findById(id);
    }

    // Get all messages
    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    // Get all messages sent by a specific user
    public List<Message> getMessagesBySender(Long senderId) {
        return messageRepository.findBySenderId(senderId);
    }

    // Get all messages received by a specific user
    public List<Message> getMessagesByReceiver(Long receiverId) {
        return messageRepository.findByReceiverId(receiverId);
    }

    // Get all messages between two users
    public List<Message> getMessagesBetweenUsers(Long senderId, Long receiverId) {
        return messageRepository.findBySenderIdAndReceiverId(senderId, receiverId);
    }

    // Delete a message by ID
    public void deleteMessage(Long id) {
        messageRepository.deleteById(id);
    }

    public List<MessageDto> getMessagesForUserDto(String username) {
            return null;
    }
}
 
