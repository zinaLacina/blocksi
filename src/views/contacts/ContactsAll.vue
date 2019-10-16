<template>
    <div class="d-flex flex-column">
        <h1>Contacts</h1>

        <div class="mb-4">
            <router-link to="/contacts/new" class="btn btn-success ml-2" exact>Create Contact</router-link>
        </div>

        <div v-if="contacts && contacts.length > 0" class="d-flex flex-wrap justify-content-start">

            <div v-for="contact in contacts" v-bind:key="contact._id" class="card mb-2 ml-2 text-white bg-dark" style="width: 18rem;">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h5 class="card-title">{{ contact.firstName+" "+contact.lastName }}</h5>
                    </div>

                    <p class="card-text">{{ contact.phone }}</p>

                    <div v-if="contact.author._id === $store.state.userId" class="d-flex justify-content-between">
                        <router-link type="button" tag="button" class="card-link btn btn-primary" :to="{ name: 'contacts-edit', params: { id: contact._id } }"
                            exact>Edit</router-link>
                        <a v-on:click.prevent="currentContactId = contact._id" class="card-link btn btn-danger" href="#" v-b-modal.modal1>Delete</a>
                    </div>
                </div>
            </div>

            <div>
                <b-modal id="modal1" ref="modal" centered title="Delete Confirmation">
                    <p class="my-4">Are you sure you would like to delete this Contact?</p>
                    <div slot="modal-footer" class="w-100 text-right">
                        <b-btn slot="md" class="mr-1" variant="danger" @click="deleteContact">Delete</b-btn>
                        <b-btn slot="md" variant="secondary" @click="cancelModal">Cancel</b-btn>
                    </div>
                </b-modal>
            </div>
        </div>

        <div v-if="contacts && contacts.length === 0" class="ml-2">
            <div class="alert alert-info">No Contacts found.</div>
        </div>

    </div>

</template>

<script>

    import * as contactService from '../../services/ContactService'
    import moment from 'moment'

    export default {
        name: 'contacts-all',
        data: function() {
            return {
                contacts: null,
                currentContactId: null
            }
        },
        beforeRouteEnter(to, from, next) {
            contactService.getAllContacts()
                .then(res => {
                    next(vm => {
                        vm.contacts = res.data.contacts;
                    });
                });
        },
        methods: {
            cancelModal: function() {
                this.$refs.modal.hide();
                this.currentContactId = null;
            },
            deleteContact: async function() {
                this.$refs.modal.hide();
                await contactService.deleteContact(this.currentContactId);
                const index = this.contacts.findIndex(contact => contact._id === this.currentContactId);
                this.contacts.splice(index, 1);
                this.currentContactId = null;
            }
        }
    }
</script>