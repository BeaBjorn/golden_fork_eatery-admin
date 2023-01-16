"use strict"

/*
Created by : Beatrice Bjorn
For : Project - Restaurant - webbutveckling III, DT173G
Last updated : 2022-08-21
*/

//gets the url for the rest-api to be used
let alcoholurl = "https://studenter.miun.se/~bebj2100/writeable/projekt_webservice_vt22-BeaBjorn/api/rest_alcohol.php";


//const variables that stores the ids to be used
const alcName = document.getElementById("alcName");
const alcPrice = document.getElementById("alcPrice");
const addAlcBtn = document.getElementById("addAlcBtn");

//an if-statement checking weather elements are present on page or not
if (alcName != null && alcPrice != null) {
    //If element is not = 0 an eventlistener is added to the element 
    if (addAlcBtn != null) {
        addAlcBtn.addEventListener("click", addDrink);
    }
    //The function "init" is run when the page gets reloaded
    window.onload = init;
    //The function "init" which runs the function "getDrinks"
    function init() {
        getDrinks();
    }
    //The function "getDrinks" that gets the url stored in the variable "alcoholurl"
    //Through the url all the data stored in the database table gets collected
    //The function "printDrinks" is run and console.log is used to print any errors to the terminal
    function getDrinks() {
        fetch(alcoholurl)
            .then(response => {
                if (response.status != 200) {
                    return
                }
                return response.json()
                    .then(data => printDrinks(data))
                    .catch(err => console.log(err))
            })
    }

    //The function printDrinks gets the id to the element where data should be printed
    //innerHTML is used to erase previous data from the element 
    //A forEach-loop and innerHTML is used to print data from the database
    //The table-elements are set to contenteditable to enable changes to be made in the table
    function printDrinks(drinks) {
        const alcEl = document.getElementById("alcohol");
        alcEl.innerHTML = "";

        drinks.forEach(drink => {
            alcEl.innerHTML += `<tr>
                           <td id="name${drink.id}" contenteditable>${drink.drinkName}</td>
                           <td id="price${drink.id}" contenteditable>${drink.drinkPrice}</td>
                           <td class="update" data-id="${drink.id}">Update</td>
                           <td class="delete" data-id="${drink.id}">Delete</td>
                           </tr>`
        });
        //The classes for delete and update above is stored in variables
        //A for-loop is used to loop through elements and eventlisteners are added so that functions run when the element is clicked
        let delAlc = document.getElementsByClassName("delete");
        let updtAlc = document.getElementsByClassName("update");
        for (let i = 0; i < delAlc.length; i++) {
            delAlc[i].addEventListener('click', deleteDrink);
            updtAlc[i].addEventListener('click', updateDrink);
        }
    }

    //A function to update data in database
    //Dataset is used to get the right id for the database
    //Vhanges made in the contenteditable elements are collected with innerHTML and stored in variables
    function updateDrink(e) {
        let id = e.target.dataset.id;
        let name = document.getElementById("name" + id).innerHTML;
        let price = document.getElementById("price" + id).innerHTML;
        //Values are converted to json-format and entered into the database 
        let jsonStr = JSON.stringify({
            id: id,
            drinkName: name,
            drinkPrice: price
        });
        //Fetch is used to get the URL and the method PUT is used to update data in the database
        //The response is checked and if ok the data will get updated and a message about this will show on the screen
        //The function getInfo is run to print the new updated data in the database to the screen
        //console.log is used to print error messages in console
        fetch(alcoholurl, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: jsonStr
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The drink has been updated!";
                getDrinks()
            })
            .catch(err => console.log(err))
    }

    //the "deleteDrink" function uses dataset target and prints the right id in the url
    //It uses the method DELETE to delete the item with the right id
    //The function getDrinks is run to update the data after an item has been deletet and any errors will be displayed in the terminal
    function deleteDrink(e) {
        let id = e.target.dataset.id;
        fetch(alcoholurl + "?id=" + id, {
            "method": "DELETE"
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The drink has been deleted!";
                getDrinks()
            })
            .catch(err => console.log(err))
    }
    //the function "addDrink" takes the values from the input fields in the form and turns them into JSON-format
    //the method POST is then used to post the data to the database, the form is cleared by using the function "clearForm" - 
    //This is done to prevent the same data to be sent several times. Console.log is used to display any errors in the terminal
    function addDrink(e) {
        e.preventDefault();

        let name = alcName.value;
        let price = alcPrice.value;

        let jsonStr = JSON.stringify({
            drinkName: name,
            drinkPrice: price
        });
        //Fetch is used to get the URL and the method POST is used to post data in the database
        //The response is checked and if ok the data will get stored and a message about this will show on the screen
        //The function clearForm is run to empty all fields in the form
        //console.log is used to print error messages in console
        fetch(alcoholurl, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: jsonStr
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The drink has been added!";
                clearForm()
            })
            .catch(err => console.log(err))

    }

    //The function "clearForm" sets all the values of the input fields to empty strings when the form has been submitted
    //the function "getDrinks" is run to update the data printed on the screen
    function clearForm() {

        alcName.value = "";
        alcPrice.value = "";

        getDrinks();

    }
}





