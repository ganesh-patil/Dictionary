//self.port.on("replacePage", function(message) {
 // document.body.innerHTML = "<h1>" + message + "</h1>";
//});
$('document').ready(function(){
    $('body').dblclick(function(){
       var word=getSelectedWord();
       $.ajax({
         type : "GET",
         contentType: 'application/jsonp',
          data : {get_param : "Announcement"},
         dataType:'jsonp',
          jsonp:'onJSONPLoad',
         crossDomain:true,
         url:"http://corephp-ganeshpatil.rhcloud.com/api.php",
         success: function(data) {
             console.log("Success"+data);
          },
         error: function (data,string,actualError) {
              console.log("error"+data);
              console.log("string" + string);
              console.log("actual error:" + actualError);
          }


         });
});
});

function getSelectedWord(){
var text = '';
              if(window.getSelection){
                text = window.getSelection();
              }else if(document.getSelection){
                text = document.getSelection();
              }else if(document.selection){
                text = document.selection.createRange().text;
              }
              text=text.toString();

return text;
}
