"use strict"

/*
Created by : Beatrice Bjorn
For : Project - Restaurant - webbutveckling III, DT173G
Last updated : 2022-08-21
*/

//gets the url for the rest-api to be used
let appurl = "https://studenter.miun.se/~bebj2100/writeable/projekt_webservice_vt22-BeaBjorn/api/rest_appetizers.php";

//const variables that stores the ids to be used
const appName = document.getElementById("appName");
const appDescription = document.getElementById("appDescription");
const appPrice = document.getElementById("appPrice");
const addAppBtn = document.getElementById("addAppBtn");
const message = document.getElementById("message");
const errMessage = document.getElementById("errMessage");

//an if-statement checking weather elements are present on page or not
if (appName != null && appDescription != null && appPrice != null) {
    //If element is not = 0 an eventlistener is added to the element 
    if (addAppBtn != null) {
        addAppBtn.addEventListener("click", addAppetizer);
    }

    //The function "init" is run when the page gets reloaded
    window.onload = init;
    //The function "init" which runs the function "getAppetizers"
    function init() {
        getAppetizers();
    }
    //The function "getAppetizers" that gets the url stored in the variable "appurl"
    //Through the url all the data stored in the database table gets collected
    //The function "printAppetizers" is run and console.log is used to print any errors to the terminal
    function getAppetizers() {
        fetch(appurl)
            .then(response => {
                if (response.status != 200) {
                    return
                }
                return response.json()
                    .then(data => printAppetizers(data))
                    .catch(err => console.log(err))
            })
    }

    //The function printAppetizers gets the id to the element where data should be printed
    //innerHTML is used to erase previous data from the element 
    //A forEach-loop and innerHTML is used to print data from the database
    //The table-elements are set to contenteditable to enable changes to be made in the table
    function printAppetizers(appetizers) {
        const appEl = document.getElementById("appetizers");
        appEl.innerHTML = "";

        appetizers.forEach(app => {
            appEl.innerHTML += `<tr>
                             <td id="name${app.id}" contenteditable>${app.appName}</td>
                             <td id="description${app.id}" contenteditable>${app.appDescription}</td>
                             <td id="price${app.id}" contenteditable>${app.appPrice}</td>
                             <td class="update" data-id="${app.id}">Update</td>
                             <td class="delete" data-id="${app.id}">Delete</td>
                             </tr>`
        });
        //The classes for delete and update above is stored in variables
        //A for-loop is used to loop through elements and eventlisteners are added so that functions run when the element is clicked
        const delApp = document.getElementsByClassName("delete");
        const updtApp = document.getElementsByClassName("update");
        for (let i = 0; i < delApp.length; i++) {
            delApp[i].addEventListener('click', deleteApp);
            updtApp[i].addEventListener('click', updateApp);
        }
    }
    //A function to update data in database
    //Dataset is used to get the right id for the database
    //Vhanges made in the contenteditable elements are collected with innerHTML and stored in variables
    function updateApp(e) {
        let id = e.target.dataset.id;

        let name = document.getElementById("name" + id).innerHTML;
        let description = document.getElementById("description" + id).innerHTML;
        let price = document.getElementById("price" + id).innerHTML;
        //Values are converted to json-format and entered into the database 
        let jsonStr = JSON.stringify({
            id: id,
            appName: name,
            appDescription: description,
            appPrice: price
        });
        //Fetch is used to get the URL and the method PUT is used to update data in the database
        //The response is checked and if ok the data will get updated and a message about this will show on the screen
        //The function getInfo is run to print the new updated data in the database to the screen
        //console.log is used to print error messages in console
        fetch(appurl, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: jsonStr
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The appetizer has been updated!";
                getAppetizers()
            })
            .catch(err => console.log(err))
    }


    //the function "addAppetizer" takes the values from the input fields in the form and turns them into JSON-format
    //the method POST is then used to post the data to the database, the form is cleared by using the function "clearForm" - 
    //This is done to prevent the same data to be sent several times. Console.log is used to display any errors in the terminal
    function addAppetizer(e) {
        e.preventDefault();

        let name = appName.value;
        let description = appDescription.value;
        let price = appPrice.value;

        let jsonStr = JSON.stringify({
            appName: name,
            appDescription: description,
            appPrice: price
        });
        //Fetch is used to get the URL and the method POST is used to post data in the database
        //The response is checked and if ok the data will get stored and a message about this will show on the screen
        //The function clearAppForm is run to empty all fields in the form
        //console.log is used to print error messages in console
        fetch(appurl, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: jsonStr
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The appetizer has been added!";
                clearAppForm()
            })
            .catch(err => console.log(err))

    }



    //the "deleteApp" function uses dataset target and prints the right id in the url
    //It uses the method DELETE to delete the item with the right id
    //The function getAppetizers is run to update the data after an item has been deletet and any errors will be displayed in the terminal
    function deleteApp(e) {
        let id = e.target.dataset.id;
        fetch(appurl + "?id=" + id, {
            "method": "DELETE"
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The appetizer has been deleted!";
                getAppetizers()
            })
            .catch(err => console.log(err))
    }
    //The function "clearAppForm" sets all the values of the input fields to empty strings when the form has been submitted
    //the function "getAppetizers" is run to update the data printed on the screen
    function clearAppForm() {

        appName.value = "";
        appDescription.value = "";
        appPrice.value = "";

        getAppetizers()

    }
}








