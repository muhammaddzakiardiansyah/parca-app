// base api url
const apiUrl = "https://cuaca-gempa-rest-api.vercel.app/weather"

// dom
const description = document.getElementById('description')
const cuaca = document.getElementById('cuaca')
const temperatur = document.getElementById('temperatur')
const keySearchProvince = document.getElementById('key-search-province')
const keySearchCity = document.getElementById('key-search-city')
const btnSearch = document.getElementById('btn-search')

// on click
btnSearch.onclick = () => {
    let province = formatRegion(keySearchProvince.value)
    let city = formatRegion(keySearchCity.value)
    // get location
    fetch(`${apiUrl}/${province}/${city}`)
    .then((res) => res.json())
    .then((data) => {
        let element = ''
        element = showElement(data)
        return description.innerHTML = element
    })
    
    // get weather
    fetch(`${apiUrl}/${province}/${city}`)
    .then((res) => res.json())
    .then((data) => {
        let element = ''
        let weather = 'weather'
        const dataWeater = data.data.params.filter(item => item.id === weather)
        dataWeater[0].times.map((item) => {
            element += showWeather(item)
        })
        return cuaca.innerHTML = element
    })
    
    // get temperature
    fetch(`${apiUrl}/${province}/${city}`)
    .then((res) => res.json())
    .then((data) => {
        let element = ''
        const dataTemperature = data.data.params.filter((item) => item.id === 't')
        dataTemperature[0].times.map((item) => {
            element += showTemperature(item)
        })
        temperatur.innerHTML = element
    })
}


// formated datetime
function formatDateTime(datetimeString) {
    const year = datetimeString.slice(0, 4);
    const month = datetimeString.slice(4, 6);
    const day = datetimeString.slice(6, 8);
    const hour = datetimeString.slice(8, 10);
    const minute = datetimeString.slice(10, 12);

    const dateTime = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
    
    if (isNaN(dateTime.getTime())) {
        // Periksa apakah nilai waktu yang valid
        return 'Format waktu tidak valid';
    }

    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = [
        'Januari', 'Februari', 'Maret', 'April',
        'Mei', 'Juni', 'Juli', 'Agustus',
        'September', 'Oktober', 'November', 'Desember'
    ];

    const dayOfWeek = days[dateTime.getDay()];
    const formattedDateTime = `${dayOfWeek} ${day} ${months[parseInt(month, 10) - 1]} ${year} jam ${hour}:${minute}`;

    return formattedDateTime;
}

// change spash to strip
function formatRegion(region) {
    return region.toLowerCase().replace(/\s+/g, '-');
}

// element location
function showElement(data) {
    return `
       <h4 id="description">${data.data.description}, ${data.data.domain}</h4>
    `
}

// element weather
function showWeather(data) {
    return `
        <div id="cuaca">
            <ul>
                <li>${formatDateTime(data.datetime)}</li>
                <li>${data.name}</li>
            </ul>
        </div>
    `
}

// element temperature
function showTemperature(data) {
    return `
        <div id="temperatur">
            <ul>
                <li>${formatDateTime(data.datetime)}</li>
                <li>${data.celcius}°</li>
            </ul>
        </div>
    `
}