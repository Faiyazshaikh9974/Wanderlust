// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()


  //Logic for adjust the size of container...
  document.addEventListener("DOMContentLoaded", function () {
    let flash = document.getElementById("flash-msg");
    let flash_btn = document.getElementById("flash-btn");
    let container = document.querySelector(".container");

    if (flash) {
        container.style.padding = "0.8rem"; // Adds padding when flash exists

        flash_btn.addEventListener("click", function () {
            flash.style.display = "none"; // Hide flash message
            container.style.padding = "4rem !important"; // Update container padding
        });
    }
});


  