var pageMod = require("sdk/page-mod");
var self = require("sdk/self"); 
pageMod.PageMod({
  include: "*",
  contentStyleFile:[self.data.url('dictionary.css')],
  contentScript:'var maindiv= document.createElement("div"); maindiv.setAttribute("class","maindiv"); var textnode=document.createElement("div"); textnode.setAttribute("class","tooTip"); maindiv.appendChild(textnode); document.body.appendChild(maindiv)',
  contentScriptFile: [self.data.url("jquery.js"), self.data.url("jqueryDialog.js"),self.data.url("my.js")],
    onAttach: function(worker) {
      worker.port.on("double",function(test){
         var Request = require("sdk/request").Request;
          Request({
               url: "http://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&phrase="+test+"&pretty=true",
              onComplete: function (response) {
                         var meaning = response.json;
                         worker.port.emit('meaning',meaning);
                  }
                }).get();
          });
  }
});
