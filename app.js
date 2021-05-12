// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    //Hide results
    document.getElementById('results').style.display = 'none';

    //Show loader

    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();

});


function calculateResults(){
    console.log('Calculating.....');
    

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');


    const principal = parseFloat(amount.value);
    const calcuatedInterest = parseFloat(interest.value) /100 /12;
    const calculatedPayments = parseFloat(years.value) * 12;


    //monthly payment
    const x = Math.pow(1 + calcuatedInterest, calculatedPayments);
    const monthly = (principal * x * calcuatedInterest)/(x-1);


    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

        //Show results
        document.getElementById('results').style.display = 'block';
        //Hide loading
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please Check Your Numbers');

    }

    function showError(error){
    //Hide results
     document.getElementById('results').style.display = 'none';
     //Hide loading
     document.getElementById('loading').style.display = 'none';
        const errorDiv = document.createElement('div');

        //Get Elements
        const card = document.querySelector('.card');
        const heading = document.querySelector('.heading');

        //Add class
        errorDiv.className = 'alert alert-danger';

        //Crete text node and append to div
        errorDiv.appendChild(document.createTextNode(error));

        //Insert error above heading
        card.insertBefore(errorDiv, heading);

        //Clear error after 3 seconds
        setTimeout(clearError, 3000,);
    }

    // lear Error
    function clearError(){
        document.querySelector('.alert').remove();
    }



}