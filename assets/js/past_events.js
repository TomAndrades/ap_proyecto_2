const events = getConditionalEvents(data, -1)
const categorys = getCategorys(events)
let showingElements = events;

let search = document.querySelector('#search')
let searchBtn = document.querySelector('#searchBtn')
let checkboxGroup = document.querySelector('#checkboxGroup')
cardInserter(showingElements)
categoryInserter(categorys)