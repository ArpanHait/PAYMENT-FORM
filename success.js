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

    // Sequence: Loading -> Looks Good (3s) -> Amount Step (5s)
    setTimeout(() => {
        if(looksGoodDiv) looksGoodDiv.style.display = 'block';
    }, 3200);

    setTimeout(() => {
        showStep('step-amount');
    }, 5000);
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
    const currencySelect = document.getElementById('currency-select');
    const currencySymbolDisplay = document.getElementById('currency-symbol-display');
    
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

    // Logic to update the currency symbol when the dropdown value changes
    if (currencySelect && currencySymbolDisplay) {
        currencySelect.addEventListener('change', (event) => {
            currencySymbolDisplay.textContent = event.target.value;
        });
    }

    // --- Developer Testing Helper ---
    // Allows showing a step directly via URL, e.g., /index.html?step=step-amount
    const params = new URLSearchParams(window.location.search);
    const testStep = params.get('step');

    if (testStep) {
        // 1. Hide the original form container
        const originalForm = document.querySelector('.form-container');
        if (originalForm) {
            originalForm.style.display = 'none';
        }

        // 2. Show the new flow container
        const flowContainer = document.getElementById('payment-flow-container');
        if (flowContainer) {
            flowContainer.classList.add('active');
        }

        // 3. Directly show the requested step
        showStep(testStep); // e.g., 'step-amount'
    }
});
