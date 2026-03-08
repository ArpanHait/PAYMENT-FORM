export function startPaymentFlow() {
    // 1. Hide the original form container
    const originalForm = document.querySelector('.form-container');
    if (originalForm) {
        originalForm.style.display = 'none';
    }

    // 2. Show the new flow container
    const flowContainer = document.getElementById('payment-flow-container');
    flowContainer.classList.add('active');

    // 3. Start Step 1: Authentication
    showStep('step-auth');

    // 4. Handle Authentication Sequence
    const authStep = document.getElementById('step-auth');
    const loadingDiv = authStep.querySelector('.auth-loading');
    const looksGoodDiv = authStep.querySelector('.looks-good-container');

    // Reset visibility (for fresh start)
    if(loadingDiv) loadingDiv.style.display = 'block';
    if(looksGoodDiv) looksGoodDiv.style.display = 'none';

    // Sequence: Loading -> Looks Good -> Amount Step
    setTimeout(() => {
        if(looksGoodDiv) looksGoodDiv.style.display = 'block';

        setTimeout(() => {
            showStep('step-amount');
        }, 1500); // Display "Looks good" for 1.5 seconds
    }, 2000); // Display Spinner for 2 seconds
}

function showStep(stepId) {
    // Hide all steps
    document.querySelectorAll('.flow-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show the requested step
    const targetStep = document.getElementById(stepId);
    if (targetStep) {
        targetStep.classList.add('active');
    }
}

// Initialize Step 2 Button Logic
document.addEventListener('DOMContentLoaded', () => {
    const payBtn = document.getElementById('pay-fast-btn');
    
    if (payBtn) {
        payBtn.addEventListener('click', () => {
            // Change button to loading state
            const originalText = payBtn.innerText;
            payBtn.innerText = "Processing...";
            payBtn.style.opacity = "0.7";
            payBtn.style.cursor = "wait";

            // Fake payment delay (2 seconds) -> Go to Step 3
            setTimeout(() => {
                showStep('step-success');
            }, 2000);
        });
    }
});
