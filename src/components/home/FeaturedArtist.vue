<template>
  <section class="container-fluid text-left my-5">
    <div class="card bg-dark text-white container col-12 col-sm-9 col-md-6 p-0">
      <img class="card-img" :src="`https://localhost:5001/images/${image}`" alt="Card image">
      <div class="card-img-overlay justify-content-end d-flex flex-column">
        <h5 class="card-title mt-0">Featured Artist</h5>
        <h6 class="card-title">{{ name }}</h6>
        <p class="card-text">{{ description }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { reactive, toRefs } from 'vue'
export default {
  setup() {
    
    const featuredArtistObj = reactive({ name: "", image: "", description: "" });
    let numberOfArtists;
    let randomId = 0;

    axios(`https://localhost:5001/artist`)
      .then( response => {
        numberOfArtists = response.data.length;
        randomId = Math.floor(Math.random() * numberOfArtists) + 1;

          axios(`https://localhost:5001/artist/${randomId}`)
            .then( response => {
              featuredArtistObj.name = response.data.name;
              featuredArtistObj.description = response.data.description;
              featuredArtistObj.image = response.data.image;
            })
      })

    return { ...toRefs(featuredArtistObj), randomId, numberOfArtists }
    
  }
}
</script>