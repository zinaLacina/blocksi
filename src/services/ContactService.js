import { http } from './HttpService'

export function getAllContacts() {
    return http().get('/contact');
}

export function getContactById(id) {
    return http().get(`/contact/${id}`);
}

export function createContact(contact) {
    return http().post('/contact', contact);
}

export function deleteContact(id) {
    return http().delete(`/contact/${id}`);
}

export function updateContact(contact) {
    return http().put('/contact', contact);
}