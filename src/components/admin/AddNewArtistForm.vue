<template>
  <section class="container-fluid" id="gig-form">
    <div class="container col-12 col-sm-9 col-md-6 col-lg-4">
      <h3 class="text-left h4 mt-4">Add a new artist</h3>
      <form class="text-left">
        <div class="form-group">
          <label for="name">Enter your name</label>
          <input type="text" class="form-control" id="name" placeholder="Enter name" v-model="name">
        </div>
        <div class="form-group">
          <label for="description">Artist description</label>
          <input type="description" class="form-control" id="description" placeholder="Enter description" v-model="description">
        </div>
        <div class="form-group">
          <label for="price">Price/hour</label>
          <input type="text" class="form-control" id="price" placeholder="Enter price number" v-model="price">
        </div>
        <div class="form-group">
          <label>Choose instrument</label>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="instrumentRadio" id="instrumentRadio1" value="Song" checked>
            <label class="form-check-label" for="instrumentRadio1">
              Song
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="instrumentRadio" id="instrumentRadio2" value="Guitar">
            <label class="form-check-label" for="instrumentRadio2">
              Guitar
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="instrumentRadio" id="instrumentRadio3" value="Piano">
            <label class="form-check-label" for="instrumentRadio3">
              Piano
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="instrumentRadio" id="instrumentRadio3" value="Drums">
            <label class="form-check-label" for="instrumentRadio3">
              Drums
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="instrumentRadio" id="instrumentRadio3" value="Saxophone">
            <label class="form-check-label" for="instrumentRadio3">
              Saxophone
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="instrumentRadio" id="instrumentRadio3" value="Cello">
            <label class="form-check-label" for="instrumentRadio3">
              Cello
            </label>
          </div>
        </div>
        <div class="form-group">
          <label for="artistImage">Add image of the artist</label>
          <input @change="setImage" type="file" class="form-control-file" id="artistImage">
        </div>
        <button type="submit" class="btn btn-primary btn-block my-5" @click="postNewArtist">Add Artist</button>
      </form>
      <div :class="isSubmitted ? 'display-alert alert alert-primary':'display-none'" role="alert">
        The Artist was added successfully!
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

    const newArtistInput = reactive({
      name: "",
      description: "",
      image: "",
      category: "",
      price: "",
    })

    const imageObject = new FormData();

    const setImage = (e) => {
      imageObject.append("file", e.target.files[0]);
      newArtistInput.image = e.target.files[0].name;
    }

    const postNewArtist = () => {

      let radioList = document.getElementsByClassName("form-check-input");
      let checkedInstrument = "";

      radioList.forEach( instrument => {
        if(instrument.checked == true){
          checkedInstrument = instrument.value;
          instrument.checked = false;
        }
      });

      const newArtist = {
        name: newArtistInput.name,
        description: newArtistInput.description,
        image: newArtistInput.image,
        category: checkedInstrument,
        price: parseInt(newArtistInput.price),
        numberOfRatings: 0,
        rating: 0
      }

      axios.post( "https://localhost:5001/Artist/", newArtist )
        .then(
          axios({
              method: "POST",
              url: "https://localhost:5001/artist/UploadImage",
              data: imageObject,
              config: { headers: { "Content-Type": "multipart/form-data" } }            
          })
        ) 

      //Clears input-fields after submit
      newArtistInput.name = "";
      newArtistInput.description = "";
      newArtistInput.image = "";
      newArtistInput.category = "";
      newArtistInput.price = 22.5;

      //Showes succesfull alert
      isSubmitted.value = true;
      setTimeout(function(){
        isSubmitted.value = false;
      }, 3000)
    }

    return { ...toRefs(newArtistInput), postNewArtist, isSubmitted, setImage }
    
  },
}
</script>