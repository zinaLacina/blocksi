<template>
  <div class="jumbotron custom-bg-dark">
    <h1>Manage Contacts</h1>
    <p class="lead">
      This is a simple Book of your contacts adress
    </p>
    <hr class="my-4" />
    <p>Click below to begin manage your contacts</p>
    <router-link class="btn btn-lg btn-success" to="/contacts">View contact</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
