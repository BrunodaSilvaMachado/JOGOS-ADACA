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

var grade = [];
var jogadorPos = [0,0];
var tamanho;
var jogador = $(".jogador");
var labirinto = $("#labirinto");
var parabens = $("#parabens");
var sound = null;	// Cria um novo elemento de som no documento
var escalaS;
var velocidade;
var limiteH;
var limiteW;
var tamanhos = [];
var dt = 1;
var per = false;
var percurso = [];
var follower = false;
var dc = 0;
var luz = false;
var parabensInterval;

// <<188  >>190

$(document).ready(function(){
	
	var hora_inicio = dateNow();
	
	var tipoSom = (getQueryVariable("campoEscondidoSom") != "")?getQueryVariable("campoEscondidoSom"):1;
	var comemoracao = (getQueryVariable("campoEscondidoComemoracao") !="")?getQueryVariable("campoEscondidoComemoracao"):1 //retorna 0-sem comemoração, 1-parabens animado, 2-parabens parado
	
	var quantDicasUsadas = 0; 
	var cliqueCerto = 0;
	var cliqueErrado = 0;
	
	if(tipoSom == 1){   //palmas
        sound = new AudioController( '/audio/audio.mp3');         // Seta o source do elemento de som para o arquivo audio.mp3
    }
    else if(tipoSom == 2){  //plimplimplim
        sound = new AudioController( '/audio/plim.mp3');
    }
    else if(tipoSom == 3){
        sound = new AudioController( '/audio/somfogos.mp3');
    }
	tamanhos = multiplos(parseInt(labirinto.css("width")));
	tamanho = tamanhos[dt];
    
    if(luz==false){
        $(".luz").fadeOut(0);
    }
	
	//dar fadeout nas estrelas
	for(i=1; i<=12;i++){
		$("#estrela"+i).fadeOut(0);
	}

	//dar fadeout nas fogos
	for(i=1; i<=8;i++){
		$("#fogos"+i).fadeOut(0);
	}

	parabens.fadeOut(0);    // Some com o parabéns
	
	$("#corpo").keyup(function(event){
		
		switch(event.which){
		case 37:// <-
			leftKeyPress();
			break;
		case 38: //  ^
			upKeyPress();
			break;
		case 39: // ->
			rightKeyPress();
			break;
		case 40: // v
			downKeyPress();
			break;
		case 190: // >
			dt++;
			tamanho = tamanhos[dt];
			refaz();
			break;
		case 188: // <
			dt--;
			tamanho = tamanhos[dt];
			refaz();
			break;
		case 84: // T
			tKeyPress();
			break;
		case 80: // P
			 if(per == false){
                drawpercurso(500);
            }else{
                removepercurso();
            }
			break;
		case 70: // F
			if(follower == false){
                follower = true;
            }else{
                dc = 0;
                follower = false;
                removepercurso();
            }
			break;
		}
        
		isFinish();
		
	});

    $("#corpo").keypress(function(event){
		
		switch(event.which){
		case 97: // A
			leftKeyPress();
			break;
		case 119: // W
			upKeyPress();
			break;
		case 100: // D
			rightKeyPress();
			break;
		case 115: // S
			downKeyPress();
			break;	
		}
    });
	
	var jgd = document.getElementById('jogador');
	swipedetect(jgd,function(swipedir){
		
		switch(swipedir)
		{
			case 'left':
				leftKeyPress();
			break;
			case 'right':
				rightKeyPress();
			break;
			case 'down':
				downKeyPress();
			break;
			case 'up':
				upKeyPress();
			break;
			case 'none':
				//console.log('none');
			break;
			
		}
        
        isFinish();
	});
	
	doubleclickdetect(jgd,function(isdouble){
		if(isdouble){
			tKeyPress();
		}
	});
    
	geraLabirinto(0,0,tamanho,tamanho,escolheOrientacao(),0);
    solucionador(0,0,tamanho-1,tamanho-1);
    ////console.log(caminho);
    drawcaminho();
	preparaDimensoes();
    percurso.push([jogadorPos[0],jogadorPos[1]]);
	
	//funções para o teclado ou touch
	function leftKeyPress(){
		if(parseInt(jogador.css("left"))>0 && grade[jogadorPos[0]][jogadorPos[1]][3] == 0){
			jogador.animate({ left: "-="+escala },velocidade);
			jogadorPos[0]--;
			percurso.push([jogadorPos[0],jogadorPos[1]]);
			cliqueCerto++;
			if(follower==true){ follow(); }
			deslocaLuz();
		}
		else{
			cliqueErrado++;
		}
	}
	
	function rightKeyPress(){
		if(parseInt(jogador.css("left"))<(limiteW) && grade[jogadorPos[0]][jogadorPos[1]][1] == 0){
			jogador.animate({ left: "+="+escala },velocidade);
			jogadorPos[0]++;
			percurso.push([jogadorPos[0],jogadorPos[1]]);
			cliqueCerto++;
			if(follower==true){ follow(); }
			deslocaLuz();
		}
		else{
			cliqueErrado++;
		}
	}
	
	function upKeyPress(){
		if(parseInt(jogador.css("top"))>0 && grade[jogadorPos[0]][jogadorPos[1]][0] == 0){
			jogador.animate({ top: "-="+escala },velocidade);
			jogadorPos[1]--;
			percurso.push([jogadorPos[0],jogadorPos[1]]);
			cliqueCerto++;
			if(follower==true){ follow(); }
			deslocaLuz();
		}
		else{
			cliqueErrado++;
		}
	}
	
	function downKeyPress(){
		if(parseInt(jogador.css("top"))<(limiteH) && grade[jogadorPos[0]][jogadorPos[1]][2] == 0){
			jogador.animate({ top: "+="+escala },velocidade);
			jogadorPos[1]++;
			percurso.push([jogadorPos[0],jogadorPos[1]]);
			cliqueCerto++;
			if(follower==true){ follow(); }
			deslocaLuz();
		}
		else{
			cliqueErrado++;
		}
	}
	
	function tKeyPress(){
		
		var dicaInterval = setInterval(function(){
			$(".caminho").fadeIn(500);
			$("#labirinto").css("background-color", "#aaa");
			quantDicasUsadas++;
		},500);
		setTimeout(function() {
			clearInterval(dicaInterval);
			$(".caminho").fadeOut(500);
		$("#labirinto").css("background-color", "#fff");
		}, 3000);
		
	}
	
	function isFinish(){
		if(jogadorPos[0]==(grade.length-1) && jogadorPos[1]==(grade.length-1)){
			endGame();
		}
	}
	
	function animateParabens(){
		parabens.animate({top: 180},200);	// Essa
		parabens.animate({top: 280},200);	// função
		parabens.animate({top: 200},200);	// anima
		parabens.animate({top: 260},200);	// o parabéns
		parabens.animate({top: 240},200);	// com
		parabens.animate({top: 260},200);	// pulinhos
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

	function endGame(){
		jogador.fadeOut(500);
		if(tipoSom == 0){
				//sem som
		}
		else if (tipoSom == 1){
			sound.play();       // Toca o som das palmas
		}
		else if (tipoSom == 2 && comemoracao != 3){
			i = 0;
			var parabensInterval = setInterval(function(){
				sound.play();
			}, 500);
			setTimeout(function() {
				clearInterval(parabensInterval);
			}, 7200);
		}
		else if(tipoSom ==3){
			var parabensInterval = setInterval(function(){
			   sound.play();
			}, 400);
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
			refaz();										// Cria um timeout para limpar
			clearInterval(parabensInterval);				// o parabensInterval depois de 7200ms
		},7200);											// (6 ciclos), se não ele ia quicar para sempre
		
		setTimeout(function(){
            goBack("/Jogos/menu/?" + urlGlobal);
        },8500);
		
		ajaxSave();
	}

    function deslocaLuz(){
        if(luz==true){
            $(".luz").css({top: ((jogadorPos[1]-1)*escala)+"px", left: ((jogadorPos[0]-1)*escala)+"px"});
        }
    }
    
	function refaz(){
		$(".parede").remove();
        $(".caminho").remove();
		grade = [];
        caminho = [];
        visitados = [];
        percurso = [];
		jogadorPos = [0,0];
		geraLabirinto(0,0,tamanho,tamanho,escolheOrientacao(),0);
        solucionador(0,0,tamanho-1,tamanho-1);
        ////console.log(caminho);
        ////console.log(caminho.length);
        drawcaminho();
		preparaDimensoes();
		jogador.fadeIn(500);
        percurso.push([jogadorPos[0],jogadorPos[1]]);
        removepercurso();
	}

	function preparaDimensoes(){
        var dt = ( Math.floor(escala/11)==0?1:Math.floor(escala/11) );
        var borda = dt + escala;
        var borderless = escala;
		$(".parede-horizontal").css({width: borderless+"px", height: Math.floor(escala/11)==0?1:Math.floor(escala/11)+"px"});
		$(".parede-vertical").css({height: borderless+"px", width: Math.floor(escala/11)==0?1:Math.floor(escala/11)+"px"});
		jogador.css({height: borderless+"px", width: borderless+"px", borderRadius: borderless/2+"px"});
		$(".fim").css({height: borderless+"px", width: borderless+"px", top: (parseInt(labirinto.css("width"))-escala)+"px", left: (parseInt(labirinto.css("height"))-escala)+"px"});
        $(".luz").css({height: (borderless*3)-2+"px", width: (borderless*3)-2+"px", top: (parseInt(jogador.css("top"))-borderless)+"px", left: (parseInt(jogador.css("left"))-borderless)+"px"});
        $(".caminho").css({height: borderless+"px", width: borderless+"px"});
        $(".caminho").fadeOut(0);
		jogador.css({top: 0, left: 0});
        labirinto.css("border", Math.floor(escala/11)<=0?"1px solid #000":Math.floor(escala/11)+"px solid #000");
        labirinto.css("background-color","#fff");
	}

    function drawpercurso(tempo){
        var drawed = [];
        for(var i=0; i<percurso.length; i++){
            ////console.log(percurso[i]);
            if(!arraycontains(percurso[i],drawed)){
                $("#labirinto").append("<div class='percurso' style='left: "+ percurso[i][0]*escala +"px; top: "+ percurso[i][1]*escala +"px; opacity: "+ (0.1*arraycontainsmany(percurso[i],percurso)) +"'></div>");
                drawed.push(percurso[i]);
            }
        }
        $(".percurso").css({height: escala+"px", width: escala+"px"});
        $(".percurso").fadeOut(0);
        per = true;
        $(".percurso").fadeIn(tempo);
    }
    
    function follow(){
        var drawed = [];
        for(var i=dc; i<percurso.length-1; i++){
            ////console.log(percurso[i]);
            if(!arraycontains(percurso[i],drawed)){
                $("#labirinto").append("<div class='percurso' style='left: "+ percurso[i][0]*escala +"px; top: "+ percurso[i][1]*escala +"px; opacity: "+ (0.1*arraycontainsmany(percurso[i],percurso)) +"'></div>");
                drawed.push(percurso[i]);
            }
        }
        $(".percurso").css({height: escala+"px", width: escala+"px"});
        per = true;
        dc++;
    }
    
    function removepercurso(){
        if(per==true){
            $(".percurso").fadeOut(200);
            per = false;
            $(".percurso").remove();
        }
    }

    
	function geraLabirinto(x,y,width,height,orientacao,cont){
		if(width-x<=1 || height-y<=1 /* || cont>5 */){
			return;
		}

		if(cont==0){
			escala = Math.round(parseInt($("#labirinto").css("width"))/tamanho);

			velocidade = parseInt($("#labirinto").css("width"))/tamanho;

			limiteW = parseInt(labirinto.css("width"))-escala;
			limiteH = parseInt(labirinto.css("height"))-escala;

			parabens.fadeOut(0);	// Some com o parabéns

			for(var i=0; i<tamanho; i++){
				grade[i] = [];
				for(var j=0; j<tamanho; j++){
					grade[i][j] = [0,0,0,0];
				}
			}

			////console.log(jogadorPos);
			////console.log(grade);
			cont++;
            
            for(var i=0; i<tamanho; i++){
                grade[i][0][0] = 1;
                grade[tamanho-1][i][1] = 1;
                grade[i][tamanho-1][2] = 1;
                grade[0][i][3] = 1;
            }
            
		}

		var px = 0, py = 0;
		var ax = width, ay = height;

		if(orientacao==0){
			py = aleatorio(height,y);
			ax = Math.floor(Math.random() * ((width-1) - x + 1) + x);

			for(var i=x; i<width; i++){
				if(i!=ax){
					$("#labirinto").append("<div class='parede parede-horizontal' style='top: "+py*escala+"px; left: "+i*escala+"px;'></div>");
					grade[i][py-1][2] = 1;
					grade[i][py][0] = 1;
				}
			}
			geraLabirinto(x,py,width,height,1,cont);
			geraLabirinto(x,y,width,py,1,cont);	
		}else{
			px = aleatorio(width,x);
			ay = Math.floor(Math.random() * ((height-1) - y + 1) + y); 

			for(var i=y; i<height; i++){
				if(i!=ay){
					$("#labirinto").append("<div class='parede parede-vertical' style='left: "+px*escala+"px; top: "+i*escala+"px;'></div>");
					grade[px-1][i][1] = 1;
					grade[px][i][3] = 1;
				}
			}
			geraLabirinto(px,y,width,height,0,cont);
			geraLabirinto(x,y,px,height,0,cont);	
		}
	}

	function aleatorio(max,min){ return Math.floor(Math.random() * ((max-1) - (min+1) + 1) + (min+1)); }

	function escolheOrientacao(){
		return Math.round(Math.random());
	}
	
	function dateNow(){
		var dia, mes, ano, hora, min, seg;
		dia = new Date().getDate();
		mes = new Date().getMonth();
		ano = new Date().getFullYear();
		hora = new Date().getHours();
		min = new Date().getMinutes();
		seg = new Date().getSeconds();
	
		return (( ano <10)?"0"+ ano : ano ) + "-" + (( (mes+1) <10)?"0"+ (mes+1) : (mes+1)) + "-" + (( dia <10)?"0"+ dia : dia ) + "T" + (( hora <10)?"0"+ hora : hora ) + ":" + (( min <10)?"0"+ min : min ) + ":" + (( seg <10)?"0"+ seg : seg ) + "Z";
	}
	
	function ajaxSave() {
        dia = new Date().getDate();
        mes = new Date().getMonth();
        ano = new Date().getFullYear();
        hora = new Date().getHours();
        min = new Date().getMinutes();
        seg = new Date().getSeconds();
        
        var hora_fim = dateNow();
        
        var requisicaoDaqui = "RESULTADO";
        var idAtividade = 25;    //alterar esse id para o número do jogo
        var idSessao = parseInt(getQueryVariable("campoEscondidoIDSessao"));        
		var jsonObj = JSON.stringify({
		"idatividade": {"id": idAtividade},
		"idsessao": {"id":idSessao},
		"cliquecerto": cliqueCerto,
		"mousepos": percurso,
		"mouseclique": 0,
		"mousedrag": 0,
		"poserrado": 0,
		"cliqueerrado": 0,
		"dicas": quantDicasUsadas,
		"horainicio": hora_inicio,
		"horafim": hora_fim
	});

	saveController(jsonObj, "/Jogos/Resultados", 'post');
    }
});

