//tablero 
var bloque = 25;
var filas; 
var columnas; 
var tablero; 
var ctx; 

//viborita
var cabezaX = bloque * 10; 
var cabezaY = bloque * 10; 
var velocidadX = 0; 
var velocidadY = 0;
var velocidad = 100; 
var cuerpo = []; 


//comida
var comidaX;  
var comidaY;

//demas
var puntos = 0; 
var nivel = 1; 
var contador = 0; 
let intervalo; 
var nombre;
var nombreUsu;
var seleccion_Col;
var seleccion_Tab;
var seleccion_Com; 
var Perder = false;
var auxP; 
var auxN; 
var mensaje;
let dialog;
let dialog2;  
var InputNombre; 
var bandera = false;
var banderaNombre = true;
var nombre_tab = ["-","-","-","-","-","-","-","-","-","-"]; 
var puntos_tab = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];



/**
* Descripción: Crea el canvas y utiliza las demas funciones para llevar a cabo el juego.  
* @method Principal
*/
let Principal = () =>{
    //creando el tablero
    CustomTablero(); 
    tablero = document.getElementById("tablero"); 
    tablero.height = filas * bloque; 
    tablero.width = columnas * bloque; 
    ctx =  tablero.getContext("2d");
 
    GenerarComida(); 
    document.addEventListener("keyup", CambioDireccion);
    document.addEventListener("keydown", PaginaEstatica);
    intervalo = setInterval(Juego, velocidad);
    Cargar_Tabla(puntos);
}


/**
* Descripción: Guarda el nombre ingresado por el usuario. 
* @method GuardarNombre
*/
let GuardarNombre = () => {
    nombreUsu = document.getElementById("nombre_user").value;
    localStorage.setItem("NombreDelUsuario",nombreUsu);
  
    nombre = localStorage.getItem("NombreDelUsuario");

    //verifica que el usuario ingrese el nombre
    if (nombre.trim() === ""){
      alert("ADVERTENCIA: Debe ingresar su nombre de usuario");
      return;
    }

    window.location.href = "juego.html";
}


/**
* Descripción: Guarda el nombre ingresado por el usuario en la parte de Custom.  
* @method GuardarNombreCustom
*/
let GuardarNombreCustom = () => {
    nombreUsu = document.getElementById("nombre_userCustom").value;
    localStorage.setItem("NombreDelUsuario",nombreUsu);
  
    nombre = localStorage.getItem("NombreDelUsuario");
    
    //verifica que el usuario ingrese el nombre
    if (nombre.trim() === ""){
      alert("ADVERTENCIA: Debe ingresar su nombre de usuario");
      return;
    }
}


/**
* Descripción: Aumenta el nivel del juego segun los puntos del usuario.  
* @method AumentoNivel
* @param {number} puntos - El valor de los puntos hechos por el usuario.
*/
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

