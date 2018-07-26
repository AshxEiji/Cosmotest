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
var toilevisible = true;

var resolution = 1/2

var posY = []; //variable permettant aux étoiles de se déplacer sur la hauteur du canvas
//var largeur=800 //variable pour la largeur du canvas
//var hauteur=800 //variable pour la hauteur du canvas
var posX = []; //variable permettant l'apparition des étoiles sur la largeur du canvas
var nombre=100;  //variable pour le nombre d'étoile
var speed = []; //variable gérant la vitesse des étoiles dans le tableau
var bleu = []; //variable gérant la couleur bleu des étoiles dans le tableau
var vert = []; //variable gérant la couleur vert des étoiles dans le tableau
var taille = []; //variable gérant la taille des étoiles dans le tableau



// fonction gérant les paramètres de base, appelée une seule fois au début
function setup() {
    canvas = createCanvas(); // crée le canvas
    pixelDensity(1);
    largeur = windowWidth // Explique que la largeur fait la taille de l'écran
    hauteur = windowHeight // explique que la hauteur fait la taille de l'écran
    canvas.size(largeur, hauteur) // gère la taille du canvas
    createP = canvas/2; // positionne le texte

    buttonclick = createImg("medias/Sans titre-1.png",'click me'); // crée un bouton et lui donne un nom
    buttonclick.mouseClicked(comptearebours); // permet au clic d'activer la fonction reliée au bouton

    camera = createCapture(VIDEO); // permet à la caméra de fonctionner
   // camera.size(largeur, hauteur); // gère la taille de la caméra

    camera.hide(); // empêche la caméra de sortir du canvas
    frameRate(20); // le nombre de fois que la fonction draw va être appelée par seconde
    
    seuilSlider = createSlider(0, 255,seuil); // définie la valeur minimum, maximum puis celle initiale
    seuilSlider.input(sliderchange); // sauvegarde le slider en le déplaçant
    seuilSlider.mouseReleased(sliderchange); // sauvegarde le slider au moment où le clic est relaché

    imgg = loadImage('medias/mimi.png');

    textFont('Arial'); // défini la police du texte
    textSize(200); // défini la taille de texte
    textAlign(CENTER,CENTER); // défini l'alignement du texte

    buttonSuivant = createImg("medias/droite.png", 'droite'); // crée un bouton et lui donne un nom
    buttonSuivant.mouseClicked(suivant); // permet au clic d'activer la fonction reliée au bouton

    buttonAurevoir = createImg("medias/gauche1.png", 'gauche'); // crée un bouton et lui donne un nom
    buttonAurevoir.mouseClicked(aurevoir); // permet au clic d'activer la fonction reliée au bouton

    buttonHide = createButton('Cacher les boutons'); // crée un bouton et lui donne un nom
    buttonHide.mouseClicked(cacher); // permet au clic d'activer la fonction reliée au bouton

    buttoncouleur = createButton('Sauvegarder la couleur'); // crée un bouton et lui donne un nom
    buttoncouleur.mouseClicked(couleursaved); // permet au clic d'activer la fonction reliée au bouton

    buttonToitoile = createButton('Effet étoiles');
    buttonToitoile.mouseClicked(toitoile);

    menuResolution = createSelect();
    menuResolution.option("HD");
    menuResolution.option("SD");
    menuResolution.changed(changerResolution);
    menuResolution.position(200, 200);

    windowResized(); // fonction appelé pour que la position des boutons change selon l'écran

    for (var i = 0; i < nombre; i=i+1) {
        posX[i] = random(-200, 2200);
        posY[i] = random(0, 200);
        speed[i] = random(2, 7); 
        bleu[i] = random(255);
        vert[i] = random(255); 
        taille[i] = random(0, 0.3);    
    }
}


// fonction qui active les éléments en permanence
function draw() {
    //background(0, 0, 255); // sert à changer la couleur du fond
    image(imgg, 0, 0, largeur*resolution, hauteur*resolution); // sert à changer la position et la taille de la vidéo incrustée
    if (toilevisible==true){
        dessinerEtoiles(nombre); 
    }

    loadPixels(); // permet de charger la variable des pixels
    dessinerCamera(); // fait fonctionner la caméra lorsque le code est lancé
    updatePixels(); // permet d'actualiser loadPixels

    if (toilevisible==true) {
        dessinerEtoiles(10)
    }

    seuil = seuilSlider.value(); // permet au slider de toucher directement à la valeur du seuil

    var positionXTexte= largeur/2;  // variable de la position du texte sur x
    var positionYTexte= hauteur/2; // variable de la position du texte sur y
    var caracter = ''+secondesCR // variable pour ajouter un texte à chaque seconde

    if (secondesCR>0&&secondesCR!=7) { 
        text(caracter, positionXTexte, positionYTexte); // balise qui fait apparaître le texte
    }


}


