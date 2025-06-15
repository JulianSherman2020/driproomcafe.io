const factsDiv = document.getElementById("facts"); // Find div to display data
window.addEventListener('load', callRandomCatFactsAPI) // Adds an event listener to the window that detects the load event

//Call to the API and get a list of random cat facts
async function callRandomCatFactsAPI() {
    //Try and run the following code
    try {
        const response = await fetch("https://catfact.ninja/facts?limit=5"); //Call the API and get a list of random facts
        const data = await response.json(); //Get a list of random facts from the response
        console.log(data); //Output the list of random facts to the console
        //displayData(data) //Pass the list of random facts to the displayData function
    }
    //Catch the error if it the code in the try block fails
    catch (error) {
        console.log(error); //Output the error to the console
        const p = document.getElementById("error"); // Find the P element with the ID of error
        p.innerHTML = "Sorry there's an error! 🤕" // Displays a error message
    }
}

//Displays the data on the page
//Parameters: Data - The data to display from the API
function displayData(data) {
    //Loop over the array of random facts 
    for (var i = 0; i < data.data.length; i++) {
        const para = document.createElement("p"); //Create a p element to display the data
        para.innerHTML = `Fact ${i}: ${data.data[i].fact}`; //Add the first fact to the p element
        factsDiv.appendChild(para); //Append the p element to the facts div on the page
    }
}