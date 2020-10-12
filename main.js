const apiKey = '4dd9e4624518bc89be9395b2c5d0ef44';

// focus everything
const inputCity = document.querySelector('.header__search');
const locationList = document.querySelector('.location__list');
const errMsg = document.querySelector('.header__msg');


// Add event 
inputCity.addEventListener('keyup', setQuery);

// Function
function setQuery(e) {
    if (e.which == 13) {
        getResult(inputCity.value);
        inputCity.value = '';
    }
}

function getResult(datas) {
    if (datas !== '') {
        errMsg.style.display = 'none';
        let url =`https://api.openweathermap.org/data/2.5/weather?q=${datas}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const {
                    main,
                    name,
                    sys,
                    weather
                } = data;

                let icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
                    weather[0]["icon"]
                  }.svg`;
            
                const li = document.createElement('li');
                li.classList.add('location__item');
                const markup =
                    `<h2 class="location__item-city">${name}
                        <span class="location__item-sys-city">${sys.country}</span>
                    </h2>
                    <p class="location__item-temp">${Math.round(main.temp)}<span>°C</span></p>
                    <img src="${icon}" alt="" class="location__item-img">
                    <p class="location__item-description">${
                        weather[0]["description"]
                      }</p>`;
                li.innerHTML = markup;
                locationList.appendChild(li);
            })
            .catch(() => {
                msg.textContent = "Please search for a valid city 😩";
            });
            
    } else {
        errMsg.style.display = 'block';
    }
    
}


// toggle dark/light theme

const toggleCheckbox = document.querySelector('.toggle__input');
const container = document.querySelector('.container');
toggleCheckbox.addEventListener('change', (e) => {
    if(e.target.checked) {
        container.classList.add('dark')
        document.querySelector('.header__msg').style.color = '#fff';
    } else {
        container.classList.remove('dark')
        document.querySelector('.header__msg').style.color = '#000';
    }
})

