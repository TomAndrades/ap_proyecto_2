

  const { createApp } = Vue

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
// const events = getConditionalEvents();
// let showingElements = events;
let search = document.querySelector('#search')
let searchBtn = document.querySelector('#searchBtn')
let checkboxGroup = document.querySelector('#checkboxGroup')