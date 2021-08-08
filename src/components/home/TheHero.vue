<template>
  <section id="hero-container" class="container-fluid">
  </section>
  <section class="container-fluid">
      <div class="jumbotron">
        <h1 class="display-4">Get the best artist for your event</h1>
        <p class="lead">Create a gig and get quotes from our artists for your event. You decide the price, instrument, date and time that suits your needs.</p>
        <router-link class="btn btn-outline-light btn-lg mx-2 mb-3" to="/artists" role="button">View all artists</router-link>
        <router-link class="btn btn-light btn-lg mx-2 mb-3" to="/" role="button">Create a gig</router-link>
      </div>
  </section>
</template>

<style scoped>
section {
  background-color: #1c1c1c;
}

#hero-container{
  background-image: url(https://localhost:5001/images/the_hero.jpg);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    height: 65vh;
}

.jumbotron {
  background-color: #1c1c1c;
  color: #ffffff;
}
</style>