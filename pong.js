let ctx, p1_y, p2_y, p1_pontos, p2_pontos;
//let - declara uma variável local no escopo do bloco atual
//ctx - canvas context, responsável por renderizar objetos no canvas
//p1_y e p2_t=y posição dos jogadores em relação a y
let orientacao_y_bola, orientacao_x_bola, bola_x, bola_y;
const altura=500, largura=800, player_largura=20, player_altura=200, p1_x = 10, p2_x = largura - player_largura - 10;
//player_altura e player_largura, a mesma altura e largura vale para os dois jogadores, portanto apenas uma constante é necessária

function setup(){
    const canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    // inicializa as posições y do p1 e do p2 para metade da tela
    p1_y = p2_y = (altura/2) - (player_altura/2);
    
    // inicializa os pontos dos jogadores como 0
    p1_pontos = 0;
    p2_pontos = 0;

    //define um intervalo de 60 fps para o loop
    setInterval(loop,1000/60);

    iniciarBolinea();
}

function loop(){
    draw()

    //evento de mexer a barrinha
    if(p1_key == 87 && p1_y > 0){
        p1_y -= 10;
    }
    //keyCode 87 = w, keyCode = 83 = s
    else if(p1_key == 83 && p1_y + player_altura < altura){
        p1_y += 10;
    }
    if(p2_key == 38 && p2_y > 0){
        p2_y -= 10;
    }
    //keyCode 38 == arrowUp, keycode 40 == arrowDown
    else if(p2_key == 40 && p2_y + player_altura < altura){
        p2_y += 10;
    }

    //ricochete da bolinea
    //verifica se  abola está colidindo com a barra do player 1
    if(bola_x >= p1_x && bola_x <= p1_x + 10 && bola_y >= p1_y && bola_y <= p1_y + player_altura){
        orientacao_x_bola = 1;
    }
    //Verifica se a bola está colidindo com a barra do player 2
    else if(bola_x >= p2_x && bola_x <= p2_x + 10 && bola_y >= p2_y && bola_y <= p2_y + player_altura){
        orientacao_x_bola = -1;
    }

    //Verifica se a bola bateu no chão ou no teto
    if(bola_y + 10 >= altura || bola_y <= 10){
        orientacao_y_bola *= -1;
    }

    //Move a bola no eixo x e y
    bola_x += 5 * orientacao_x_bola;
    bola_y += 5 * orientacao_y_bola;

    if(p1_key == 87 && p1_y > 0){
        p1_y -= 10;
    }
    else if(p1_key == 83 && p1_y + player_altura < altura){
        p1_y += 10;
    }
    if(p2_key == 38 && p2_y > 0){
        p2_y -= 10
    }else if(p2_key == 40 && p2_y + player_altura < altura){
        p2_y += 10
    }

    //Pontuação
    if(bola_x+10 > largura){
        p1_pontos++;
        iniciarBolinea();
    }
    else if(bola_x < 0){
        p2_pontos++;
        iniciarBolinea();
    }
}
function iniciarBolinea(){
    console.log(`${p1_pontos} VS ${p2_pontos}`);
    orientacao_y_bola = Math.pow(2, Math.floor(Math.random()*2)+1)-3;
    orientacao_x_bola = Math.pow(2, Math.floor(Math.random()*2)+1)-3;
    bola_x = largura/2-10;
    bola_y = altura/2-10;
}

//Função de desenhar o fundo, os jogadores, a barra lateral e a bolinea
function draw(){
    // fundo
    drawRect(0,0,largura,altura,"#000");
    // player 1
    drawRect(p1_x, p1_y, player_largura, player_altura);
    // player 2
    drawRect(p2_x, p2_y, player_largura, player_altura);
    // barra lateral
    drawRect(largura/2 -5,0,5,altura);
    // bola
    drawRect(bola_x, bola_y, 10, 10);
    escrevrPontos();
}

//Função de desenhar o retângulo
function drawRect(x,y,largura,altura,color="#fff"){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,largura,altura);
    ctx.fillStyle = "#000";
}

//Evento para poder controlar as barras dos players
let p1_key, p2_key;
document.addEventListener("keydown",function(ev){
    //keyCode 87 = w, keyCode = 83 = s
    if(ev.keyCode == 87 || ev.keyCode == 83){
        p1_key = ev.keyCode;
    }
    //keyCode 38 == arrowUp, keycode 40 == arrowDown
    else if(ev.keyCode == 38 || ev.keyCode == 40){
        p2_key = ev.keyCode;
    }
})

//Escrever os pontos na tela
function escrevrPontos(){
    ctx.font = "50px monospace";
    ctx.fillStyle = "#fff";
    // largura/4 = 1/4 da tela = metade da tela do player 1
    ctx.fillText(p1_pontos, largura/4, 50);
    // 3*(largura/4) = 3/4 da tela = metade da tela do player 2
    ctx.fillText(p2_pontos, 3*(largura/4), 50);
}

setup()