/**
* Descripción: Permite elegir el color de la viborita. 
* @method CustomViborita
*/
let CustomViborita = () => {
    seleccion_Col = document.getElementById("seleccion_Col").value;
    switch (seleccion_Col) {
      case "1":
        ctx.fillStyle = "green";
        break;
      case "2":
        ctx.fillStyle = "orange";
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
* Descripción: Permite elegir el color de la viborita. 
* @method CustomTablero
*/
let CustomTablero = () => {
    seleccion_Tab = document.getElementById("seleccion_Tab").value;
    switch (seleccion_Tab) {
      case "1":
        filas = 20;
        columnas = 40;
        break;
      case "2":
        filas = 15;
        columnas = 25;
        break;
      case "3":
        filas = 20;
        columnas = 50;
        break;
      default:
        filas = 20;
        columnas = 40;
        break;
    }
}

/**
* Descripción: Permite elegir el color de la comida. 
* @method CustomComida
*/
let CustomComida = () => {
    seleccion_Com = document.getElementById("seleccion_Com").value;
    switch (seleccion_Com){
        case "1":
          ctx.fillStyle = "red";
          break;
        case "2":
          ctx.fillStyle = "purple";
          break;
        case "3":
          ctx.fillStyle = "white";
          break;
        case "4":
          ctx.fillStyle = "brown";
          break;
        case "5":
          ctx.fillStyle = "black";
          break;
        default:
          ctx.fillStyle = "red";
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
    CustomComida();  
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
        MostrarDialog();
        return Perder;
    }
    for (let i = 0; i < cuerpo.length; i++) {
        if (cabezaX == cuerpo[i][0] && cabezaY == cuerpo[i][1]) {
            Perder = true;
            MostrarDialog();
            return Perder;
        }
    }
    AumentoNivel(puntos);
}


/**
* Descripción: Genera las coordenadas de la comida de manera aleatoria. 
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
    InputNombre = document.getElementById("nombre_userCustom");

    //verifica si el usuario esta seleccionado el campo de ingresar nombre
    InputNombre.addEventListener("focus", () => {
        banderaNombre = false; 
    });

    InputNombre.addEventListener("blur", () => {
        banderaNombre = true; 
    });
    
    if(!banderaNombre){
        return; 
    }
      
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

/**
* Descripción: Genera un cartel cuando has perdido mostrando el nombre, los puntos y el nivel.
* @method MostrarDialog
*/
let MostrarDialog = () =>{
    nombre = localStorage.getItem("NombreDelUsuario");
    dialog = document.getElementById("MensajePerder");
    document.getElementById("MostrarNombre").innerHTML = nombre + " HAS PERDIDO";
    document.getElementById("MostrarPuntaje").innerHTML = "Puntaje: "+ puntos;
    document.getElementById("MostrarNivel").innerHTML = "Nivel: "+ nivel; 
    dialog.showModal();
}

/**
* Descripción: Genera un cartel cuando el usuario quiere empezar a jugar. 
* @method MostrarDialog_2 
*/
let MostrarDialog_2 = () =>{
    dialog2 = document.getElementById("nombre");
    dialog2.showModal();
}

/**
* Descripción: Reinicia las variables para que el usuario juegue nuevamente.
* @method Restart
*/
let Restart = () => {
    cabezaX = bloque * 10;
    cabezaY = bloque * 10;
    velocidadX = 0;
    velocidadY = 0;
    puntos = 0;
    contador = 0;
    Perder = false;
    cuerpo = []; 
    clearInterval(intervalo);
    velocidad = 100;
    nivel = 1;
}

/**
* Descripción: Cierra el cartel de perder y reinicia el juego.
* @method CerrarDialog
*/
let CerrarDialog = () =>{
    dialog = document.getElementById("MensajePerder");
    dialog.close(); 
    Cargar_Tabla(puntos);
    Restart(); 
    Principal(); 
}


/**
* Descripción: Actualiza la tabla de los 10 mejores puntajes.  
* @method Cargar_Tabla
* @param {number} puntos - El valor de los puntos hechos por el usuario.
*/
let Cargar_Tabla = (puntos) =>{
    for(i=0; i<10; i++){
        if(puntos > puntos_tab[i]){
            puntos_tab[9] = puntos;
            nombre_tab[9] = nombre; 
            break; 
        }
    }

    for (i = 0; i < 10; i++){
        for (j = 9; j >= i; j--) {
          if (puntos_tab[j - 1] < puntos_tab[j]){
                auxP = puntos_tab[j - 1];
                puntos_tab[j - 1] = puntos_tab[j];
                puntos_tab[j] = auxP;

                auxN = nombre_tab[j - 1];
                nombre_tab[j - 1] = nombre_tab[j];
                nombre_tab[j] = auxN;
            }
        }
    }

    localStorage.setItem("Puntos_tab", JSON.stringify(puntos_tab));
    localStorage.setItem("Nombres_tab", JSON.stringify(nombre_tab)); 

    for(i=0; i<10; i++){
        document.getElementsByName("posicion")[i].innerHTML = i+1; 
        document.getElementsByName("nombre_tab")[i].innerHTML = nombre_tab[i];
        document.getElementsByName("puntos_tab")[i].innerHTML = puntos_tab[i];
    }
}
