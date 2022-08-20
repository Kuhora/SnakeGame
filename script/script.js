
const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

class CorpoSnake {
  constructor(x, y) {
    this.x = x; this.y = y;
  }
}

// TABULEIRO INICIO TAMANHO 
let tabuleiro = 20;

let spaceSize = canvas.width / tabuleiro - 2;


// spawn da cobrinha
let positionX = 10;
let positionY = 10;

//corpo e cauda NÃO ESQUECER DE MATHFLOOR
const snakeCorpo = [];
let cauda = 0;

let appleX = Math.floor(Math.random() * tabuleiro);
let appleY = Math.floor(Math.random() * tabuleiro);



let inicioVelocidadex = 0; //ERRO LÁ EMBAIXOmovimentoX
let inicioVelocidadey = 0; //ERRO LÁ EMBAIXO

let velocidadeX = 0;
let velocidadeY = 0;

let score = 0;

let movimentoX = 0; //ERRO LÁ EMBAIXO
let movimentoY = 0; //ERRO LÁ EMBAIXO

//LOOP COMEÇO NÃO ESQUECER DE DIREITA, ESQUERDA; ESQUERDA, DIREITA; CIMA, PRA BAIXO E BAIXO PRA CIMA
function mrSnake() {
  velocidadeX = inicioVelocidadex;
  velocidadeY = inicioVelocidadey;

  if (movimentoX === 1 && velocidadeX === -1) {
    velocidadeX = movimentoX;
  }

  if (movimentoX === -1 && velocidadeX === 1) {
    velocidadeX = movimentoX;
  }

  if (movimentoY === -1 && velocidadeY === 1) {
    velocidadeY = movimentoY;
  }

  if (movimentoY === 1 && velocidadeY === -1) {
    velocidadeY = movimentoY;
  }

  movimentoX = velocidadeX;
  movimentoY = velocidadeY;


  //AJUDA PEDIR AJUDA SE NÃO RESOLVER
  snakePosition();
  let result = perdeuGameOver();
  if (result) {
    document.body.removeEventListener("keydown", keyDown);
    return;
  }

  function snakePosition() {
    positionX = positionX + velocidadeX;
    positionY = positionY + velocidadeY;
}


//invocações

  fundo();
  snakeDesenho();
  appleDesenho();
  scoreDesenho();
  appleSpawn()
  
  let velocidade = 8;
  if (score > 5) {
    velocidade = 10;
  }
  if (score > 10) {
    velocidade = 12;
  }

  setTimeout(mrSnake, 1000 / velocidade);
}

function perdeuGameOver() {
  let gameOver = false;

  if (velocidadeY === 0 && velocidadeX === 0) {
    return false;
  }

  //PAREDES, NÃO ESQUECER DE DE USAR ELSE IF
  if (positionX < 0) {
    gameOver = true;
  } else if (positionX === tabuleiro) {
    gameOver = true;
  } else if (positionY < 0) {
    gameOver = true;
  } else if (positionY === tabuleiro) {
    gameOver = true;
  }

  for (let i = 0; i < snakeCorpo.length; i++) {
    let part = snakeCorpo[i];
    if (part.x === positionX && part.y === positionY) {
      gameOver = true;
      break;
    }
  }
  

  //GameOver Desenho e espaço
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "55px Symtext";
    
    if (gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "55px Symtext";

      ctx.fillText("Game Over!", canvas.width / 15, canvas.height / 2);
    }

    ctx.fillText("Game Over!", canvas.width / 15, canvas.height / 2);
  }

  return gameOver;
}

function scoreDesenho() {
  ctx.fillStyle = "yellow";
  ctx.font = "15px Symtext";
  ctx.fillText("Score " + score, canvas.width - 90, 15);
}

function fundo() {
  ctx.fillStyle = "#1B1A23";
  ctx.fillRect(0, 0, canvas.height,canvas.width,);
}

function snakeDesenho() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeCorpo.length; i++) {
    let part = snakeCorpo[i];
    ctx.fillRect(part.x * tabuleiro, part.y * tabuleiro, spaceSize, spaceSize);
  }


  // Pedir ajuda se não souber

  snakeCorpo.push(new CorpoSnake(positionX, positionY)); 
  while (snakeCorpo.length > cauda) {
    snakeCorpo.shift(); 
  }


  // cor dourada e verde ou vermelha e branca

  ctx.fillStyle = "#835d00";
  ctx.fillRect(positionX * tabuleiro, positionY * tabuleiro, spaceSize, spaceSize);
}

function appleDesenho() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tabuleiro, appleY * tabuleiro, spaceSize, spaceSize);
}

// Spawn aleatório da maça
function appleSpawn() {
  if (appleX === positionX && appleY == positionY) {
    appleX = Math.floor(Math.random() * tabuleiro);
    appleY = Math.floor(Math.random() * tabuleiro);
    cauda++;
    score++;
  }
}

// erro não sei resolver. Resolver amanha ou pedir ajuda

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  console.log(inicioVelocidadex, inicioVelocidadey);
  if (event.keyCode == 38 || event.keyCode == 87) {
    inicioVelocidadey = -1;
    inicioVelocidadex = 0;
  }

  if (event.keyCode == 40 || event.keyCode == 83) {
    inicioVelocidadey = 1;
    inicioVelocidadex = 0;
  }

  if (event.keyCode == 37 || event.keyCode == 65) {
    inicioVelocidadey = 0;
    inicioVelocidadex = -1;
  }

  if (event.keyCode == 39 || event.keyCode == 68) {
    inicioVelocidadey = 0;
    inicioVelocidadex = 1;
  }
}
const reloadButton = document.querySelector(".buttonPlay");

function reload(){
  reload =location.reload();
}
reloadButton.addEventListener("click", reload, false)
mrSnake();
