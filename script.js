const listeDeMot = ["chien", "chat", "oiseau", "cheval", "vache"];

//////////////   VARIABLES   //////////////

let mot = listeDeMot[Math.floor(Math.random() * listeDeMot.length)];
let lettres = mot.split("");
let leMotaDeviner = new Array(lettres.length).fill("_");
let essaiRestants = 6;
let lettresjouees = [];

//////////////   SELECTIONS   //////////////

const hangmanForm = document.getElementById("hangman-form");
const resultDiv = document.getElementById("result");
const erreur = document.querySelector(".message-erreur");
const nombreEssais = document.querySelector("#nombre-essais");

const jeu = document.querySelector(".jeu");
const pendu = document.querySelector(".img-pendu");
const lettreUtilisee = document.querySelector(".lettresUtilisee");
const nombreDeCoups = document.querySelector(".nombreDeCoups");

const popup = document.querySelector(".findejeu");
const messagefin = document.querySelector(".message-findejeu");
const descriptionfin = document.querySelector(".description-findejeu");
const rejouer = document.querySelector(".rejouer");


//////////////   FONCTIONS   //////////////

function verifierFormulaire(texte) {
  texte = texte.toLowerCase();
  let regex = /^[a-z]+$/;

  if (regex.test(texte)) {
    return true;
  } else {
    return false;
  }
}

function verifierLettreJouees(jouee, texte) {
  for (var i = 0; i < jouee.length; i++) {
    if (jouee[i] === texte) {
      return true;
    }
  }
  return false;
}

function victoire() {
  jeu.classList.add("cache");
  popup.classList.remove("cache");
  messagefin.textContent = "Félécitation vous avez gagné !";
  descriptionfin.textContent = `Vous avez trouvé le mot : ${mot}`;
  rejouer.addEventListener("click", function () {window.location.reload();});
}

function defaite() {
  jeu.classList.add("cache");
  popup.classList.remove("cache");
  messagefin.textContent = "Vous avez perdu !";
  descriptionfin.textContent = `Le mot à trouver était : ${mot}`;
  rejouer.addEventListener("click", function () {window.location.reload();});
}

//////////////   SCRIPT   //////////////

resultDiv.textContent = `${leMotaDeviner.join(" ")}`;
nombreDeCoups.textContent = `${essaiRestants}/6`;

hangmanForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let essai = document.getElementById("guess-input").value.toLowerCase();


  // Vérifications
  if (!verifierFormulaire(essai)) {
    erreur.textContent = "Vous devez inserer une lettre ou un mot";
    hangmanForm.reset();
  }else if (verifierLettreJouees(lettresjouees, essai)){
    erreur.textContent = "Vous avez déjà joué cette lettre";
    hangmanForm.reset();
  }
  //Bon Mot dans le formulaire
  else {
    erreur.textContent = "";
    if (essai === mot) {
      victoire();
  // Bonne lettre dans le formulaire
    } else if (lettres.includes(essai)) {
      for (let i = 0; i < lettres.length; i++) {
        if (lettres[i] === essai) {
          leMotaDeviner[i] = essai;
        }
      }
      lettresjouees.push(essai);
      resultDiv.textContent = `${leMotaDeviner.join(" ")}`;
      nombreDeCoups.textContent = `${essaiRestants}/6`;
      lettreUtilisee.textContent = lettresjouees;
      hangmanForm.reset();
  // Toutes les lettres sont trouvées
      if (mot == leMotaDeviner.join("")) {
        victoire();
      }
    } else {
  // Mauvaises lettres dans le formulaire
      essaiRestants--;
      lettresjouees.push(essai);
      pendu.src = `img/pendu${essaiRestants}.svg`;
      nombreDeCoups.textContent = `${essaiRestants}/6`;
      lettreUtilisee.textContent = lettresjouees;
// Plus d'essais restants
      if (essaiRestants === 0) {
        defaite();
      } else {
        resultDiv.textContent = `${leMotaDeviner.join(" ")}`;
      }
      hangmanForm.reset();
    }
  }
});
