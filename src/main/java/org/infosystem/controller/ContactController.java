package org.infosystem.controller;

import org.infosystem.model.Contact;
import org.infosystem.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@RequestMapping("/contacts")
public class ContactController {

    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping
    public List<Contact> getAllContacts() {
        return contactService.findAllContacts();
    }

    @GetMapping("/{id}")
    public Contact getContactById(@PathVariable Long id) {
        return contactService.findContactById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Contact not found"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Contact createContact(@RequestBody Contact contact) {
        return contactService.createContact(contact);
    }


    @PutMapping("/{id}")
    public Contact updateContact(@PathVariable Long id, @RequestBody Contact contact) {
        return contactService.updateContact(id, contact);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
    }


    @GetMapping("/searchContacts")
    public List<Contact> searchContacts(@RequestParam String keyword) {
        return contactService.searchContacts(keyword);
    }

    @GetMapping("/sortContacts")
    public List<Contact> sortContactsByName(@RequestParam(required = false, defaultValue = "asc") String direction) {
        return contactService.sortContactsByName(direction);
    }

}
