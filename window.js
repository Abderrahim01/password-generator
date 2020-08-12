$(() => {
    $("#genbutton").bind('input click', () =>{
        const mdp_password = $('#mdp_master').val()
        const num_char = $("#num_char").val()
        const ident = $('#ident').val()
         const platform = $('#platform').val()
        const data = {
            'master': mdp_password,
            'num': num_char,
            'ident':ident,
            'plateform': platform
        }
        var mdp = ''
        //console.log('test : '+mdp_password+' '+num_char+' '+ident)
    $.ajax({
        url:"http://localhost:5000/testAjax",
        method:"GET",
        dataType:"json",
        data:data
    }).done(function(data){

    })
        .fail(function(data){

        })
        .always(function(data){
            mdp = data.responseText
            //console.log(data)
            //console.log(mdp)
            $('#mdp').text(mdp);
        })
    })

})
