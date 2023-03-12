const queryString = location.search
const params = new URLSearchParams(queryString)
const id = params.get("id")
const eventos = data.events;
const evento = eventos.find((evento) => (evento._id == id))
const main = document.querySelector("main")
main.innerHTML = `
<div class="d-flex flex-column flex-xl-row w-75 text-bg-dark py-3 px-3">
        <div
          class="d-flex justify-content-center align-items-center bg-secondary"
        >
          <img src="${evento.image}" alt="${evento.name}" class="w-100" />
        </div>
        <div
          class="text-center justify-content-center d-flex flex-nowrap flex-column bg-secondary"
        >
          <h2>${evento.name}</h2>
          <p class="fs-3">${evento.description}</p>
          <p class="fs-3">Capacity: ${evento.capacity}</p>
          <p class="fs-3">Place: ${evento.place}</p>
          <p class="fs-3">Price: $${evento.price}</p>
          <p class="fs-3">Date: ${evento.date}</p>
          </div>
      </div>
      `
