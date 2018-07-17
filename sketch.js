var camera; // crée la variable pour faire fonctionner la camera
var canvas; // variable de zone de travail
var largeur // variable de la largeur du canvas
var hauteur // variable de la hauteur du canvas
var seuil = parseFloat(localStorage.getItem("seuil")); // variable pour gérer le seuil de luminosité
var seuilSlider; // variable servant à créer un slider lié à un élément
var couleuradetecter = [
parseFloat(localStorage.getItem("couleuradetecterRouge")),
parseFloat(localStorage.getItem("couleuradetecterVert")),
parseFloat(localStorage.getItem("couleuradetecterBleu"))
  ] // variable qui permet de faire la différence entre les couleurs
var secondesCR = 7 // variable pour le compte à rebours
var listeImages = ["medias/chat.jpg","medias/bryan.jpg","medias/beauchat.jpg","medias/test.jpg","medias/unicorn.jpg","medias/mimi.png",]
var positionListe = 0
var imgg 
var buttonhide
var buttonvisible = true // variable lié au bouton pour rendre invisible les autres, permet de donner un paramètre vrai

    



// fonction gérant les paramètres de base, appelée une seule fois au début
function setup() {
    canvas = createCanvas(); // crée le canvas
    largeur = windowWidth // Explique que la largeur fait la taille de l'écran
    hauteur = windowHeight // explique que la hauteur fait la taille de l'écran
    canvas.size(largeur, hauteur) // gère la taille du canvas
    createP = canvas/2; // positionne le texte

    button = createButton('click me'); // crée un bouton et lui donne un nom
    button.position(largeur/2-100, hauteur-260); // donne la position du bouton
    button.size(200, 200);
    button.mousePressed(comptearebours); // permet au clic d'activer la fonction reliée au bouton


    camera = createCapture(VIDEO); // permet à la caméra de fonctionner
    camera.size(largeur, hauteur); // gère la taille de la caméra

    camera.hide(); // empêche la caméra de sortir du canvas
    frameRate(20); // le nombre de fois que la fonction draw va être appelée par seconde

    
    seuilSlider = createSlider(0, 255,seuil); // définie la valeur minimum, maximum puis celle initiale
    seuilSlider.position(largeur/5, 20); // gère la position du slider du seuil
    seuilSlider.input(sliderchange); // sauvegarde le slider en le déplaçant
    seuilSlider.mouseReleased(sliderchange); // sauvegarde le slider au moment où le clic est relaché


    imgg = loadImage('medias/test.jpg');

    textFont('Arial'); // défini la police du texte
    textSize(200); // défini la taille de texte
    textAlign(CENTER,CENTER); // défini l'alignement du texte



    buttonSuivant = createButton('changer'); // crée un bouton et lui donne un nom
    buttonSuivant.position(310, 450); // donne la position du bouton
    buttonSuivant.mousePressed(suivant); // permet au clic d'activer la fonction reliée au bouton

    buttonAurevoir = createButton('tamer'); // crée un bouton et lui donne un nom
    buttonAurevoir.position(19, 450); // donne la position du bouton
    buttonAurevoir.mousePressed(aurevoir); // permet au clic d'activer la fonction reliée au bouton

    buttonHide = createButton('Cacher les boutons'); // crée un bouton et lui donne un nom
    buttonHide.position(hauteur/2, 20); // donne la position du bouton
    buttonHide.mousePressed(cacher); // permet au clic d'activer la fonction reliée au bouton

    buttoncouleur = createButton('Sauvegarder la couleur'); // crée un bouton et lui donne un nom
    buttoncouleur.position(hauteur/3, 20); // donne la position du bouton
    buttoncouleur.mousePressed(couleursaved); // permet au clic d'activer la fonction reliée au bouton
}

// Fonction pour sauvegarder la valeur du slider
function sliderchange(){ 
   localStorage.setItem("seuil", ""+seuil)  // met dans la base de donnée la valeur de seuil
}

// Fonction permettant de cacher les boutons
function cacher() {
    if (buttonvisible) {
        buttonSuivant.hide()
        buttonAurevoir.hide()
        button.hide()
        seuilSlider.hide()
        buttoncouleur.hide()
        buttonvisible=false
// cache tous les boutons cités puis rend la variable fausse
    }

// permet de remettre les boutons
   else {
       buttonSuivant.show()
       buttonAurevoir.show()
       button.show()
       seuilSlider.show()
       buttoncouleur.show()
       buttonvisible=true
       // remet tous les boutons visible et rend la variable vraie
   }
}


function windowResized() {
    largeur = windowWidth
    hauteur = windowHeight 
    canvas.size(largeur, hauteur) // gère la taille du canvas
    camera.size(largeur, hauteur); // gère la taille de la caméra
}

// sert au bouton pour changer l'image vers la suivante
function suivant() {
    if(positionListe<listeImages.length-1) {
        positionListe = positionListe+1;
    }

    else {

        positionListe=0
    }
    chargerImg () 

}

