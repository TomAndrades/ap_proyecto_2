const events = getConditionalEvents(data);
const categorys = getCategorys(events);


cardInserter(events)
categoryInserter(categorys)

function searchByName(eventos, value) {
  let eventosFiltrados = events.filter((elemento) => (elemento.name.toLowerCase()).match(value.toLowerCase()))
  return eventosFiltrados
}

function searchByCategory(eventos, value) {
  let eventosFiltrados = events.filter((elemento) => (elemento.category.toLowerCase()).match(value.toLowerCase()))
  return eventosFiltrados
}

function mensaje() {
  console.log('click');
}

// const searchBtn = document.getElementById("searchBtn")

// searchBtn.addEventListener('click', mensaje())

let search = document.querySelector('#search')
let searchBtn = document.querySelector('#searchBtn')

searchBtn.addEventListener('click', (evento) => {
  let value = search.value;
  cardInserter(searchByName(events, value))
  evento.preventDefault();
}
);


let checkboxGroup = document.querySelector('#checkboxGroup')

checkboxGroup.addEventListener('change', () => {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let checked = Array.from(checkboxes).filter((checkbox) => checkbox.checked)
  let checkedValues = checked.map(element => element.value.toLowerCase())

  if (checked.some((element) => element.checked)){
    let eventosFiltrados = []
    checkedValues.forEach(element => {
      eventosFiltrados.push(searchByCategory(events, element))
    });
    cardInserter(eventosFiltrados.flat());
  }else{
    cardInserter(events);
  }
  

});