//gets the url for the rest-api to be used
let mainurl = "https://studenter.miun.se/~bebj2100/writeable/projekt_webservice_vt22-BeaBjorn/api/rest_mains.php";


//const variables that stores the ids to be used
const mainName = document.getElementById("mainName");
const mainDescription = document.getElementById("mainDescription");
const mainPrice = document.getElementById("mainPrice");
const addMainBtn = document.getElementById("addMainBtn");

//an if-statement checking weather elements are present on page or not
if (mainName != null && mainDescription != null && mainPrice != null) {
    //If element is not = 0 an eventlistener is added to the element 
    if (addMainBtn != null) {
        addMainBtn.addEventListener("click", addMain);
    }

    //The function "init" is run when the page gets reloaded
    window.onload = init;
    //The function "init" which runs the function "getMains"
    function init() {
        getMains();
    }
    //The function "getMains" that gets the url stored in the variable "mainurl"
    //Through the url all the data stored in the database table gets collected
    //The function "printMains" is run and console.log is used to print any errors to the terminal
    function getMains() {
        fetch(mainurl)
            .then(response => {
                if (response.status != 200) {
                    return
                }
                return response.json()
                    .then(data => printMains(data))
                    .catch(err => console.log(err))
            })
    }

    //The function printMains gets the id to the element where data should be printed
    //innerHTML is used to erase previous data from the element 
    //A forEach-loop and innerHTML is used to print data from the database
    //The table-elements are set to contenteditable to enable changes to be made in the table
    function printMains(mains) {
        const mainEl = document.getElementById("mains");
        mainEl.innerHTML = "";

        mains.forEach(main => {
            mainEl.innerHTML += `<tr>
                               <td id="name${main.id}" contenteditable>${main.mainName}</td>
                               <td id="description${main.id}" contenteditable>${main.mainDescription}</td>
                               <td id="price${main.id}" contenteditable>${main.mainPrice}</td>
                               <td class="update" data-id="${main.id}">Update</td>
                               <td class="delete" data-id="${main.id}">Delete</td>
                               </tr>`
        });
        //The classes for delete and update above is stored in variables
        //A for-loop is used to loop through elements and eventlisteners are added so that functions run when the element is clicked
        const delMain = document.getElementsByClassName("delete");
        const updtMain = document.getElementsByClassName("update");
        for (let i = 0; i < delMain.length; i++) {
            delMain[i].addEventListener('click', deleteMain);
            updtMain[i].addEventListener('click', updateMain);
        }
    }
    //A function to update data in database
    //Dataset is used to get the right id for the database
    //Vhanges made in the contenteditable elements are collected with innerHTML and stored in variables
    function updateMain(e) {
        let id = e.target.dataset.id;

        let name = document.getElementById("name" + id).innerHTML;
        let description = document.getElementById("description" + id).innerHTML;
        let price = document.getElementById("price" + id).innerHTML;
        //Values are converted to json-format and entered into the database 
        let jsonStr = JSON.stringify({
            id: id,
            mainName: name,
            mainDescription: description,
            mainPrice: price
        });
        //Fetch is used to get the URL and the method PUT is used to update data in the database
        //The response is checked and if ok the data will get updated and a message about this will show on the screen
        //The function getInfo is run to print the new updated data in the database to the screen
        //console.log is used to print error messages in console
        fetch(mainurl, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: jsonStr
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The main has been updated!";
                getMains()
            })
            .catch(err => console.log(err))

    }

    //the function "addMain" takes the values from the input fields in the form and turns them into JSON-format
    //the method POST is then used to post the data to the database, the form is cleared by using the function "clearForm" - 
    //This is done to prevent the same data to be sent several times. Console.log is used to display any errors in the terminal
    function addMain(e) {
        e.preventDefault();

        let name = mainName.value;
        let description = mainDescription.value;
        let price = mainPrice.value;

        let jsonStr = JSON.stringify({
            mainName: name,
            mainDescription: description,
            mainPrice: price
        });
        //Fetch is used to get the URL and the method POST is used to post data in the database
        //The response is checked and if ok the data will get stored and a message about this will show on the screen
        //The function clearMainForm is run to empty all fields in the form
        //console.log is used to print error messages in console
        fetch(mainurl, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: jsonStr
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The main has been added!";
                clearMainForm()
            })
            .catch(err => console.log(err))

    }



    //the "deleteMain" function uses dataset target and prints the right id in the url
    //It uses the method DELETE to delete the item with the right id
    //The function getMains is run to update the data after an item has been deletet and any errors will be displayed in the terminal
    function deleteMain(e) {
        let id = e.target.dataset.id;
        fetch(mainurl + "?id=" + id, {
            "method": "DELETE"
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The main has been deleted!";
                getMains()
            })
            .catch(err => console.log(err))
    }
    //The function "clearMainForm" sets all the values of the input fields to empty strings when the form has been submitted
    //the function "getMain" is run to update the data printed on the screen
    function clearMainForm() {

        mainName.value = "";
        mainDescription.value = "";
        mainPrice.value = "";

        getMains()

    }
}