// sert au bouton pour changer l'image vers la précédente
function aurevoir() {
    if(positionListe>0) {
        positionListe = positionListe-1;
    }

    else {

        positionListe=listeImages.length-1
    }
    chargerImg () 

}

function chargerImg() {

            imgg = loadImage(listeImages[positionListe])
}

// met un comte à rebours pour la sauvegarde
function comptearebours() {

    secondesCR = secondesCR-1;

      if (secondesCR <0) {
       sauvegarder();  
       secondesCR = 7;
      }

       else {
       setTimeout(comptearebours, 1000);


      }

}



// fonction permettant de sauvegarder, relié au bouton
function sauvegarder() {
    var today = new Date();
var photoDay = today.getDate()
var photoMonth = today.getMonth()+1
var photoYear = today.getFullYear()
var photoHour = today.getHours()
var photoMinute = today.getMinutes()
var photoSeconde = today.getSeconds()
var photoFullDay = photoDay+'-'+photoMonth+'-'+photoYear+'-'+photoHour+photoMinute+photoSeconde
    saveCanvas(canvas, 'Photo-'+photoFullDay, 'jpg');
}


// fonction qui active les éléments en permanence
function draw() {
    //background(0, 0, 255); // sert à changer la couleur du fond
    image(imgg, 0, 0, largeur, hauteur); // sert à changer la position et la taille de la vidéo incrustée

    loadPixels(); // permet de charger la variable des pixels
    dessinerCamera(); // fait fonctionner la caméra lorsque le code est lancé

    
    updatePixels(); // permet d'actualiser loadPixels

    seuil = seuilSlider.value(); // permet au slider de toucher directement à la valeur du seuil


    var positionXTexte= largeur/2;  // variable de la position du texte sur x
    var positionYTexte= hauteur/2; // variable de la position du texte sur y
    var caracter = ''+secondesCR // variable pour ajouter un texte à chaque seconde

      if (secondesCR>0&&secondesCR!=7) { 
        text(caracter, positionXTexte, positionYTexte);
      }


}

// Fonction pour sauvegarder la couleur
function couleursaved(){ 
   localStorage.setItem("couleuradetecterRouge", ""+couleuradetecter[0])  // met dans la base de donnée la valeur de la couleur
   localStorage.setItem("couleuradetecterVert", ""+couleuradetecter[1])  // met dans la base de donnée la valeur de la couleur
   localStorage.setItem("couleuradetecterBleu", ""+couleuradetecter[2])  // met dans la base de donnée la valeur de la couleur
}


// fonction qui active un effet avec un clic de souris
function mouseClicked(e) {
 if(e.srcElement == canvas.canvas){   
    var position1d = (mouseY*largeur+mouseX)*4 // variable permettant de passer du 2d au 1d, multiplié par s, car la couleur est composée de quatre éléments
    couleuradetecter[0]=camera.pixels[position1d+0] // gère le roge
    couleuradetecter[1]=camera.pixels[position1d+1] // gère le vert
    couleuradetecter[2]=camera.pixels[position1d+2] // gère le bleu

  return false; // permet d'empêcher la fonction de s'étendre sur les autres
 }
}


// fonction pour faire la différence entre la valeur définie et la valeur mesurée, va avec var couleuradetecter
function distance(r1,g1,b1,r2,g2,b2) {
    return(Math.abs(r2-r1) + Math.abs(g2-g1) + Math.abs(b2-b1))/3 
    // Math.abs signifie la valeur absolue, le négatif devient positif
    // Le calcul est divisé par trois pour que la valeur maximal reste à 255, on soustrait les deux couleurs pour connaitre la différence entre elles
}


// fonction regroupant tous les éléments touchant à la vidéo webcam
function dessinerCamera() {
    if (camera.width == 0) {
    camera.width = camera.imageData.width
    camera.height = camera.imageData.height 
    }

 camera.loadPixels(); // permet de toucher à la variable camera.pixels
    if (camera.pixels.length) {
        

        const w = largeur; // raccourci vers la variable largeur
        const h = hauteur; // raccourci vers la variable hauteur

        for (var i = 0; i < w; i++) { // se déplacer dans la largeur

            for (let j = 0; j < h; j++) { // se déplacer dans la hauteur


                const position1dCanvas = (j * w + i) * 4; // permet de se déplacer dans le canvas avec les 4 valeurs de la couleur

                const r = camera.pixels[position1dCanvas + 0]; // Raccourci vers la variable rouge
                const g = camera.pixels[position1dCanvas + 1]; // Raccourci vers la variable vert             
                const b = camera.pixels[position1dCanvas + 2]; // Raccourci vers la variable bleu

                if (distance(r,g,b, couleuradetecter[0], couleuradetecter[1], couleuradetecter[2])<seuil) {
                //

                }
                else {
                    pixels[position1dCanvas + 0] = r; // change la valeur rouge
                    pixels[position1dCanvas + 1] = g; // change la valeur vert
                    pixels[position1dCanvas + 2] = b; // change la valeur bleu

                }

            }
        }
    }
}


