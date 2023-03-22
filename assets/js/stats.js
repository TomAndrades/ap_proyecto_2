async function crearTABLA() {
  try {
    const respuesta = await fetch(
      "https://mindhub-xj03.onrender.com/api/amazing"
    );
    const data = await respuesta.json();
    const eventos = await data.events;
    setPercent(await eventos);

    console.log(eventos);

    let pastEvents = Array.from(eventos).filter((evento) =>
      Object.hasOwn(evento, "assistance")
    );
    
    let upcomingEvents = Array.from(eventos).filter((evento) =>
      Object.hasOwn(evento, "estimate")
    );

    let sortHighestAttendance = pastEvents.sort((a, b) => {
      if (a.percent < b.percent) {
        return 1;
      }
      if (a.percent > b.percent) {
        return -1;
      } else {
        return 0;
      }
    });

    let highestAttendance = sortHighestAttendance[0];
    let lowestAttendance =
      sortHighestAttendance[sortHighestAttendance.length - 1];
    let mostCapacity = pastEvents.reduce(
      (acc, act) => {
        if (act.capacity > acc.capacity) {
          return act;
        } else {
          return acc;
        }
      },
      { capacity: 0 }
    );

    console.log(highestAttendance);
    console.log(lowestAttendance);
    console.log(mostCapacity);

    let upcomingEventStats = getCategoryStats(upcomingEvents, false)
    let pastEventStats = getCategoryStats(pastEvents, true)
    console.log(upcomingEventStats)
    console.log(pastEventStats)
    
    //Tabla 1
    let eventStadistics = {
      titulo: "Event Stadistics",
      subtitulo: [
        "Event with the highest percentage of attendance",
        "Event with the lowest percentage of attendance",
        "Event with larger capacity",
      ],
      data: [
        `${highestAttendance.name} ${highestAttendance.percent.toFixed(2)}%`,
        `${lowestAttendance.name} ${lowestAttendance.percent.toFixed(2)}%`,
        `${mostCapacity.name} ${mostCapacity.capacity}`,
      ],
    };

    let upcomingStadisticTitle = {
      titulo: "Upcoming events stadistics by Category",
      subtitulo: ["Category", "Revenues", "% of attendance"],
      data: highestLowerAttCapacity(eventos),
    };
    let PastStadisticTitle = {
      titulo: "Past events stadistics by Category",
      subtitulo: ["Category", "Revenues", "% of attendance"],
      // data: highestLowerAttCapacity(eventos),
    };
    let template = crearTabla1(
      eventStadistics.titulo,
      eventStadistics.subtitulo
    );
    template += crearLinea(eventStadistics.data) + "</table>";
    htmlAdder("tabla", template);
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

function getCategoryStats(events,past) {
  let eventStats = []
  getCategorys(events).forEach((category) => {
    let acumulador = 0;
    let revenue = events.reduce((acc, act) => {
      if (category == act.category) {
        if(past){
          return acc + act.price * act.assistance;
        }
        return acc + act.price * act.estimate;
      } else {
        return acc;
      }
    }, 0);
    let percent =
      events.reduce((acc, act) => {
        if (category == act.category) {
          acumulador++;
          return acc + act.percent;
        } else {
          return acc;
        }
      }, 0) / acumulador;
    eventStats.push({
      name: category,
      revenue: revenue,
      percent: percent,
    });
  });
  return eventStats
}

function getCategorys(events) {
  // Toma un array de eventos y devuelve un array de categorias unicas
  let categorys = [];

  for (let event of events) {
    if (categorys.indexOf(event.category) == -1) {
      categorys.push(event.category);
    }
  }
  return categorys;
}

function htmlAdder(elementId, elementToInsert) {
  //Toma un padre del documento por el ID y un string a insertar y lo inserta en el html
  let element = document.getElementById(elementId);
  element.innerHTML = elementToInsert;
}
function 

function crearStadisticsTable(eventStadistics) {
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
  let template = `<table class="border bg-light text-center">
                    <tr class="border text-bg-dark">
                        <th class="border" colspan="3">
                            <h3>${titulo}</h3>
                        </th>
                    </tr>`;
  template += crearLinea(subtitulos);
  return template;
}

function crearLinea(data) {
  let template = `<tr class="border">`;
  data.forEach((element) => {
    template += `<td class="border">
    ${element}
  </td>`;
  });
  template += `</tr>`;
  return template;
}

function setPercent(eventos) {
  eventos.forEach((evento) => {
    let percent = 0;
    if (Object.hasOwn(evento, "assistance")) {
      percent = (evento.assistance / evento.capacity) * 100;
    } else {
      percent = (evento.estimate / evento.capacity) * 100;
    }
    Object.defineProperty(evento, "percent", {
      value: percent,
    });
  });
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