//gets the url for the rest-api to be used
let noalcurl = "https://studenter.miun.se/~bebj2100/writeable/projekt_webservice_vt22-BeaBjorn/api/rest_noAlcohol.php";
//const variables that stores the ids of the elements in index.html
const noAlcName = document.getElementById("noAlcName");
const noAlcPrice = document.getElementById("noAlcPrice");
const addNoAlcBtn = document.getElementById("addNoAlcBtn");


if (noAlcName != null && noAlcPrice != null) {
    //an eventlistener is added to the button element and the function addCourse is run when the element is clicked
    if (addNoAlcBtn != null) {
        addNoAlcBtn.addEventListener("click", addDrink);
    }
    //The function "init" is run when the page gets reloaded
    window.onload = init;
    //The function "init" which runs the function "getCourses"
    function init() {
        getDrinks();
    }
    //The function "getDrinks" that gets the url stored in the variable "noalcurl"
    //Through the url all the data stored in the database table gets collected
    //The function "printDrinks" is run and console.log is used to print any errors to the terminal
    function getDrinks() {
        fetch(noalcurl)
            .then(response => {
                if (response.status != 200) {
                    return
                }
                return response.json()
                    .then(data => printDrinks(data))
                    .catch(err => console.log(err))
            })
    }

    //The function printDrinks gets the id to the element where data should be printed
    //innerHTML is used to erase previous data from the element 
    //A forEach-loop and innerHTML is used to print data from the database
    //The table-elements are set to contenteditable to enable changes to be made in the table
    function printDrinks(drinks) {
        const noalcEl = document.getElementById("noalcohol");
        noalcEl.innerHTML = "";

        drinks.forEach(drink => {
            noalcEl.innerHTML += `<tr>
                           <td id="name${drink.id}" contenteditable>${drink.drinkName}</td>
                           <td id="price${drink.id}" contenteditable>${drink.drinkPrice}</td>
                           <td class="update" data-id="${drink.id}">Update</td>
                           <td class="delete" data-id="${drink.id}">Delete</td>
                           </tr>`
        });
        //The classes for delete and update above is stored in variables
        //A for-loop is used to loop through elements and eventlisteners are added so that functions run when the element is clicked
        let delNoAlc = document.getElementsByClassName("delete");
        let updtNoAlc = document.getElementsByClassName("update");
        for (let i = 0; i < delNoAlc.length; i++) {
            delNoAlc[i].addEventListener('click', deleteDrink);
            updtNoAlc[i].addEventListener('click', updateDrink);
        }
    }
    //A function to update data in database
    //Dataset is used to get the right id for the database
    //Vhanges made in the contenteditable elements are collected with innerHTML and stored in variables
    function updateDrink(e) {
        let id = e.target.dataset.id;
        let name = document.getElementById("name" + id).innerHTML;
        let price = document.getElementById("price" + id).innerHTML;
        //Values are converted to json-format and entered into the database 
        let jsonStr = JSON.stringify({
            id: id,
            drinkName: name,
            drinkPrice: price
        });
        //Fetch is used to get the URL and the method PUT is used to update data in the database
        //The response is checked and if ok the data will get updated and a message about this will show on the screen
        //The function getInfo is run to print the new updated data in the database to the screen
        //console.log is used to print error messages in console
        fetch(noalcurl, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: jsonStr
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The drink has been updated!";
                getDrinks()
            })
            .catch(err => console.log(err))
    }

    //the "deleteDrink" function uses dataset target and prints the right id in the url
    //It uses the method DELETE to delete the item with the right id
    //The function getDrinks is run to update the data after an item has been deletet and any errors will be displayed in the terminal
    function deleteDrink(e) {
        let id = e.target.dataset.id;
        fetch(noalcurl + "?id=" + id, {
            "method": "DELETE"
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The drink has been deleted!";
                getDrinks()
            })
            .catch(err => console.log(err))
    }
    //the function "addDrink" takes the values from the input fields in the form and turns them into JSON-format
    //the method POST is then used to post the data to the database, the form is cleared by using the function "clearForm" - 
    //This is done to prevent the same data to be sent several times. Console.log is used to display any errors in the terminal
    function addDrink(e) {
        e.preventDefault();

        let name = noAlcName.value;
        let price = noAlcPrice.value;

        let jsonStr = JSON.stringify({
            drinkName: name,
            drinkPrice: price
        });
        //Fetch is used to get the URL and the method POST is used to post data in the database
        //The response is checked and if ok the data will get stored and a message about this will show on the screen
        //The function clearForm is run to empty all fields in the form
        //console.log is used to print error messages in console
        fetch(noalcurl, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: jsonStr
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The drink has been added!";
                clearForm()
            })
            .catch(err => console.log(err))

    }

    //The function "clearForm" sets all the values of the input fields to empty strings when the form has been submitted
    //the function "getDrinks" is run to update the data printed on the screen
    function clearForm() {

        noAlcName.value = "";
        noAlcPrice.value = "";

        getDrinks();

    }
}