//gets the url for the rest-api to be used
let dessurl = "https://studenter.miun.se/~bebj2100/writeable/projekt_webservice_vt22-BeaBjorn/api/rest_desserts.php";


//const variables that stores the ids to be used
const dessName = document.getElementById("dessName");
const dessDescription = document.getElementById("dessDescription");
const dessPrice = document.getElementById("dessPrice");
const addDessBtn = document.getElementById("addDessBtn");

//an if-statement checking weather elements are present on page or not
if (dessName != null && dessDescription != null && dessPrice != null) {
    //If element is not = 0 an eventlistener is added to the element 
    if (addDessBtn != null) {
        addDessBtn.addEventListener("click", addDessert);
    }



    //The function "init" is run when the page gets reloaded
    window.onload = init;
    //The function "init" which runs the function "getDesserts"
    function init() {
        getDesserts();
    }
    //The function "getDesserts" that gets the url stored in the variable "dessurl"
    //Through the url all the data stored in the database table gets collected
    //The function "printDesserts" is run and console.log is used to print any errors to the terminal
    function getDesserts() {
        fetch(dessurl)
            .then(response => {
                if (response.status != 200) {
                    return
                }
                return response.json()
                    .then(data => printDesserts(data))
                    .catch(err => console.log(err))
            })
    }


    //The function printDesserts gets the id to the element where data should be printed
    //innerHTML is used to erase previous data from the element 
    //A forEach-loop and innerHTML is used to print data from the database
    //The table-elements are set to contenteditable to enable changes to be made in the table
    function printDesserts(desserts) {
        const dessEl = document.getElementById("desserts");
        dessEl.innerHTML = "";

        desserts.forEach(dess => {
            dessEl.innerHTML += `<tr>
                               <td id="name${dess.id}" contenteditable>${dess.dessName}</td>
                               <td id="description${dess.id}" contenteditable>${dess.dessDescription}</td>
                               <td id="price${dess.id}" contenteditable>${dess.dessPrice}</td>
                               <td class="update" data-id="${dess.id}">Update</td>
                               <td class="delete" data-id="${dess.id}">Delete</td>
                               </tr>`
        });
        //The classes for delete and update above is stored in variables
        //A for-loop is used to loop through elements and eventlisteners are added so that functions run when the element is clicked
        const delDess = document.getElementsByClassName("delete");
        const updtDess = document.getElementsByClassName("update");
        for (let i = 0; i < delDess.length; i++) {
            delDess[i].addEventListener('click', deleteDessert);
            updtDess[i].addEventListener('click', updateDessert);
        }
    }
    //A function to update data in database
    //Dataset is used to get the right id for the database
    //Vhanges made in the contenteditable elements are collected with innerHTML and stored in variables
    function updateDessert(e) {
        let id = e.target.dataset.id;

        let name = document.getElementById("name" + id).innerHTML;
        let description = document.getElementById("description" + id).innerHTML;
        let price = document.getElementById("price" + id).innerHTML;
        //Values are converted to json-format and entered into the database 
        let jsonStr = JSON.stringify({
            id: id,
            dessName: name,
            dessDescription: description,
            dessPrice: price
        });
        //Fetch is used to get the URL and the method PUT is used to update data in the database
        //The response is checked and if ok the data will get updated and a message about this will show on the screen
        //The function getInfo is run to print the new updated data in the database to the screen
        //console.log is used to print error messages in console
        fetch(dessurl, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: jsonStr
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The dessert has been updated!";
                getDesserts()
            })
            .catch(err => console.log(err))

    }

    //the function "addDessert" takes the values from the input fields in the form and turns them into JSON-format
    //the method POST is then used to post the data to the database, the form is cleared by using the function "clearForm" - 
    //This is done to prevent the same data to be sent several times. Console.log is used to display any errors in the terminal
    function addDessert(e) {
        e.preventDefault();

        let name = dessName.value;
        let description = dessDescription.value;
        let price = dessPrice.value;

        let jsonStr = JSON.stringify({
            dessName: name,
            dessDescription: description,
            dessPrice: price
        });
        //Fetch is used to get the URL and the method POST is used to post data in the database
        //The response is checked and if ok the data will get stored and a message about this will show on the screen
        //The function clearDessForm is run to empty all fields in the form
        //console.log is used to print error messages in console
        fetch(dessurl, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: jsonStr
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The dessert has been added!";
                clearDessForm()
            })
            .catch(err => console.log(err))

    }



    //the "deleteDessert" function uses dataset target and prints the right id in the url
    //It uses the method DELETE to delete the item with the right id
    //The function getDesserts is run to update the data after an item has been deletet and any errors will be displayed in the terminal
    function deleteDessert(e) {
        let id = e.target.dataset.id;
        fetch(dessurl + "?id=" + id, {
            "method": "DELETE"
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The dessert has been deleted!";
                getDesserts()
            })
            .catch(err => console.log(err))
    }
    //The function "clearDessForm" sets all the values of the input fields to empty strings when the form has been submitted
    //the function "getDesserts" is run to update the data printed on the screen
    function clearDessForm() {

        dessName.value = "";
        dessDescription.value = "";
        dessPrice.value = "";

        getDesserts()

    }
}
