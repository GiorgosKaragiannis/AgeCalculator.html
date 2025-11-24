const DateTime = luxon.DateTime;
const dateInput = document.getElementById('birthdate');

flatpickr(dateInput, {
    dateFormat: "d/m/Y", 
    maxDate: "today", 
    altInput: true,      
    altFormat: "d/m/Y"  
});

const calculatebtn = document.getElementById("button");
const resultDiv = document.getElementById("result");

calculatebtn.addEventListener("click", function() {
    const birthdateString = dateInput.value;

    if (!birthdateString) {
        resultDiv.innerHTML = '<p style="color: red;">Παρακαλώ επιλέξτε την ημερομηνία γέννησης.</p>';
        return;
    }

    const birthDate = DateTime.fromFormat(birthdateString, 'd/M/yyyy');

    if (!birthDate.isValid) {
         resultDiv.innerHTML = '<p style="color: red;">Μη έγκυρη ημερομηνία.</p>';
         return;
    }

    const today = DateTime.local();
    const age = today.diff(birthDate, ['years', 'months', 'days']).toObject();
    
    const years = Math.floor(age.years);
    const months = Math.floor(age.months);
    const days = Math.floor(age.days);

    resultDiv.innerHTML = `
        <p style="font-size: 1.2em; color: #333;">
            You are <span class="highlight-result">${years}</span> years and 
            <span class="highlight-result">${months}</span> months old.
        </p>
        <p>
            (+ ${days} days)
        </p>
    `;
});
