function getQueryVariable(variable, separator, delim)
{
       var query = window.location.search.substring(1);
       var vars = query.split(delim);
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split(separator);
               if(pair[0] == variable) {return pair[1];}
       }
       return(false);
}