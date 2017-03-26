$(function(){
    function validate_sha256js(){
        // Sample vectors below comes from http://www.di-mgt.com.au/sha_testvectors.html .
        //
        var sample_vector = [
            ['abc', 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'],
            ['', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'],
            ['abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq', '248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1'],
            ['abcdefghbcdefghicdefghijdefghijkefghijklfghijklmghijklmnhijklmnoijklmnopjklmnopqklmnopqrlmnopqrsmnopqrstnopqrstu', 'cf5b16a778af8380036ce59e7b0492370b249b11e8f07a51afac45037afee9d1'],
            [Array(1000000+1).join('a'), 'cdc76e5c9914fb9281a1c7e284d73e67f1809a48a497200e046d39ccc7112cd0']
        ];


        for (var i = sample_vector.length - 1; i >= 0; i--) {
            var shaObj = new jsSHA('SHA-256', "TEXT");

            shaObj.update(sample_vector[i][0]);

            if (shaObj.getHash("HEX") !== sample_vector[i][1]) {
                console.log(sample_vector[i][0]);
                console.log(shaObj.getHash("HEX"));
                console.log(sample_vector[i][1]);
                return false;
            }
        }

        return true;
    }


    (function invoke_validation(){
        var result = $('#resultOfValidation');
        if (validate_sha256js()) {
            result.text('Passed (Ready for use)');
            result.css({
                color: 'green',
                font_weight: 'bold'
            });
        } else {
            result.text('Failed (don\'t use this script!)');
            result.css({
                color: 'red',
                font_weight: 'bold'
            });
        }
    })();


    function normalize(){
        var input   = $('#input').val();
        var lines   = input.replace('\r', '').split('\n');
        var result  = [];

        for (var i = 0; i < lines.length; i++) {
            var match_result = lines[i].match(/^\s*([0-9]{1,10})\s*$/)
            if (match_result) {
                result.push(('0000000000' + match_result[1]).slice(-10))
            } else {
                result.push(lines[i]);
            }
        };

        $('#input').val(result.join('\n'));
        update_hash();
    }
    $('#normalize').click(normalize);


    function clear(){
        $('#input').val('');
        var shaObj = new jsSHA('SHA-256', "TEXT");
        shaObj.update('');
        $('#output').val(shaObj.getHash("HEX"));
    }
    clear();
    $('#clear').click(clear);


    function update_hash(){
        var input   = $('#input').val();
        var lines   = input.replace('\r', '').split('\n');
        var result  = [];

        for (var i = 0; i < lines.length; i++) {
            var shaObj = new jsSHA('SHA-256', "TEXT");
            shaObj.update(lines[i]);
            result.push(shaObj.getHash("HEX"));
        };

        $('#output').val(result.join('\n'));
    }
    $('#input').keyup(update_hash);
});
