const url = 'data/nivel1.json'
const url2 = 'data/nivel1_movimiento.json'
const url3 = 'data/nivel1_bombas.json'
const url4 = 'data/nivel1_enemigo.json'

const urlImg = 'img/nivel1.png'
const personaje = 'img/zelda2.png'
const bomba = 'img/impactos.png'
const animacion='img/zelda2.png';
const enemigo='img/enemigo.png';

let imageTile
let movimientos
let fondo
let marco
let Map
let Map2
let Map3
let Map4

let total_bomba=1;
let inicio=false;
let s=0;
let limite=100;

let pos_bomba;
let pos=21;

////////////////////movimientos animados
let animacionX=45;
let animacionY=45;
let cambio_pose=405;

let caminata=false;
let caminata2=false;
let tiempo_Espera=0;
let tiempo_Espera2=0;
let limite_movimiento=2;
let restriccion=true;
let sentido=0;
//derecha = 3
//izquierda = 4
//arriba= 1
//abajo= 2
/////////////////////////////////////////

//const animacion =[]
let contador_movimiento=0;
let conometro_paso=false;
let accion=false;
let x1;
let derecha;
let izquierda;
let arriba;
let abajo;


////////////////////////////////////////
 var mov_enemigo=0 ;
 let tiempo_enemigo=0;
 let limite_enemigo=15;
 let mover_enemigo=false;
 let pos_enemigo=241;


 let avanza=true;
 let mismo_camino=true;
 let No_regresar=false;
 let vuelta=1;
 let detener=false;
 ////////////////////////////////////////
var ram =0;
var ram2 =0;
let pos_enemigo2=73;

let pos_enemigo3=170;

/////
let cambio=true;
let aumento=0;
let limite_aumento=20;

let cambio2=true;
let aumento2=0;
let limite_aumento2=20;

var song;
var fondoM;
 
let vidas=3;

function preload () {
	fondo = loadImage(`img/fondo1.png`)
	vida = loadImage(`img/vida.png`)
	Map = loadJSON(url)
	Map2 = loadJSON(url2)
	Map3 = loadJSON(url3)
	Map4 = loadJSON(url4)
	imageTile = loadImage(urlImg)
	movimientos = loadImage(personaje)
	ataques = loadImage(bomba)
	caminar = loadImage(animacion)
	enemigo_A = loadImage(enemigo)


	
}
function setup() {

	song = loadSound('sounds/Explosion.wav');
	fondoM= loadSound('sounds/p.wav');
	createCanvas(windowWidth, windowHeight);
	frameRate(18);
	
	
	background(fondo)

	Map['getTile'] = function (col, row) {
		return this.tiles[row * this.cols + col]
	}

	Map2['getTile2'] = function (col, row) {
		return this.tiles2[row * this.cols2 + col]
	}

	Map3['getTile3'] = function (col, row) {
		return this.tiles3[row * this.cols3 + col]
	}

	Map4['getTile4'] = function (col, row) {
		return this.tiles4[row * this.cols4 + col]
	}
	
	
	


}

