

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
    templateCheckbox += `<form class="form d-flex flex-nowrap ms-auto mw-100">
                    <input
                      class="form-control"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button class="btn btn-fucsia btn-outline-dark py-2" type="submit">
                      <img src="./assets/img/search.svg" alt="Search icon" />
                    </button>
                  </form>`
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
            <a href="./details.html" class="btn btn-fucsia">ver mas...</a>
          </div>
        </div>
      </div>`;
    }

    htmlAdder("eventsBody", templateCards)
}