// Import the page-mod API
var pageMod = require("sdk/page-mod");
var self = require("sdk/self"); 
// Create a page mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
pageMod.PageMod({
  include: "*",
  contentStyleFile:[self.data.url('jueryui.css')],
  contentScriptFile: [self.data.url("jquery.js"), self.data.url("jqueryDialog.js"),self.data.url("my.js")],
  onAttach: function(worker) {
//    worker.port.emit("replacePage", "Page matches ruleset");
      worker.port.on("double",function(test){
           console.log(test);
         var Request = require("sdk/request").Request;
          Request({
               url: "http://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&phrase="+test+"&pretty=true",
              // url: "http://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&phrase="+#$+"&pretty=true",
               //url: "http://corephp-ganeshpatil.rhcloud.com/api.php",
              onComplete: function (response) {
                         // var parsed = JSON.parse(response.text);
                          //console.log(response.text);
                         var meaning = response.json;
//                          console.log(meaning);
                       //   console.log(tweet);
                         worker.port.emit('meaning',meaning);
                  }
                }).get();
          });
  }
});
