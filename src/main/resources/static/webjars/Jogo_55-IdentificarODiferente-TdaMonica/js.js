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
    var finalizado=0;
   function rand(num_minimo,num_maximo) {
    return Math.floor((Math.random() * (num_maximo-num_minimo+1))+num_minimo);
}

    // aqui estou pegando os valores passados na url de cada jogo
    var tipodeDica = getQueryVariable("DicaPiscaOuSeta");                                  //Seta ou Pisca
    var DicaTempoSouN = getQueryVariable("campoEscondidoDicaTempo");                       //true ou false
    var tempodeDica = parseInt(getQueryVariable("campoEscondidoTempodeDica"))*1000;        //numero
    var DicaCaminhoSouN = getQueryVariable("campoEscondidoDicaCaminho");                   //true ou false
    var comemoracao = getQueryVariable("campoEscondidoComemoracao");                    //retorna 0-sem comemoração, 1-parabens animado, 2-parabens parado
    var tipoSom = getQueryVariable("campoEscondidoSom");                                 //retorna 0-sem som, 1- palmas
    var musicaFundo = getQueryVariable("campoEscondidoMusicaFundo");                     // retorn 0-sem musica


 var numObjtos = 7; //quantidade de figuras
    
	var aux, j, jj;
	jj=0;
	sortido = new Array(numObjtos);
	
	do{						//randomiza todas imagens
		aux = 0;
		sort = rand(1,numObjtos);
		for(j=0; j<jj; j++){
			if(sort == sortido[j])
				aux = 1;
		}
		if(aux == 0){
			sortido[jj]=sort;
			jj++;
        }
    }while(jj != numObjtos);


