const events = getConditionalEvents(data);
const categorys = getCategorys(events);


cardInserter(events)
categoryInserter(categorys)
function searchEvent(eventos, value) {
  // for (let evento of eventos) {
  //   if (evento.category == value) {
  //     eventos_filtrados.push(evento)
  //   }
  // }
  let eventos_filtrados = eventos.filter((evento) => evento.name == value)
  return eventos_filtrados
}

function mensaje() {
  console.log('click');
}

// const searchBtn = document.getElementById("searchBtn")

// searchBtn.addEventListener('click', mensaje())

let search = document.querySelector('#search')
let searchBtn = document.querySelector('#searchBtn')

searchBtn.addEventListener('click', (evento) => {
  let value = search.value.toLowerCase();
  let eventosFiltrados = events.filter((elemento) => (elemento.name.toLowerCase()).match(value))
  cardInserter(eventosFiltrados)
  evento.preventDefault();
}
);