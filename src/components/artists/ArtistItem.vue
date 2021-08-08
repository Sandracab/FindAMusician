<template>
<div class="my-3">
  <div class="card w-100">
    <div class="bg-image-test card-img-top" 
    :style="{ backgroundImage: 'url(https://localhost:5001/images/' + image + ')' }">
    </div>
    <div class="card-body text-left px-4">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text description">{{ description }}</p>
    </div>
    <ul class="list-group list-group-flush text-left px-1">

      <!-- Color coding of categories -->
      <li class="list-group-item" v-if="category === 'Song'">
        <span class="badge badge-pill" style="background-color:#3A86FF; color:#fff;">{{ category }}</span>
      </li>
      <li class="list-group-item" v-else-if="category === 'Guitar'">
        <span class="badge badge-pill" style="background-color:#8338EC; color:#fff;" >{{ category }}</span>
      </li>
      <li class="list-group-item" v-else-if="category === 'Piano'">
        <span class="badge badge-pill" style="background-color:#FF006E; color:#fff;">{{ category }}</span>
      </li>
      <li class="list-group-item" v-else-if="category === 'Drums'">
        <span class="badge badge-pill" style="background-color:#FB5607; color:#fff;">{{ category }}</span>
      </li>
      <li class="list-group-item" v-else-if="category === 'Saxophone'">
        <span class="badge badge-pill" style="background-color:#FFBE0B; color:#fff;">{{ category }}</span>
      </li>
      <li class="list-group-item" v-else-if="category === 'Cello'">
        <span class="badge badge-pill" style="background-color:#1B998B; color:#fff;">{{ category }}</span>
      </li>

      <li class="list-group-item">Price/hour: ${{ price }},-</li>
      <li class="list-group-item">Rating: {{ rating }}</li>
    </ul>
    <div class="card-body text-left px-3">
      <p class="h6 mb-3">Whats your rating:</p>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button @click="updateRating( artistId, 1 )" type="button" class="btn btn-light">1 <i class="fas fa-star"></i></button>
        <button @click="updateRating( artistId, 2 )" type="button" class="btn btn-light">2 <i class="fas fa-star"></i></button>
        <button @click="updateRating( artistId, 3 )" type="button" class="btn btn-light">3 <i class="fas fa-star"></i></button>
        <button @click="updateRating( artistId, 4 )" type="button" class="btn btn-light">4 <i class="fas fa-star"></i></button>
        <button @click="updateRating( artistId, 5 )" type="button" class="btn btn-light">5 <i class="fas fa-star"></i></button>
      </div>
    </div>
  </div>
</div>
</template>
<style scoped>
  .bg-image-test {
    height: 200px;
    width: auto;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  .description {
    min-height: 96px;
  }

  .fa-star {
    color: #FFc107;
  }
</style>
<script>
import axios from 'axios'
import { reactive } from 'vue'
export default {
  props: {
    name: String,
    description: String,
    category: String,
    price: Number,
    rating: Number,
    image: String,
    artistId: Number
  },
  setup(){

    let artistObject = reactive({});
    
    const getArtistById = ( id, newRating ) => {
      axios(`https://localhost:5001/artist/${id}`)
        .then( response => {
          artistObject = response.data;

          let updatedNumberOfRatings = parseInt(artistObject.numberOfRatings) + 1;
          let updatedTotal = ((artistObject.rating) * (artistObject.numberOfRatings)) + newRating;
          let updatedRating = updatedTotal/updatedNumberOfRatings;

          artistObject.numberOfRatings = parseInt(updatedNumberOfRatings);
          artistObject.rating = Math.round(updatedRating * 100) / 100;
        })
    }

    const putArtist = () => {
          axios.put( "https://localhost:5001/artist/", artistObject )
    }
    
    const updateRating = ( id, newRating ) => {
        getArtistById( id, newRating );
        //Waits to run in order for the axios call to getArtistById and update artistObject
        setTimeout(putArtist, 1000);
    }

    return { updateRating }
    
  }
}
</script>