
//import { Input } from './Input.js';
import { Obj3D } from './Obj3D.js';
//import { Canvas3D } from './Canvas3D.js';
//import { CvWireframe } from './CvWireFrame.js';
import { CvHLines } from './CvHLines.js';
import { Rota3D } from './Rota3D.js';
import { Point3D } from './point3D.js';

let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;

canvas = <HTMLCanvasElement>document.getElementById('circlechart');
graphics = canvas.getContext('2d');

let cv: CvHLines;
let obj: Obj3D;
let ang: number=0;

function leerArchivo(e:any) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    mostrarContenido(contenido);
    obj = new Obj3D();
    if (obj.read(contenido)) {
      //sDir = sDir1;
      cv = new CvHLines(graphics, canvas);
      cv.setObj(obj);
      cv.paint();
    }
  };
  lector.readAsText(archivo);
}

function mostrarContenido(contenido:any) {
  var elemento = document.getElementById('contenido-archivo');
  //
  //readObject(new Input(contenido));
  elemento.innerHTML = contenido;
}

function vp(dTheta:number, dPhi:number, fRho:number):void{  // Viewpoint
  if (obj != undefined) {
    let obj: Obj3D = cv.getObj();
    if (!obj.vp(cv, dTheta, dPhi, fRho))
      alert('datos no validos');
  }
  else
    alert('aun no has leido un archivo');
}

function eyeDownFunc() {
  vp(0, 0.1, 1);
}

function eyeUpFunc() {
  vp(0, -0.1, 1);
}

function eyeLeftFunc() {
  vp(-0.1, 0, 1);
}

function eyeRightFunc() {
  vp(0.1, 0, 1);
}

function incrDistFunc() {
  vp(0, 0, 2);
}

function decrDistFunc() {
  vp(0, 0, 0.5);
}

