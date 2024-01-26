package org.infosystem.repository;

import org.infosystem.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByRealNameContaining(String keyword);
}
