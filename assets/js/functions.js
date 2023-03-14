

function getConditionalEvents(data, time = 0) {
  //Toma una lista de data y retorna los eventos de un conjunto de datos,   
  let events = []
  switch (time) {
    case -1:
      //before currentDate events
      for (let i = 0; i < data.events.length; i++) {
        if (data.currentDate > data.events[i].date)
          events.push(data.events[i])
      }
      break;
    case 0:
      //all events
      for (let i = 0; i < data.events.length; i++) {
        events.push(data.events[i]);
      }
      break;
    case 1:
      //after currentDate events
      for (let i = 0; i < data.events.length; i++) {
        if (data.currentDate < data.events[i].date)
          events.push(data.events[i])
      }
      break;
    default:
      console.error('Debes agregar el segundo parametro correctamente');
      break;
  }

  return events
}

function htmlAdder(elementId, elementToInsert) {
  //Toma un padre del documento por el ID y un string a insertar y lo inserta en el html
  let element = document.getElementById(elementId);
  element.innerHTML = elementToInsert;
}

function getCategorys(events) {
  // Toma un array de eventos y devuelve un array de categorias unicas
  let categorys = []

  for (const event of events) {
    if (categorys.indexOf(event.category) == -1) {
      categorys.push(event.category);
    }
  }
  return categorys
}

function categoryInserter(categorys) {
  let templateCheckbox = ""
  for (const category of categorys) {
    templateCheckbox += `<label class="form-check-label">
      <input
        class="form-check-input"
        type="checkbox"
        value="${category}"
        id="${category}"
      />
      ${category}
      </label>`
  }
  htmlAdder("checkboxGroup", templateCheckbox)
}

function cardInserter(events) {
  let templateCards = ""
  for (const event of events) {
    templateCards += `<div class="col">
        <div class="card text-bg-dark">
          <img
            src="${event.image}"
            class="card-img-top"
            alt="${event.name}"
          />
          <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">
              ${event.description}
            </p>
          </div>
          <div
            class="card-footer d-flex justify-content-between align-items-center"
          >
            <p class="pt-3">Precio: $${event.price}</p>
            <a href="./details.html?id=${event._id}" class="btn btn-fucsia">ver mas...</a>
          </div>
        </div>
      </div>`;
  }

  htmlAdder("eventsBody", templateCards)
}

function searchByName(eventos, value) {
  let eventosFiltrados = eventos.filter((elemento) => (elemento.name.toLowerCase()).match(value.toLowerCase()))
  return eventosFiltrados
}

function searchByCategory(eventos, value) {
  let eventosFiltrados = eventos.filter((elemento) => (elemento.category.toLowerCase()).match(value.toLowerCase()))
  return eventosFiltrados
}




searchBtn.addEventListener('click', (evento) => {
  let value = search.value;
  let searched = []
  console.log(value)
  if (value == 0) {
    showingElements = events;
  } else {
    searched = searchByName(showingElements, value);
    if (searched.length == 0) {
      alert(`We cannot find anything for '${value}', please try another word or phrase`)
    } else {
      showingElements = searched;
    }
  }
  cardInserter(showingElements)
  evento.preventDefault();
}
);




checkboxGroup.addEventListener('change', () => {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let checked = Array.from(checkboxes).filter((checkbox) => checkbox.checked)
  let checkedValues = checked.map(element => element.value.toLowerCase())

  if (checked.some((element) => element.checked)) {
    let eventosFiltrados = []
    checkedValues.forEach(element => {
      eventosFiltrados.push(searchByCategory(events, element));
      showingElements = eventosFiltrados.flat();
    });
  } else {
    showingElements = events;
  }
  cardInserter(showingElements);
});