<template>
  <section class="container-fluid" id="gig-form">
    <div class="container col-12 col-sm-9 col-md-6 col-lg-4">
      <h3>Create a gig</h3>
      <p>Let us know what you need for your event and we will get back to you!</p>
      <form class="text-left">
        <div class="form-group">
          <label for="event">What kind of event are you hosting?</label>
          <input type="text" class="form-control" id="event" placeholder="Wedding, birthday..." v-model="event">
        </div>
        <div class="form-group">
          <label for="name">Enter your name</label>
          <input type="text" class="form-control" id="name" placeholder="Enter name" v-model="name">
        </div>
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" placeholder="Enter email" v-model="email">
        </div>
        <div class="form-group">
          <label for="phone">Phone number</label>
          <input type="text" class="form-control" id="phone" placeholder="Enter phone number" v-model="phone">
        </div>
        <div class="form-group">
          <label>Choose instruments</label>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Song" id="song-checkbox">
            <label class="form-check-label" for="song-checkbox">
              Song
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Guitar" id="guitar-checkbox">
            <label class="form-check-label" for="guitar-checkbox">
              Guitar
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Piano" id="piano-checkbox">
            <label class="form-check-label" for="piano-checkbox">
              Piano
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Drums" id="drums-checkbox">
            <label class="form-check-label" for="drums-checkbox">
              Drums
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Saxophone" id="saxophone-checkbox">
            <label class="form-check-label" for="saxophone-checkbox">
              Saxophone
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Cello" id="cello-checkbox">
            <label class="form-check-label" for="cello-checkbox">
              Cello
            </label>
          </div>
        </div>
        <div class="form-group">
          <label for="formControlRange">Max price/hour: ${{ price }} </label>
          <input type="range" class="form-control-range" id="formControlRange" min="10.00" max="35.00" v-model="price">
        </div>
        <button type="submit" class="btn btn-primary btn-block my-5" @click="postNewGig">Submit gig</button>
      </form>
      <div :class="isSubmitted ? 'display-alert alert alert-success':'display-none'" role="alert">
        Thank you for your request, we will contact you shortly!
      </div>
    </div>
  </section>
</template>

<style scoped>
.display-alert {
  opacity: 1;
  transition: opacity 300ms ease-in;
}

.display-none {
  opacity: 0;
  transition: opacity 300ms ease-in;
}
</style>

<script>
import { reactive, toRefs, ref } from 'vue'
import axios from 'axios'
export default {
  setup() {

    let isSubmitted = ref( false );

    const newGigInput = reactive({
      name: "",
      email: "",
      phone: "",
      category: "",
      price: 22.5,
      event: ""
    })

    const postNewGig = () => {

      let checboxList = document.getElementsByClassName("form-check-input");
      let checkedInstruments = [];

      checboxList.forEach( instrument => {
        if(instrument.checked == true){
          checkedInstruments.push(instrument.value);
          instrument.checked = false;
        }
      });

      const newGig = {
        name: newGigInput.name,
        email: newGigInput.email,
        phone: newGigInput.phone,
        category: JSON.stringify(checkedInstruments),
        price: parseInt(newGigInput.price),
        event: newGigInput.event
      }

      axios.post( "https://localhost:5001/gig/", newGig ) 

      //Clears input-fields after submit
      newGigInput.name = "";
      newGigInput.email = "";
      newGigInput.phone = "";
      newGigInput.category = "";
      newGigInput.price = 22.5;
      newGigInput.event = "";

      //Shoes succesfull alert
      isSubmitted.value = true;
      setTimeout(function(){
        isSubmitted.value = false;
      }, 3000)
    }

    return { ...toRefs(newGigInput), postNewGig, isSubmitted }
    
  },
}
</script>