$(document).ready(function() {
    $('#questionInput').on("keyup change", () => {
        $('#questionInput').attr("maxlength", "200");
        //val(),length trả về giá trị length hiện tại của form $('#questionInput')
        var remainingLetter = 200 - $('#questionInput').val().length; 
        $('#character').html("Còn " + remainingLetter + "/200 ký tự");
    })

    $("#btnQueston").click(() => {
        location.href = "/";
    });

    
})