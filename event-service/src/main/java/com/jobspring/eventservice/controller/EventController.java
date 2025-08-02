package com.jobspring.eventservice.controller;

import com.jobspring.eventservice.model.Event;
import com.jobspring.eventservice.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class EventController {

    private final EventRepository eventRepository;

    // 🔹 Create event
    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    // 🔹 Get all events
    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // 🔹 Get event by ID
    @GetMapping("/{id}")
    public Event getEventById(@PathVariable Long id) {
        return eventRepository.findById(id).orElse(null);
    }

    // 🔹 Get events by category
    @GetMapping("/category/{category}")
    public List<Event> getByCategory(@PathVariable String category) {
        return eventRepository.findByCategoryIgnoreCase(category);
    }

    // 🔹 Delete event
    @DeleteMapping("/{id}")
    public String deleteEvent(@PathVariable Long id) {
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id);
            return "Event deleted";
        } else {
            return "Event not found";
        }
    }
}
