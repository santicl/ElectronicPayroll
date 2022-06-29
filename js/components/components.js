export const cesantias = (salary, daysWork) => {
    let cesantias = (salary * daysWork) / 360;
    return cesantias;
}

export const cesantiasInteres = (cesantias, daysWork) => {
    let cesantiasInteres = (cesantias * daysWork * 0.12) / 360;
    return cesantiasInteres;
}

export const primaServices = (salary, daysWorkInSemester) => {
    let primaServices = (salary * daysWorkInSemester) / 360;
    return primaServices;
}

export const vacations = (salary, daysWork) => {
    let vacations = (salary * daysWork) / 720;
    return vacations;
}

export const hoursExLigth = (valueHourPerDay) => {
    let hoursPay = valueHourPerDay * 1.25;
    return hoursPay;
}

export const hourExNight = (valueHourPerDay) => {
    let hoursPay = valueHourPerDay * 1.75;
    return hoursPay;
}

export const hourExDomiOrFestDiurna = (valueHourPerDay) => {
    let hoursPerDay = valueHourPerDay * 1.75;
    return hoursPerDay;
}

export const hourExDomiOrFestNocturna = (valueHourPerDay) => {
    let hoursPerDay = valueHourPerDay * 2.5;
    return hoursPerDay;
}

export const getMonths = () => {
    let month = new Date().getMonth();
    month = month + 1;
    return month;
}

export const getDaysInMonth = (getMonths, data) => {
    let day = getMonths;
    let daysInMonth = getNumberMonth(data, day);
    for (let i = 0; i < daysInMonth.length; i++) {
        console.log(daysInMonth[i]);
    }
}

export const getNumberMonth = (data, day) => {
    for (let i = 1; i <= data.length; i++) {
        if (i === day) {
            return data[i];
        }
    }
}

export const arrayElementsByBtn = (data) => {
    for (const el of data.elementsByClassNames) {
        el.addEventListener('click', () => {
            popup(el);
            data.popup.style.visibility = "visible";
            data.popup.style.display = "block";
        })
    }
}

export const popup = (el) => {
    let employed = JSON.parse(localStorage.getItem('user'));
    let data;
    employed = employed.employed
    for (let i = 0; i < employed.length; i++) {
        console.log(employed[i].doc)
        if (employed[i].doc === el.id) {
            data = employed[i];
        }
    }
    showPopup(data, el);
    readPopup(el);
}

export const showPopup = (data, el) => {
    document.getElementById('popup').innerHTML = `
    <a class="btn-cerrar-popup"><i id="btn-cerrar-popup" class="fas fa-times closed"></i></a>
    <h1>${data.name} ${data.lastName}</h1>
      <label for="">Dias Trabajados</label>
      <input id="daysWork" type="number" name="normales" placeholder="Dias normales trabajados">
      <label for="">Dias Festivos Trabajados</label>
      <input id="daysWorkFest" type="number" name="festivos" placeholder="Dias Festivos trabajados">
      <label for="">Horas Extras</label>
      <input id="hourE" type="number" name="horasEx" placeholder="Horas Extras">
      <button id="${data.doc}" class="btn btn-success">Guardar</button>`;
      readPopup(data.name);
}

export const readPopup = (data) => { // remove bug when click on button in popup information
    console.log("entro");
    document.getElementById(data).addEventListener('click', () => {
        el.addEventListener('click', () => {
            let daysWork = document.getElementById('daysWork').value;
            let daysWorkFest = document.getElementById('daysWorkFest').value;
            let hourE = document.getElementById('hourE').value;
            let doc = el.id;
            let employed = JSON.parse(localStorage.getItem('user'));
            employed = employed.employed;
            for (let i = 0; i < employed.length; i++) {
                if (employed[i].doc === doc) {
                    employed[i].daysWork = daysWork;
                    employed[i].daysWorkFest = daysWorkFest;
                    employed[i].hourE = hourE;
                }
            }
            localStorage.setItem('user', JSON.stringify(employed));
        })
    })
}

export const dataInfo = {
    SubsidioDeTransporte: 117172,
    recargoNocturno: 0.35,
    recargoDomingo: 0.75,
    recargoNocturnoDomingo: 1.1,
    salud: 0.04,
    pension: 0.04,
    cajaCompensacion: 0.04
};