
let currentPokemon;
let pokemonNumber = 9;
let PokemonName;
let PokemonIMG;

async function render() {

    for (let i = 1; i < pokemonNumber; i++) {
        const element = pokemonNumber[i];
        let url =`https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        PokemonName = currentPokemon['name'];
        PokemonIMG = currentPokemon['sprites']['other']['official-artwork']['front_default'];
        
        addCard(PokemonName, PokemonIMG, i);
        loadtypes(i);
    }
}

function addCard(name, IMG, i) {
    document.getElementById('card_container').innerHTML += `
    <div class="card_small" id="card_small" onclick="openDetailCard(${i})">
        <div class="card_header">
            <span>${name}</span><span>#${i}</span>
        </div>
        <div class="card_body">
            <div id="typeCard${i}">
                
            </div>
            <div>
                <img class="fronticon" src="${IMG}">
            </div>
        </div>
    </div>
    `
}

function loadtypes(number){
    let pokemonType ="";
    for (let i = 0; i < currentPokemon.types.length; i++) {
        let type = currentPokemon['types'][i]['type']['name'];
        pokemonType =`<p class="category" style="color: var(--c-${type}); border: 5px solid var(--c-${type})">${type}</p>`;
        document.getElementById('typeCard' + number).innerHTML += pokemonType;
    }
}

async function openDetailCard(n){
    document.getElementById('card_container').classList.add('d_none');
    document.getElementById('specs_card').classList.remove('d_none');

    let url = `https://pokeapi.co/api/v2/pokemon/${n}`;
    let response = await fetch(url);
    let currentPokemon2 = await response.json();
    PokemonName = currentPokemon2['name'];
    let height = currentPokemon2['height'] / 10;
    let weight = currentPokemon2['weight'] / 100;
    let type = currentPokemon['types'][0]['type']['name'];
    let PokemonIMG = currentPokemon2['sprites']['other']['official-artwork']['front_default'];



    document.getElementById('specs_card').innerHTML =`
    <div class="specs_header">
    <div class="specs_nav">
        <div onclick="closeDetailCard()"><img class="nav_icons" src="img/close.png" alt=""></div>
    </div>
    <div class="DetailMiddle">
    <div class="specs_header_left">
        <span>${PokemonName}</span>
        <p>#${n}</p>
        <p>${height}m</p>
        <p>${weight}kg</p>
        <p>${type}</p>
    </div>
    <div>
        <div><img class="DetailPic" src="${PokemonIMG}"></div>
    </div>
    </div>
</div>

<div class="specs_body">
    
</div>`;

}

function closeDetailCard(){
    document.getElementById('card_container').classList.remove('d_none');
    document.getElementById('specs_card').classList.add('d_none'); 
}