//------  Variables para cerrar y abrir -----------------
let contacerrar: number = 0;
let limitecerrar: number = 6;//tapa cerrar
let limiteabrir: number = -6;//tapa abrir
//limite de animaciones
function cerrar() {
  if(contacerrar < limitecerrar) {
  let af = 15;//variable de rotacion en grados antes de multiplicar por 6
 	
	Rota3D.initRotate( obj.w[900], obj.w[901], af*Math.PI/180);	//rotacion de ancla
	//puntos para abrir y cerrar tapa
  for (let i = 150; i <= 157; i++)
  {
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  for (let i = 160; i <= 203; i++)
  {
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  for (let i = 205; i <= 220; i++)
  {
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  ////////////////////////////////////////
  contacerrar++;
	cv.setObj(obj);
  cv.paint();	//por cada llamada repinto 
  ////////////////////////////////////////
}
  
}
///////lo mismo que cerrar ////////////////
function abrir()
{
  let af = -15;
 	if(contacerrar == limiteabrir )
  {
    // alert("El Game Boy se ha abierto completamente")
  }
  else{
	Rota3D.initRotate( obj.w[900], obj.w[901], af*Math.PI/180);	
	
  for (let i = 150; i <= 157; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  for (let i = 160; i <= 203; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  for (let i = 205; i <= 220; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  contacerrar--; //snetido contrario
	cv.setObj(obj);
  cv.paint();
	}
}
////////////////animacion para abrir(sin C) y cerrar///////////////
let Animacion,
    AnimacionC;

//////////////genero intervalo de  90 mili segundos para abrir///////////
function iniciarAnimacion()
{
  Animacion = setInterval(abrir,90);
  clearInterval(AnimacionC);// limpia los intervalos
}
//////////////genero intervalo de  90 mili segundos para cerrar///////////
function iniciarAnimacionC()
{
  AnimacionC = setInterval(cerrar,90);
  clearInterval(Animacion);
}

//----- Variables para la interracion de los botones ------------
var limiteA = 0,
    limiteB = 0,
    limiteArriba = 0,
    limiteAbajo = 0,
    limiteDerecha =0,
    limiteIzquierda = 0,
    limiteL = 0,
    limiteR = 0;


//Metodos para los botones 
function B(){
  var direc = -.20 ;
  if(limiteB < 1)
  {
    for(var i = 301; i<=316; i++)
    {
      obj.w[i].y= obj.w[i].y+direc;
    }
    limiteB++;
    cv.setObj(obj);//pone el objeto en el canvas
    cv.paint();	//repintar
  }
}

function BM(){
  var direc = .20 ;
    for(var i = 301; i<=316; i++){
      obj.w[i].y= obj.w[i].y+direc;
    }
    limiteB--;
    cv.setObj(obj);
    cv.paint();	
}

function A(){
  var direc = -.20;
  if(limiteA < 1){
    for(var i = 321; i<=336; i++){
      obj.w[i].y= obj.w[i].y+direc;
    }
    limiteA++;
    cv.setObj(obj);
    cv.paint();	
  }
}

function AM()
{
  var direc = .20 ;
    for(var i = 321; i<=336; i++)
    {
      obj.w[i].y= obj.w[i].y+direc;
    }
    limiteA--;
    cv.setObj(obj);
    cv.paint();	
}

//Metodos para la cruceta

function cruzUPP(){
  let af = -10;
 	
  if(limiteArriba < 1){
	Rota3D.initRotate( obj.w[902], obj.w[903], af*Math.PI/180);	
	
  for (let i = 260; i <= 271; i++)
  {
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  limiteArriba++;
  cv.setObj(obj);
  cv.paint();	
  }
}

function cruzUPN(){
  let af = 10;
 	
	Rota3D.initRotate( obj.w[902], obj.w[903], af*Math.PI/180);	
	
  for (let i = 260; i <= 271; i++)
  {
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  limiteArriba--;
  cv.setObj(obj);
  cv.paint();	
}

function cruzAbajoP()
{
  let af = 10;
  if(limiteAbajo < 1)
  {
	Rota3D.initRotate( obj.w[902], obj.w[903], af*Math.PI/180);	
	
  for (let i = 260; i <= 271; i++)
  {
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  limiteAbajo++;
  cv.setObj(obj);
  cv.paint();	
}
}

function cruzAbajoN(){
  let af = -10;
 	
	Rota3D.initRotate( obj.w[902], obj.w[903], af*Math.PI/180);	
	
  for (let i = 260; i <= 271; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  limiteAbajo--;
  cv.setObj(obj);
  cv.paint();	
}

function cruzIzP(){
  let af = 10;
 	if(limiteIzquierda < 1){
	Rota3D.initRotate( obj.w[904], obj.w[905], af*Math.PI/180);	
	
  for (let i = 260; i <= 271; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  limiteIzquierda++;
  cv.setObj(obj);
  cv.paint();	
}
}

function cruzIzN(){
  let af = -10;
 	
	Rota3D.initRotate( obj.w[904], obj.w[905], af*Math.PI/180);	
	
  for (let i = 260; i <= 271; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  limiteIzquierda--;
  cv.setObj(obj);
  cv.paint();	
}

function cruzDeP(){
  let af = -10;
 	if(limiteDerecha < 1){

	Rota3D.initRotate( obj.w[904], obj.w[905], af*Math.PI/180);	
	
  for (let i = 260; i <= 271; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  limiteDerecha++;
  cv.setObj(obj);
  cv.paint();	
}
}

function cruzDeN()
{
  let af = 10;
 	
	Rota3D.initRotate( obj.w[904], obj.w[905], af*Math.PI/180);	
	
  for (let i = 260; i <= 271; i++)
  {
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  limiteDerecha--;
  cv.setObj(obj);
  cv.paint();	
}

 function L()
 {
   var tr = 0.05;
   if(limiteL < 1)
   {
   for(var i=230; i<=237; i++)
   {
     obj.w[i].z= obj.w[i].z+tr;
   }
   limiteL++;
   cv.setObj(obj);
   cv.paint();
  }
   }

   function LM()
   {
    var tr =  -0.05;
    for(var i=230; i<=237; i++)
    {
      obj.w[i].z= obj.w[i].z+tr;
    }
    limiteL--;
    cv.setObj(obj);
    cv.paint();
    }

    function R()
    {
      var tr = 0.05;
      if( limiteR < 1)
      {
      for(var i=240; i<=247; i++)
      {
        obj.w[i].z= obj.w[i].z+tr;
      }
      limiteR++;
      cv.setObj(obj);
      cv.paint();
      }
    }

      function RM()
      {
        var tr = -0.05;
        for(var i=240; i<=247; i++)
        {
          obj.w[i].z= obj.w[i].z+tr;
        }
        limiteR--;
        cv.setObj(obj);
        cv.paint();
      }

//Game mode 
var up = false,
   botonb = false,
    botona= false,
    right = false,
    down = false,
    left = false,
    botonl = false,
    botonr = false,
    x = window.innerWidth/2-130/2,
    y = window.innerHeight/2-130/2
// establece el limite que se preciona el boton
document.addEventListener('keydown',press)
function press(e)
{
  if (e.keyCode === 87 /* w */)
  {
    up = true;
    cruzUPP();
  }

  if (e.keyCode === 68 /* d */)
  {
    right = true;
    cruzDeP();
  }

  if (e.keyCode === 83 /* s */)
  {
    down = true;
    cruzAbajoP();
  }

  if (e.keyCode === 65 /* a */)
  {
    left = true;
    cruzIzP();
  }

  if(e.keyCode=== 69 /* e  */)
  {
    botonb= true;
     B();
  }
  
  if(e.keyCode=== 70 /* f  */)
  {
    botona= true;
    A();
 }

 if (e.keyCode === 76 /* L */)
 {
  botonl = true;
  L();
 }

 if (e.keyCode === 82 /* r */)
 {
  botonr = true;
  R();
 }
}
document.addEventListener('keyup',release)
function release(e)
{
   if (e.keyCode === 87 /* w */)
   {
    up = false
    cruzUPN();
  }
   if (e.keyCode === 68 /* d */)
   {
    right = false
    cruzDeN();
  }
   if (e.keyCode === 83 /* s */)
   {
    down = false
    cruzAbajoN();
  }
   if (e.keyCode === 65 /* a */)
   {
    left = false
    cruzIzN();
  }
   if(e.keyCode === 69 /* e  */)
   {
    botonb= false;
    BM();
  }
   if(e.keyCode === 70 /* f  */)
   {
   botona= false;
   AM();
}

  if(e.keyCode=== 76 /* l */)
  {
  botonl = false;
  LM();
}

if(e.keyCode=== 82 /* r */)
{
  botonr = false;
  RM();
}

}
function gameLoop()
{
  var div = document.querySelector('div');

  window.requestAnimationFrame(gameLoop)
}
window.requestAnimationFrame(gameLoop)


document.getElementById('file-input').addEventListener('change', leerArchivo, false);
document.getElementById('eyeDown').addEventListener('click', eyeDownFunc, false);
document.getElementById('eyeUp').addEventListener('click', eyeUpFunc, false);
document.getElementById('eyeLeft').addEventListener('click', eyeLeftFunc, false);
document.getElementById('eyeRight').addEventListener('click', eyeRightFunc, false);
document.getElementById('incrDist').addEventListener('click', incrDistFunc, false);
document.getElementById('decrDist').addEventListener('click', decrDistFunc, false);

document.getElementById('cerrar').addEventListener('click', iniciarAnimacionC, false);
document.getElementById('abrir').addEventListener('click', iniciarAnimacion, false);

let Pix: number, Piy: number;
let Pfx: number, Pfy: number;
let theta = 0.3, phi = 1.3, SensibilidadX = 0.02, SensibilidadY = 0.02;
let flag: boolean = false;

function handleMouse(evento: any) {
  Pix=evento.offsetX;
  Piy = evento.offsetY;
  flag = true;
}

function makeVizualization(evento: any) {
  if (flag) {
    Pfx = evento.offsetX;
    Pfy = evento.offsetY;
    //console.log(Pfx, Pfy)
    let difX = Pix - Pfx;
    let difY = Pfy - Piy;
    vp(0, 0.1 * difY / 50, 1);
    Piy = Pfy;
    vp(0.1 * difX, 0 / 50, 1);
    Pix = Pfx;
    /*if( Piy>Pfy+1 ){
      phi += SensibilidadY;
      vp(0, 0.1*, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Piy=Pfy;
    }

    if(Pfy>Piy+1){
      phi -= SensibilidadY;
      vp(0,-0.1, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Piy=Pfy;
    }*/

    /*if (Pix > Pfx + 1) {
      theta += SensibilidadX;
      vp(0.1, 0, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Pix = Pfx;
    }
        
    if (Pfx > Pix + 1) {
      theta -= SensibilidadX;
      vp(-0.1, 0, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Pix = Pfx;
    }*/
  }
}

function noDraw() {
  flag = false;
}

canvas.addEventListener('mousedown', handleMouse);
canvas.addEventListener('mouseup', noDraw);
canvas.addEventListener('mousemove', makeVizualization);