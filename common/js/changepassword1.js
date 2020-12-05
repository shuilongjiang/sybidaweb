$(document).ready(function($) {
    
  jQuery('#myPassword').strength({
            strengthClass: 'strength',
            strengthMeterClass: 'strength_meter',
            strengthButtonClass: 'button_strength',
            strengthButtonText: 'Show password',
            strengthButtonTextToggle: 'Hide Password'
        });


$('#demo1').click(function(e) {

        $('#myPassword').focus();
    });















});