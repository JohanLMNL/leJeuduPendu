// A FAIRE :
// AFFICHER VOUS AVEZ GAGNER LORSQUE L'ON TROUVE TOUTES LES LETTRES
// POPUP VOUS AVEZ GAGNER/PERDU AVEC BOUTON REJOUER
// IMAGE DU PENDU





const listeDeMot = ["chient", "chat", "oiseau"];

let mot = listeDeMot[Math.floor(Math.random() * listeDeMot.length)];
let lettres = mot.split("");
let leMotaDeviner = new Array(lettres.length).fill("_");
let essaiRestants = 10;

const hangmanForm = document.getElementById("hangman-form");
const resultDiv = document.getElementById("result");
const erreur = document.querySelector(".message-erreur");
const nombreEssais = document.querySelector('#nombre-essais');

resultDiv.textContent = `${leMotaDeviner.join(" ")}`
nombreEssais.textContent = `Il vous reste ${essaiRestants} essais`




hangmanForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let essai = document.getElementById("guess-input").value.toLowerCase();

  if(essai === '' || !isNaN(essai)){
    erreur.textContent = 'Vous devez inserer une lettre ou un mot';
  }
  else{
    erreur.textContent = '';
    if (essai === mot) {
      resultDiv.textContent = "Félicitations ! Vous avez deviné le mot !";
      hangmanForm.reset();
    } else if (lettres.includes(essai)) {
      for (let i = 0; i < lettres.length; i++) {
        if (lettres[i] === essai) {
          leMotaDeviner[i] = essai;
        }
      }
      resultDiv.textContent = `${leMotaDeviner.join(" ")}`;
      nombreEssais.textContent = `Il vous reste ${essaiRestants} essais`;
      hangmanForm.reset();
    } else {
      essaiRestants--;


      if (essaiRestants === 0) {
        resultDiv.textContent = `Désolé, vous avez perdu. Le mot était "${mot}"`;
        nombreEssais.textContent = `Il vous reste ${essaiRestants} essais`;
      } else {
        resultDiv.textContent = `${leMotaDeviner.join(" ")}`;
        nombreEssais.textContent = `Il vous reste ${essaiRestants} essais`;
      }
      hangmanForm.reset();
    }
  }});