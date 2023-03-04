let upcoming_events = []

for (let i=0; i<data.events.length;i++){
    if(data.currentDate < data.events[i].date)
    upcoming_events.push(data.events[i])
}

console.log(upcoming_events)

let template = ""
for (const evento of upcoming_events){
    template += `<div class="col">
    <div class="card text-bg-dark">
      <img
        src="${evento.image}"
        class="card-img-top"
        alt="${evento.name}"
      />
      <div class="card-body">
        <h5 class="card-title">${evento.name}</h5>
        <p class="card-text">
          ${evento.description}
        </p>
      </div>
      <div
        class="card-footer d-flex justify-content-between align-items-center"
      >
        <p class="pt-3">Precio: $${evento.price}</p>
        <a href="./details.html" class="btn btn-fucsia">ver mas...</a>
      </div>
    </div>
  </div>`
}
eventsBody = document.getElementById("eventsBody")
eventsBody.innerHTML = template