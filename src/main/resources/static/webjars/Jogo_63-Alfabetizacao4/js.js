var urlGlobal = window.location.search.substring(1);
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("%26");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("%3D");
        if(pair[0] == variable) {return pair[1];}
    }
    return(false);
}
$(document).ready(function() {

    var finalizado = 0;
    var numObjtos = 4; //quantidade de figuras
    var numTotal = 4;
    var numAnimais = 4;

    function rand(num_minimo,num_maximo) {
        return Math.floor((Math.random() * (num_maximo-num_minimo+1))+num_minimo);
    }

    // aqui estou pegando os valores passados na url de cada jogo
    var tipodeDica = getQueryVariable("DicaPiscaOuSeta");                                  //"Seta" ou "Pisca"
    var DicaTempoSouN = getQueryVariable("campoEscondidoDicaTempo");                       //true ou false
    var tempodeDica = parseInt(getQueryVariable("campoEscondidoTempodeDica"))*1000;        //numero
    var DicaCaminhoSouN = getQueryVariable("campoEscondidoDicaCaminho");                   //true ou false
    var comemoracao = getQueryVariable("campoEscondidoComemoracao");                    //retorna 0-sem comemoração, 1-parabens animado, 2-parabens parado
    var tipoSom = getQueryVariable("campoEscondidoSom");                                 //retorna 0-sem som, 1- palmas
    var musicaFundo = getQueryVariable("campoEscondidoMusicaFundo");                     // retorn 0-sem musica


    var animalID;
    var animal;

    animalID = rand(1, numAnimais);
    //console.log("Animal ID: "+ animalID);


    //sintaxe:
    //  [ID][0-imagem, 1-Xinicial, 2-Yinicial, 3-larguraX, 4-larguraY,
    //   5-state, 6-tipoDica, 7-tempoDica, 8-interval, 9-target]
    vet = new Array(
        new Array($("#FOCAP"), 30, 48, 300, 120, 0, tipodeDica, tempodeDica, 0, $("#targetNULL")),
        new Array($("#GATOP"), 30, 216, 300, 120, 0, tipodeDica, tempodeDica, 0, $("#targetNULL")),
        new Array($("#PATOP"), 30, 384, 300, 120, 0, tipodeDica, tempodeDica, 0, $("#targetNULL")),
        new Array($("#SAPOP"), 30, 552, 300, 120, 0, tipodeDica, tempodeDica, 0, $("#targetNULL"))
    );

    if(animalID == 1){
        animal = "PATO";
        vet[2][9] = $("#caixaTexto");
    }
    else if (animalID == 2){
        animal = "GATO";
        vet[1][9] = $("#caixaTexto");
    }
    else if (animalID == 3){
        animal = "FOCA";
        vet[0][9] = $("#caixaTexto");
    }
    else if (animalID == 4){
        animal = "SAPO";
        vet[3][9] = $("#caixaTexto");
    }


    //Criação de Variáveis
    var quantDicasUsadas = 0;
    var cliqueCerto = 0;
    var mouseDrag = "";
    var mouseClique = "";
    var cliqueErrado = 0;
    var posErrado = "";

    var fundo = $("#caixaTexto");

    var parabens = $("#parabens"); //Variável para acessar o parabéns

    var dica = $("#dica"); // Variável para acessar a dica

    //var hora_inicio = ((new Date().getHours()<10)?("0"+new Date().getHours()): new Date().getHours())+ ":" + ((new Date().getMinutes()<10)?("0"+new Date().getMinutes()): new Date().getMinutes()) + ":" + ((new Date().getSeconds()<10)?("0"+new Date().getSeconds()): new Date().getSeconds());

    var dia, mes, ano, hora, min, seg;
    dia = new Date().getDate();
    mes = new Date().getMonth();
    ano = new Date().getFullYear();
    hora = new Date().getHours();
    min = new Date().getMinutes();
    seg = new Date().getSeconds();
    var hora_inicio = (( ano <10)?"0"+ ano : ano ) + "-" + (( (mes+1) <10)?"0"+ (mes+1) : (mes+1)) + "-" + (( dia <10)?"0"+ dia : dia ) + "T" + (( hora <10)?"0"+ hora : hora ) + ":" + (( min <10)?"0"+ min : min ) + ":" + (( seg <10)?"0"+ seg : seg ) + "Z";

    //var hora_inicio = new Date().getDate() + "/" + (new Date().getMonth()+1) + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();

    var tempo = 0;      // Variável que armazena o tempo de execução da atividade
    var tempoInterval;  // Interval que altera o valor da variável tempo a cada segundo

    var dicaInterval;   // Interval que anima a dica
    var dicaTimeout;    // Timeout para aparecer a dica

    var mouseInterval;
    var mousePos = "";

    var mousex; // Variáveis que guardarão as posições
    var mousey; // do mouse a cada movimento

    //Essa função retorna a quando o mouse é pressionado
    $("#budy").mousedown(function(){
        cliqueErrado++;
        posErrado += mousex+","+mousey+";";
        ////console.log("Pressionado.");
        //var posPress;

    });

    $("#budy").mousemove(function(event) {  // Atualiza mousex
        mousex = event.pageX;             // e mousey toda vez
        mousey = event.pageY;             // que o mouse se movimenta
        ////console.log("baseSize: ",baseSize,"\nCP:",CP,"\n(",mousex,",",mousey,")", "\nValid:","\n(",validXPosition(vet[0][3]),",",validYPosition(vet[0][3]),")");
    });


    //FadeIn e FadeOut das imagens
    $("#dicaPisca1").fadeOut(0);
    $("#dicaPisca2").fadeOut(0);
    $("#dicaPisca3").fadeOut(0);
    var i;

    $(".animal").fadeOut(0);
    $(".caixa").fadeOut(0);
    $(".palavra").fadeOut(0);

    //dar fadeout nas estrelas
    for(i=1; i<=12;i++){
        $("#estrela"+i).fadeOut(0);
    }

    //dar fadeout nas fogos
    for(i=1; i<=8;i++){
        $("#fogos"+i).fadeOut(0);
    }

    fundo.fadeOut(0);
    parabens.fadeOut(0);    // Some com o parabéns
    dica.fadeOut(0);        // Some com a dica
    var k;
    $(".palavra").fadeIn(1000);
    fundo.fadeIn(2000);

    //Definindo sons
    var sound = null;    // Cria um novo elemento de som no documento
    if(tipoSom == 1){   //palmas
        sound = new AudioController(  '/audio/audio.mp3');         // Seta o source do elemento de som para o arquivo audio
    }
    else if(tipoSom == 2){  //plimplimplim
        sound = new AudioController(  '/audio/plim.mp3');
    }
    else if(tipoSom == 3){
        sound = new AudioController(  '/audio/somfogos.mp3');
    }

    var somanimal = null
    var palavraanimal = null
    if(animalID == 1){
        somanimal= new AudioController( '/audio/MP3/SomAnimais/SOMPATO.mp3');
        palavraanimal= new AudioController( '/audio/MP3/Animais(Palavras)/Pato.mp3');
    }
    else if (animalID == 2){
        somanimal= new AudioController( '/audio/MP3/SomAnimais/SOMGATO.mp3');
        palavraanimal= new AudioController( '/audio/MP3/Animais(Palavras)/Gato.mp3');
    }
    else if (animalID == 3){
        somanimal= new AudioController( '/audio/MP3/SomAnimais/SOMFOCA.mp3');
        palavraanimal= new AudioController( '/audio/MP3/Animais(Palavras)/Foca.mp3');
    }
    else if (animalID == 4){
        somanimal= new AudioController( '/audio/MP3/SomAnimais/SOMSAPO.mp3');
        palavraanimal= new AudioController( '/audio/MP3/Animais(Palavras)/Sapo.mp3');
    }

    var dicasonora = null
    dicasonora= new AudioController( '/audio/MP3/Dicas/EscrevaAPalavra.mp3');

    var checkquadrado = 0;


    //Definindo funções de tempo

    tempoInterval = setInterval(function() {    // Função que inicia o tempoInterval
        tempo++;                                // com a função de incrementar
        if(tempo == 5 && checkquadrado == 0){
            dicasonora.play();                    //Arrumar o som duplicado!
        }
        if(tempo == 9 && checkquadrado == 0){
            palavraanimal.play();                    //Arrumar o som duplicado!
        }
    }, 1000);
    // a variável tempo a cada segundo
    mouseInterval = setInterval(function() {
        if(mousex!=null)
            mousePos += mousex + "," + mousey + ";";
    }, 100);                    //mousePos += "[" + mousex + "," + mousey + "];";
    //}, 500);
    var cd = false;
    fundo.click(function() {
        //fundo.fadeOut(100);
        //fundo = $("#caixaTexto");
        //fundo.fadeIn(600);
        if(!cd && tempo >= 20){
            checkquadrado = 1;
            palavraanimal.play();
            cd = true;
            setTimeout(function(){
                cd = false;
            }, 25000);    
        }
    });

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
                //Variáveis novas que devem ser copiadas para os novos jogos
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                //
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 100), (vet[i][9].offset().top + 60))
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
				vet[i][9].css({opacity: 0.1});
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
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 100), (vet[i][9].offset().top + 60))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=1;
            mouseDrag += mousex+","+mousey+");";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
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
                vet[1][0].css({zIndex: 0});
                vet[0][0].css({zIndex: 0});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 100), (vet[i][9].offset().top + 60))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=2;
            mouseDrag += mousex+","+mousey+");";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
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

    //imagem 4
    vet[3][0].draggable({
        start: function() {
            i=3;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                vet[i][0].css({zIndex: 1});
                vet[1][0].css({zIndex: 0});
                vet[0][0].css({zIndex: 0});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 100), (vet[i][9].offset().top + 60))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=3;
            mouseDrag += mousex+","+mousey+");";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
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
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                vet[1][0].css({zIndex: 0});
                vet[2][0].css({zIndex: 0});
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 100), (vet[i][9].offset().top + 60))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }

    });

    //imagem 2
    vet[1][0].click(function() {
        i = 1;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                vet[0][0].css({zIndex: 0});
                vet[2][0].css({zIndex: 0});
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 100), (vet[i][9].offset().top + 60))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
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
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 100), (vet[i][9].offset().top + 60))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

    //imagem 4
    vet[3][0].click(function() {
        i = 3;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                vet[0][0].css({zIndex: 0});
                vet[1][0].css({zIndex: 0});
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 100), (vet[i][9].offset().top + 60))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        $("#dicaPisca1").css({left: vet[i][9].offset().left, top: vet[i][9].offset().top});
        $("#dicaPisca2").css({left: vet[i][9].offset().left, top: vet[i][9].offset().top});
        $("#dicaPisca3").css({left: vet[i][9].offset().left, top: vet[i][9].offset().top});

        if(vet[i][9].offset().top < 120)
        {
            $("#dicaPisca1").fadeIn(500);
            $("#dicaPisca1").fadeOut(500);
        }
        if(vet[i][9].offset().top > 130 && vet[i][9].offset().top < 450)
        {
            $("#dicaPisca2").fadeIn(500);
            $("#dicaPisca2").fadeOut(500);
        }
        if(vet[i][9].offset().top > 450)
        {
            $("#dicaPisca3").fadeIn(500);
            $("#dicaPisca3").fadeOut(500);
        }

        //vet[i][0].css({left: vet[i][9].offset().left, top: vet[i][9].offset().top});
        //vet[i][9].fadeIn(500);
        //vet[i][9].fadeOut(500);
        //vet[i][0].animate({opacity: '0.1'}, "slow");
        //vet[i][0].animate({opacity: '1.0'}, "slow");
    }

    function mostraDica(i, td, x, y){
        //rd = rand(1,2)
        if(td == "Seta"){
            dica.css({left: x, top: y, zIndex: 2});
            dica.fadeIn(500);
            dicaInterval = setInterval(animaDica, 1810);
        }else{
            //vet[i][0].css({left: x, top: y, zIndex: 2});
            //mostraDicaPisca(i);
            dicaInterval = setInterval( function() {mostraDicaPisca(i);}, 1810);
        }
        quantDicasUsadas++;
    }

    function animaDica() {
        dica.animate({left: (dica.offset().left)}); 
        dica.animate({left: (dica.offset().left - 30)});
        dica.animate({left: (dica.offset().left)});
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


    var delay = ( function() {
        var timer = 0;
        return function(callback, ms) {
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
        };
    })();

    function endgame() {
        if (vet[0][5] == 2 || vet[1][5] == 2 || vet[2][5] == 2 || vet[3][5] == 2) {
            $("#caixa").fadeOut(300);
            $("#caixaTexto").fadeOut(300);
            $(".palavra").fadeOut(300);
            fundo = $("#"+animal);
            fundo.fadeIn(600);
            somanimal.play();    //condicional extra
            checkquadrado = 1;
        }
        delay(function(){
            //console.log("esperando"); // do stuff
            if (vet[0][5] == 2 || vet[1][5] == 2 || vet[2][5] == 2 || vet[3][5] == 2) {           // Se as três imagens já estiverem nos alvos, dipara

                finalizado = 1;

                for(i=0; i<numTotal; i++){
                    vet[i][0].fadeOut(200);
                    vet[i][9].fadeOut(200);
                }

                $(".linha").fadeOut(200);

                fundo.fadeOut(200);
                removeDica();

                //substituir daqui
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

                console.log(new Date())
                //até aqui

                //console.log('dicas: '+quantDicasUsadas);
                ajaxSave();
                //salvaDados();
            }
        }, 1500 );
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

        var requisicaoDaqui = "RESULTADO";
        var idAtividade = 3;    //alterar esse id para o número do jogo
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
