package com.jobspring.repository;

import com.jobspring.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    // Find all messages by sender ID
    List<Message> findBySenderId(Long senderId);

    // Find all messages by receiver ID
    List<Message> findByReceiverId(Long receiverId);

    // Find all messages between two users
    List<Message> findBySenderIdAndReceiverId(Long senderId, Long receiverId);

    // Optional: find messages ordered by timestamp
    List<Message> findByReceiverIdOrderByTimestampAsc(Long receiverId);
}

