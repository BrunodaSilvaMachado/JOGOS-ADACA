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
    ////console.log(urlGlobal);
    var finalizado =0;
    var tipodeDica = "Pisca";//getQueryVariable("DicaPiscaOuSeta");                                  //Seta ou Pisca
    var DicaTempoSouN = getQueryVariable("campoEscondidoDicaTempo");                       //true ou false
    var tempodeDica = parseInt(getQueryVariable("campoEscondidoTempodeDica"))*1000;        //numero
    var DicaCaminhoSouN = getQueryVariable("campoEscondidoDicaCaminho");                   //true ou false
    var comemoracao = getQueryVariable("campoEscondidoComemoracao");                    //retorna 0-sem comemoração, 1-parabens animado, 2-parabens parado
    var tipoSom = getQueryVariable("campoEscondidoSom");                                 //retorna 0-sem som, 1- palmas
    var musicaFundo = getQueryVariable("campoEscondidoMusicaFundo");                     // retorn 0-sem musica

    
    //Função que randomiza números
       function rand(num_minimo,num_maximo) {
        return Math.floor((Math.random() * (num_maximo-num_minimo+1))+num_minimo);
   }
    
    var numObjtos = 5;     //num fixo de quantidados de objetos presentes no jogo
    var numTotal = 39;    //num de imagens/targets totais
    
    //cria variáveis
    var aux, j, jj;
    jj=0;
    
    //cria vetor que receberá um os números sorteados em cada posição
    sortido = new Array(numTotal);
    
    //preenche o vetor sortido, obrigando a ter números diferentes em cada posição.
    do{
        aux = 0;
        sort = rand(1,numTotal);
        for(j=0; j<jj; j++){
            if(sort == sortido[j])
                aux = 1;
        }
        if(aux == 0){
            sortido[jj]=sort;
            jj++;
        }
    }while(jj != numTotal);

    /*Se não for aleatório
    for(j=0; j<numTotal; j++){
        sortido[j] = j+1;
    }*/
    
    //console.log(sortido);

//sintaxe:
//  [ID][0-imagem, 1-Xinicial, 2-Yinicial, 3-larguraX, 4-larguraY,
    //   5-state, 6-tipoDica, 7-tempoDica, 8-interval, 9-target]
    
    vet = new Array(
        //as imagens iniciais são posicionadas nos locais corretos
        new Array($("#img"+sortido[0]), 50, 575, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[0])),
        new Array($("#img"+sortido[1]), 50, 450, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[1])),
        new Array($("#img"+sortido[2]), 50, 325, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[2])),
        new Array($("#img"+sortido[3]), 50, 200, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[3])),
        new Array($("#img"+sortido[4]), 50,  75, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[4])),
        //as outras imagens são posicionadas fora da tela
        new Array($("#img"+sortido[5]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[5])),
        new Array($("#img"+sortido[6]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[6])),
        new Array($("#img"+sortido[7]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[7])),
        new Array($("#img"+sortido[8]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[8])),
        new Array($("#img"+sortido[9]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[9])),
        new Array($("#img"+sortido[10]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[10])),
        new Array($("#img"+sortido[11]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[11])),
        new Array($("#img"+sortido[12]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[12])),
        new Array($("#img"+sortido[13]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[13])),
        new Array($("#img"+sortido[14]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[14])),
        new Array($("#img"+sortido[15]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[15])),
        new Array($("#img"+sortido[16]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[16])),
        new Array($("#img"+sortido[17]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[17])),
        new Array($("#img"+sortido[18]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[18])),
        new Array($("#img"+sortido[19]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[19])),
        new Array($("#img"+sortido[20]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[20])),
        new Array($("#img"+sortido[21]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[21])),
        new Array($("#img"+sortido[22]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[22])),
        new Array($("#img"+sortido[23]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[23])),
        new Array($("#img"+sortido[24]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[24])),
        new Array($("#img"+sortido[25]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[25])),
        new Array($("#img"+sortido[26]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[26])),
        new Array($("#img"+sortido[27]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[27])),
        new Array($("#img"+sortido[28]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[28])),
        new Array($("#img"+sortido[29]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[29])),
        new Array($("#img"+sortido[30]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[30])),
        new Array($("#img"+sortido[31]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[31])),
        new Array($("#img"+sortido[32]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[32])),
        new Array($("#img"+sortido[33]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[33])),
        new Array($("#img"+sortido[34]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[34])),
        new Array($("#img"+sortido[35]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[35])),
        new Array($("#img"+sortido[36]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[36])),
        new Array($("#img"+sortido[37]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[37])),
        new Array($("#img"+sortido[38]), 50, 1000, 80, 80, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[38]))    
    );
    
    
    //altera o css de acordo com o número sortido.
    //no caso do lince, ele vai reposicionando as imagens.
    function altera_indc(i){
        var j, jj, x, contador=0;
        j = i;
        
        x = 34; //numTotal - numObjtos;
        for(jj=0; jj<numTotal; jj++){        //retorna quantas imagens foram colocadas no target
            if(vet[jj][5] != 0){
                contador++;
            }
        }
        
        ////console.log(contador);
        ////console.log(j+'-vet[j][5] '+vet[j][5]);
        if(contador <=x){
            do{
                j++;
                if(vet[j][5] == 0){
                    vet[j][2] = vet[j][2] + 125;
                    vet[j][0].css({top: vet[j][2]});
                    //vet[j][0].animate({top: vet[j][2]}, 1000);
                }
            }while(vet[j][2] < 720 + $("#container").offset().top);
            vet[j][2] = 75;
            vet[j][0].css({top: 75, zIndex: 0});
        }else{
            //console.log("nada");
        }
    }
    
    //reposiciona as imagens de acordo com as posições adiquiridas
    for(i=0; i<numTotal; i++){
        vet[i][0].css({left: vet[i][1], top: vet[i][2]});
    }
   
