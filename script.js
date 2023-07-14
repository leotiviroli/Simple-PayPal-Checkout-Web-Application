function removeProduct(productId) {
    var product = document.getElementById(productId);
    product.parentNode.removeChild(product);
    calculateTotal();
  }
  
  function calculateTotal() {
    var products = document.getElementsByClassName('product');
    var total = 0;
  
    for (var i = 0; i < products.length; i++) {
      var price = parseFloat(products[i].querySelector('.price').textContent);
      var quantity = parseInt(products[i].querySelector('.quantity').value);
  
      total += price * quantity;
    }
  
    document.getElementById('total').textContent = total.toFixed(2);
  }
  
 
  function validateForm() {
    var firstName = document.getElementById("first-name").value;
    var lastName = document.getElementById("last-name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var addressLine1 = document.getElementById("address-line1").value;
    var state = document.getElementById("state").value;
    var zip = document.getElementById("zip").value;
    var country = document.getElementById("country").value;
  
    if (
      !firstName || !lastName || !email || !phone ||
      !addressLine1 || !state || !zip || !country ||
      firstName.trim() === "" || lastName.trim() === "" ||
      email.trim() === "" || phone.trim() === "" ||
      addressLine1.trim() === "" || state.trim() === "" ||
      zip.trim() === "" || country.trim() === ""
    ) {
      alert("Please fill in all the required fields.");
      return false;
    }
  
    return true;
  }
  
  const checkoutButton = document.querySelector(".checkout");




const paypalButtonContainer = document.querySelector(
  "#paypal-button-container"
);

const form = document.querySelector("form");
form.addEventListener("change", function (event) {
  
  if (form.checkValidity()) {
    paypalButtonContainer.removeAttribute("disabled");
  } else {
    paypalButtonContainer.setAttribute("disabled", "");
  }
});


