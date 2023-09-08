// Add an event listener to the submit button
document.getElementById("logIn").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    process1(); // Call the process function when the button is clicked
});


function process1()
{
 var username=document.getElementById("Username").value;
 var password=document.getElementById("password").value;




    if (username=="" || password=="") 
	{
        alert("Fill All Feilds");
    }
	else 
	{
        sendData1(username, password);
    }

}

function sendData1(username, password)
{
	var myObj = {
        "username" : username,
		"password" : password
    };
	
	
	
	var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5000/adminlogIn", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onload = function () {
        if (xhr.status === 200) 
		{
            alert("Log In Successfull");
			//document.getElementById("popup").style.visibility = "visible"; 
			location.replace("index.html#showData")
        } 
		else 
		{
            alert("Invalid Credentionals");
        }
    };

    xhr.onerror = function () 
	{
		
        alert("Server Error.Reach out to Server Administer");
    };

    xhr.send(JSON.stringify(myObj));
}