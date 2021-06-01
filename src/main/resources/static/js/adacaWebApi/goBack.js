function goBack(href){
    var urlProtocolHost = window.location.protocol + "//" + window.location.host;
    try{
        adaca.dispose();
    }catch(e)
    {
        var location = urlProtocolHost;
        var _ctx = $("meta[name='_ctx']").attr("content");

        if(_ctx == null){
            location = location + href;
        }
        else{
            location = location + _ctx + href;
        }

        console.log('url: ' + location);
        window.location.replace(location);
    }
}