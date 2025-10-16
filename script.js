// Get all radio buttons in the gender group
const genderRadios = document.querySelectorAll('input[name="gender"]');
// Get the hidden focus trigger input
const genderTrigger = document.getElementById('gender-trigger');
// Get the fieldset container
const genderFieldset = document.querySelector('.gender-fieldset');
let lastChecked = null;

genderRadios.forEach(radio => {
    radio.addEventListener('click', function() {
        if (this === lastChecked) { 
            this.checked = false;
            lastChecked = null;
        } else {
            lastChecked = this;
        }
    });
});

genderFieldset.addEventListener('click', function(event) {
    if (event.currentTarget === event.target || event.target.classList.contains('gender-click-handler')) {
        genderTrigger.focus();
    }
});

document.addEventListener('click', function(event) {
    const isClickOutside = !genderFieldset.contains(event.target);

    if (isClickOutside) {
        const isSelected = Array.from(genderRadios).some(radio => radio.checked);
        if (!isSelected) {
            genderTrigger.blur();
        } 
        
    }
});