//sintaxe:
//  [ID][0-imagem, 1-Xinicial, 2-Yinicial, 3-larguraX, 4-larguraY,
    //   5-state, 6-tipoDica, 7-tempoDica, 8-interval, 9-target]
    vet = new Array(
        new Array($("#img"+sortido[0]), 45, 70, 150, 150, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[0])),
        new Array($("#img"+sortido[1]), 228, 70, 150, 150, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[1])), 
        new Array($("#img"+sortido[2]), 426, 70, 150, 150, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[2])),  
        new Array($("#img"+sortido[3]), 600, 70, 150, 150, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[3])),
        new Array($("#img"+sortido[4]), 129, 240, 150, 150, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[4])),  
        new Array($("#img"+sortido[5]), 303, 240, 150, 150, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[5])),
        new Array($("#img"+sortido[6]), 477, 240, 150, 150, 0, tipodeDica, tempodeDica, 0, $("#target"+sortido[6]))
    );
	for(i=0; i<numObjtos; i++){
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

//FadeIn e FadeOut das imagens
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
    var i;
    //dar fadeout nas estrelas
    for(i=1; i<=12;i++){
        $("#estrela"+i).fadeOut(0);
    }
    
    //dar fadeout nas fogos
    for(i=1; i<=8;i++){
        $("#fogos"+i).fadeOut(0);
    }
    
    for(i=0; i<numObjtos; i++){
        vet[i][0].fadeOut(0);
    }
    fundo.fadeOut(0);
    parabens.fadeOut(0);    // Some com o parabéns
    dica.fadeOut(0);        // Some com a dica
    
    
    for(i = 0; i<numObjtos; i++) {
         vet[i][0].fadeIn(500);        // Traz as imagens com fadeIn(x) em x ms
       }
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
	
	var dicasonora = new AudioController( '/audio/MP3/Dicas/EncontreOBidu.mp3');
	dicasonora.play();
	
    tempoInterval = setInterval(function() {    // Função que inicia o tempoInterval
        tempo++;                                // com a função de incrementar
    }, 1000);
                                        // a variável tempo a cada segundo
    mouseInterval = setInterval(function() {
        if(mousex!=null)
            mousePos += mousex + "," + mousey + ";";
    }, 100);                    //mousePos += "[" + mousex + "," + mousey + "];";
                               


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
                vet[5][0].css({zIndex: 0});
                vet[6][0].css({zIndex: 0});
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
                vet[1][0].css({zIndex: 0});
                vet[2][0].css({zIndex: 0});
                vet[3][0].css({zIndex: 0});
                vet[4][0].css({zIndex: 0});
                vet[5][0].css({zIndex: 0});
                vet[6][0].css({zIndex: 0});
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
            i=1;
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
                vet[2][0].css({zIndex: 0});
                vet[3][0].css({zIndex: 0});
                vet[4][0].css({zIndex: 0});
                vet[5][0].css({zIndex: 0});
                vet[6][0].css({zIndex: 0});
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
            i=2;
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
                vet[3][0].css({zIndex: 0});
                vet[4][0].css({zIndex: 0});
                vet[5][0].css({zIndex: 0});
                vet[6][0].css({zIndex: 0});
				//Variáveis novas que devem ser copiadas para os novos jogos
				cliqueCerto++;
				mouseDrag += "("+mousex+","+mousey+";";
				//
                dicaTimeout = setTimeout(function() {
                    mostraDica(i, vet[i][6], (vet[i][9].offset().left + 35), (vet[i][9].offset().top - 100))
                }, vet[i][7]);
            }
        },
        stop: function() {
            i=3;
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
                vet[4][0].css({zIndex: 0});
                vet[5][0].css({zIndex: 0});
                vet[6][0].css({zIndex: 0});
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
            i=4;
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


//imagem 6
    vet[5][0].draggable({
        start: function() {
            i=5;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                vet[i][0].css({zIndex: 1});
                vet[0][0].css({zIndex: 0});
                vet[1][0].css({zIndex: 0});
                vet[2][0].css({zIndex: 0});
                vet[3][0].css({zIndex: 0});
                vet[4][0].css({zIndex: 0});
                vet[5][0].css({zIndex: 0});
                vet[6][0].css({zIndex: 0});
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
            i=5;
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
    
//imagem 7
    vet[6][0].draggable({
        start: function() {
            i=6;
            if (vet[i][5] == 0){
                vet[i][5] = 1;
                //vet[i][0].css({left: validXPosition(vet[i][3]), top: validYPosition(vet[i][4]), zIndex: 1});
                vet[i][0].css({zIndex: 1});
                vet[0][0].css({zIndex: 0});
                vet[1][0].css({zIndex: 0});
                vet[2][0].css({zIndex: 0});
                vet[3][0].css({zIndex: 0});
                vet[4][0].css({zIndex: 0});
                vet[5][0].css({zIndex: 0});
                vet[6][0].css({zIndex: 0});
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
            i=6;
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
                vet[0][0].css({zIndex: 0});
                vet[1][0].css({zIndex: 0});
                vet[2][0].css({zIndex: 0});
                vet[3][0].css({zIndex: 0});
                vet[4][0].css({zIndex: 0});
                vet[5][0].css({zIndex: 0});
                vet[6][0].css({zIndex: 0});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 15), (vet[i][9].offset().top - 100))
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
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
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
                vet[1][0].css({zIndex: 0});
                vet[2][0].css({zIndex: 0});
                vet[3][0].css({zIndex: 0});
                vet[4][0].css({zIndex: 0});
                vet[5][0].css({zIndex: 0});
                vet[6][0].css({zIndex: 0});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 15), (vet[i][9].offset().top - 100))
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
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
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
                vet[3][0].css({zIndex: 0});
                vet[4][0].css({zIndex: 0});
                vet[5][0].css({zIndex: 0});
                vet[6][0].css({zIndex: 0});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 15), (vet[i][9].offset().top - 100))
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
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
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
                vet[3][0].css({zIndex: 0});
                vet[4][0].css({zIndex: 0});
                vet[5][0].css({zIndex: 0});
                vet[6][0].css({zIndex: 0});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left + 35), (vet[i][9].offset().top - 100))
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
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
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
                vet[3][0].css({zIndex: 0});
                vet[4][0].css({zIndex: 0});
                vet[5][0].css({zIndex: 0});
                vet[6][0].css({zIndex: 0});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 15), (vet[i][9].offset().top - 100))
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
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
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
    