function draw() {


	if(vidas>=1){
		image(vida, 980, 70, 50, 50);
		if(vidas>=2){
			image(vida, 1040, 70, 50, 50);
			if(vidas>=3){
				image(vida, 1100, 70, 50, 50);
			}
		}
	}
	
	
	render()
	render2()
	render3()
	render4()
	plop();


	aumento++;

	if(aumento>=limite_aumento && cambio==true){
		aumento=0;
		ram= Math.floor(Math.random() * 4) + 1;

	}

	aumento2++;

	if(aumento2>=limite_aumento2 && cambio2==true){
		aumento2=0;
		ram2= Math.floor(Math.random() * 4) + 1;

	}

	
	


	///////////////////////////movimiento enemigo
	if(avanza==true){
		tiempo_enemigo++;
	}
	

	if(tiempo_enemigo>=limite_enemigo){
		avanza=false;
		mover_enemigo=true
		tiempo_enemigo=0;
		
	}

	if(mover_enemigo==true){
		
		
		

		if(Map.tiles[pos_enemigo-20] == 3 && Map4.tiles4[pos_enemigo-20] == 13 && No_regresar==true){
			mov_enemigo= 1;
		}else{
			if(Map.tiles[pos_enemigo+1] == 3 && Map4.tiles4[pos_enemigo+1] == 13 && No_regresar==true){
				
				mov_enemigo= 3;
			}else{
				if(Map.tiles[pos_enemigo+20] == 3 && Map4.tiles4[pos_enemigo+20] == 13 && No_regresar==true){
					
					mov_enemigo= 2;
				}else{
					if(Map.tiles[pos_enemigo-1] == 3 && Map4.tiles4[pos_enemigo-1] == 13 && No_regresar==true){
						mov_enemigo= 4;
						
					}else{
						if(Map.tiles[pos_enemigo-20] == 3 && Map4.tiles4[pos_enemigo-20] == 0 && No_regresar==false){
							mov_enemigo= 1;

						}else{
							if(Map.tiles[pos_enemigo+1] == 3 && Map4.tiles4[pos_enemigo+1] == 0 && No_regresar==false){
								
								mov_enemigo= 3;
							}else{
								if(Map.tiles[pos_enemigo+20] == 3 && Map4.tiles4[pos_enemigo+20] == 0 && No_regresar==false){
									
									mov_enemigo= 2;
								}else{
									if(Map.tiles[pos_enemigo-1] == 3 && Map4.tiles4[pos_enemigo-1] == 0 && No_regresar==false){
										mov_enemigo= 4;
										
									}else{
										if(vuelta==1){
											No_regresar=true;
											mismo_camino=false;
											vuelta=2;
											avanza=true;
										}else{
											No_regresar=false;
											mismo_camino=true;
											vuelta=1;
											avanza=true;
										}
										
									}
								}
							}
						}
					}
				}
			}
		}




		mover_enemigo=false;
	}





	if(detener==false){
		if(mov_enemigo==1){

			if(mismo_camino==true){
				Map4.tiles4[pos_enemigo] = 13;
			}else{
				Map4.tiles4[pos_enemigo] = 0;
			}

			
			pos_enemigo-=20;
			Map4.tiles4[pos_enemigo] = 1;
			avanza=true;
			mov_enemigo=0;
		}else{
			if(mov_enemigo==2){

			if(mismo_camino==true){
				Map4.tiles4[pos_enemigo] = 13;
			}else{
				Map4.tiles4[pos_enemigo] = 0;
			}


				
				pos_enemigo+=20;
				Map4.tiles4[pos_enemigo] = 1;
				avanza=true;
				mov_enemigo=0;
			}else{
				if(mov_enemigo==3){

			if(mismo_camino==true){
				Map4.tiles4[pos_enemigo] = 13;
			}else{
				Map4.tiles4[pos_enemigo] = 0;
			}


					
					pos_enemigo+=1;
					Map4.tiles4[pos_enemigo] = 1;
					avanza=true;
					mov_enemigo=0;
				}else{
					if(mov_enemigo==4){


						if(mismo_camino==true){
							Map4.tiles4[pos_enemigo] = 13;
						}else{
							Map4.tiles4[pos_enemigo] = 0;
						}


						
						pos_enemigo-=1;
						Map4.tiles4[pos_enemigo] = 1;
						avanza=true;
						mov_enemigo=0;
					}
				}
			}
		}
	}

	
	if(cambio==true){


	if(ram==1 && Map.tiles[pos_enemigo2-20] == 3){
		Map4.tiles4[pos_enemigo2] = 0;
		pos_enemigo2-=20;
		Map4.tiles4[pos_enemigo2] = 2;
		ram=0;

	}else{
		if(ram==2 && Map.tiles[pos_enemigo2+20] == 3){
			Map4.tiles4[pos_enemigo2] = 0;
			pos_enemigo2+=20;
			Map4.tiles4[pos_enemigo2] = 2;
			ram=0;
		}else{
			if(ram==3 && Map.tiles[pos_enemigo2+1] == 3){
				Map4.tiles4[pos_enemigo2] = 0;
				pos_enemigo2+=1;
				Map4.tiles4[pos_enemigo2] = 2;
				ram=0;
			}else{
				if(ram==4 && Map.tiles[pos_enemigo2-1] == 3){
					Map4.tiles4[pos_enemigo2] = 0;
					pos_enemigo2-=1;
					Map4.tiles4[pos_enemigo2] = 2;
					ram=0;
				}else{
					
				}
			}
		}
	}
}

	if(cambio2==true){

	if(ram2==1 && Map.tiles[pos_enemigo3-20] == 3){
		Map4.tiles4[pos_enemigo3] = 0;
		pos_enemigo3-=20;
		Map4.tiles4[pos_enemigo3] = 3;
		ram2=0;

	}else{
		if(ram2==2 && Map.tiles[pos_enemigo3+20] == 3){
			Map4.tiles4[pos_enemigo3] = 0;
			pos_enemigo3+=20;
			Map4.tiles4[pos_enemigo3] = 3;
			ram2=0;
		}else{
			if(ram2==3 && Map.tiles[pos_enemigo3+1] == 3){
				Map4.tiles4[pos_enemigo3] = 0;
				pos_enemigo3+=1;
				Map4.tiles4[pos_enemigo3] = 3;
				ram2=0;
			}else{
				if(ram2==4 && Map.tiles[pos_enemigo3-1] == 3){
					Map4.tiles4[pos_enemigo3] = 0;
					pos_enemigo3-=1;
					Map4.tiles4[pos_enemigo3] = 3;
					ram2=0;
				}else{
					
				}
			}
		}
	}
}


	//////////////////////////
	if(caminata==true){
		tiempo_Espera++;
	}
	if(tiempo_Espera>=limite_movimiento){
		tiempo_Espera=0;

//derecha = 3
//izquierda = 4
//arriba= 1
//abajo= 2

		if(sentido==1){
			cambio_pose=315;
			animacionY-=15;

		}else{
			if(sentido==2){
				cambio_pose=450;
				animacionY+=15;
			}else{
				if(sentido==3){
					cambio_pose=45;
					animacionX+=15;
				}else{
					if(sentido==4){
						cambio_pose=180;
						animacionX-=15;
					}
				}
			}
		}


		
		
		caminata=false;
		caminata2=true;
	}

	if(caminata2==true){
		tiempo_Espera2++;
	}
	if(tiempo_Espera2>=limite_movimiento){
		tiempo_Espera2=0;


		if(sentido==1){
			cambio_pose=360;
			animacionY-=15;
		}else{
			if(sentido==2){
				cambio_pose=495;
				animacionY+=15;
			}else{
				if(sentido==3){
					cambio_pose=90;
					animacionX+=15;
				}else{
					if(sentido==4){
						cambio_pose=225;
						animacionX-=15;
					}
				}
			}
		}

		
		caminata2=false;
		conometro_paso=true;
		
	}

	//////////////////////////////////////////
	if(conometro_paso==true){
		contador_movimiento++;
	}

	if(contador_movimiento>=limite_movimiento){
		conometro_paso=false;
		contador_movimiento=0;

		if(sentido==1){
			cambio_pose=270;
			animacionY-=15;
			Map2.tiles2[pos] = 7;
		}else{
			if(sentido==2){
				cambio_pose=405;
				animacionY+=15;
				Map2.tiles2[pos] = 10;
			}else{
				if(sentido==3){
					cambio_pose=0;
					animacionX+=15;
					Map2.tiles2[pos] = 1;
				}else{
					if(sentido==4){
						cambio_pose=135;
						animacionX-=15;
						Map2.tiles2[pos] = 4;
					}
				}
			}
		}


  		restriccion=true;
		

	}
	//////////////////////////////////////////
	

	//s = second();
	if(inicio==true){
		s++;
	}


	if(s>=limite){
		s=0;
		inicio=false;

		Map3.tiles3[pos_bomba] = 0;
		
		limite=100;
		accion=true;


		arriba=0;
		abajo=0;
		derecha=0;
		izquierda=0;

	}

	if(accion==true){
			
		song.play();

		if(Map.tiles[pos_bomba-20]!=1){
			Map3.tiles3[pos_bomba-20] = arriba++;
			if(Map4.tiles4[pos_bomba-20]==1 || Map4.tiles4[pos_bomba]==1){
				Map4.tiles4[pos_bomba-20] = 0;	
				Map4.tiles4[pos_bomba] = 0;
				detener=true;
				
			}

			if(Map4.tiles4[pos_bomba-20]==2 || Map4.tiles4[pos_bomba]==2){
				Map4.tiles4[pos_bomba-20] = 0;	
				Map4.tiles4[pos_bomba] = 0;
				cambio=false;
				
			}

			if(Map4.tiles4[pos_bomba-20]==3 || Map4.tiles4[pos_bomba]==3){
				Map4.tiles4[pos_bomba-20] = 0;	
				Map4.tiles4[pos_bomba] = 0;
				cambio2=false;
				
			}

			if((Map2.tiles2[pos_bomba-20]>=1 && Map2.tiles2[pos_bomba-20]<=12) || Map2.tiles2[pos_bomba]>=1 && Map2.tiles2[pos_bomba]<=12){
				vidas--;
				
			}

			if(Map.tiles[pos_bomba-20]==2){
				Map.tiles[pos_bomba-20]=3;
			}
		}
		if(Map.tiles[pos_bomba+20]!=1){
			Map3.tiles3[pos_bomba+20] = abajo++;
			if(Map4.tiles4[pos_bomba+20]==1 || Map4.tiles4[pos_bomba]==1){
				Map4.tiles4[pos_bomba+20] = 0;
				Map4.tiles4[pos_bomba] = 0;
				detener=true;
				
			}

			if(Map4.tiles4[pos_bomba+20]==2 || Map4.tiles4[pos_bomba]==2){
				Map4.tiles4[pos_bomba+20] = 0;
				Map4.tiles4[pos_bomba] = 0;
				cambio=false;
				
			}

			if(Map4.tiles4[pos_bomba+20]==3 || Map4.tiles4[pos_bomba]==3){
				Map4.tiles4[pos_bomba+20] = 0;
				Map4.tiles4[pos_bomba] = 0;
				cambio2=false;
				
			}

			if((Map2.tiles2[pos_bomba+20]>=1 && Map2.tiles2[pos_bomba+20]<=12) || Map2.tiles2[pos_bomba]>=1 && Map2.tiles2[pos_bomba]<=12){
				vidas--;
				
			}

			if(Map.tiles[pos_bomba+20]==2){
				Map.tiles[pos_bomba+20]=3;
			}
		}
		if(Map.tiles[pos_bomba+1]!=1){
			Map3.tiles3[pos_bomba+1] = derecha++;
			if(Map4.tiles4[pos_bomba+1]==1 || Map4.tiles4[pos_bomba]==1){
				Map4.tiles4[pos_bomba+1] = 0;
				Map4.tiles4[pos_bomba] = 0;
				detener=true;
					
			}

			if(Map4.tiles4[pos_bomba+1]==2 || Map4.tiles4[pos_bomba]==2){
				Map4.tiles4[pos_bomba+1] = 0;
				Map4.tiles4[pos_bomba] = 0;
				cambio=false;
					
			}

			if(Map4.tiles4[pos_bomba+1]==3 || Map4.tiles4[pos_bomba]==3){
				Map4.tiles4[pos_bomba+1] = 0;
				Map4.tiles4[pos_bomba] = 0;
				cambio2=false;
					
			}

			if(Map2.tiles2[pos_bomba+1]>=1 && Map2.tiles2[pos_bomba+1]<=12 || Map2.tiles2[pos_bomba]>=1 && Map2.tiles2[pos_bomba]<=12){
				vidas--;
				
			}

			if(Map.tiles[pos_bomba+1]==2){
				Map.tiles[pos_bomba+1]=3;
			}
		}
		if(Map.tiles[pos_bomba-1]!=1){
			Map3.tiles3[pos_bomba-1] = izquierda++;
			if(Map4.tiles4[pos_bomba-1]==1 || Map4.tiles4[pos_bomba]==1){
				Map4.tiles4[pos_bomba-1] = 0;
				Map4.tiles4[pos_bomba] = 0;
				detener=true;
				
			}

			if(Map4.tiles4[pos_bomba-1]==2 || Map4.tiles4[pos_bomba]==2){
				Map4.tiles4[pos_bomba-1] = 0;
				Map4.tiles4[pos_bomba] = 0;
				cambio=false;
				
			}

			if(Map4.tiles4[pos_bomba-1]==3 || Map4.tiles4[pos_bomba]==3){
				Map4.tiles4[pos_bomba-1] = 0;
				Map4.tiles4[pos_bomba] = 0;
				cambio2=false;
				
			}


			if(Map2.tiles2[pos_bomba-1]>=1 && Map2.tiles2[pos_bomba-1]<=12 || Map2.tiles2[pos_bomba]>=1 && Map2.tiles2[pos_bomba]<=12){
				vidas--;
				
			}

			if(Map.tiles[pos_bomba-1]==2){
				Map.tiles[pos_bomba-1]=3;
			}
		}
		
		
		Map3.tiles3[pos_bomba] = x1++;
		total_bomba=1;

	}

		
	if(x1==4){

			arriba=0;
			abajo=0;
			derecha=0;
			izquierda=0;

			Map3.tiles3[pos_bomba-20] = 0;
			Map3.tiles3[pos_bomba+20] = 0;
			Map3.tiles3[pos_bomba+1] = 0;
			Map3.tiles3[pos_bomba-1] = 0;
			
			Map3.tiles3[pos_bomba] = 0;
			accion=false;
		}


}


