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
