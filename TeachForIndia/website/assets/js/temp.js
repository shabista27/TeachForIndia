var name = "";
var phone = "";
var email = "";
var loc = "";
var lang = "";
var days = "";
let element = document.getElementById("lds-heart");
let hidden = element.getAttribute("hidden");

function process() {
    // Getting data from form
    name = document.getElementById("name").value;
    phone = document.getElementById("number").value;
    email = document.getElementById("email").value;
    loc = document.getElementById("location").value;
    lang = document.getElementById("language").value;

    var array = [];
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

    for (var i = 0; i < checkboxes.length; i++) {
        array.push(checkboxes[i].value);
    }

    days = array.toString();

    console.log(array);
    console.log(name);
    console.log(phone);
    console.log(email);
    console.log(loc);
    console.log(lang);
    console.log(days);

    if (name == "" || phone == "" || email == "" || loc == "" || lang == "" || days == "") {
        alert("Some fields are empty");
    } 
	else 
	{
        
        sendData();
    }
}

function sendData() {
    if (name == "" || phone == "" || email == "" || loc == "" || lang == "" || days == "") {
        alert("Some fields are empty");
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
    console.log(myObj);

    $.ajax({
        url: 'http://localhost:5000/registration',
        method: 'POST',
        data: JSON.stringify(myObj),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text'
        },
		  beforeSend: function()
   {
    // Show image container
       element.setAttribute("hidden", "hidden");
		
		console.log("inside here")
		$("#register").hide();
   },
        success: function (response) 
		{
			$("#lds-heart").hide();
           // $("#register").show();
            location.replace("index.html");
            alert("Registered Successfully");
			getElementById("popup").style.visibility = "visible"; 
			
        },
        error: function (jqXHR, exception) {
            if (jqXHR.status == 400) {
                alert("You are already Registered! Please login.");
                location.replace("index.html");
            } else {
                alert(exception);
                alert("There is an issue on the server. Please contact system administrator.");
            }
        }
    });
}