function keyPressed() {
//derecha = 3
//izquierda = 4
//arriba= 1
//abajo= 2

  if (keyCode === LEFT_ARROW) {

  		if(restriccion==true){
  			if(Map.tiles[pos-1]==3){
	  			sentido=4;

	  			Map2.tiles2[pos] = 0;
				pos-=1;
				caminata=true;
				restriccion=false;

  			}
  		}

  		

    	
  }

  if (keyCode === RIGHT_ARROW) {

  		if(restriccion==true){
  			if(Map.tiles[pos+1]==3){
	  			sentido=3;

		  		Map2.tiles2[pos] = 0;
				pos+=1;
				caminata=true;
				restriccion=false;
			
  			}
  		}


  		

  }
  if (keyCode === DOWN_ARROW) {

  		if(restriccion==true){
  			if(Map.tiles[pos+20]==3){
	  			sentido=2;
		
	  			Map2.tiles2[pos] = 0;
				pos+=20;
				caminata=true;
				restriccion=false;
			
  			}
  		}


  		
    	
  }
  if (keyCode === UP_ARROW) {

	  	if(restriccion==true){
	  		if(Map.tiles[pos-20]==3){
	  			sentido=1;

		  		Map2.tiles2[pos] = 0;
				pos-=20;
				caminata=true;
				restriccion=false;
			
  			}
   		
  		}


  		
  }
  if (keyCode === ENTER) {

  		if(total_bomba==1){
  			total_bomba=0;
  			Map3.tiles3[pos] = 5;
			pos_bomba=pos;
			limite=20;
			
			x1=0;
			inicio=true;
  		}
   		
  }
}


