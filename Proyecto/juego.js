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
var velocidad = 100; 
var cuerpo = []; 
var seleccion; 

//comida
var comidaX;  
var comidaY;

//demas
var puntos = 0; 
var nivel = 1; 
var contador = 0; 
var contador2 = 0; 
let intervalo; 
var nombre; 
var Perder = false; 
var mensaje; 

 /**
 * Descripción: Crea el canvas y utiliza las demas funciones para llevar a cabo el juego.  
 * @method Principal
 */
let Principal= () =>{
    //creando el tablero
    tablero = document.getElementById("tablero"); 
    tablero.height = filas * bloque; 
    tablero.width = columnas * bloque; 
    ctx =  tablero.getContext("2d"); 
 
    GenerarComida(); 
    //CustomViborita(); 
    document.addEventListener("keyup", CambioDireccion);
    document.addEventListener("keydown", PaginaEstatica);
    intervalo = setInterval(Juego, velocidad);
}

let BorrarTexto = () =>{
    mensaje = document.getElementById("mensaje"); 
    mensaje.innerText = "";  
}


 /**
 * Descripción: Guarda el nombre ingresado por el usuario. 
 * @method GuardarNombre
 */
let GuardarNombre = () =>{
    nombre = document.getElementById("nombre_user").value; 

    
    if(nombre.trim()=== ""){
        alert("ADVERTENCIA: Debe ingresar su nombre de usuario");
        window.location.reload();
    }

    if(nombre.length>20){
        alert("ADVERTENCIA: Nombre de usuario muy extenso.\n Recuerde que tiene como maximo 20 caracteres");
        window.location.reload();
    }
}


let AumentoNivel = (puntos) =>{ 
    document.getElementById("nivel").textContent = nivel;
    if(puntos === contador+3){
        nivel++; 
        velocidad = velocidad-15;
        contador = puntos; 
        clearInterval(intervalo); 
        intervalo = setInterval(Juego, velocidad); 
   }

}

let CustomViborita = () => {
    seleccion = document.getElementById("seleccion").value;
    switch (seleccion) {
      case "1":
        ctx.fillStyle = "green";
        break;
      case "2":
        ctx.fillStyle = "red";
        break;
      case "3":
        ctx.fillStyle = "blue";
        break;
      case "4":
        ctx.fillStyle = "yellow";
        break;
      case "5":
        ctx.fillStyle = "pink";
        break;
      default:
        ctx.fillStyle = "green";
        break;
    }
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
    CustomViborita();

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
    
    AumentoNivel(puntos);
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
    if ((tecla.code == "ArrowUp" || tecla.code == "KeyW") && velocidadY != 1) {
        velocidadX = 0;
        velocidadY = -1;
    }
    else if ((tecla.code == "ArrowDown" || tecla.code == "KeyS") && velocidadY != -1) {
        velocidadX = 0;
        velocidadY = 1;
    }
    else if ((tecla.code == "ArrowLeft" || tecla.code == "KeyA") && velocidadX != 1) {
        velocidadX = -1;
        velocidadY = 0;
    }
    else if ((tecla.code == "ArrowRight" || tecla.code == "KeyD") && velocidadX != -1) {
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