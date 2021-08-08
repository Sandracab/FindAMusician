<template>
<section class="container-fluid">
  <div class="container">
    <h3 class="mb-4">Submitted Gigs</h3>
    <div class="row justify-content-center">
      <gig-item class="col-12 col-sm-6 col-lg-4 col-xl-3"
      v-for="(gig, index) in gigList"
      :key="index"
      :id="gig.id"
      :name="gig.name"
      :event="gig.event"
      :email="gig.email"
      :phone="gig.phone"
      :price="gig.price"
      :category="gig.category"
      :categoryList="gig.categoryList"
      />
    </div>
  </div>
</section>
</template>

<script>
import GigItem from './GigItem'
import axios from 'axios'
import { ref } from 'vue'
export default {
  setup() {
    
    const gigList = ref([{}]);

    axios("https://localhost:5001/gig")
      .then( response => {
        gigList.value = response.data;
        
        gigList.value.forEach(gig => {
          gig.categoryList = JSON.parse(gig.category);
        });
      }) 
      
      return { gigList }
      
  },
  components: {
    GigItem
  }
}
</script>