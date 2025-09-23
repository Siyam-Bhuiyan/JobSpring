package com.jobspring.Dto;

import com.jobspring.model.Message;

import java.time.LocalDateTime;

public class MessageDto {

    private Long id;
    private Long senderId;
    private Long receiverId;
    private String senderUsername;
    private String receiverUsername;
    private String content;
    private LocalDateTime timestamp;

    public MessageDto() {
    }

    public MessageDto(Long id, Long senderId, Long receiverId, String senderUsername, String receiverUsername, String content, LocalDateTime timestamp) {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.senderUsername = senderUsername;
        this.receiverUsername = receiverUsername;
        this.content = content;
        this.timestamp = timestamp;
    }

    public static MessageDto fromEntity(Message savedMessage) {
        return null;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public Long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
    }

    public String getSenderUsername() {
        return senderUsername;
    }

    public void setSenderUsername(String senderUsername) {
        this.senderUsername = senderUsername;
    }

    public String getReceiverUsername() {
        return receiverUsername;
    }

    public void setReceiverUsername(String receiverUsername) {
        this.receiverUsername = receiverUsername;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
