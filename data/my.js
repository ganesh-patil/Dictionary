$('document').ready(function(){
        $('body').bind('mousedown',function(){
           $('.tooTip').hide();
        });
        $('body').bind('dblclick', function(e){
            var selection;
            $('.tooTip').show();
            $('.tooTip').html('');
            if (window.getSelection) {
                selection = window.getSelection();

            } else if (document.selection) {
                selection = document.selection.createRange();
            }
            var selectedText = selection.toString()
            var leftPos =  e.pageX+"px"
            var topPos =   e.pageY+"px"

            if (!selectedText == "") {
                $('.tooTip').append(selectedText);
                $('.tooTip').css({
                    left : leftPos,
                    top: topPos
                })
            }
            var word=getSelectedWord();
            self.port.emit("double",word);
        });
});

self.port.on("meaning",function(meaning){
     var word_meaning='<ul>';
    if(typeof meaning['tuc'] !== 'undefined') {
        $.each(meaning['tuc'] ,function (key,value){
            if(typeof value['meanings'] !== 'undefined') {
                $.each(value['meanings'], function (value_key,value_meaning) {
                    word_meaning +='<li>'+value_meaning['text'] +'.</li>';
                });
            }
        });
    }
word_meaning+='</ul>';
if($(word_meaning).find('li').length ==0) {
  word_meaning="<ul><p>Sorry... not found any definition.<p></ul>"
}
    $('.tooTip').append(word_meaning);
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
