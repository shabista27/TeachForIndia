function addRow() 
 {
	 
			
		
			//console.log("hiding button")
			// Hide the button after creating the table
            var button = document.getElementById("showDataButton");
            button.parentNode.removeChild(button);
			getData()
            // Show the table
            var table = document.getElementById("dynamic-table");
            table.style.display = "table";

            
        }
		
		function getData() 
		{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:5000/getData", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                // Parse the JSON response
                var responseData = JSON.parse(xhr.responseText);
				console.log("Response from server:", responseData);
				createDynamicTable(responseData);
                // Handle the JSON data here (e.g., display it on the webpage)
                
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        } else 
		{
            console.error("Request failed with status:", xhr.status,xhr.responseText);
        }
    };

    xhr.onerror = function () {
        console.error("Server Error.Reach out to Server Administer");
    };

    // Send an empty JSON object as the request body
    var requestBody = JSON.stringify({});
    xhr.send(requestBody);
}



function createDynamicTable(data) 


{
    var table = document.getElementById("dynamic-table");
    var tbody = table.getElementsByTagName("tbody")[0]; // Get the table body
	var rowCountElement = document.getElementById("row-count");
	var showButton = document.getElementById("showMatchingApplicants");
	var rowCount = 0;

    // Clear existing table rows and headers (if any)
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    while (table.tHead.firstChild) {
        table.tHead.removeChild(table.tHead.firstChild);
    }

    // Determine the order of columns (excluding _id)
    var columnOrder = ["Serial Number", "Name", "Phone Number", "Email", "Location", "Languages", "Available Days"];
    var otherColumns = Object.keys(data[0]).filter(key => key !== "_id" && !columnOrder.includes(key));

    // Create table headers for the specified columns
    var headerRow = table.createTHead().insertRow();
    columnOrder.forEach(function (columnName) {
        var th = document.createElement("th");
        th.textContent = columnName;
        headerRow.appendChild(th);
    });

    // Populate the table with data for the specified columns and add serial numbers
    data.forEach(function (item, index) 
	{
        var row = tbody.insertRow();
        var serialCell = row.insertCell();
        serialCell.textContent = index + 1; // Serial number
        columnOrder.slice(1).forEach(function (columnName) {
            var cell = row.insertCell();
            cell.textContent = item[columnName];
        });
    });
	
	 rowCount++;

    // Add headers and data for the other columns (excluding _id)
    otherColumns.forEach(function (columnName) {
        columnOrder.push(columnName);
        headerRow.appendChild(document.createElement("th")).textContent = columnName;
        data.forEach(function (item, index) {
            var cell = tbody.rows[index].insertCell();
            cell.textContent = item[columnName];
        });
    });
	
	// Update the row count
   // Update the row count
    var rowCount = tbody.rows.length;
    rowCountElement.textContent = "Total Applicants: " + rowCount;
	
	// Show/hide the button based on the row count. this button will show the matching Applicants
    if (rowCount >= 20)
	{ showButton.style.display = "block"; // Show the button
	
	} else {
        showButton.style.display = "none";
    }
}


//for matched applicants

function matchApplicant()
{
	getMatchedApplicantData()
			//console.log("hiding button")
			// Hide the button after creating the table
           // var button = document.getElementById("showDataButton");
           // button.parentNode.removeChild(button);
		   var table = document.getElementById("dynamic-table");
            table.style.display = "none";
		var rowCountElement = document.getElementById("row-count");
			rowCountElement.style.display="none";
			// Show the table
            var table = document.getElementById("applicants-match-table");
            table.style.display = "table";
			
			
			
            

}
function getMatchedApplicantData() 
		{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:5000/getApplicantData", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onload = function () 
	{
        if (xhr.status === 200) {
            try {
                // Parse the JSON response
                var matchApplicant = JSON.parse(xhr.responseText);
				console.log("Response from server:", matchApplicant);
				//alert(matchApplicant)
				createApplicantTable(matchApplicant);
                // Handle the JSON data here (e.g., display it on the webpage)
                
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        } else 
		{
            console.error("Request failed with status:", xhr.status,xhr.responseText);
        }
    };

    xhr.onerror = function () {
        console.error("Server Error.Reach out to Server Administer");
    };

    // Send an empty JSON object as the request body
    var requestBody = JSON.stringify({});
    xhr.send(requestBody);
}


function createApplicantTable(matchApplicant) {
    // Get the table element where you want to display the data
    var table = document.getElementById("applicants-match-table");

    // Create a table header row
    var headerRow = table.insertRow(0);

    // Define the headers for the table
    var headers = ["Name", "Classroom", "Location", "Languages", "Phone Number", "Email"];

    // Create header cells and set their text content
    for (var i = 0; i < headers.length; i++) {
        var headerCell = document.createElement("th");
        headerCell.textContent = headers[i];
        headerRow.appendChild(headerCell);
    }

    // Iterate through all matched applicants and create table rows
    for (var i = 0; i < matchApplicant.length; i++) {
        var applicantInfoArray = matchApplicant[i].AdditionalInfo; // Extract the array of applicant information
        var classroom = matchApplicant[i].Classroom; // Extract classroom information

        if (applicantInfoArray && applicantInfoArray.length > 0) {
            var applicantInfo = applicantInfoArray[0]; // Get the first object in the array

            // Create a new row for each entry
            var row = table.insertRow(i + 1);

            // Create cells for each data field
            var nameCell = row.insertCell(0);
            var classroomCell = row.insertCell(1);
            var locationCell = row.insertCell(2);
            var languagesCell = row.insertCell(3);
            var phoneCell = row.insertCell(4);
            var emailCell = row.insertCell(5);

            // Set the cell values based on the extracted data
            nameCell.textContent = applicantInfo.Name; // Display the applicant's name
            classroomCell.textContent = classroom; // Display the classroom
            locationCell.textContent = applicantInfo.Location;
            languagesCell.textContent = applicantInfo.Languages; // Display the applicant's languages
            phoneCell.textContent = applicantInfo["Phone Number"];
            emailCell.textContent = applicantInfo.Email;
        }
    }
	
	// Add a row at the end to display the count of rows
    var rowCount = matchApplicant.length;
    var countRow = table.insertRow(rowCount + 1);
    var countCell = countRow.insertCell(0);
    countCell.setAttribute("colspan", headers.length);
    countCell.textContent = "Total Rows: " + rowCount;
}
