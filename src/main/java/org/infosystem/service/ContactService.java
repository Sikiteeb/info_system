package org.infosystem.service;

import org.infosystem.model.Contact;
import org.infosystem.repository.ContactRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ContactService {
    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public List<Contact> findAllContacts() {
        return contactRepository.findAll();
    }

    public Optional<Contact> findContactById(Long id) {
        return contactRepository.findById(id);
    }

    public Contact createContact(Contact contact) {
        return contactRepository.save(contact);
    }

    public Contact updateContact(Long id, Contact newContact) {
        return contactRepository.findById(id)
                .map(contact -> {
                    contact.setRealName(newContact.getRealName());
                    contact.setCodeName(newContact.getCodeName());
                    contact.setPhoneNumber(newContact.getPhoneNumber());
                    return contactRepository.save(contact);
                })
                .orElseGet(() -> {
                    newContact.setId(id);
                    return contactRepository.save(newContact);
                });
    }

    public void deleteContact(Long id) {
        contactRepository.deleteById(id);
    }

    public List<Contact> searchContacts(String keyword) {
        return contactRepository.findByRealNameContaining(keyword);
    }

    public List<Contact> sortContactsByName(String direction) {
        List<Contact> allContacts = contactRepository.findAll();
        return sortContacts(allContacts, direction);
    }

    private List<Contact> sortContacts(List<Contact> contacts, String direction) {
        return "desc".equals(direction) ? contacts.stream()
                .sorted(Comparator.comparing(Contact::getRealName).reversed())
                .collect(Collectors.toList())
                :
                contacts.stream()
                        .sorted(Comparator.comparing(Contact::getRealName))
                        .collect(Collectors.toList());
    }
}