//tablero 
var bloque = 25;
var filas = 20; 
var columnas = 40; 
var tablero; 
var ctx; 

//viborita
var cabezaX = bloque * 10; 
var cabezaY = bloque * 10; 

var velocidadX = 0; 
var velocidadY = 0;

var cuerpo = []; 

//comida
var comidaX;  
var comidaY;

//demas
var puntos = 0; 
var nombre; 
var Perder = false; 

window.onload = Principal; 
 /**
 * Descripción: Crea el canvas y utiliza las demas funciones para llevar a cabo el juego.  
 * @method Principal
 */
function Principal(){
    //creando el tablero
    tablero = document.getElementById("tablero"); 
    tablero.height = filas * bloque; 
    tablero.width = columnas * bloque; 
    ctx =  tablero.getContext("2d"); 
 
    GenerarComida(); 
    document.addEventListener("keyup", CambioDireccion);
    document.addEventListener("keydown", PaginaEstatica); 
    setInterval(Juego, 100);
}


 /**
 * Descripción: Guarda el nombre ingresado por el usuario. 
 * @method GuardarNombre
 */
let GuardarNombre = () =>{
    nombre = document.getElementById("nombre_user").value; 
}

 /**
 * Descripción: Realiza lo esencial del juego, creacion de la viborita, comida, condiciones de puntaje, finalizacion del mismo, etc.  
 * @method Juego
 */
let Juego = () =>{
    
    if(Perder){
        return; 
    }

    //estilo tablero y comida
    ctx.fillStyle = "black"; 
    ctx.fillRect(0, 0, tablero.width, tablero.height); 
    ctx.fillStyle = "red"; 
    ctx.fillRect(comidaX, comidaY, bloque, bloque);

    //verificacion de comida
    if (cabezaX == comidaX && cabezaY == comidaY){
        cuerpo.push([comidaX, comidaY]);
        puntos++; 
        GenerarComida();
    }

    //puntos
    document.getElementById("puntos").textContent = puntos;

    //verificacion para el movimiento
    for (let i=cuerpo.length-1; i>0; i--) {
        cuerpo[i] = cuerpo[i-1];
    }
    if (cuerpo.length) {
        cuerpo[0] = [cabezaX, cabezaY];
    }

    //estilo viborita
    ctx.fillStyle = "green";
    cabezaX = cabezaX + (velocidadX * bloque); 
    cabezaY += velocidadY * bloque; 
    ctx.fillRect(cabezaX, cabezaY, bloque, bloque);  
    for(let i=0; i<cuerpo.length; i++){
        ctx.fillRect(cuerpo[i][0], cuerpo[i][1], bloque, bloque);
    }

    //condiciones para perder
    if (cabezaX < 0 || cabezaX > columnas*bloque-1 || cabezaY < 0 || cabezaY > filas*bloque-1) {
        Perder = true;
        alert("FIN DEL JUEGO: "+ nombre + " HAS PERDIDO \nPUNTUACION FINAL: "+ puntos);
        window.location.reload();
    }
    for (let i = 0; i < cuerpo.length; i++) {
        if (cabezaX == cuerpo[i][0] && cabezaY == cuerpo[i][1]) {
            Perder = true;
            alert("FIN DEL JUEGO: "+ nombre + " HAS PERDIDO \nPUNTUACION FINAL: "+ puntos);
            window.location.reload();
        }
    }
}

 /**
 * Descripción: Genera las coordenadas de la comida de manera aleatoria 
 * @method GenerarComida
 */
let GenerarComida = () =>{
    comidaX = Math.floor(Math.random() * columnas) * bloque; 
    comidaY = Math.floor(Math.random() * filas) * bloque; 
}

 /**
 * Descripción: Realiza el cambio de direccion de la viborita cuando el usuario presiona una flecha del teclado. 
 * @method CambioDireccion
* @param {KeyboardEvent} tecla - flecha presionada por el usuario.
 */
let CambioDireccion = (tecla) =>{
    if (tecla.code == "ArrowUp" && velocidadY != 1) {
        velocidadX = 0;
        velocidadY = -1;
    }
    else if (tecla.code == "ArrowDown" && velocidadY != -1) {
        velocidadX = 0;
        velocidadY = 1;
    }
    else if (tecla.code == "ArrowLeft" && velocidadX != 1) {
        velocidadX = -1;
        velocidadY = 0;
    }
    else if (tecla.code == "ArrowRight" && velocidadX != -1) {
        velocidadX = 1;
        velocidadY = 0;
    }
}

 /**
 * Descripción: Hace que la pagina no se mueva cuando el usuario presiona una tecla.  
 * @method PaginaEstatica
 * @param {KeyboardEvent} evento - tecla presionada por el usuario
 */
let PaginaEstatica = (evento) =>{
        if (evento.key.startsWith("Arrow")){
            evento.preventDefault();
        }
}