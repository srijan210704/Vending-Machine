document.addEventListener("DOMContentLoaded", function () {
    const purchaseButtons = document.querySelectorAll('.purchase-button');
    const balanceAmount = document.getElementById('balance-amount');
    const coinInput = document.getElementById('coin-input');
    const addMoneyButton = document.getElementById('add-money-button');
    const loadingWindow = document.getElementById('loading-window');

    let balance = 0;

    // Add a click event listener for the "Add Money" button
    addMoneyButton.addEventListener('click', function () {
        const coinValue = parseFloat(coinInput.value);
        if (!isNaN(coinValue) && coinValue > 0) {
            balance += coinValue;
            coinInput.value = ''; // Clear the input field
            updateBalanceDisplay();
        } else {
            alert('Invalid coin value. Please enter a valid amount.');
        }
    });

    purchaseButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const product = this.parentElement;
            const priceText = product.querySelector('.product-price').textContent;
            const price = parseFloat(priceText.substring(1)); // Remove '₹' symbol and parse as a float

            if (balance >= price) {
                // Show the loading window
                loadingWindow.style.display = 'block';

                // Simulate a delay for product dispensing
                setTimeout(function () {
                    balance -= price;
                    updateBalanceDisplay();

                    // Hide the loading window
                    loadingWindow.style.display = 'none';

                    alert(`Dispensing ${product.querySelector('.product-name').textContent}...`);
                    // Delay for product dispensing (you can customize this)

                    alert(`You purchased ${product.querySelector('.product-name').textContent} for ₹${price.toFixed(2)}`);
                }, 2000); // Adjust the delay as needed (2 seconds in this example)
            } else {
                alert('Insufficient balance. Please insert more coins.');
            }
        });
    });

    function updateBalanceDisplay() {
        balanceAmount.textContent = `₹${balance.toFixed(2)}`;
    }
});
