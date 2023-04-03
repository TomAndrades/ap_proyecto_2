
async function getConditionalEvents(time = 0) {
    //Toma una lista de data desde una api y retorna los eventos de un conjunto de datos,
    try{
      const respuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing')    
      const data = await respuesta.json()
      const eventos = await data.events
      const currentDate = await data.currentDate
      // console.log(eventos)
      // console.log(currentDate)
      switch (time){
        case -1:
          eventosFiltrados = Array.from(eventos).filter((event) => event.date < currentDate)
        break;
        case 0:
          eventosFiltrados = eventos;
        break;
        case 1:
          eventosFiltrados = Array.from(eventos).filter((event) => event.date > currentDate)
        break;
      }
      const queryString = location.search
const params = new URLSearchParams(queryString)
const id = params.get("id")
const evento = eventosFiltrados.find((evento) => (evento._id == id))
const main = document.querySelector("main")
main.innerHTML = `
<div class="d-flex flex-column flex-xl-row w-75 text-bg-dark py-3 px-3">
        <div
          class="d-flex justify-content-center align-items-center bg-dark"
        >
          <img src="${evento.image}" alt="${evento.name}" class="w-100" />
        </div>
        <div
          class="text-center justify-content-center d-flex flex-nowrap flex-column bg-secondary"
        >
          <h2 class="fw-bold shadow bg-dark">${evento.name}</h2>
          <p class="fs-3">${evento.description}</p>
          <p class="fs-3 bg-fucsia "><span class="fst-italic">Capacity:</span> ${evento.capacity}</p>
          <p class="fs-3 bg-fucsia "><span class="fst-italic">Place:</span> ${evento.place}</p>
          <p class="fs-3 bg-fucsia "><span class="fst-italic">Price:</span> $${evento.price}</p>
          <p class="fs-3 bg-fucsia "><span class="fst-italic">Date:</span> ${evento.date}</p>
          </div>
      </div>
      `

    }
    catch(error){
      console.log(error)
      // alert('An error has ocurred obtaining the cards')
    }
  }

  getConditionalEvents();