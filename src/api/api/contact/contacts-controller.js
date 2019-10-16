import User from '../../model/user-model';
import Contact from '../../model/contact-model';
import moment from 'moment';
import * as auth from '../../services/auth-service';

export function index(req, res) {
    // FIND ALL CONTACTS
    const id = auth.getUserId(req);
    User.findOne({ _id: id }, (error, user) => {
        if (error && !user) {
            return res.status(500).json();
        }

        Contact.find({author:user}, (error, contacts) => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(200).json({ contacts: contacts });
        }).populate('author', 'email fistName lastName', 'user');
        // Populate will find the author that created the contact and add it to the contact (email only)

    });
    
}

export function create(req, res) {
    const id = auth.getUserId(req);
    User.findOne({ _id: id }, (error, user) => {
        if (error && !user) {
            return res.status(500).json();
        }
        const contact = new Contact(req.body.contact);
        contact.author = user._id;

        contact.save(error => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(201).json();
        });
    });
}

export function update(req, res) {
    const id = auth.getUserId(req);

    User.findOne({ _id: id }, (error, user) => {
        if (error) {
            return res.status(500).json();
        }
        if (!user) {
            return res.status(404).json();
        }

        const contact = new Contact(req.body.contact);
        contact.author = user._id;
        Contact.findByIdAndUpdate({ _id: contact._id }, contact, error => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(204).json();
        });
    });
}

export function remove(req, res) {
    const id = auth.getUserId(req);
    Contact.findOne({ _id: req.params.id }, (error, contact) => {
        if (error) {
            return res.status(500).json();
        }
        if (!contact) {
            return res.status(404).json();
        }
        if (contact.author._id.toString() !== id) {
            return res.status(403).json({ message: 'Not allowed to delete another user\'s contact' });
        }
        Contact.deleteOne({ _id: req.params.id }, error => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(204).json();
        });
    });
}

export function show(req, res) {
    // GET contact BY ID
    Contact.findOne({ _id: req.params.id }, (error, contact) => {
        if (error) {
            return res.status(500).json();
        }
        if (!contact) {
            return res.status(404).json();
        }
        return res.status(200).json({ contact: contact });
    });
}