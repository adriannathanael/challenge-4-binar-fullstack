class Car {
    constructor(cars) {
        this.cars = cars;
    }
    
    filtermobil() {
        var driver = document.getElementById("driver").value;
        var date = document.getElementById('date').value;
        var time = document.getElementById('time').value;
        var dateTime = date + time;
        var passanger = document.getElementById('passanger').value;

        if (driver === undefined || driver === "") {
            alert("Please select a driver");
            return;
        } else if (dateTime < getDateTimeNow()) {
            alert("Please select a date and time greater than now");
            return;
        } else if (passanger == "" && driver != "") {
            return this.cars.filter(car => car.availableAt <= dateTime);
        } else if (passanger != "" && driver != "") {
            return this.cars.filter(car => car.capacity >= passanger && car.availableAt <= dateTime);
        }
    }
}


var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", "http://localhost:8000/cars", false);
xmlHttp.send(null); 


var data = JSON.parse(xmlHttp.responseText);
var cars = new Car(data);
var app = document.getElementById('carsList');
htmlData = "";

data = cars;
var btnFilterCar = document.getElementById('btnFilterCar').addEventListener('click', getCars);

function getDateTimeNow() {
    var today = new Date();
    var date = today.getFullYear()+'-'+String((today.getMonth()+1)).padStart(2, '0')+'-'+String(today.getDate()).padStart(2, '0');
    var time = String(today.getHours()).padStart(2, '0') + ":" + String(today.getMinutes()).padStart(2, '0') + ":" + String(today.getSeconds()).padStart(2, '0');
    var dateNow = date+'T'+time+'.000Z';
    return dateNow;
}


function getCars() {
    var htmlData = "";
    data = cars.filtermobil();
    if (data === "" || data === undefined) {
        htmlData = "";
        app.innerHTML = htmlData;
        return;
    } else {
        for (let index = 0; index < data.length; index++) {
            var car = data[index];
           
            htmlData += `
            <div class="col m-2">
                <div class="card" style="width: 20rem; height: 450px">
                <img src="${car.image}"" class="img-fluid card-img-top " alt="${car.manufacture}" style="object-fit: scale-down; height: 200px; ">
                <div class="card-body" style="font-size: 14px;">
                    <p class="card-title">${car.manufacture} ${car.model}</p>
                    <p class="fw-bold">Rp. ${car.rentPerDay} / hari</p>
                    <p class="card-text" style="height: 85px">${car.description}</p>
                    <div class=""><i class="bi bi-people me-2"></i>${car.capacity} Orang</div>
                    <div class=""><i class="bi bi-gear me-2"></i>${car.transmission}</div>
                    <div class=""><i class="bi bi-calendar4 me-2"></i>${car.year}</div>
                    <a href="#" class="btn bg-button text-white w-100 mt-2 fw-bold mt-4" style="font-size: 14px;">Pilih Mobil</a>
                </div>
                </div>
            </div>
            `;
        }
        app.innerHTML = htmlData;
        if (htmlData == "") {
            alert("No car available");
        }
    }
}