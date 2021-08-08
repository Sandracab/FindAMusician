<template>
<section class="container mt-5">
  <h2 class="h1">Our Artists</h2>
  <p class="lead">We have an  artist for every occation! Find your favorite and give your rating.</p>
</section>
  <artist-list/>
</template>

<script>
import ArtistList from '../components/artists/ArtistList'
export default {
  components : {
    ArtistList
  }
}
</script>