//imagem 6
    vet[5][0].click(function() {
        i = 5;
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
                vet[3][0].css({zIndex: 0});
                vet[4][0].css({zIndex: 0});
                vet[5][0].css({zIndex: 0});
                vet[6][0].css({zIndex: 0});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 15), (vet[i][9].offset().top - 100))
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
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
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
    
//imagem 7
    vet[6][0].click(function() {
        i = 6;
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
                vet[3][0].css({zIndex: 0});
                vet[4][0].css({zIndex: 0});
                vet[5][0].css({zIndex: 0});
                vet[6][0].css({zIndex: 0});
                
                vet[i][5] = 1;
                vet[i][0].draggable('disable');
            }, 10);
            dicaTimeout = setTimeout(function() {
                mostraDica(i, vet[i][6], (vet[i][9].offset().left - 15), (vet[i][9].offset().top - 100))
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
            } else if (mousex > vet[i][9].offset().left && mousex < (vet[i][9].offset().left + vet[i][3]) && mousey > vet[i][9].offset().top && mousey < (vet[i][9].offset().top + vet[i][4])) {
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
/*
    	$("#dicaPisca1").css({left: vet[i][9].offset().left, top: vet[i][9].offset().top});
        $("#dicaPisca2").css({left: vet[i][9].offset().left, top: vet[i][9].offset().top});
        $("#dicaPisca3").css({left: vet[i][9].offset().left, top: vet[i][9].offset().top});
        $("#dicaPisca4").css({left: vet[i][9].offset().left, top: vet[i][9].offset().top});
        $("#dicaPisca5").css({left: vet[i][9].offset().left, top: vet[i][9].offset().top});

        if(vet[i][9].offset().left < 505) //seria pras três maças
        {
            $("#dicaPisca1").fadeIn(500);
            $("#dicaPisca1").fadeOut(500);
        }
        if(vet[i][9].offset().left > 550 && vet[i][9].offset().left < 560)
        {
            $("#dicaPisca2").fadeIn(500);
            $("#dicaPisca2").fadeOut(500);
        }
        if(vet[i][9].offset().left > 600 && vet[i][9].offset().left < 650)
        {
            $("#dicaPisca3").fadeIn(500);
            $("#dicaPisca3").fadeOut(500);
        }
        if(vet[i][9].offset().left > 650 && vet[i][9].offset().left < 680)
        {
            $("#dicaPisca4").fadeIn(500);
            $("#dicaPisca4").fadeOut(500);
        }
        if(vet[i][9].offset().left > 700)
        {
            $("#dicaPisca5").fadeIn(500);
            $("#dicaPisca5").fadeOut(500);
        }*/
        
        //vet[i][0].css({left: vet[i][9].offset().left, top: vet[i][9].offset().top});
        //vet[i][9].fadeIn(500);
        //vet[i][9].fadeOut(500);
        vet[i][9].animate({opacity: '0.1'}, "slow");
        vet[i][09].animate({opacity: '1.0'}, "slow");
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
        //if (vet[3][5] == 2) {           // Se as três imagens já estiverem nos alvos, dipara
        var auxcont=0;// variável auxiliar para contar quantas imagens estão no seu target
    	for(i=0;i<numObjtos;i++)
    	{
    		if(vet[i][5] == 2)
    			auxcont++;
    	}
    	if(auxcont == 1){
            
            for(i=0; i<numObjtos; i++){
                vet[i][0].fadeOut(200);
                vet[i][9].fadeOut(200);
            }
            finalizado =1;
            fundo.fadeOut(200);

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
		var idAtividade = 55;	//alterar esse id para o número do jogo
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