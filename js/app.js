import { getMonths, getDaysInMonth, dataInfo, arrayElementsByBtn } from "./components/components.js";

//let user = {
    //username: 'peter.com',
    //password: 'prueba123',
    //employed: []
//}

let dateDaysInYear = [
    [1, 10],
    [-1],
    [21],
    [14, 15],
    [30],
    [20, 27],
    [4, 20],
    [15],
    [-1],
    [17],
    [7, 14],
    [8]
];

console.log(dataInfo);
console.log(getDaysInMonth(getMonths(), dateDaysInYear));

document.getElementById('save').addEventListener('click', (e) => {
    e.preventDefault();
    let addEmployed = JSON.parse(localStorage.getItem('user'));

    let name = document.getElementById('name').value;
    let lastName = document.getElementById('lastName').value;
    let doc = document.getElementById('cedula').value;
    let phone = document.getElementById('phone').value;
    let eps = document.getElementById('eps').value;
    let cargo = document.getElementById('cargo').value;
    let typeTurno = document.getElementById('typeTurno').value;
    let salary = document.getElementById('salary').value;

    let employed = {
        name,
        lastName,
        doc,
        phone,
        eps,
        cargo,
        typeTurno,
        salary,
        dayExtra: 0,
        dayFest: 0,
        dayRecargo: 0,
        day: 0
    }

    addEmployed.employed.push(employed);
    console.log(addEmployed.employed);
    localStorage.setItem('user', JSON.stringify(addEmployed));
    window.location.href = 'index.html';
    getEmployed();
})

const getEmployed = () => {
    let addEmployed = JSON.parse(localStorage.getItem('user'));
    let employed = addEmployed.employed;
    console.log(employed);
    let tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    for (let i = 0; i < employed.length; i++) {
        const { name, lastName, doc, phone, eps, salary, typeTurno } = employed[i];
        tbody.innerHTML += `
        <tr id = "tr">
            <td>${name} ${lastName}</td>
            <td>${doc}</td>
            <td>${eps}</td>
            <td>${typeTurno}</td>
            <td>${salary}</td>
            <td></td>
            <td><button id="${doc}" class="btn">Liquidar Nomina</button></td>
        </tr>`;
    }
}

const configPopup = () => {
    let elementsByClassNames = document.getElementsByClassName("btn")
    const popup = document.getElementById("popup");
    const close = document.getElementById("btn-cerrar-popup");
    const openPopup = document.getElementById("info-iva");

    let data = {
        elementsByClassNames,
        popup,
        close,
        openPopup
    }

    arrayElementsByBtn(data);

}

const saveData = () => {
    savelist();
}

window.onload = configPopup;

getEmployed();