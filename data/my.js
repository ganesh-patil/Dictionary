$('document').ready(function(){
//myalert("Test", "This is a test modal dialog");
    $('body').dblclick(function(){
       var word=getSelectedWord();
      self.port.emit("double",word);
});
});
self.port.on("meaning",function(meaning){
     var word_meaning='<ul>';
    console.log(meaning);
    console.log("Tuc: "+ meaning['tuc']);

    if(typeof meaning['tuc'] !== 'undefined') {
        $.each(meaning['tuc'] ,function (key,value){
            if(typeof value['meanings'] !== 'undefined') {
                console.log('value Meaning= ' + value['meanings']);
                $.each(value['meanings'], function (value_key,value_meaning) {
//                             console.log(value_meaning['text']);
                    word_meaning +='<li>'+value_meaning['text'] +'</li>';
                });
            }

        });
    }
word_meaning+='</ul>';
  alert(word_meaning);
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
