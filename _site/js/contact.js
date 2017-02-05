$(document).ready(function(){
    $('#myform').submit(function(e) {
        e.preventDefault();
        var contactName = $('#contact-name').val();
        var contactEmail = $('#contact-email').val();
        var contactMessage = $('#contact-message').val();
        // data validation code here
        var url = "//docs.google.com/forms/d/e/1FAIpQLSf-XZuDN7H2r-o_QxXFV6CAychnckBikm4hlFGedO2SwUmriQ/formResponse";
        
        var data = {
            'entry.1983930535': contactName,
            'entry.118759962': contactEmail,
            'entry.1263934566': contactMessage,

        };
        

        $.ajax({
                url: url,
                type: "POST",            
                dataType: "json",
                data: data,    
                crossDomain: true,
                statusCode: {
                    0: function() {
                        $("#success").fadeIn("fast", clearForm())
                    }

                }
                
        });

        clearForm = function() {
            $('#myform')[0].reset();
        }
    });
});