// Get all radio buttons in the gender group
const genderRadios = document.querySelectorAll('input[name="gender"]');
// Get the hidden focus trigger input
const genderTrigger = document.getElementById('gender-trigger');
// Get the fieldset container
const genderFieldset = document.querySelector('.gender-fieldset');
let lastChecked = null;

genderRadios.forEach(radio => {
    radio.addEventListener('click', function() {
        // If the clicked radio button was the same as the last one checked
        if (this === lastChecked) {
            // Uncheck it and reset the tracker
            this.checked = false;
            lastChecked = null;
        } else {
            // Otherwise, update the tracker to the newly checked button
            lastChecked = this;
        }
    });
});

genderFieldset.addEventListener('click', function(event) {
    // This logic ensures we only open the component when the user clicks
    // the fieldset area itself, not one of the radio buttons inside it.
    // `event.currentTarget` is the fieldset, `event.target` is what was actually clicked.
    if (event.currentTarget === event.target || event.target.classList.contains('gender-click-handler')) {
        genderTrigger.focus();
    }
});

document.addEventListener('click', function(event) {
    // Check if the click occurred outside the gender fieldset
    const isClickOutside = !genderFieldset.contains(event.target);

    if (isClickOutside) {
        // Check if any of the main gender radios are currently checked
        const isSelected = Array.from(genderRadios).some(radio => radio.checked);
        
        // If no selection was made, we allow the animation to reverse.
        if (!isSelected) {
            // Unfocus the hidden trigger input, which removes :focus-within 
            // and triggers the reverse animation.
            genderTrigger.blur();
        } 
        // If a selection *was* made, we do nothing. The CSS :has(input:checked) 
        // keeps the fieldset open and the blur() command is skipped.
    }
});