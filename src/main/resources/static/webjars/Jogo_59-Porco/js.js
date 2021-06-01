var urlGlobal = window.location.search.substring(1);
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("%26");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("%3D");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
$(document).ready(function() {
    var finalizado = 0;
   function rand(num_minimo,num_maximo) {
    return Math.floor((Math.random() * (num_maximo-num_minimo+1))+num_minimo);
}

    // aqui estou pegando os valores passados na url de cada jogo
    var tipodeDica = getQueryVariable("DicaPiscaOuSeta");
    var DicaTempoSouN = getQueryVariable("campoEscondidoDicaTempo");
    var tempodeDica = parseInt(getQueryVariable("campoEscondidoTempodeDica"))*1000;
    var DicaCaminhoSouN = getQueryVariable("campoEscondidoDicaCaminho");
    var comemoracao = getQueryVariable("campoEscondidoComemoracao");
    var tipoSom = getQueryVariable("campoEscondidoSom");
    var musicaFundo = getQueryVariable("campoEscondidoMusicaFundo");

//sintaxe:
//  [ID][0-imagem, 1-Xinicial, 2-Yinicial, 3-larguraX, 4-larguraY,
    //   5-state, 6-tipoDica, 7-tempoDica, 8-interval, 9-target]
    vet = new Array(
        new Array($("#img1"), 90, 257, 52, 207, 0, tipodeDica, tempodeDica, 0, $("#target1")),
        new Array($("#img2"), 30, 257, 52, 207, 0, tipodeDica, tempodeDica, 0, $("#target2")),
        new Array($("#img3"), 210, 257, 52, 207, 0, tipodeDica, tempodeDica, 0, $("#target3")),
        new Array($("#img4"), 150, 257, 52, 207, 0, tipodeDica, tempodeDica, 0, $("#target4")),
        new Array($("#img5"), 270, 257, 52, 207, 0, tipodeDica, tempodeDica, 0, $("#target5"))
    );
    
    var numObjtos = 5; //quantidade de figuras
   // var CP=1;     //
    
//Criação de Variáveis
    //Essas variáveis  devem ser adicionadas
    var quantDicasUsadas = 0;
    var cliqueCerto = 0;
    var mouseDrag = "";
    var mouseClique = "";
    var cliqueErrado = 0;
    var posErrado = "";

    //var fish = $("#fish");
    var fundo = $("#fundo");
    var parabens = $("#parabens"); //Variável para acessar o parabéns

    var dica = $("#dica"); // Variável para acessar a dica
    //var hora_inicio = ((new Date().getHours()<10)?("0"+new Date().getHours()): new Date().getHours())+ ":" + ((new Date().getMinutes()<10)?("0"+new Date().getMinutes()): new Date().getMinutes()) + ":" + ((new Date().getSeconds()<10)?("0"+new Date().getSeconds()): new Date().getSeconds());
    //var hora_inicio = new Date().getDate() + "/" + (new Date().getMonth()+1) + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();

    var dia, mes, ano, hora, min, seg;
    dia = new Date().getDate();
    mes = new Date().getMonth();
    ano = new Date().getFullYear();
    hora = new Date().getHours();
    min = new Date().getMinutes();
    seg = new Date().getSeconds();
    var hora_inicio = (( ano <10)?"0"+ ano : ano ) + "-" + (( (mes+1) <10)?"0"+ (mes+1) : (mes+1)) + "-" + (( dia <10)?"0"+ dia : dia ) + "T" + (( hora <10)?"0"+ hora : hora ) + ":" + (( min <10)?"0"+ min : min ) + ":" + (( seg <10)?"0"+ seg : seg ) + "Z";

    var tempo = 0;      // Variável que armazena o tempo de execução da atividade
    var tempoInterval;  // Interval que altera o valor da variável tempo a cada segundo

    var dicaInterval;   // Interval que anima a dica
    var dicaTimeout;    // Timeout para aparecer a dica

    var mouseInterval;
    var mousePos = "";

    var mousex; // Variáveis que guardarão as posições
    var mousey; // do mouse a cada movimento

    //var target1Ocupado = false;  // Para testar se existe uma imagem no local que está querendo colocar
    //var target2Ocupado = false;
    //var target3Ocupado = false;

      //Essa função retorna a quando o mouse é pressionado
    //*Deve ser copiada para os outros jogos
    $("#budy").mousedown(function(){
        cliqueErrado++;
        posErrado += mousex+","+mousey+";";
        ////console.log("Pressionado.");
        //var posPress;
        
    });

    //*essa função provavelmente está em outra linha nos outros jogos. Seria interessante colocar ela mais para cima.
    $("#budy").mousemove(function(event) {  // Atualiza mousex
        mousex = event.pageX;             // e mousey toda vez
        mousey = event.pageY;             // que o mouse se movimenta
        ////console.log("baseSize: ",baseSize,"\nCP:",CP,"\n(",mousex,",",mousey,")", "\nValid:","\n(",validXPosition(vet[0][3]),",",validYPosition(vet[0][3]),")");
    });  
    
//FadeIn e FadeOut das imagens
    $("#dicaPisca0").css({opacity: '0.0'});
    $("#dicaPisca1").css({opacity: '0.0'});
    $("#dicaPisca2").css({opacity: '0.0'});
    $("#dicaPisca3").css({opacity: '0.0'});
    $("#dicaPisca4").css({opacity: '0.0'});

    //dar fadeout nas estrelas
    for(i=1; i<=12;i++){
        $("#estrela"+i).fadeOut(0);
    }
    
    //dar fadeout nas fogos
    for(i=1; i<=8;i++){
        $("#fogos"+i).fadeOut(0);
    }
    
    var i;
    for(i=0; i<numObjtos; i++){
        vet[i][0].fadeOut(0);
    }
    fundo.fadeOut(0);
    parabens.fadeOut(0);    // Some com o parabéns
    dica.fadeOut(0);        // Some com a dica
    //fish.fadeOut(0);
    
    
    var k = 500;
    for(i = 0; i<numObjtos; i++) {
         vet[i][0].fadeIn(k);        // Traz as imagens com fadeIn(x) em x ms
      k += 500; }
    fundo.fadeIn(2000);

//Definindo funções
    var sound = null;    // Cria um novo elemento de som no documento. esse audio é o tipo
    if(tipoSom == 1){   //palmas
        sound = new AudioController(  '/audio/audio.mp3');         // Seta o source do elemento de som para o arquivo audio.mp3
    }
    else if(tipoSom == 2){  //plimplimplim
        sound = new AudioController(  '/audio/plim.mp3');
    }
    else if(tipoSom == 3){
        sound = new AudioController(  '/audio/somfogos.mp3');
    }

    tempoInterval = setInterval(function() {    // Função que inicia o tempoInterval
        tempo++;                                // com a função de incrementar
    }, 1000);
                                        // a variável tempo a cada segundo
    mouseInterval = setInterval(function() {
        if(mousex!=null)
            mousePos += mousex + "," + mousey + ";";
    }, 100);                    //mousePos += "[" + mousex + "," + mousey + "];";
                                //}, 500);


// Essas são as funções que vão tratar
// do DRAG AND DROP das imagens

//  [ID][0-imagem, 1-Xinicial, 2-Yinicial, 3-larguraX, 4-larguraY,
//      5-state, 6-tipoDica, 7-tempoDica, 8-interval, 9-target]

//imagem 1
    vet[0][0].draggable({
        start: function() {
            i=0;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                vet[i][0].css({zIndex: 1});
                vet[1][0].css({zIndex: 0});
                vet[2][0].css({zIndex: 0});
                vet[3][0].css({zIndex: 0});
                vet[4][0].css({zIndex: 0});
                //Variáveis novas que devem ser copiadas para os novos jogos
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                //
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 15), (vet[i][9].offset().top - 100))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=0;
            //Variáveis novas que devem ser copiadas para os novos jogos
            mouseDrag += mousex+","+mousey+")";
            //
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
					vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                vet[i][5] = 2;
                vet[i][0].draggable('disable');
                //Variáveis novas que devem ser copiadas para os novos jogos
                cliqueCerto++;
                //
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 2
    vet[1][0].draggable({
        start: function() {
            i=1;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                vet[i][0].css({zIndex: 1});
                vet[0][0].css({zIndex: 0});
                vet[2][0].css({zIndex: 0});
                vet[3][0].css({zIndex: 0});
                vet[4][0].css({zIndex: 0});
                                
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                 dicaTimeout = setTimeout(function() {
                    if(vet[i-1][5] == 2){   //indice da imagem 2
                        mostraDica(i, vet[i][6], (vet[i][9].offset().left - 15), (vet[i][9].offset().top - 100))
                    }
                   /* else{   //preciso dar a dica na imagem 1
                        mostraDica(i, vet[i-1][6], (vet[i-1][1] - 100), (vet[i-1][2] + 60));
                    }*/
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=1;
            mouseDrag += mousex+","+mousey+");";
            if (vet[i-1][5] == 2 && mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
					vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                vet[i][5] = 2;
                vet[i][0].draggable('disable');
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 3
    vet[2][0].draggable({
        start: function() {
            i=2;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                vet[i][0].css({zIndex: 1});
                vet[0][0].css({zIndex: 0});
                vet[1][0].css({zIndex: 0});
                vet[3][0].css({zIndex: 0});
                vet[4][0].css({zIndex: 0});
                //Variáveis novas que devem ser copiadas para os novos jogos
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                //
                dicaTimeout = setTimeout(function() {
                    if(vet[1][5] == 2){   //indice da imagem 2
                        mostraDica(i, vet[i][6], (vet[i][9].offset().left - 15), (vet[i][9].offset().top - 100))
                    }
                    /*else{   //preciso dar a dica na imagem 1
                        mostraDica(i, vet[i-1][6], (vet[i-1][1] - 100), (vet[i-1][2] + 60));
                    }*/
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=2;
            //Variáveis novas que devem ser copiadas para os novos jogos
            mouseDrag += mousex+","+mousey+")";
                //
            if (vet[i-1][5] == 2 && mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
					vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                vet[i][5] = 2;
                vet[i][0].draggable('disable');
                //Variáveis novas que devem ser copiadas para os novos jogos
                cliqueCerto++;
                //
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 4
    vet[3][0].draggable({
        start: function() {
            i=3;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                vet[i][0].css({zIndex: 1});
                vet[0][0].css({zIndex: 0});
                vet[1][0].css({zIndex: 0});
                vet[2][0].css({zIndex: 0});
                vet[4][0].css({zIndex: 0});
                //Variáveis novas que devem ser copiadas para os novos jogos
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                //
                 dicaTimeout = setTimeout(function() {
                    if(vet[2][5] == 2){   //indice da imagem 3
                        mostraDica(i, vet[i][6],  (vet[i][9].offset().left - 15), (vet[i][9].offset().top - 100))
                    }
                   /* else{   //preciso dar a dica na imagem 1
                        mostraDica(i, vet[i][6], (vet[i][1] - 100), (vet[i][2] + 60));
                    }*/
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=3;
            //Variáveis novas que devem ser copiadas para os novos jogos
            mouseDrag += mousex+","+mousey+")";
                //
            if (vet[i-1][5] == 2 && mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
					vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                vet[i][5] = 2;
                vet[i][0].draggable('disable');
                //Variáveis novas que devem ser copiadas para os novos jogos
                cliqueCerto++;
                //
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 5
    vet[4][0].draggable({
        start: function() {
            i=4;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                vet[i][0].css({zIndex: 1});
                vet[0][0].css({zIndex: 0});
                vet[1][0].css({zIndex: 0});
                vet[2][0].css({zIndex: 0});
                vet[3][0].css({zIndex: 0});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                dicaTimeout = setTimeout(function() {
                    if(vet[3][5] == 2){   //indice da imagem 4
                        mostraDica(i, vet[i][6],  (vet[i][9].offset().left - 15), (vet[i][9].offset().top - 100))
                    }
                    /*else{   //preciso dar a dica na imagem 1
                        mostraDica(i, vet[i-1][6], (vet[i-1][1] - 100), (vet[i-1][2] + 60));
                    }*/
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=4;
            mouseDrag += mousex+","+mousey+");";
            if (vet[i-1][5] == 2 && mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
					vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                vet[i][5] = 2;
                vet[i][0].draggable('disable');
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });


// Essas são as funções que tratam
// da ADERÊNCIA da imagem ao mouse no click
//  [ID][0-imagem, 1-Xinicial, 2-Yinicial, 3-larguraX, 4-larguraY,
    //   5-state, 6-tipoDica, 7-tempoDica, 8-interval, 9-target]
//imagem 1
    vet[0][0].click(function() {
        i = 0;
        if (vet[i][5] == 0){
                //
                cliqueCerto++;
                mouseClique += "("+mousex+","+mousey+";";
                //
                $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                vet[1][0].css({zIndex: 0});
                vet[2][0].css({zIndex: 0});
                vet[3][0].css({zIndex: 0});
                vet[4][0].css({zIndex: 0});
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6],  (vet[i][9].offset().left - 15), (vet[i][9].offset().top - 100))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].draggable('enable');
                                //
                mouseClique += mousex+","+mousey+");";
                //
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
					vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
				clearInterval(vet[i][8]);
				vet[i][0].draggable('disable');
                removeDica();
                //
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                //
                endgame();
            }
        }
    });

//imagem 2
    vet[1][0].click(function() {
        i = 1;
        if (vet[i][5] == 0){
            //
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            //
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                vet[0][0].css({zIndex: 0});
                vet[2][0].css({zIndex: 0});
                vet[3][0].css({zIndex: 0});
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                if(vet[0][5]==2){
                    mostraDica(i, vet[i][6],  (vet[i][9].offset().left - 15), (vet[i][9].offset().top - 100))
                }
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].draggable('enable');
                //
                mouseClique += mousex+","+mousey+");";
                //
                removeDica();
            } else if (vet[0][5] == 2 && mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
					vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
				clearInterval(vet[i][8]);
				vet[i][0].draggable('disable');
                removeDica();
                //
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                //
                endgame();
            }
        }
    });

//imagem 3
    vet[2][0].click(function() {
        i = 2;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                vet[0][0].css({zIndex: 0});
                vet[1][0].css({zIndex: 0});
                vet[3][0].css({zIndex: 0});
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                if(vet[1][5]==2){
                    mostraDica(i, vet[i][6],  (vet[i][9].offset().left - 15), (vet[i][9].offset().top - 100))
                }
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].draggable('enable');
                //
                mouseClique += mousex+","+mousey+");";
                //
                removeDica();
            } else if (vet[1][5] == 2 && mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
					vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
				clearInterval(vet[i][8]);
				vet[i][0].draggable('disable');
                removeDica();
                //
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                //
                endgame();
            }
        }
    });
    
//imagem 4
    vet[3][0].click(function() {
        i = 3;
        if (vet[i][5] == 0){
            //
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            //
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                vet[0][0].css({zIndex: 0});
                vet[1][0].css({zIndex: 0});
                vet[2][0].css({zIndex: 0});
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                if(vet[2][5]==2){
                    mostraDica(i, vet[i][6],  (vet[i][9].offset().left - 15), (vet[i][9].offset().top - 100))
                }
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].draggable('enable');
                                //
                mouseClique += mousex+","+mousey+");";
                //
                removeDica();
            } else if (vet[2][5] == 2 && mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
					vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
				clearInterval(vet[i][8]);
				vet[i][0].draggable('disable');
                removeDica();
                                //
                mouseClique += mousex+","+mousey+");";
                //
                endgame();
            }
        }
    });
//imagem 5
    vet[4][0].click(function() {
        i = 4;
        if (vet[i][5] == 0){
                        //
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            //
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                vet[0][0].css({zIndex: 0});
                vet[1][0].css({zIndex: 0});
                vet[2][0].css({zIndex: 0});
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                if(vet[3][5]==2){
                    mostraDica(i, vet[i][6],  (vet[i][9].offset().left - 15), (vet[i][9].offset().top - 100))
                }
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].draggable('enable');
                                //
                mouseClique += mousex+","+mousey+");";
                //
                removeDica();
            } else if (vet[2][5] == 2 && mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
					vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
				clearInterval(vet[i][8]);
				vet[i][0].draggable('disable');
                removeDica();
                //
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                //
                endgame();
            }
        }
    });


    function validXPosition(x) {               // Função que               //etro x
        var primaryPosition = mousex - (x/2);   // retorna                  //é a largura da imagem
        if (primaryPosition < 0)                // uma posição              //necessária para que
            return 0;                       // válida em                    //posição do mouse
        else if (primaryPosition > (820 + $("#container").offset().left-(x/2)))     // X, dentro                    //fique no meio
            return (820 + $("#container").offset().left-(x/2));                     // dos limites da               //imagem clicada
        return primaryPosition;             // área da atividade
    }

    function validYPosition(y) {                // Função que
        var primaryPosition = mousey - (y/2);   // retorna
        if (primaryPosition < 0)                // uma posição
            return 0;                       // válida em
        else if (primaryPosition > (720 + $("#container").offset().top-(y/2)))     // Y, dentro
            return (720 + $("#container").offset().top-(y/2));                     // dos limites da
        return primaryPosition;             // área da atividade
    }


    function mostraDicaPisca(i){
        var auxi = i+1;
        if(i>1){
            if(vet[i-1][5] == 2){
                console.log("entra aqui 1, i ",i)
                /*vet[i][9].animate({opacity: '0.1'}, "slow");
                vet[i][9].animate({opacity: '1.0'}, "slow");*/
                $('#dicaPisca'+i).animate({opacity: '1.0'}, "slow");
                $('#dicaPisca'+i).animate({opacity: '0.0'}, "slow");
            }
            else{    
                console.log("entra aqui 2, i ",i)
                vet[i-1][0].animate({opacity: '0.1'}, "slow");
                vet[i-1][0].animate({opacity: '1.0'}, "slow");
            }
        }else{
            //console.log("entra aqui 3, i ",i);
            /*vet[i][9].animate({opacity: '0.1'}, "slow");
            vet[i][9].animate({opacity: '1.0'}, "slow");*/
            $('#dicaPisca'+i).animate({opacity: '1.0'}, "slow");
            $('#dicaPisca'+i).animate({opacity: '0.0'}, "slow");
        }
    }

    function mostraDica(i, td, x, y){
        //rd = rand(1,2)
        if(td == "Seta"){
            dica.css({left: x, top: y, zIndex: 2});
            dica.fadeIn(500);
            dicaInterval = setInterval(animaDica, 1810);
        }
        else{ //dica pisca
            dicaInterval = setInterval( function() {mostraDicaPisca(i);}, 1810);
        }
        quantDicasUsadas++;
    }

    function animaDica() {
        dica.animate({top: (dica.offset().top)}); 
        dica.animate({top: (dica.offset().top - 30)});
        dica.animate({top: (dica.offset().top)});
        //dica.animate({width: 'toggle'}, 500);
    }

    function removeDica() {
        clearInterval(dicaInterval);
        clearTimeout(dicaTimeout);
        dica.fadeOut(200);
    }

    function animateParabens() {
        parabens.animate({top: 180}, 200);  // Essa
        parabens.animate({top: 280}, 200);  // função
        parabens.animate({top: 200}, 200);  // anima
        parabens.animate({top: 260}, 200);  // o parabéns
        parabens.animate({top: 240}, 200);  // com
        parabens.animate({top: 260}, 200);  // pulinhos
    }

        function animaEstrela(){
        i=1;
        var parabensInterval = setInterval(function(){
            $('#estrela'+i).fadeIn(590); 
            i++;
        }, 600);
        setTimeout(function() {
            clearInterval(parabensInterval);
        }, 7200);
    }
    
    function estrelaMusical(){
        i=1;
        var parabensInterval = setInterval(function(){
            if(i == 2 || i == 6 || i == 10){
                sound.play();
            }
            $('#estrela'+i).fadeIn(590);
            i++;
        }, 600);
        setTimeout(function() {
            clearInterval(parabensInterval);
        }, 7200);
    }
    
    function animaFogos(){
        var i=1;
        var parabensInterval = setInterval(function(){
            if(i>1){
                $('#fogos'+(i-1)).fadeOut(100);
            }
            $('#fogos'+i).fadeIn(610); 
            i++;
        }, 600);
        setTimeout(function() {
            clearInterval(parabensInterval);
        }, 7200);
    }

    function endgame() {
        if (vet[0][5] == 2 && vet[1][5] == 2 && vet[2][5] == 2 && vet[3][5] == 2 && vet[4][5] == 2) {           // Se as três imagens já estiverem nos alvos, dipara
            finalizado = 1;
            for(i=0; i<numObjtos; i++){
                vet[i][0].fadeOut(200);
                vet[i][9].fadeOut(200);
            }

            fundo.fadeOut(200);
            //fish.fadeIn(200);
            //fish.animate({left: 0}, 500);
            //fish.fadeOut(700);

            if(tipoSom == 0){
                //sem som
            }
            else if (tipoSom == 1){
                sound.play();       // Toca o som das palmas
            }
            else if ((tipoSom == 2||tipoSom == 3) && comemoracao != 3){
                i = 0;
                var parabensInterval = setInterval(function(){
                    sound.play();
                }, 500);
                setTimeout(function() {
                    clearInterval(parabensInterval);
                }, 7200);
            }
            if(comemoracao == 0){
                //sem comemoração
            }
             //parabens animado
            else if(comemoracao == 1){
                parabens.fadeIn(500);                               // Trás à tona o parabéns com fadeIn
                animateParabens();                                  // Anima o parabéns uma vez
                var parabensInterval = setInterval(function() {     // Cria um interval para
                    animateParabens();                              // animar o parabéns a cada 1200ms
                }, 1200);                                           // NOTA: 1200ms não é aleatório, é o tamanho do ciclo da animação
                setTimeout(function() {                             // Cria um timeout para limpar
                    clearInterval(parabensInterval);                // o parabensInterval depois de 7200ms
                }, 7200);                                           // (6 ciclos), se não ele ia quicar para sempre
            }
            //parabens parado
            else if(comemoracao == 2){ //parabéns parado
                parabens.fadeIn(500);
            }
            //estrela
            else if(comemoracao == 3 && tipoSom != 2){
                animaEstrela();
            }
            //fogos
            else if(comemoracao == 4){
                animaFogos();
            }
            
            //caso especial da estrela e o plim estarem ativados
            if(tipoSom == 2 && comemoracao == 3){
                estrelaMusical();
            }
            
            setTimeout(function(){
                 goBack("/Jogos/menu/?" + urlGlobal);
            },8500);
            
            ajaxSave();
            //salvaDados();
        }
    }
    
    function salvaDados(){
        var jogador;
        do{
            jogador = prompt("Qual seu Nome?");
        }while(jogador == null || jogador == "");
        var data = new Date().getFullYear() + "-" + (((new Date().getMonth()+1)<10)?("0"+(new Date().getMonth()+1)):((new Date().getMonth()+1))) + "-" + ((new Date().getDate()<10)?("0"+new Date().getDate()):(new Date().getDate()));
        var arquivo = "dados.properties"
        //var hora_fim = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
        var hora_fim = ((new Date().getHours()<10)?("0"+new Date().getHours()): new Date().getHours())+ ":" + ((new Date().getMinutes()<10)?("0"+new Date().getMinutes()): new Date().getMinutes()) + ":" + ((new Date().getSeconds()<10)?("0"+new Date().getSeconds()): new Date().getSeconds());
        var blob = new Blob(["dados.server.jogador = "+jogador+"\ndados.server.data = "+data+"\ndados.server.inicio = "+hora_inicio+"\ndados.server.termino = "+hora_fim+"\ndados.server.dicas = "+quantDicasUsadas+"\ndados.server.mousepos = "+mousePos], {type: "text/plain;charset=utf-8"});
        saveAs(blob, arquivo);
    }
    
    
    //desabilita botão direito
    function disableselect(e){   
        return false   
        }   

        function reEnable(){   
        return true   
        }   

        //if IE4+   
        document.onselectstart=new Function ("return false")   
        document.oncontextmenu=new Function ("return false")   

        //if NS6   
        if (window.sidebar){   
        document.onmousedown=disableselect   
        document.onclick=reEnable   
    }
    
    function ajaxSave() {
        dia = new Date().getDate();
        mes = new Date().getMonth();
        ano = new Date().getFullYear();
        hora = new Date().getHours();
        min = new Date().getMinutes();
        seg = new Date().getSeconds();
        
        var hora_fim = (( ano <10)?"0"+ ano : ano ) + "-" + (( (mes+1) <10)?"0"+ (mes+1) : (mes+1)) + "-" + (( dia <10)?"0"+ dia : dia ) + "T" + (( hora <10)?"0"+ hora : hora ) + ":" + (( min <10)?"0"+ min : min ) + ":" + (( seg <10)?"0"+ seg : seg ) + "Z";
        
        //console.log(hora_inicio);
        //console.log(hora_fim);
        //console.log("CliqueCerto:"+ cliqueCerto);       //pontuação da criança. quantidade de dicas usadas
        //console.log("MousePos:"+ mousePos);
        //console.log("MouseClique:"+ mouseClique);
        //console.log("MouseDrag:"+ mouseDrag);
        //console.log("PosErrado:"+ posErrado);
        //console.log("CliqueErrado:"+ cliqueErrado);
        //console.log("Dicas:"+ quantDicasUsadas);
        
        var requisicaoDaqui = "RESULTADO";
        var idAtividade = 59;    //alterar esse id para o número do jogo
        var idSessao = parseInt(getQueryVariable("campoEscondidoIDSessao"));var jsonObj = JSON.stringify({
		"idatividade": {"id": idAtividade},
		"idsessao":{"id": idSessao},
		"cliquecerto": cliqueCerto,
		"mousepos": mousePos,
		"mouseclique": mouseClique,
		"mousedrag": mouseDrag,
		"poserrado": posErrado,
		"cliqueerrado": cliqueErrado,
		"dicas": quantDicasUsadas,
		"horainicio": hora_inicio,
		"horafim": hora_fim
	});

	saveController(jsonObj, "/Jogos/Resultados", 'post');
        
    }
});