$(document).ready(function() {
    $('#questionInput').on("keyup change", () => {
        //val(),length trả về giá trị length hiện tại của form $('#questionInput')
        var remainingLetter = 200 - $('#questionInput').val().length; 
        $('#character').html("Còn " + remainingLetter + "/200 ký tự");
    })
    console.log($('#home'));
    $('#home').click(()=> {
        
        $('#home').addClass("active");
    })
})