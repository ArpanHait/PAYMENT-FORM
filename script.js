// Get all radio buttons in the gender group
const genderRadios = document.querySelectorAll('input[name="gender"]');
// Get the hidden focus trigger input
const genderTrigger = document.getElementById('gender-trigger');
// Get the fieldset container
const genderFieldset = document.querySelector('.gender-fieldset');
let lastChecked = null;

genderRadios.forEach(radio => {
    radio.addEventListener('click', function() {
        if (this === lastChecked){ 
            this.checked = false;
            lastChecked = null;
        }else{
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
////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    // --- Animation Logic for "IMPORTANT INFORMATION" Section ---
 
    const infoFieldset = document.querySelector('.info-fieldset');
    const infoTrigger = document.getElementById('info-trigger');
 
    // This check prevents errors if the elements are not found
    if (infoFieldset && infoTrigger) {
        const infoInputs = infoFieldset.querySelectorAll('input[required]');
 
        // When clicking the fieldset or focusing an input, add the .is-open class
        infoFieldset.addEventListener('click', (event) => {
            // If the click is anywhere inside the fieldset, open it.
            if (infoFieldset.contains(event.target)) {
                infoFieldset.classList.add('is-open'); // Explicitly open it
            }
        });

        infoFieldset.addEventListener('focusin', () => {
            if (!infoFieldset.classList.contains('is-open')) {
                infoFieldset.classList.add('is-open'); // Explicitly open it
            }
        });
 
        // When clicking outside the fieldset, check if it should collapse
        document.addEventListener('click', (event) => {
            // If the click is outside the fieldset, always collapse it for privacy.
            if (!infoFieldset.contains(event.target)) {
                infoFieldset.classList.remove('is-open'); // Explicitly close it
            }
        });
    }
});

