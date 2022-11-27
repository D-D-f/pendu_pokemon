const clavier = document.querySelector(".clavier");
const alphabet = "azertyuiopqsdfghjklmwxcvbn".split("");
const p = document.querySelector("#hiddenmot");
const index = Math.floor(Math.random() * 151);
const img = document.querySelector("#img");
const nbError = document.querySelector(".nbError");
const accueil = document.querySelector(".accueil");
const start = document.querySelector(".start");
const game = document.querySelector(".game");
const bloc = document.querySelector(".bloc_bas");
const gameOver = document.querySelector(".gameOver");
const textPendu = document.querySelector(".texte_pendu > p");
const win = document.querySelector(".win");
let pokemon;
let hidden = [];
let error = 1;
console.log(textPendu);

const createButton = (letter, pokemon) => {
  let button = document.createElement("button");
  button.value = letter;
  button.textContent = letter;
  clavier.append(button);

  button.addEventListener("click", () => {
    error++;
    button.disabled = true;
    button.classList.add("btnCliked");
    checkResponse(hidden, pokemon, button.value);
    img.src = `img/img${error}.png`;
    p.textContent = hidden.join(" ");
    nbError.textContent = `Nombres d'erreurs : ${error - 1}`;

    let tabOrigine = pokemon.join("");
    let hiddenTab = hidden.join("");

    if (tabOrigine === hiddenTab) {
      const allBtn = document.querySelectorAll("button");
      for (let btn of allBtn) {
        btn.disabled = true;
      }
      textPendu.textContent = `Le pokemon est ${tabOrigine}`;
      win.style.display = "block";
      audio(false);
    }

    if (error === 10) {
      gameOver.style.display = "block";
      textPendu.textContent = `Le pokemon est ${tabOrigine}`;
      audio(false);
    }
  });
};
const displayButton = (arrayLetter, pokemon) => {
  const allButton = arrayLetter.map((letter) => {
    return createButton(letter, pokemon);
  });
  return allButton;
};
const checkResponse = (arrayhidden, arraypokemon, btnvalue) => {
  if (arraypokemon.includes(btnvalue)) {
    --error;
  }
  arraypokemon.map((letter, index) => {
    if (letter === btnvalue) {
      arrayhidden.splice(index, 1, letter);
    }
  });
};
const displayPendu = (error) => {
  return (img.src = `img/img${error}.png`);
};
const getData = async () => {
  try {
    const requete = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${index}`,
      {
        method: "GET",
      }
    );
    const data = await requete.json();
    pokemon = data.names[4].name.toLowerCase().split("");
    console.log(data.names[4].name);
    p.textContent = " _ ".repeat(pokemon.length);
    for (let i = 0; pokemon.length > i; i++) {
      hidden.push("_");
    }
    displayButton(alphabet, pokemon);
  } catch (e) {
    console.log(e);
  }
};
const audio = (bool) => {
  let audio = document.createElement("audio");
  audio.src = `audio/pokemonAudio.mp3`;
  game.append(audio);
  audio.play = bool;
  audio.autoplay = bool;
  audio.loop = bool;
};

start.addEventListener("click", () => {
  accueil.style.display = "none";
  game.style.display = "block";
  bloc.style.display = "block";
  audio(true);
});

getData();
