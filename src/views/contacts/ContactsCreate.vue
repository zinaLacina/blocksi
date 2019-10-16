<template>
    <div>
        <h1>Create Contact</h1>
        <form class="custom-form" v-on:submit.prevent="onSubmit">
            <div class="form-group">
                <label for="firstName">First Name</label>
                <input v-model="contact.firstName" type="text" class="form-control" id="firstName" name="firstName" placeholder="firstName" />
            </div>
            <div class="form-group">
                <label for="lastName">Last Name</label>
                <input v-model="contact.lastName" type="text" class="form-control" id="lastName" name="lastName" placeholder="lastName" />
            </div>
            <div class="form-group">
                <label for="body">Email</label>
                <input v-model="contact.email" type="email" class="form-control" id="email" name="email" placeholder="email" />            
            </div>
             <div class="form-group">
                <label for="body">Phone</label>
                <input v-model="contact.phone" type="phone" class="form-control" id="phone" name="phone" placeholder="phone" />            
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-secondary">Create</button>
            </div>
        </form>
    </div>
</template>

<script>
    import * as contactService from '../../services/ContactService'

    export default {
        name: 'contacts-create',
        data: function() {
            return {
                contact: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: ''
                }
            }
        },
        methods: {
            onSubmit: async function() {
                const request = {
                    contact: this.contact
                }
                await contactService.createContact(request);
                this.$router.push({ name: 'contacts-all' });
            }
        }
    }
</script>