<template>
  <the-hero/>
  <featured-artist/>
  <add-new-gig-form/>
</template>

<script>
import TheHero from '../components/home/TheHero'
import AddNewGigForm from '../components/home/AddNewGigForm'
import FeaturedArtist from '../components/home/FeaturedArtist'
export default {
  components: {
    TheHero,
    AddNewGigForm,
    FeaturedArtist
  }
}
</script>

    FeaturedArtist