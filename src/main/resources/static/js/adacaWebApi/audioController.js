function AudioController(src){
    try{
        this.tag = src;
        adaca.methodActivityAudioLoad(this.tag);
    }
    catch(e){
        var uri = window.location.protocol + "//" + window.location.host;
        var _ctx = $("meta[name='_ctx']").attr("content");

        if(_ctx == null){
            uri = uri + src;
        }
        else{
            uri = uri + _ctx + src;
        }
        this.sound = new Audio(uri);
    }
    
    this.play = function(){
        try{
            adaca.methodActivityAudioPlay(this.tag);
        }
        catch(e){
            this.sound.play();
        }
    }
}