function dessinerEtoiles(param_nombre) {
        for (var i = 0; i < param_nombre; i=i+1) {
            etouale(posX[i], posY[i], bleu[i], vert[i], taille[i]);
            posY[i] += speed[i]; 
            if(posY[i]>=hauteur){
                posY[i]=-100
                posX[i] = random(-200, 800); 
            }
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


// Fonction pour sauvegarder la valeur du slider
function sliderchange(){ 
   localStorage.setItem("seuil", ""+seuil)  // met dans la base de donnée la valeur de seuil
}

function toitoile() {
    if(toilevisible==false) {
        toilevisible = true
       
    }

    else {
        toilevisible = false

    }
}

// Fonction permettant de cacher les boutons
function cacher() {
    if (buttonvisible) {
        buttonSuivant.hide()
        buttonAurevoir.hide()
        buttonclick.hide()
        seuilSlider.hide()
        buttoncouleur.hide()
        buttonToitoile.hide()
        menuResolution.hide();
        buttonvisible=false
// cache tous les boutons cités puis rend la variable fausse
    }
// permet de remettre les boutons
   else {
       buttonSuivant.show()
       buttonAurevoir.show()
       buttonclick.show()
       seuilSlider.show()
       buttoncouleur.show()
       buttonToitoile.show()
       menuResolution.show();
       buttonvisible=true
       // remet tous les boutons visible et rend la variable vraie
   }
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


function windowResized() {
    largeur = windowWidth
    hauteur = windowHeight 
    canvas.size(Math.floor(largeur*resolution), Math.floor(hauteur*resolution)); // gère la taille du canvas
    camera.size(largeur*resolution, hauteur*resolution); // gère la taille de la caméra
    canvas.canvas.style.width= largeur+"px"
    canvas.canvas.style.height= hauteur+"px"
    //canvas.style("height", hauteur+"px")
    positionner_boutons();
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








// Fonction pour sauvegarder la couleur
function couleursaved(){ 
   localStorage.setItem("couleuradetecterRouge", ""+couleuradetecter[0])  // met dans la base de donnée la valeur de la couleur
   localStorage.setItem("couleuradetecterVert", ""+couleuradetecter[1])  // met dans la base de donnée la valeur de la couleur
   localStorage.setItem("couleuradetecterBleu", ""+couleuradetecter[2])  // met dans la base de donnée la valeur de la couleur
}


// fonction qui active un effet avec un clic de souris
function mouseClicked(e) {
    if(e.srcElement == canvas.canvas){   
        var position1d = Math.floor(mouseY*largeur*resolution+mouseX*resolution)*4 // variable permettant de passer du 2d au 1d, multiplié par s, car la couleur est composée de quatre éléments
        couleuradetecter[0]=camera.pixels[position1d+0] // gère le rouge
        couleuradetecter[1]=camera.pixels[position1d+1] // gère le vert
        couleuradetecter[2]=camera.pixels[position1d+2] // gère le bleu
        return false; // permet d'empêcher la fonction de s'étendre sur les autres
    }
    console.log(couleuradetecter); 
}


// fonction pour faire la différence entre la valeur définie et la valeur mesurée, va avec var couleuradetecter
function distance(r1,g1,b1,r2,g2,b2) {
    return(Math.abs(r2-r1) + Math.abs(g2-g1) + Math.abs(b2-b1))/3 
    // Math.abs signifie la valeur absolue, le négatif devient positif
    // Le calcul est divisé par trois pour que la valeur maximal reste à 255, on soustrait les deux couleurs pour connaitre la différence entre elles
}


// fonction regroupant tous les éléments touchant à la vidéo webcam
function dessinerCamera() {
    if (camera.width == 0 && camera.imageData) {
       camera.width = camera.imageData.width; camera.height = camera.imageData.height  
    }
    camera.loadPixels(); // permet de toucher à la variable camera.pixels
    if (camera.pixels.length) {
        const w = largeur*resolution; // raccourci vers la variable largeur
        const h = hauteur*resolution; // raccourci vers la variable hauteur

        for (var i = 0; i < w; i++) { // se déplacer dans la largeur
            for (let j = 0; j < h; j++) { // se déplacer dans la hauteur
                const position1dCanvas = (j * w + i) * 4; // permet de se déplacer dans le canvas avec les 4 valeurs de la couleur
                const r = camera.pixels[position1dCanvas + 0]; // Raccourci vers la variable rouge
                const g = camera.pixels[position1dCanvas + 1]; // Raccourci vers la variable vert             
                const b = camera.pixels[position1dCanvas + 2]; // Raccourci vers la variable bleu

                if (distance(r,g,b, couleuradetecter[0], couleuradetecter[1], couleuradetecter[2])<seuil) {
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

// fonction permettant le changement de position des boutons par rapport à l'écran
function positionner_boutons(){
        buttonclick.size(200, 200); // donne la taille du bouton
        buttonclick.position(largeur/2-100, hauteur-260); // donne la position du bouton
        buttonSuivant.position(largeur-100, hauteur/2); // donne la position du bouton
        buttonSuivant.size(80, 80);
        buttonAurevoir.position(19, hauteur/2); // donne la position du bouton
        buttonAurevoir.size(80,80);
        buttonHide.position(largeur-160, 20); // donne la position du bouton
        buttoncouleur.position(19, 50); // donne la position du bouton
        buttonToitoile.position(20, 80); // donne la position du bouton
        buttonToitoile.size(153);
        seuilSlider.position(19, 20); // gère la position du slider du seuil
        seuilSlider.size(153);
        menuResolution.position(19, 110);
}


function changerResolution(){
    var choix = menuResolution.value()
    if(choix=='HD'){
        resolution = 1
    }
    else {
        resolution = 0.5
    }
    windowResized()
}

// fonction des étoiles
function etouale(x, y, b, v, taille){
    fill(255, v, b)
    beginShape();
        vertex(x, y);
        vertex(x+25*taille, y+60*taille );
        vertex(x+90*taille, y+60*taille );
        vertex(x+40*taille, y+100*taille);
        vertex(x+60*taille, y+170*taille);
        vertex(x+ 0*taille, y+130*taille);
        vertex(x-60*taille, y+170*taille);
        vertex(x-40*taille, y+100*taille);
        vertex(x-90*taille, y+60*taille );
        vertex(x-25*taille, y+60*taille );
        vertex(x+0 *taille, y+0*taille  );
    endShape();
}