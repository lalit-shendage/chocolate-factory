// JavaScript code
const chocolatesData = [
    { name: 'Chocolate 1', price: 2.50, image: 'https://www.bigbasket.com/media/uploads/p/l/40018532_7-nestle-chocolate-classic.jpg' },
    { name: 'Chocolate 2', price: 3.00, image: 'https://www.bigbasket.com/media/uploads/p/l/1212423_6-cadbury-5-star-chocolate-home-pack-20-units.jpg' },
    { name: 'Chocolate 3', price: 3.50, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_u6X99MM5cjVDhKht9whKGHd2TOZDqq3Pg&usqp=CAU' },
    { name: 'Chocolate 4', price: 3.20, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaqhiPOtQ6OXt_zmmn5SZiEzfwy0UlOHqE_w&usqp=CAU' },
    { name: 'Chocolate 5', price: 1.80, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSveujcP9xv4HnWJsv87LFw41AbfOo54JONcg&usqp=CAU' }
];


const chocolatesContainer = document.getElementById('chocolates');
const totalPrice = document.getElementById('total-price');
const totalChocolates = document.getElementById('total-chocolates');
const totalChocolatesContainer = document.getElementById('total-chocolates-container');
const checkoutButton = document.getElementById('checkout-button');

let selectedChocolates = [];

function createChocolateElement(chocolate, index) {
    const chocolateItem = document.createElement('div');
    chocolateItem.className = 'chocolate-item';

    const label = document.createElement('label');
    label.setAttribute('for', `chocolate${index + 1}`);
    label.textContent = `${chocolate.name} ($${chocolate.price.toFixed(2)})`;

    const image = document.createElement('img');
    image.src = chocolate.image;
    image.alt = chocolate.name;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `chocolate${index + 1}`;
    checkbox.className = 'chocolate-checkbox';
    checkbox.setAttribute('data-price', chocolate.price.toFixed(2));

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.className = 'quantity-input';
    quantityInput.min = '0';
    quantityInput.value = '0';

    chocolateItem.appendChild(label);
    chocolateItem.appendChild(image);
    chocolateItem.appendChild(checkbox);
    chocolateItem.appendChild(quantityInput);

    checkbox.addEventListener('change', () => {
        const isChecked = checkbox.checked;
        if (isChecked) {
            // Check if the chocolate is already in the selectedChocolates array
            const existingChocolate = selectedChocolates.find(choc => choc.name === chocolate.name);
            if (!existingChocolate) {
                selectedChocolates.push({ name: chocolate.name, price: chocolate.price, quantity: 0 });
            }
        } else {
            selectedChocolates = selectedChocolates.filter(choc => choc.name !== chocolate.name);
        }
        updateTotalPrice();
    });

    quantityInput.addEventListener('input', () => {
        const quantity = parseInt(quantityInput.value);
        if (!isNaN(quantity)) {
            // Find the chocolate in selectedChocolates and update its quantity
            const selectedChocolate = selectedChocolates.find(choc => choc.name === chocolate.name);
            if (selectedChocolate) {
                selectedChocolate.quantity = quantity;
            }
        }
        updateTotalPrice();
    });

    return chocolateItem;
}

chocolatesData.forEach((chocolate, index) => {
    const chocolateItem = createChocolateElement(chocolate, index);
    chocolatesContainer.appendChild(chocolateItem);
});

const checkboxes = document.querySelectorAll('.chocolate-checkbox');
const quantityInputs = document.querySelectorAll('.quantity-input');

function updateTotalPrice() {
    let total = 0;
    let totalChocs = 0;

    selectedChocolates.forEach(choc => {
        total += choc.price * choc.quantity;
        totalChocs += choc.quantity;
    });

    totalPrice.textContent = total.toFixed(2);
    totalChocolates.textContent = totalChocs;

    // Check if the total chocolates exceed 8
    if (totalChocs > 8) {
        alert('You cannot select more than 8 chocolates.');
        resetSelection();
        updateTotalPrice();
    }

    // Show or hide total chocolates container based on total chocolates
   
}

function resetSelection() {
    selectedChocolates = [];
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
    quantityInputs.forEach((input) => {
        input.value = '0';
    });
}

checkoutButton.addEventListener('click', () => {
    if (selectedChocolates.length === 0) {
        alert('Please select chocolates before checking out.');
    } else {
        alert('Thank you for your order!');
        // You can add more functionality for checkout here
    }
});

// Initial update of the total price
updateTotalPrice();
