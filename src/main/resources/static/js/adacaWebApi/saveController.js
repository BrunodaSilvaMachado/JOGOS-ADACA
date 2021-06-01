function saveController(jsonStr, href, method){
	try{
		adaca.methodActivityResultado(jsonStr);
	}
	catch(ignored){
		var uri = window.location.protocol + "//" + window.location.host;
        var _ctx = $("meta[name='_ctx']").attr("content");

        if(_ctx == null){
            uri = uri + href;
        }
        else{
            uri = uri + _ctx + href;
        }

		var csrfHeader = $("meta[name='_csrf_header']").attr("content");
		var csrfToken = $("meta[name='_csrf']").attr("content");
		var headers = {};
		headers[csrfHeader] = csrfToken;
		headers['Access-Control-Allow-Origin'] = '*';
		headers['Access-Control-Allow-Credentials'] = true;
		headers['Access-Control-Allow-Methods'] = 'POST';
		
		$.ajax({
            url: uri,
            type: method,
			headers: headers,
            data: jsonStr,
            beforeSend: function(data) {
                console.log("Iniciando AJAX SAVE");
            },
            failure: function() {
                console.log("Problema de conexão com servidor.");
            },
            success: function(res) {
                console.log("Salvo");
            },
            error: function (data, res, err) {
                console.log("Erro ao realizar gravação dos resultados");
                console.log(res);
                console.log(data);
                console.log(err);
            },
			contentType: "application/json"
        });
	}
}