//gets the url for the rest-api to be used
let hotDurl = "https://studenter.miun.se/~bebj2100/writeable/projekt_webservice_vt22-BeaBjorn/api/rest_hotDrinks.php";
//const variables that stores the ids of the elements in index.html
const hotName = document.getElementById("hotName");
const hotPrice = document.getElementById("hotPrice");
const addHotBtn = document.getElementById("addHotBtn");


if (hotName != null && hotPrice != null) {
    //an eventlistener is added to the button element and the function addCourse is run when the element is clicked
    if (addHotBtn != null) {
        addHotBtn.addEventListener("click", addDrink);
    }
    //The function "init" is run when the page gets reloaded
    window.onload = init;
    //The function "init" which runs the function "getCourses"
    function init() {
        getDrinks();
    }
    //The function "getDrinks" that gets the url stored in the variable "hoturl"
    //Through the url all the data stored in the database table gets collected
    //The function "printDrinks" is run and console.log is used to print any errors to the terminal
    function getDrinks() {
        fetch(hotDurl)
            .then(response => {
                if (response.status != 200) {
                    return
                }
                return response.json()
                    .then(data => printDrinks(data))
                    .catch(err => console.log(err))
            })
    }

    //The function printDrinks gets the id to the element where data should be printed
    //innerHTML is used to erase previous data from the element 
    //A forEach-loop and innerHTML is used to print data from the database
    //The table-elements are set to contenteditable to enable changes to be made in the table
    function printDrinks(drinks) {
        const hotEl = document.getElementById("hotDrinks");
        hotEl.innerHTML = "";

        drinks.forEach(drink => {
            hotEl.innerHTML += `<tr>
                           <td id="name${drink.id}" contenteditable>${drink.drinkName}</td>
                           <td id="price${drink.id}" contenteditable>${drink.drinkPrice}</td>
                           <td class="update" data-id="${drink.id}">Update</td>
                           <td class="delete" data-id="${drink.id}">Delete</td>
                           </tr>`
        });
        //The classes for delete and update above is stored in variables
        //A for-loop is used to loop through elements and eventlisteners are added so that functions run when the element is clicked
        let delHot = document.getElementsByClassName("delete");
        let updtHot = document.getElementsByClassName("update");
        for (let i = 0; i < delHot.length; i++) {
            delHot[i].addEventListener('click', deleteDrink);
            updtHot[i].addEventListener('click', updateDrink);
        }
    }
    //A function to update data in database
    //Dataset is used to get the right id for the database
    //Vhanges made in the contenteditable elements are collected with innerHTML and stored in variables
    function updateDrink(e) {
        let id = e.target.dataset.id;
        let name = document.getElementById("name" + id).innerHTML;
        let price = document.getElementById("price" + id).innerHTML;
        //Values are converted to json-format and entered into the database 
        let jsonStr = JSON.stringify({
            id: id,
            drinkName: name,
            drinkPrice: price
        });
        //Fetch is used to get the URL and the method PUT is used to update data in the database
        //The response is checked and if ok the data will get updated and a message about this will show on the screen
        //The function getInfo is run to print the new updated data in the database to the screen
        //console.log is used to print error messages in console
        fetch(hotDurl, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: jsonStr
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The drink has been updated!";
                getDrinks()
            })
            .catch(err => console.log(err))
    }

    //the "deleteDrink" function uses dataset target and prints the right id in the url
    //It uses the method DELETE to delete the item with the right id
    //The function getDrinks is run to update the data after an item has been deletet and any errors will be displayed in the terminal
    function deleteDrink(e) {
        let id = e.target.dataset.id;
        fetch(hotDurl + "?id=" + id, {
            "method": "DELETE"
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The drink has been deleted!";
                getDrinks()
            })
            .catch(err => console.log(err))
    }
    //the function "addDrink" takes the values from the input fields in the form and turns them into JSON-format
    //the method POST is then used to post the data to the database, the form is cleared by using the function "clearForm" - 
    //This is done to prevent the same data to be sent several times. Console.log is used to display any errors in the terminal
    function addDrink(e) {
        e.preventDefault();

        let name = hotName.value;
        let price = hotPrice.value;

        let jsonStr = JSON.stringify({
            drinkName: name,
            drinkPrice: price
        });
        //Fetch is used to get the URL and the method POST is used to post data in the database
        //The response is checked and if ok the data will get stored and a message about this will show on the screen
        //The function clearForm is run to empty all fields in the form
        //console.log is used to print error messages in console
        fetch(hotDurl, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: jsonStr
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The drink has been added!";
                clearForm()
            })
            .catch(err => console.log(err))

    }

    //The function "clearForm" sets all the values of the input fields to empty strings when the form has been submitted
    //the function "getDrinks" is run to update the data printed on the screen
    function clearForm() {

        hotName.value = "";
        hotPrice.value = "";

        getDrinks();

    }
}