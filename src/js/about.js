"use strict"

/*
Created by : Beatrice Bjorn
For : Project - Restaurant - webbutveckling III, DT173G
Last updated : 2022-08-21
*/

//gets the url for the rest-api to be used
let infourl = "https://studenter.miun.se/~bebj2100/writeable/projekt_webservice_vt22-BeaBjorn/api/rest_about.php";

//const variables that stores the ids to be used
const titel = document.getElementById("titel");
const info = document.getElementById("info");
const addInfoBtn = document.getElementById("addInfoBtn");

//an if-statement checking weather elements are present on page or not
if (titel != null && info != null) {
    //If element is not = 0 an eventlistener is added to the element
    if (addInfoBtn != null) {
        addInfoBtn.addEventListener("click", addInfo);
    }
    //The function "init" is run when the page gets reloaded
    window.onload = init;
    //The function "init" which runs the function "getInfo"
    function init() {
        getInfo();
    }
    //The function "getInfo" that gets the url stored in the variable "infourl"
    //Through the url all the data stored in the database table gets collected
    //The function "printInfo" is run and console.log is used to print any errors to the terminal
    function getInfo() {
        fetch(infourl)
            .then(response => {
                if (response.status != 200) {
                    return
                }
                return response.json()
                    .then(data => printInfo(data))
                    .catch(err => console.log(err))
            })
    }

    //The function printInfo gets the id to the element where data should be printed
    //innerHTML is used to erase previous data from the element 
    //A forEach-loop and innerHTML is used to print new data from the database
    //The table-elements are set to contenteditable to enable changes to be made in the table
    function printInfo(info) {
        const infoEl = document.getElementById("aboutUs");
        infoEl.innerHTML = "";
        info.forEach(i => {
            infoEl.innerHTML += `<div><h3 contenteditable id="titel${i.id}">${i.titel}</h3>
                           <p contenteditable id="info${i.id}">${i.info}</td></div><br />
                           <button class="update" data-id="${i.id}">Update</button>
                           <button class="delete" data-id="${i.id}">Delete</button><br />
                           `
        });
        //The classes for delete and update above is stored in variables
        //A for-loop is used to loop through elements and eventlisteners are added so that functions run when the element is clicked
        const delInfo = document.getElementsByClassName("delete");
        const updtInfo = document.getElementsByClassName("update");
        for (let i = 0; i < delInfo.length; i++) {
            delInfo[i].addEventListener('click', deleteInfo);
            updtInfo[i].addEventListener('click', updateInfo);
        }

    }

    //A function to update data in database
    //Dataset is used to get the right id for the database
    //Vhanges made in the contenteditable elements are collected with innerHTML and stored in variables
    function updateInfo(e) {
        let id = e.target.dataset.id;

        let titel = document.getElementById("titel" + id).innerHTML;
        let info = document.getElementById("info" + id).innerHTML;
        //Values are converted to json-format and entered into the database 
        let jsonStr = JSON.stringify({
            id: id,
            titel: titel,
            info: info,
        });
        //Fetch is used to get the URL and the method PUT is used to update data in the database
        //The response is checked and if ok the data will get updated and a message about this will show on the screen
        //The function getInfo is run to print the new updated data in the database to the screen
        //console.log is used to print error messages in console
        fetch(infourl, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: jsonStr
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The info has been updated!";
                getInfo()
            })
            .catch(err => console.log(err))

    }

    //the "deleteInfo" function uses dataset target and prints the right id in the url
    //It uses the method DELETE to delete the item with the right id
    //The function getInfo is run to update the data after an item has been deletet and any errors will be displayed in the terminal
    function deleteInfo(e) {
        let id = e.target.dataset.id;
        fetch(infourl + "?id=" + id, {
            "method": "DELETE"
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The info has been Deleted!";
                getInfo()
            })
            .catch(err => console.log(err))
    }
    //the function "addInfo" takes the values from the input fields in the form and turns them into JSON-format
    //the method POST is then used to post the data to the database, the form is cleared by using the function "clearForm" - 
    //This is done to prevent the same data to be sent several times. Console.log is used to display any errors in the terminal
    function addInfo(e) {
        e.preventDefault();

        let titelEl = titel.value;
        let infoEl = info.value;

        let jsonStr = JSON.stringify({

            titel: titelEl,
            info: infoEl

        });
        //Fetch is used to get the URL and the method POST is used to post data in the database
        //The response is checked and if ok the data will get stored and a message about this will show on the screen
        //The function clearForm is run to empty all fields in the form
        //console.log is used to print error messages in console
        fetch(infourl, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: jsonStr
        })

            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The info has been added!";
                clearForm()
            })
            .catch(err => console.log(err))
    }

    //The function "clearForm" sets all the values of the input fields to empty strings when the form has been submitted
    //the function "getInfo" is run to update the data printed on the screen
    function clearForm() {

        titel.value = "";
        info.value = "";

        getInfo();

    }

}



