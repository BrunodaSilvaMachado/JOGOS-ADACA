function goBack(href){
    var urlProtocolHost = window.location.protocol + "//" + window.location.host;
    try{
        adaca.dispose();
    }catch(e)
    {
        var _location = urlProtocolHost;
        var _ctx = $("meta[name='_ctx']").attr("content");

        if(_ctx == null){
            _location = _location + href;
        }
        else{
            _location = _location + _ctx + href;
        }

        console.log('url: ' + _location);
        window.location.replace(_location);
    }
}