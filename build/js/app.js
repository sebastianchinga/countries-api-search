document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
})

function iniciarApp() {
    consultarApi();
    darkMode();
    buscador();
}

let paises = [];

async function consultarApi() {
    const resultado = await fetch('data.json');
    paises = await resultado.json();
    mostrarPaises(paises);
    detallarPais(paises)
}

function numerosFormateados(population) {
    return population.toLocaleString('en-US');
}

function mostrarPaises(paises) {
    const contenedorPaises = document.querySelector('.paises');
    if (contenedorPaises) {
        paises.forEach(pais => {
            const paisDiv = document.createElement('DIV');
            paisDiv.classList.add('pais');
            const enlace = document.createElement('A');
            enlace.setAttribute('href', `pais.html?code=${pais.alpha3Code}`)
            const contenedorImagen = document.createElement('DIV');
            contenedorImagen.classList.add('pais__imagen');
            const imagen = document.createElement('IMG');
            imagen.setAttribute('src', `${pais.flag}`);
            const contenido = document.createElement('DIV');
            contenido.classList.add('pais__contenido');
            const nombre = document.createElement('H2');
            nombre.textContent = pais.name;

            const population = document.createElement('P');
            population.innerHTML = "Population: <span>" + `${numerosFormateados(pais.population)}` + "</span>";
            population.classList.add('pais__population');
            const region = document.createElement('P');
            region.innerHTML = "Region: <span>" + `${pais.region}` + "</span>";
            region.classList.add('pais__region');
            const capital = document.createElement('P');
            capital.innerHTML = "Capital: <span>" + `${pais.capital}` + "</span>";
            capital.classList.add('pais__capital');

            contenedorPaises.appendChild(paisDiv);
            paisDiv.appendChild(contenedorImagen);
            contenedorImagen.appendChild(enlace);
            enlace.appendChild(imagen);
            paisDiv.appendChild(contenido);
            contenido.appendChild(nombre);
            contenido.appendChild(population);
            contenido.appendChild(region);
            contenido.appendChild(capital);
            // console.log(pais);
        });
    }
}

async function detallarPais(paises) {
    // Devolver la parte de la URL que contiene los parámetros de consulta empezando desde el ?
    const url = new URLSearchParams(window.location.search);
    // Devuelve el valor get del parámetro especificado
    const parametro = url.get('code');

    const pais = paises.find(pais => pais.alpha3Code === parametro);

    if (pais) {
        const contenedorImagen = document.querySelector('.detalle__imagen');
        const nombre = document.querySelector('#nombre');
        const native = document.querySelector('#native');
        const population = document.querySelector('#population');
        const region = document.querySelector('#region');
        const subregion = document.querySelector('#subregion');
        const capital = document.querySelector('#capital');
        const domain = document.querySelector('#domain');
        const currencies = document.querySelector('#curriences');
        const languages = document.querySelector('#languages');
        const countries = document.querySelector('.borders');
        
        const borders = pais.borders;

        // Creando la estructura
        const imagen = document.createElement('IMG');
        imagen.setAttribute('src', `${pais.flag}`);

        nombre.textContent = pais.name;
        native.textContent = pais.nativeName;
        population.textContent = numerosFormateados(pais.population);
        region.textContent = pais.region;
        subregion.textContent = pais.subregion;
        capital.textContent = pais.capital;
        domain.textContent = pais.topLevelDomain[0];
        currencies.textContent = pais.currencies[0].name;

        borders.forEach(border => {
            const countryCard = document.createElement('P');
            countryCard.classList.add('border');
            countryCard.textContent = border;
            countries.appendChild(countryCard);
        });

        contenedorImagen.appendChild(imagen);

    }
}

function darkMode() {
    const body = document.querySelector('body');
    const boton = document.querySelector('#dark');

    const colorPrefiere = window.matchMedia('(prefers-color-scheme: dark)');

    colorPrefiere.addEventListener('change', function () {
        body.classList.toggle('dark');
    })

    if (colorPrefiere.matches) {
        body.classList.add('dark');
    }

    boton.addEventListener('click', function (e) {
        e.preventDefault();
        body.classList.toggle('dark');
    })
}

function buscador() {
    const search = document.querySelector('#buscador');
    if (search) {
        search.addEventListener('input', function (e) {
            const valor = e.target.value.toLowerCase();
            const pais = paises.filter(pais => pais.name.toLowerCase().includes(valor));
            if (valor) {
                mostrarResultado(pais);
            } else {
                mostrarPaises(paises);
            }
        })
    }
}

function mostrarResultado(pais) {
    const contenedorPaises = document.querySelector('.paises');
    
    if (pais) {
        pais.forEach(p => {
            contenedorPaises.innerHTML = '';
            const paisDiv = document.createElement('DIV');
            paisDiv.classList.add('pais');
            const enlace = document.createElement('A');
            enlace.setAttribute('href', `pais.html?code=${p.alpha3Code}`)
            const contenedorImagen = document.createElement('DIV');
            contenedorImagen.classList.add('pais__imagen');
            const imagen = document.createElement('IMG');
            imagen.setAttribute('src', `${p.flag}`);
            const contenido = document.createElement('DIV');
            contenido.classList.add('pais__contenido');
            const nombre = document.createElement('H2');
            nombre.textContent = p.name;
    
            const population = document.createElement('P');
            population.innerHTML = "Population: <span>" + `${numerosFormateados(p.population)}` + "</span>";
            population.classList.add('pais__population');
            const region = document.createElement('P');
            region.innerHTML = "Region: <span>" + `${p.region}` + "</span>";
            region.classList.add('pais__region');
            const capital = document.createElement('P');
            capital.innerHTML = "Capital: <span>" + `${p.capital}` + "</span>";
            capital.classList.add('pais__capital');
    
            contenedorPaises.appendChild(paisDiv);
            paisDiv.appendChild(contenedorImagen);
            contenedorImagen.appendChild(enlace);
            enlace.appendChild(imagen);
            paisDiv.appendChild(contenido);
            contenido.appendChild(nombre);
            contenido.appendChild(population);
            contenido.appendChild(region);
            contenido.appendChild(capital);
        });
    }
}