//Criação de Variáveis
    //Essas variáveis  devem ser adicionadas
    var quantDicasUsadas = 0;
    var cliqueCerto = 0;
    var mouseDrag = "";
    var mouseClique = "";
    var cliqueErrado = 0;
    var posErrado = "";
    
    var fundo1 = $("#fundo1");
    var fundo2 = $("#fundo2");
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

    //dar fadeout nas estrelas
    for(i=1; i<=12;i++){
        $("#estrela"+i).fadeOut(0);
    }
    
    //dar fadeout nas fogos
    for(i=1; i<=8;i++){
        $("#fogos"+i).fadeOut(0);
    }
    
    parabens.fadeOut(0);    // Some com o parabéns
    dica.fadeOut(0);        // Some com a dica
    
    fundo1.fadeIn(2000);
    fundo2.fadeIn(2000);

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
    }, 100);


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
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=0;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
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
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";

                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=1;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
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
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=2;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
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
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=3;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i)
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
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
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=4;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i)
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 6
    vet[5][0].draggable({
        start: function() {
            i=5;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=5;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i)
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 7
    vet[6][0].draggable({
        start: function() {
            i=6;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=6;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i)
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });
//imagem 8
    vet[7][0].draggable({
        start: function() {
            i=7;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=7;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i)
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });
//imagem 9
    vet[8][0].draggable({
        start: function() {
            i=8;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=8;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 10
    vet[9][0].draggable({
        start: function() {
            i=9;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=9;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 11
    vet[10][0].draggable({
        start: function() {
            i=10;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=10;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 12
    vet[11][0].draggable({
        start: function() {
            i=11;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=11;
            mouseDrag += mousex+","+mousey+")";
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 13
    vet[12][0].draggable({
        start: function() {
            i=12;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=12;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 14
    vet[13][0].draggable({
        start: function() {
            i=13;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=13;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });
//imagem 15
    vet[14][0].draggable({
        start: function() {
            i=14;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=14;
            mouseDrag += mousex+","+mousey+")";
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 16
    vet[15][0].draggable({
        start: function() {
            i=15;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=15;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 17
    vet[16][0].draggable({
        start: function() {
            i=16;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=16;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 18
    vet[17][0].draggable({
        start: function() {
            i=17;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=17;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 19
    vet[18][0].draggable({
        start: function() {
            i=18;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=18;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 20
    vet[19][0].draggable({
        start: function() {
            i=19;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=19;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 21
    vet[20][0].draggable({
        start: function() {
            i=20;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=20;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 22
    vet[21][0].draggable({
        start: function() {
            i=21;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=21;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 23
    vet[22][0].draggable({
        start: function() {
            i=22;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=22;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 24
    vet[23][0].draggable({
        start: function() {
            i=23;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=23;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 25
    vet[24][0].draggable({
        start: function() {
            i=24;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=24;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 26
    vet[25][0].draggable({
        start: function() {
            i=25;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=25;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 27
    vet[26][0].draggable({
        start: function() {
            i=26;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=26;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 28
    vet[27][0].draggable({
        start: function() {
            i=27;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=27;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 29
    vet[28][0].draggable({
        start: function() {
            i=28;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=28;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 30
    vet[29][0].draggable({
        start: function() {
            i=29;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=29;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 31
    vet[30][0].draggable({
        start: function() {
            i=30;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=30;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 32
    vet[31][0].draggable({
        start: function() {
            i=31;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=31;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 33
    vet[32][0].draggable({
        start: function() {
            i=32;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=32;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 34
    vet[33][0].draggable({
        start: function() {
            i=33;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=33;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 35
    vet[34][0].draggable({
        start: function() {
            i=34;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=34;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });
//imagem 36
    vet[35][0].draggable({
        start: function() {
            i=35;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=35;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 37
    vet[36][0].draggable({
        start: function() {
            i=36;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=36;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 38
    vet[37][0].draggable({
        start: function() {
            i=37;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=37;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
            }
            removeDica();
        },
        containment: "#container", scroll: false
    });

//imagem 39
    vet[38][0].draggable({
        start: function() {
            i=38;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                cliqueCerto++;
                mouseDrag += "("+mousex+","+mousey+";";
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=38;
            mouseDrag += mousex+","+mousey+")";
            if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])){
				$("#container").append(vet[i][0]);
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].draggable('disable');
                vet[i][0].css({zIndex: 0});
                altera_indc(i);
                cliqueCerto++;
                endgame();
            }
            else 
            {
                vet[i][0].animate({left: vet[i][1], top: vet[i][2]}, 500);
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
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
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][0].css({zIndex: 0});
                vet[i][5] = 0;
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][0].css({zIndex: 0});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
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
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
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
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
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
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 5
    vet[4][0].click(function() {
        i = 4;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 6
    vet[5][0].click(function() {
        i = 5;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });
//imagem 7
    vet[6][0].click(function() {
        i = 6;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 8    
vet[7][0].click(function() {
        i = 7;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 9
    vet[8][0].click(function() {
        i = 8;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 10
    vet[9][0].click(function() {
        i = 9;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 11
    vet[10][0].click(function() {
        i = 10;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 12
    vet[11][0].click(function() {
        i = 11;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 13
    vet[12][0].click(function() {
        i = 12;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 14
    vet[13][0].click(function() {
        i = 13;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 15
    vet[14][0].click(function() {
        i = 14;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 16
    vet[15][0].click(function() {
        i = 15;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 17
    vet[16][0].click(function() {
        i = 16;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 18
    vet[17][0].click(function() {
        i = 17;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 19
    vet[18][0].click(function() {
        i = 18;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 20
    vet[19][0].click(function() {
        i = 19;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 21
    vet[20][0].click(function() {
        i = 20;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 22
    vet[21][0].click(function() {
        i = 21;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 23
    vet[22][0].click(function() {
        i = 22;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 24
    vet[23][0].click(function() {
        i = 23;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 25
    vet[24][0].click(function() {
        i = 24;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 26
    vet[25][0].click(function() {
        i = 25;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });
//imagem 27
    vet[26][0].click(function() {
        i = 26;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });
//imagem 28
    vet[27][0].click(function() {
        i = 27;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 29
    vet[28][0].click(function() {
        i = 28;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 30
    vet[29][0].click(function() {
        i = 29;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 31
    vet[30][0].click(function() {
        i = 30;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 32
    vet[31][0].click(function() {
        i = 31;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });
//imagem 33
    vet[32][0].click(function() {
        i = 32;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 34
    vet[33][0].click(function() {
        i = 33;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 35
    vet[34][0].click(function() {
        i = 34;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 36
    vet[35][0].click(function() {
        i = 35;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 37
    vet[36][0].click(function() {
        i = 36;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 38
    vet[37][0].click(function() {
        i = 37;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
                endgame();
            }
        }
    });

//imagem 39
    vet[38][0].click(function() {
        i = 38;
        if (vet[i][5] == 0){
            cliqueCerto++;
            mouseClique += "("+mousex+","+mousey+";";
            $("body").append(vet[i][0]);
				vet[i][8] = setInterval(function() {
				vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 80), (vet[i][9].offset().top + 20))
            }, vet[i][7]);
        } else if (vet[i][5] == 1) {
            if (mousex > vet[i][1] && mousex < (vet[i][1]+vet[i][3]) && mousey > vet[i][2] && mousey < (vet[i][2]+vet[i][4])) {
				$("#container").append(vet[i][0]);
                clearInterval(vet[i][8]);
                vet[i][0].css({left: vet[i][1], top: vet[i][2]});
                vet[i][5] = 0;
                vet[i][0].css({zIndex: 0});
                vet[i][0].draggable('enable');
                mouseClique += mousex+","+mousey+");";
                removeDica();
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
                vet[i][0].css({left: vet[i][9].position().left, top: vet[i][9].position().top});
                $("#hover"+sortido[i]).css({left: vet[i][9].position().left, top: vet[i].position().top, zindex: 1});
                vet[i][5] = 2;
				vet[i][9].css({opacity: 0.1});
                vet[i][0].css({zIndex: 0});
                clearInterval(vet[i][8]);
                vet[i][0].draggable('disable');
                removeDica();
                altera_indc(i);
                cliqueCerto++;
                mouseClique += mousex+","+mousey+");";
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

        vet[i][9].animate({opacity: '0.1'}, "slow");
        vet[i][9].animate({opacity: '1.0'}, "slow");
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

    function endgame() {
        
        var auxcont=0;// variável auxiliar para contar quantas imagens estão no seu target
        for(i=0;i<numTotal;i++)
        {
            if(vet[i][5] == 2){
                auxcont++;
            }
        }
        ////console.log(auxcont);
        if(auxcont == numTotal){
        //if (vet[0][5] == 2 && vet[1][5] == 2 && vet[2][5] == 2) {           // Se as três imagens já estiverem nos alvos, dipara
            for(i=0; i<numTotal; i++){
                vet[i][0].fadeOut(200);
                vet[i][9].fadeOut(200);
                $("#hover"+(i+1)).fadeOut(200);
            }
            finalizado=1;
            fundo1.fadeOut(200);
            fundo2.fadeOut(200);
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
        var idAtividade = 40;    //alterar esse id para o número do jogo
        var idSessao = parseInt(getQueryVariable("campoEscondidoIDSessao"));
        
        var jsonObj = JSON.stringify({
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
