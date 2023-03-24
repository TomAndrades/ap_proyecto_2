const { createApp } = Vue;

const app =  createApp( {
    data() {
      return {
        question: '',
        eventos: 'esperandoAPI',
        currentDate: 'esperando API',
        categorias: [],
      }
    },
        created() {
      // whenever question changes, this function will run
          this.getEvents()
        },
        mounted(){
            
        },
    methods: {
      async getEvents() {
        this.eventos = 'Obteniendo datos'
        try {
            const res = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
            const data = (await res.json())
            this.eventos = await data.events
            this.currentDate = await data.currentDate
            this.getCategorys()
        } catch (error) {
          this.eventos = 'Error! Could not reach the API. ' + error
        }
      },
      getCategorys() {
        // Toma un array de eventos y devuelve un array de categorias unicas
        for (let evento of this.eventos) {
          if (this.categorias.indexOf(evento.category) == -1) {
            this.categorias.push(evento.category);
          }
        }
    }
  }
}
).mount("#app")