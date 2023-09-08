// Add an event listener to the submit button
document.getElementById("submit-button").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    process(); // Call the process function when the button is clicked
});




var modal = document.getElementById("myModal");
var modalMessage = document.getElementById("validation-message");
var modalCloseButton = document.getElementById("modal-close-button");
var modalOverlay = document.getElementById("modal-overlay");

function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = "block";
    modalOverlay.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
    modalOverlay.style.display = "none";
}

function showSuccessModal(message) {
    showModal(message);

    setTimeout(function () {
        closeModal();
    }, 10000); // 10000 milliseconds (10 seconds)
}
modalCloseButton.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
        closeModal();
    }
});

// Example usage:
// showModal("This is a validation message");



function process() {
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phnumber").value;
    var email = document.getElementById("email").value;
    var loc = document.getElementById("location").value;
    var lang = document.getElementById("language").value;
	
 var selectedDays = [];
    var checkboxes = document.querySelectorAll('.weekday:checked');
    checkboxes.forEach(function (checkbox) {
        selectedDays.push(checkbox.value);
    });

    var days = selectedDays.join(', ');


    // Validation
    if (!name.trim() || !phone.trim() || !email.trim() || !loc.trim() || !lang.trim() || selectedDays.length === 0) {
        showModal("Please fill in all required fields and select at least one day.");
    } else if (!validateEmail(email)) {
        showModal("Please enter a valid email address.");
    } else {
        sendData(name, phone, email, loc, lang, selectedDays.join(",")); // Convert selectedDays to a comma-separated string
    }
}

// Function to validate email address format
function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}



function sendData(name, phone, email, loc, lang, days) {
    if (name == "" || phone == "" || email == "" || loc == "" || lang == "" || days == "") {
        showModal("Some fields are empty");
		
        return;
    }

    var myObj = {
        "Name": name,
        "PhoneNumber": phone,
        "Email": email,
        "Location": loc,
        "Lang": lang,
        "Days": days
    };
	console.log(days)

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5000/registration", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onload = function () {
        if (xhr.status === 200)
			{
				alert("Registration successful! We will Get in Touch Soon");
			location.replace("index.html")
        } else {
           
			showModal("Registration failed. Please try again.");
        }
    };

    xhr.onerror = function () {
        alert("Server Error.Reach out to Server Administer.");
    };

    xhr.send(JSON.stringify(myObj));
}
