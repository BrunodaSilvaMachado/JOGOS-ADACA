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

function mudaJogo(parametro){
	var urlGlobal = window.location.search.substring(1);
    //url = parametro+"/atividade.html?DicaPiscaOuSeta="+tipodeDica+"&campoEscondidoDicaTempo="+DicaTempoSouN+"&campoEscondidoTempodeDica="+tempodeDica+"&campoEscondidoDicaCaminho="+DicaCaminhoSouN; 
    url = parametro+"/atividade/?"+urlGlobal;
    //aqui esta sendo implementado a url a mão para funcionar as configurações da dica, sons e etc.
    window.location.href = url;                     //muda a pagina toda
}

function configButton() {
	var NumJogos = 65;
	//daqui pra baixo são os jogos:
	//array que configura os botões visiveis ou invisíveis.
	var jogoVisib = new Array();
	jogoVisib.length = 0;
	var botao = null;

	for(var i = 1; i< NumJogos; i++){ 
		botao = document.getElementById("botao" + i);
		if(getQueryVariable("campoEscondidoJogo"+i) == 1 && botao != null){
			botao.style.visibility = "visible";
		}
	}
}