async function crearTABLA(){
    try{
      const respuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing')    
      const data = await respuesta.json()
      const eventos = await data.events
      let titulo = "Event Stadistics"
      let subtitulos = ["Event with the highest percentage of attendance",
          "Event with the lowest percentage of attendance",
          "Event with larger capacity"]
      let template = crearTabla1(titulo,subtitulos)
      template += crearLinea(highestLowerAttCapacity(eventos)) + "</table>"
      console.log(template)
      htmlAdder("tabla",template)
    }
    catch(error){
      console.log(error)
    }
  }


function htmlAdder(elementId, elementToInsert) {
//Toma un padre del documento por el ID y un string a insertar y lo inserta en el html
  let element = document.getElementById(elementId);
  element.innerHTML = elementToInsert;
}
  
function crearTabla(titulo, subtitulos, data) {
    let template = `<table class="border bg-light">
                    <tr class="border text-bg-dark">
                        <th class="border" colspan="3">
                            <h3>${titulo}</h3>
                        </th>
                    </tr>`
    template += crearLinea(subtitulos)
    data.forEach(element => {
        template += crearLinea(element)
    });
    template += `</table>`
    
    htmlAdder("tabla", template)
}
function crearTabla1(titulo, subtitulos) {
    let template = `<table class="border bg-light">
                    <tr class="border text-bg-dark">
                        <th class="border" colspan="3">
                            <h3>${titulo}</h3>
                        </th>
                    </tr>`
    template += crearLinea(subtitulos) 
    return template;
}

function crearLinea(subtitulos){
let template = `<tr class="border">`
subtitulos.forEach(subtitulo => {
    template += `<td class="border">
    ${subtitulo}
  </td>`
})
template += `</tr>`
return template
}

function highestLowerAttCapacity(eventos) {
  
  
  let highestAttendance = {
        "name": "",
        "percent" : 0
    }
    let lowestAttendance = {
        "name": "",
        "percent" : 100
    }
    let highestCapacity = {
        "name" : "",
        "capacity": 0
    };
    eventos.forEach(evento => {
        let percentAttendance = 0
        console.log(evento)
        console.log(Object.hasOwn(evento, 'assistance'))
        if (Object.hasOwn(evento, 'assistance')) {
             percentAttendance = evento.assistance/evento.capacity*100
             console.log(percentAttendance)
             if (highestAttendance.percent < percentAttendance){
                 highestAttendance.name = evento.name;
                 highestAttendance.percent = percentAttendance
             }
             if (lowestAttendance.percent > percentAttendance) {
                 lowestAttendance.name = evento.name;
                 lowestAttendance.percent = percentAttendance
             }
        }
        if (evento.capacity > highestCapacity.capacity){
            highestCapacity.name = evento.name
            highestCapacity.capacity = evento.capacity
        }
    });
        return [`${highestAttendance.name} ${highestAttendance.percent.toPrecision(3)}%`,
        `${lowestAttendance.name} ${lowestAttendance.percent.toPrecision(3)}%`,
        `${highestCapacity.name} ${highestCapacity.capacity}`];
}

crearTABLA()
/*
<table class="border bg-light">
<tr class="border text-bg-dark">
  <th class="border" colspan="3">
    <h3>Event Stadistics</h3>
</th>
</tr>
<tr class="border">
<td class="border">
  Event with the highest percentage of attendance
</td>
<td class="border">
  Event with the lowest percentage of attendance
</td>
<td class="border">
  Event with larger capacity
</td>
</tr>
<tr class="border">
<td class="border">1</td>
<td class="border">2</td>
<td class="border">3</td>
</tr>

<tr class="border">
  <th class="border text-bg-dark" colspan="3">
    <h3>Upcoming events stadistics by category</h3>
</th>
</tr>
<tr class="border">
<td class="border">
  Categories
</td>
<td class="border">
  Revenues
</td>
<td class="border">
  Percentage of attendance
</td>
</tr>
<tr class="border">
<td class="border">1</td>
<td class="border">2</td>
<td class="border">3</td>
</tr>
<tr class="border">
<td class="border">1</td>
<td class="border">2</td>
<td class="border">3</td>
</tr>
<tr class="border">
<td class="border">1</td>
<td class="border">2</td>
<td class="border">3</td>
</tr>
<tr class="border">
  <th class="border text-bg-dark" colspan="3">
    <h3>Past events stadistics by category</h3>
</th>
</tr>
<tr class="border">
<td class="border">
  Categories
</td>
<td class="border">
  Revenues
</td>
<td class="border">
  Percentage of attendance
</td>
</tr>
<tr class="border">
<td class="border">1</td>
<td class="border">2</td>
<td class="border">3</td>
</tr>
<tr class="border">
<td class="border">1</td>
<td class="border">2</td>
<td class="border">3</td>
</tr>
<tr class="border">
<td class="border">1</td>
<td class="border">2</td>
<td class="border">3</td>
</tr>
<tr class="border">
<td class="border">1</td>
<td class="border">2</td>
<td class="border">3</td>
</tr>
<tr class="border">
<td class="border">1</td>
<td class="border">2</td>
<td class="border">3</td>
</tr>
</table>
*/

