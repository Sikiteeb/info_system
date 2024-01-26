document.getElementById('addContactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    addContact();
});

let isSortedAscending = true;
function addContact() {
    const realName = document.getElementById('realName').value;
    const codeName = document.getElementById('codeName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    const contact = { realName, codeName, phoneNumber };

    fetch('http://localhost:8080/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
    })
        .then(response => response.json())
        .then(contact => {
            console.log('Kontakt lisatud:', contact);
            document.getElementById('addContactForm').reset();
            loadContacts();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function loadContacts() {
    fetch('http://localhost:8080/contacts')
        .then(response => response.json())
        .then(contacts => {
            const list = document.getElementById('contactList');
            list.innerHTML = '';
            contacts.forEach(contact => {
                const li = document.createElement('li');
                li.textContent = `Nimi: ${contact.realName}, Kood-nimi: ${contact.codeName}, Telefon: ${contact.phoneNumber} `;

                const editBtn = document.createElement('button');
                editBtn.textContent = 'Muuda';
                editBtn.classList.add('edit-button');
                editBtn.onclick = function() {
                    showEditForm(contact);
                };
                li.appendChild(editBtn);

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Kustuta';
                deleteBtn.classList.add('delete-button');
                deleteBtn.onclick = function() {
                    deleteContact(contact.id);
                };
                li.appendChild(deleteBtn);

                list.appendChild(li);
            });

            const sortButton = document.getElementById('sortButton');
            sortButton.textContent = 'Sorteeri nime järgi';
            sortButton.onclick = sortContactsByName;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function searchContacts() {
    const searchName = document.getElementById('searchName').value;
    fetch(`http://localhost:8080/contacts/searchContacts?keyword=${searchName}`)
        .then(response => response.json())
        .then(contacts => {
            updateContactList(contacts);
            const sortButton = document.getElementById('sortButton');
            sortButton.textContent = 'Tagasi';
            sortButton.onclick = loadContacts;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function sortContactsByName() {
    const endpoint = isSortedAscending
        ? 'http://localhost:8080/contacts/sortContacts?direction=asc'
        : 'http://localhost:8080/contacts/sortContacts?direction=desc';

    fetch(endpoint)
        .then(response => response.json())
        .then(contacts => {
            if (Array.isArray(contacts)) {
                updateContactList(contacts);
                isSortedAscending = !isSortedAscending;
            } else {
                console.error('Error: Expected an array of contacts', contacts);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}



function showEditForm(contact) {
    document.getElementById('editRealName').value = contact.realName;
    document.getElementById('editCodeName').value = contact.codeName;
    document.getElementById('editPhoneNumber').value = contact.phoneNumber;
    document.getElementById('editContactId').value = contact.id;

    document.getElementById('editContactFormContainer').style.display = 'block';
}

document.getElementById('editContactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    editContact();
});

function editContact() {
    const id = document.getElementById('editContactId').value;
    const realName = document.getElementById('editRealName').value;
    const codeName = document.getElementById('editCodeName').value;
    const phoneNumber = document.getElementById('editPhoneNumber').value;

    const contact = { realName, codeName, phoneNumber };

    fetch(`http://localhost:8080/contacts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
    })
        .then(response => response.json())
        .then(updatedContact => {
            console.log('Contact updated:', updatedContact);
            document.getElementById('editContactFormContainer').style.display = 'none';
            loadContacts();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function deleteContact(contactId) {
    fetch(`http://localhost:8080/contacts/${contactId}`, {
        method: 'DELETE',
    })
        .then(() => {
            console.log('Contact deleted');
            loadContacts();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function updateContactList(contacts) {
    const list = document.getElementById('contactList');
    list.innerHTML = '';

    contacts.forEach(contact => {
        const li = document.createElement('li');
        li.textContent = `Name: ${contact.realName}, Code Name: ${contact.codeName}, Phone: ${contact.phoneNumber} `;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-button');
        editBtn.onclick = function() {
            showEditForm(contact);
        };
        li.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-button');
        deleteBtn.onclick = function() {
            deleteContact(contact.id);
        };
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });
}


loadContacts();
