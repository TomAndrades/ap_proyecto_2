async function crearTABLA() {
  try {
    const respuesta = await fetch(
      "https://mindhub-xj03.onrender.com/api/amazing"
    );
    const data = await respuesta.json();
    const eventos = await data.events;
    setPercent(await eventos)
    console.log(eventos)
    let pastEvents = Array.from(eventos).filter((evento) => Object.hasOwn(evento, "assistance"))
    let upcomingEvents = Array.from(eventos).filter((evento) => Object.hasOwn(evento, "estimate"))
    let highestAttendance = pastEvents.sort((a,b) =>  {
    if(a.attendancePercent < b.attendancePercent){
      return 1
    }
    if(a.attendancePercent > b.attendancePercent) {
      return -1
    } else {
      return 0
    }
    })
    let lowestAttendance = highestAttendance[highestAttendance.length-1]
    let mostCapacity = pastEvents.reduce((acc,act) => {
      if(act.capacity > acc.capacity){
        return act
      }else{
        return acc
      }
      
    }, {capacity: 0})
    console.log(highestAttendance)
    console.log(lowestAttendance);
    console.log(mostCapacity);
    //Tabla 1
    let eventStadisticTitle = {
      titulo: "Event Stadistics",
      subtitulo: [
        "Event with the highest percentage of attendance",
        "Event with the lowest percentage of attendance",
        "Event with larger capacity",
      ],
      // data: highestLowerAttCapacity(eventos),
    };
    
    // console.log(upcomingEvents);
    

    let UpcomingStadisticTitle = {
      titulo: "Upcoming events stadistics by Category",
      subtitulo: [
        "Category",
        "Revenues",
        "% of attendance",
      ],
      // data: highestLowerAttCapacity(eventos),
    };
    let PastStadisticTitle = {
      titulo: "Past events stadistics by Category",
      subtitulo: [
        "Category",
        "Revenues",
        "% of attendance",
      ],
      // data: highestLowerAttCapacity(eventos),
    };
    // let template = crearTabla1(titulo, subtitulos);
    // template += crearLinea(highestLowerAttCapacity(eventos)) + "</table>";
    // htmlAdder("tabla", template);
    //Tabla 2
    // let titulo = "Event Stadistics";
    // let subtitulos = [
    //   "Event with the highest percentage of attendance",
    //   "Event with the lowest percentage of attendance",
    //   "Event with larger capacity",
    // ];
    // let template = crearTabla1(titulo, subtitulos);
    // template += crearLinea(highestLowerAttCapacity(eventos)) + "</table>";
  } catch (error) {
    console.log(error);
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
                    </tr>`;
  template += crearLinea(subtitulos);
  data.forEach((element) => {
    template += crearLinea(element);
  });
  template += `</table>`;

  htmlAdder("tabla", template);
}
function crearTabla1(titulo, subtitulos) {
  let template = `<table class="border bg-light">
                    <tr class="border text-bg-dark">
                        <th class="border" colspan="3">
                            <h3>${titulo}</h3>
                        </th>
                    </tr>`;
  template += crearLinea(subtitulos);
  return template;
}

function crearLinea(subtitulos) {
  let template = `<tr class="border">`;
  subtitulos.forEach((subtitulo) => {
    template += `<td class="border">
    ${subtitulo}
  </td>`;
  });
  template += `</tr>`;
  return template;
}

function setPercent(eventos){
  eventos.forEach((evento) => {
    let percentAttendance = 0;
    if (Object.hasOwn(evento, "assistance")) {
      percentAttendance = (evento.assistance / evento.capacity) * 100;
      Object.defineProperty(evento, "attendancePercent", {value:percentAttendance.toFixed(2)})
    }else{
      percentEstimate = (evento.estimate / evento.capacity) * 100;
      Object.defineProperty(evento, "percentEstimate", {value:percentEstimate.toFixed(2)})
    }})
}
// function highestCapacity(eventos){
//   let highestCapacity = {
//     name: "",
//     capacity: 0,
//   };
//   eventos.forEach(evento)
//   if (evento.capacity > highestCapacity.capacity) {
//     highestCapacity.name = evento.name;
//     highestCapacity.capacity = evento.capacity;
//   }
// }
// function highestLowerAttCapacity(eventos) {
//   let highestAttendance = {
//     name: "",
//     percent: 0,
//   };
//   let lowestAttendance = {
//     name: "",
//     percent: 100,
//   };
//   eventos.forEach((evento) => {
//     if (highestAttendance.percent < percentAttendance) {
//         highestAttendance.name = evento.name;
//         highestAttendance.percent = percentAttendance;
//       }
//     if (lowestAttendance.percent > percentAttendance) {
//         lowestAttendance.name = evento.name;
//         lowestAttendance.percent = percentAttendance;
//       }
    
//   });
//   return [
//     `${highestAttendance.name} ${highestAttendance.percent.toFixed(3)}%`,
//     `${lowestAttendance.name} ${lowestAttendance.percent.toFixed(3)}%`,
//     `${highestCapacity.name} ${highestCapacity.capacity}`,
//   ];
// }

crearTABLA();
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
