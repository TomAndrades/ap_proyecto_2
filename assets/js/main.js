let events = []

function htmlAdder(elementId, elementToInsert) {
  let element = document.getElementById(elementId);
  element.innerHTML = elementToInsert;
}

for (let i=0; i<data.events.length;i++){
    events.push(data.events[i]);
}

// console.log(events)

let templateCards = ""
for (const evento of events){
    templateCards += `<div class="col">
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
  </div>`;
}
htmlAdder("eventsBody", templateCards)

function getCategorys(eventos){
  // Toma un array de eventos y devuelve un array de categorias unicas
  let categorys = []
  
  for ( const evento of eventos){
    if (categorys.indexOf(evento.category ) == -1){
      categorys.push(evento.category);
    }
  }
  return categorys
}


let categorias = getCategorys(events)
console.log(categorias)

let templateCheckbox = ""


for (const categoria of categorias){
  templateCheckbox += `<label class="form-check-label">
  <input
    class="form-check-input"
    type="checkbox"
    value="${categoria}"
    id="${categoria}"
  />
  ${categoria}
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
console.log(templateCheckbox)
htmlAdder("checkboxGroup", templateCheckbox)