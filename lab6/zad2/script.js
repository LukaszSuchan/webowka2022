let contacts = [];

let Contact = function (name, phone) {
    this.name = name;
    this.phone = phone;
}

function displayContacts() {
    let table = document.getElementById("contacts-list");
    table.innerHTML = " ";
    console.log("1");

    for (let i=0; i < contacts.length; i++) {
        let table = document.getElementById("contacts-list").innerHTML += 
        '<tr><td id="name' + i + '"><div class="data"><p>' + contacts[i].name + 
        '</p><p>' + contacts[i].phone + '</p></div>' +
        '</td><td><div class="button-container"><button  onclick=deleteContact(' + i + ')'+ 
        '><i class="fa fa-trash" aria-hidden="true"></i></button></div></td></tr>';
    }
}

function addContact() {
    const regexName = new RegExp(/^[A-Z][a-z]+ [A-Z][a-z]+$/);
    const regexPhone = new RegExp(/^[1-9][0-9]{8}$/);

    const name = document.getElementById("input-name").value;
    const phone = document.getElementById("input-phone").value;

    if (regexName.test(name) && regexPhone.test(phone)) {
        const prettyPhone = phone.slice(0, 3) + " " + phone.slice(3, 6) + " " + phone.slice(6, 9);
        var contact = new Contact(name, prettyPhone);
        contacts.push(contact);
        displayContacts();
    }
}

function deleteContact(i) {
    contacts.splice(i, 1);
    displayContacts();
}