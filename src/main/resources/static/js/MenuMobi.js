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

function criarBotao(callback,id){
    return "<div class=\"col\"><button class=\"btn btn-sm btn-default botao\" id=\"botao" + id +"\" onclick=\"mudaJogo('"
        + callback + "')\" type=\"button\"></button></div>"
}

function configButton() {
	var btJogos = [
        'Jogo_1-Formas Sombras', 'Jogo_2-Formas Coloridas', 'Jogo_3-Formas Azuis', 'Jogo_4-Turma da Monica2',
        'Jogo_5-Bolas', 'Jogo_6-Sorvete', 'Jogo_7-Pirulito', 'Jogo_8-Carrinho',
        'Jogo_9-Caminhaozinho', 'Jogo_10-Castelinho', 'Jogo_11-Sombras Abstratas', 'Jogo_12-Arvores',
        'Jogo_13-Caixas', 'Jogo_14-Frutas 1', 'Jogo_15-Frutas 2', 'Jogo_16-Flor',
        'Jogo_17-Turma da Monica', 'Jogo_18-ABC', 'Jogo_19-EFG', 'Jogo_20-123',
        'Jogo_21-456', 'Jogo_22-789', 'Jogo_23-Peixinho', 'Jogo_24-Bob Esponja',
        'Jogo_25-Labirinto', 'Jogo_26-Rosto', 'Jogo_27-NumeroBolas', 'Jogo_28-BolaColorida',
        'Jogo_29-MateriaisEscolares', 'Jogo_30-Utensilios', 'Jogo_31-Insetos', 'Jogo_32-Passaro',
        'Jogo_33-Passarinhos', 'Jogo_34-Trenzinho', 'Jogo_35-BotoesColoridos', 'Jogo_36-FormasSombras2',
        'Jogo_37-SorveteSequencial', 'Jogo_38-BotoesNumeros', 'Jogo_39-BotoesLetras', 'JogoBonus-Lince',
        'Jogo_41-VariasFormas', 'Jogo_42-VariasFrutas', 'Jogo_43-SorteveSemNumero',/*Jogo_44-NumerosParesEImpares(incompleto)*/,
        'Jogo_45-PeixinhoSequencial', 'Jogo_46-VariasFormasSombras', 'Jogo_47-IdentificarODiferente-Bola', /*Jogo_48-BolaColorida-Lvl2(incompleto)*/,
        /*Jogo_49-InsetosLvl2(incompleto)*/,'Jogo_50-IdentificarODiferente-Arvore', 'Jogo_51-TV', 'Jogo_52-Colher',
        'Jogo_53-PassaroAzul', 'Jogo_54-IdentificarODiferente-Passaro', 'Jogo_55-IdentificarODiferente-TdaMonica',
        'Jogo_56-Trenzinho%202', 'Jogo_57-Polvo', 'Jogo_58-AEIOU', 'Jogo_59-Porco',
        'Jogo_60-Alfabetizacao1', 'Jogo_61-Alfabetizacao2', 'Jogo_62-Alfabetizacao3', 'Jogo_63-Alfabetizacao4',
        'Jogo_64-Alfabetizacao5'
	];

	for(var i = 1; i<= btJogos.length; i++){
		if(getQueryVariable("campoEscondidoJogo" + i) == 1){
			$(criarBotao(btJogos[i - 1],i)).appendTo('#rowButtons');
		}
	}
}