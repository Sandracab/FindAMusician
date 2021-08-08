<template>
    <div class="card bg-light m-3 p-0" style="max-width: 18rem;">
      <div class="card-header">{{ name }}</div>
      <div class="card-body text-left">
        <h5 class="card-title">Contact info</h5>
        <ul class="gig-description">
          <li class="card-text">E-mail: {{ email }}</li>
          <li class="card-text">Phone Number: {{ phone }}</li>
          <li class="card-text">Event: {{ event }}</li>
          <li class="card-text">Max price/hour: ${{ price }}</li>
          <li class="card-text">
            <p>Instruments:</p>
            <span class="badge badge-pill badge-dark mr-1"
            v-for="(instrument, index) in categoryList"
            :key="index"
            >
            {{ instrument }}
            </span>
          </li>
        </ul>
        <button type="button" class="btn btn-warning btn-block" @click="deleteGig(id)">Delete Gig</button>
      </div>
    </div>
</template>

<style scoped>
.gig-description {
  min-height: 210px;
}
</style>

<script>
import axios from 'axios'
export default {
  props: {
    id: Number,
    name: String,
    email: String,
    phone: String,
    event: String,
    price: Number,
    category: String,
    categoryList: Array
  },
  setup(){
    
    const deleteGig = (id) => {
      axios.delete( `${"https://localhost:5001/gig"}/${id}` )
        .then( response => {
          console.log(response.data);
        })
    }

    return { deleteGig }
    
  }
}
</script>