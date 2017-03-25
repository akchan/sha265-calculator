$(function(){
    function clear(){
        $('#input').val('');
        var shaObj = new jsSHA('SHA-256', "TEXT");
        shaObj.update('');
        $('#output').val(shaObj.getHash("HEX"));
    }
    clear();
    $('#clear').click(clear);


    $('#input').keyup(function(){
        var input   = $('#input').val();
        var lines   = input.replace('\r', '').split('\n');
        var result  = [];

        for (var i = 0; i < lines.length; i++) {
            var shaObj = new jsSHA('SHA-256', "TEXT");
            shaObj.update(lines[i]);
            result.push(shaObj.getHash("HEX"));
        };

        $('#output').val(result.join('\n'));
    });
});