const plop = function () {


			image(caminar,
				animacionX,//x
				animacionY,//y
				45,//tamañox
				45,//tamañoy
				cambio_pose,
				0,
				45,//cantidas de x
				45,//cantidas de y
				)
		
}


const render = function () {
	for (var i = 0; i < Map.cols; i++) {
		for (var j = 0; j < Map.rows; j++) {

			let tile = Map.getTile(i, j)

			image(imageTile,
				i * Map.size,
				j * Map.size,
				Map.size,
				Map.size,
				(tile - 1) * Map.size,
				0,
				Map.size,
				Map.size,
				)
		}
	}
}

const render2 = function () {
	for (var i = 0; i < Map2.cols2; i++) {
		for (var j = 0; j < Map2.rows2; j++) {
			
			let tile2 = Map2.getTile2(i, j)

			image(movimientos,
				i * Map2.size2,
				j * Map2.size2,
				Map2.size2,
				Map2.size2,
				(tile2 - 1) * Map2.size2,
				0,
				Map2.size2,
				Map2.size2,
				)
		}
	}
}

const render3 = function () {
	for (var i = 0; i < Map3.cols3; i++) {
		for (var j = 0; j < Map3.rows3; j++) {
			
			let tile3 = Map3.getTile3(i, j)

			image(ataques,
				i * Map3.size3,
				j * Map3.size3,
				Map3.size3,
				Map3.size3,
				(tile3 - 1) * Map3.size3,
				0,
				Map3.size3,
				Map3.size3,
				)
		}
	}
}


const render4 = function () {
	for (var i = 0; i < Map4.cols4; i++) {
		for (var j = 0; j < Map4.rows4; j++) {
			
			let tile4 = Map4.getTile4(i, j)

			image(enemigo_A,
				i * Map4.size4,
				j * Map4.size4,
				Map4.size4,
				Map4.size4,
				(tile4 - 1) * Map4.size4,
				0,
				Map4.size4,
				Map4.size4,
				)
		}
	}
}



function mousePressed() {
  if ( fondoM.isPlaying() ) { 
    
  } else {
    fondoM.play();
   
  }
}


