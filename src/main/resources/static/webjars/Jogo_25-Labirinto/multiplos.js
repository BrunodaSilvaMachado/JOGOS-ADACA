function multiplos(numero){
	var m = [];
	var cont = 0;
	for(i=2; i<numero; i++){
		if(numero%i==0){
			m[cont] = i;
			cont++;
		}
	}
	return m;
}