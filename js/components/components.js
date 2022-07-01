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
    if (valueHourPerDay == 0) {
        return 0;
    } else {
        let hoursPay = valueHourPerDay * 1.25;
        return hoursPay;
    }
}

export const hourExNight = (valueHourPerDay) => {
    if (valueHourPerDay == 0) {
        return 0;
    } else {
        let hoursPay = valueHourPerDay * 1.75;
        return hoursPay;
    }
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

export const popup = (el) => {
    let employed = JSON.parse(localStorage.getItem('user'));
    employed = employed.employed
    let data;
    for (let i = 0; i < employed.length; i++) {
        if (employed[i].doc === el.id) {
            data = employed[i];
        }
    }
    return data;
}

const showPopup = (el) => {
    let popupData = popup(el);
    document.getElementById('popup').innerHTML = `
    <a class="btn-cerrar-popup"><i id="btn-cerrar-popup" class="fas fa-times closed"></i></a>
    <h1>${popupData.name} ${popupData.lastName}</h1>
      <label for="">Dias Trabajados</label>
      <input id="daysWork" type="number" name="normales" placeholder="Dias normales trabajados">
      <label for="">Dias Festivos Trabajados</label>
      <input id="daysWorkFest" type="number" name="festivos" placeholder="Dias Festivos trabajados">
      <label for="">Horas Extras</label>
      <input id="hourE" type="number" name="horasEx" placeholder="Horas Extras">
      <button id="${popupData.name}" class="btn btn-success">Guardar</button>`;
    payroll(popupData.name, el);
}

const payroll = (name, el) => {
    document.getElementById(name).addEventListener('click', () => {
        let daysWork = document.getElementById('daysWork').value;
        let daysWorkFest = document.getElementById('daysWorkFest').value;
        let hourE = document.getElementById('hourE').value;

        if (daysWork === '') {
            daysWork = 0;
        }
        if (daysWorkFest === '') {
            daysWorkFest = 0;
        }
        if (hourE === '') {
            hourE = 0;
        }
        let dataHours = {
            daysWork,
            daysWorkFest,
            hourE
        }

        settlePayroll(dataHours, el);

    })
}

const settlePayroll = (dataHours, el) => {
    let employed = JSON.parse(localStorage.getItem('user'));
    employed = employed.employed
    let data;
    for (let i = 0; i < employed.length; i++) {
        console.log(employed[i].doc, el.id);
        if (employed[i].doc === el.id) {
            data = employed[i];
        }
    }
    let salary = parseInt(data.salary);
    let daysWork = dataHours.daysWork;
    let hourE = dataHours.hourE;
    let cesantiasData = cesantias(salary, daysWork);
    let cesantiasInteresData = cesantiasInteres(cesantiasData, daysWork);
    let primaServicesData = primaServices(salary, daysWork);
    let hoursExData = hoursExLigth(hourE);
    let totalHours = hoursExData;
    let totalSalary = salary + cesantiasData + cesantiasInteresData + primaServicesData + totalHours + 117125;
    let payroll = {
        cesantiasData,
        cesantiasInteresData,
        primaServicesData,
        hoursExData,
        totalHours,
        totalSalary
    }
    document.getElementById('popup').innerHTML = `
    <a class="btn-cerrar-popup"><i id="btn-cerrar-popup" class="fas fa-times closed"></i></a>
    <h1>${data.name} ${data.lastName}</h1>
      <label for="">Salario</label>
      <input id="salary" type="number" name="salary" placeholder="Salario" value="${salary}">
      <label for="">Cesantias</label>
        <input id="cesantias" type="number" name="cesantias" placeholder="Cesantias" value="${cesantiasData}">
        <label for="">Cesantias Interes</label>
        <input id="cesantiasInteres" type="number" name="cesantiasInteres" placeholder="Cesantias Interes" value="${cesantiasInteresData}">
        <label for="">Prima de Servicios</label>
        <input id="primaServices" type="number" name="primaServices" placeholder="Prima de Servicios" value="${primaServicesData}">
        <label for="">Horas Extras</label>
        <input id="hoursExLigth" type="number" name="hoursExLigth" placeholder="Horas Extras" value="${hoursExData}">
        <label for="">Total Horas Extras</label>
        <input id="totalHours" type="number" name="totalHours" placeholder="Total Horas Extras" value="${totalHours}">
        <label for="">Total Salario</label>
        <input id="totalSalary" type="number" name="totalSalary" placeholder="Total Salario" value="${totalSalary}">
        <button id="${data.doc}" class="btn btn-success">Guardar</button>`;
        saveSettlePayroll(payroll, data.doc);
}

const saveSettlePayroll = (payroll, el) => {
    let btn = document.getElementById(el);
    let getData = popup(btn);
    let employed = JSON.parse(localStorage.getItem('user'));
    employed = employed.employed;
    for (let i = 0; i < employed.length; i++) {
        if (employed[i].doc === getData.doc) {
            employed[i].push(payroll.cesantiasData, 
                             payroll.cesantiasInteresData, 
                             payroll.primaServicesData, 
                             payroll.hoursExData, 
                             payroll.totalHours, 
                             payroll.totalSalary);
        }
    }
}

export const arrayElementsByBtn = (data) => {
    for (const el of data.elementsByClassNames) {
        el.addEventListener('click', () => {
            showPopup(el);
            data.popup.style.visibility = "visible";
            data.popup.style.display = "block";
        })
    }
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