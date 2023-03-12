const events = getConditionalEvents(data);
const categorys = getCategorys(events);
let showingElements = events;

cardInserter(showingElements)
categoryInserter(categorys)

function searchByName(eventos, value) {
  let eventosFiltrados = eventos.filter((elemento) => (elemento.name.toLowerCase()).match(value.toLowerCase()))
  return eventosFiltrados
}

function searchByCategory(eventos, value) {
  let eventosFiltrados = events.filter((elemento) => (elemento.category.toLowerCase()).match(value.toLowerCase()))
  return eventosFiltrados
}

function mensaje() {
  console.log('click');
}


let search = document.querySelector('#search')


const searchBtn = document.querySelector('#searchBtn')
searchBtn.addEventListener('click', (evento) => {
  let value = search.value;
  cardInserter(searchByName(showingElements, value))
  evento.preventDefault();
}
);



const checkboxGroup = document.querySelector('#checkboxGroup')
checkboxGroup.addEventListener('change', () => {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let checked = Array.from(checkboxes).filter((checkbox) => checkbox.checked)
  let checkedValues = checked.map(element => element.value.toLowerCase())

  if (checked.some((element) => element.checked)) {
    let eventosFiltrados = []
    checkedValues.forEach(element => {
      eventosFiltrados.push(searchByCategory(showingElements, element));
      showingElements = eventosFiltrados.flat();
    });
  } else {
    showingElements = events;
  }
  cardInserter(showingElements);
});