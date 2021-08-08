<template>
  <section class="container my-5">
    <h3 class="h5">Filter By Category</h3>
    <div class="btn-group mb-3" role="group" aria-label="Category buttons">
      <button @click="viewArtistsByCategory( 'Song' )" type="button" class="btn badge badge-pill badge-dark">Song</button>
      <button @click="viewArtistsByCategory( 'Guitar' )" type="button" class="btn badge badge-pill badge-dark">Guitar</button>
      <button @click="viewArtistsByCategory( 'Piano' )" type="button" class="btn badge badge-pill badge-dark">Piano</button>
      <button @click="viewArtistsByCategory( 'Drums' )" type="button" class="btn badge badge-pill badge-dark">Drums</button>
      <button @click="viewArtistsByCategory( 'Saxophone' )" type="button" class="btn badge badge-pill badge-dark">Saxophone</button>
      <button @click="viewArtistsByCategory( 'Cello' )" type="button" class="btn badge badge-pill badge-dark">Cello</button>
    </div>
    <div class="row">
      <artist-item class="col-12 col-sm-6 col-lg-4 col-xl-3" 
        v-for="( artist, index ) in artistList" :key="index"
        :name="artist.name"
        :description="artist.description"
        :category="artist.category"
        :price="artist.price"
        :rating="artist.rating"
        :image="artist.image"
        :artistId="artist.id"
      />
    </div>
  </section>
</template>

<script>
import ArtistItem from './ArtistItem'
import axios from 'axios'
import { ref } from 'vue'
export default {
  setup() {
    
    const artistList = ref([{}]);

    axios("https://localhost:5001/artist")
      .then( response => {
        artistList.value = response.data;
      })
    
    // Gets artist filtered by category from the database, and updates immidiatley through ref artistList
    const viewArtistsByCategory = ( category ) => {
        axios(`https://localhost:5001/Artist/GetByCategory/${category}`)
        .then( response => {
          artistList.value = response.data;
        })
    }

    return { artistList, viewArtistsByCategory }

  },
  components: {
    ArtistItem
  }
}
</script>