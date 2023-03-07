const events = getConditionalEvents(data)
const categorys = getCategorys(events)

cardInserter(events)
categoryInserter(categorys)

let checkboxs = document.querySelector('input[type=checkbox]', 'checkboxGroup')
console.log(checkboxs);
