var caminho = [];
var visitados = [];

function solucionador(i,j,x,y){
    visitados.push([i,j]);
    
    if(i==x && j==y){
        caminho.push([x,y]);
        return true;
    }
    
    if(grade[i][j][0]==0 && !arraycontains([i,j-1],visitados)){
        if(solucionador(i,j-1,x,y)){
            caminho.push([i,j]);
            return true;
        }
    }
    if(grade[i][j][1]==0 && !arraycontains([i+1,j],visitados)){
        if(solucionador(i+1,j,x,y)){
            caminho.push([i,j]);
            return true;
        }
    }
    if(grade[i][j][2]==0 && !arraycontains([i,j+1],visitados)){
        if(solucionador(i,j+1,x,y)){
            caminho.push([i,j]);
            return true;
        }
    }
    if(grade[i][j][3]==0 && !arraycontains([i-1,j],visitados)){
        if(solucionador(i-1,j,x,y)){
            caminho.push([i,j]);
            return true;
        }
    }
    return false;
}

function arraycontains(a,b){
    for(var i=0; i<b.length; i++){
        if(a[0]==b[i][0] && a[1]==b[i][1]){
            return true;
        }
    }
    return false;
}

function arraycontainsmany(a,b){
    var cont = 0;
    for(var i=0; i<b.length; i++){
        if(a[0]==b[i][0] && a[1]==b[i][1]){
            cont++;
        }
    }
    return cont;
}

function drawcaminho(){
    for(var i=caminho.length-1; i>=0; i--){
        $("#labirinto").append("<div class='caminho' style='left: "+ caminho[i][0]*escala +"px; top: "+ caminho[i][1]*escala +"px'></div>");
    }
}

