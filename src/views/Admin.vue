<template>
  <section class="container mt-5">
    <h2 class="h1">Admin Panel</h2>
    <p class="lead">Add new artist, view submitted gigs or delete gigs</p>
  </section>
  <add-new-artist-form/>
  <gig-list/>
</template>
<script>
import AddNewArtistForm from '../components/admin/AddNewArtistForm'
import GigList from '../components/admin/GigList.vue'
export default {
  components: {
    AddNewArtistForm,
    GigList
  }
}
</script>