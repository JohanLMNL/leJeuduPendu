// A FAIRE :
// IMAGE DU PENDU





const listeDeMot = ["chien", "chat", "oiseau"];

let mot = listeDeMot[Math.floor(Math.random() * listeDeMot.length)];
let lettres = mot.split("");
let leMotaDeviner = new Array(lettres.length).fill("_");
let essaiRestants = 5;

const hangmanForm = document.getElementById("hangman-form");
const resultDiv = document.getElementById("result");
const erreur = document.querySelector(".message-erreur");
const nombreEssais = document.querySelector('#nombre-essais');

const jeu = document.querySelector(".jeu");
const popup = document.querySelector(".findejeu");
const messagefin = document.querySelector('.message-findejeu');
const descriptionfin = document.querySelector('.description-findejeu');
const rejouer = document.querySelector('.rejouer');

resultDiv.textContent = `${leMotaDeviner.join(" ")}`
nombreEssais.textContent = `Il vous reste ${essaiRestants} essais`


function victoire(){
    jeu.classList.add("cache");
    popup.classList.remove('cache');
    messagefin.textContent = "Félécitation vous avez gagné !";
    descriptionfin.textContent = `Vous avez trouvé le mot : ${mot}`;
    rejouer.addEventListener("click", function(){window.location.reload()});
}

function defaite(){
    jeu.classList.add("cache");
    popup.classList.remove('cache');
    messagefin.textContent = "Vous avez perdu !"
    descriptionfin.textContent = `Le mot à trouver était : ${mot}`
    rejouer.addEventListener("click", function(){window.location.reload()});
}
  






hangmanForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let essai = document.getElementById("guess-input").value.toLowerCase();


  // AJOUTER REGEX POUR EVITER LES CARACTERE SPECIAUX
  if(essai === '' || !isNaN(essai)){
    erreur.textContent = 'Vous devez inserer une lettre ou un mot';
  }
  else{
    erreur.textContent = '';
    if (essai === mot) {
      victoire();
    } else if (lettres.includes(essai)) {
      for (let i = 0; i < lettres.length; i++) {
        if (lettres[i] === essai) {
          leMotaDeviner[i] = essai;
        }
      }
      resultDiv.textContent = `${leMotaDeviner.join(" ")}`;
      nombreEssais.textContent = `Il vous reste ${essaiRestants} essais`;
      hangmanForm.reset();

      if(mot == leMotaDeviner.join("")){
        victoire();
        }
    } else {
      essaiRestants--;


      if (essaiRestants === 0) {
       defaite()
      } else {
        resultDiv.textContent = `${leMotaDeviner.join(" ")}`;
        nombreEssais.textContent = `Il vous reste ${essaiRestants} essais`;
      }
      hangmanForm.reset();
    }
  }});