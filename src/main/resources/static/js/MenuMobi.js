var NumJogos = 65;
var urlGlobal = window.location.search.substring(1);

function mudaJogo(parametro){
    //url = parametro+"/atividade.html?DicaPiscaOuSeta="+tipodeDica+"&campoEscondidoDicaTempo="+DicaTempoSouN+"&campoEscondidoTempodeDica="+tempodeDica+"&campoEscondidoDicaCaminho="+DicaCaminhoSouN; 
    url = parametro+"/atividade/?"+urlGlobal;
    //aqui esta sendo implementado a url a mão para funcionar as configurações da dica, sons e etc.
    window.location.href = url;                     //muda a pagina toda
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
function getQueryVariable(variable)
{
   var query = window.location.search.substring(1);

   var vars = query.split("%26"); /* codigo %26 equivale ao simbolo '&' */
   for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("%3D");/* codigo %3D equivale o sinal '=' */
           if(pair[0] == variable){return pair[1];}
   }
   return(false);
}
var tipodeDica = getQueryVariable("DicaPiscaOuSeta");
var DicaTempoSouN = getQueryVariable("campoEscondidoDicaTempo");
var tempodeDica = getQueryVariable("campoEscondidoTempodeDica");
var DicaCaminhoSouN = getQueryVariable("campoEscondidoDicaCaminho");

//Ajustando as dimensões da janela

console.log("window: " + $(window).width() +","+ $(window).height());
/**
* Obter tamanho da janela
* $(window).height();
* $(document).height();
* $(window).width();
* $(document).width();
* screen.height
* screen.width
*/
var br = 0;

function getMargem(){
    var mWidth = $(window).width();

    if(mWidth >= 480 && mWidth <= 600){
    	br = 4;
    } else if(mWidth >= 600 && mWidth <= 720){
    	br = 5;
    } else if(mWidth >= 720 && mWidth <= 820){
    	br = 6;
    } else if(mWidth >= 820 && mWidth <= 1024){
    	br = 7;
    } else if(mWidth >= 1024 && mWidth <= 1280){
    	br = 8;
    } else if(mWidth >= 1280 && mWidth <= 1440){
    	br = 9;
    } else if(mWidth > 1440){
    	br = 12;
    } else {
    	br = 6;
    }
    return (mWidth - (br * 120))/2;
}
	
//daqui pra baixo são os jogos:
//array que seta os botões visiveis ou invisíveis. cada indice corresponde ao (id-1) do jogo. Jogo 1 = vet[0]
var vet = new Array(NumJogos);
var jogoVisib = new Array();
var i;

jogoVisib.length = 0;

for(i = 1; i< NumJogos; i++){ 

	if((vet[i - 1] = getQueryVariable("campoEscondidoJogo"+i)) == 1)
		jogoVisib.push(i);
}

function configButton(){
	alinha();
	window.onresize = alinha;
	for(var j = 0; j < jogoVisib.length; j++){
		var botao;
		if((botao = document.getElementById("botao" + jogoVisib[j])) == null) continue;

		botao.style.visibility = "visible";
	}
}

function alinha(){
	var col = 0;
	var lin = -1;
	var margem = getMargem();

	for(var j = 0; j < jogoVisib.length;j++){
		var botao = document.getElementById("botao" + jogoVisib[j]);

		if(botao == null) continue;

		if(col % br == 0)lin++;
		botao.style.left = (col % br)*120 + margem + 'px';
		botao.style.top = lin * 120 + 100 + 'px';

		col ++;
	}
	document.getElementById("frame").style.height = lin * 120 + 200 + 'px';
}
