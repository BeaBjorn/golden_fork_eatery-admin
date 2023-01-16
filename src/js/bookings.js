"use strict"

/*
Created by : Beatrice Bjorn
For : Project - Restaurant - webbutveckling III, DT173G
Last updated : 2022-08-21
*/

//gets the url for the rest-api to be used
let bookurl = "https://studenter.miun.se/~bebj2100/writeable/projekt_webservice_vt22-BeaBjorn/api/rest_booking.php";

//const variables that stores the ids to be used
const fName = document.getElementById("fName");
const sName = document.getElementById("sName");
const phoneNumber = document.getElementById("phoneNumber");
const email = document.getElementById("email");
const numberOfGuests = document.getElementById("numberOfGuests");
const time = document.getElementById("time");
const date = document.getElementById("date");
const addBookingBtn = document.getElementById("addBookingBtn");


//an if-statement checking weather elements are present on page or not
if (fName != null && sName != null && phoneNumber != null && email != null && numberOfGuests != null && time != null && date != null) {
    //If element is not = 0 an eventlistener is added to the element
    if (addBookingBtn != null) {
        addBookingBtn.addEventListener("click", addBooking);
    }
    //The function "init" is run when the page gets reloaded
    window.onload = init;
    //The function "init" which runs the function "getBookings"
    function init() {
        getBookings();
    }
    //The function "getBookings" that gets the url stored in the variable "bookurl"
    //Through the url all the data stored in the database table gets collected
    //The function "printBookings" is run and console.log is used to print any errors to the terminal
    function getBookings() {
        fetch(bookurl)
            .then(response => {
                if (response.status != 200) {
                    return
                }
                return response.json()
                    .then(data => printBookings(data))
                    .catch(err => console.log(err))
            })
    }

    //The function printBookings gets the id to the element where data should be printed
    //innerHTML is used to erase previous data from the element 
    //A forEach-loop and innerHTML is used to print data from the database
    //The table-elements are set to contenteditable to enable changes to be made in the table
    function printBookings(bookings) {
        const bookEl = document.getElementById("bookings");
        bookEl.innerHTML = "";
        bookings.forEach(booking => {
            bookEl.innerHTML += `<tr><td contenteditable id="fname${booking.id}">${booking.fName}</td>
                           <td contenteditable id="sname${booking.id}">${booking.sName}</td>
                           <td contenteditable id="phone${booking.id}">${booking.phoneNumber}</td>
                           <td contenteditable id="email${booking.id}">${booking.email}</td>
                           <td contenteditable id="numGuests${booking.id}">${booking.numberOfGuests}</td>
                           <td contenteditable id="time${booking.id}">${booking.time}</td>
                           <td contenteditable id="date${booking.id}">${booking.date}</td>
                           <td class="update" data-id="${booking.id}">Update</td>
                           <td class="delete" data-id="${booking.id}">Delete</td>
                           </tr>`
        });
        //The classes for delete and update above is stored in variables
        //A for-loop is used to loop through elements and eventlisteners are added so that functions run when the element is clicked
        const delBooking = document.getElementsByClassName("delete");
        const updtBooking = document.getElementsByClassName("update");
        for (let i = 0; i < delBooking.length; i++) {
            delBooking[i].addEventListener('click', deleteBooking);
            updtBooking[i].addEventListener('click', updateBooking);
        }

    }

    //A function to update data in database
    //Dataset is used to get the right id for the database
    //Vhanges made in the contenteditable elements are collected with innerHTML and stored in variables
    function updateBooking(e) {
        let id = e.target.dataset.id;

        let fname = document.getElementById("fname" + id).innerHTML;
        let sname = document.getElementById("sname" + id).innerHTML;
        let phone = document.getElementById("phone" + id).innerHTML;
        let email = document.getElementById("email" + id).innerHTML;
        let numGuests = document.getElementById("numGuests" + id).innerHTML;
        let time = document.getElementById("time" + id).innerHTML;
        let date = document.getElementById("date" + id).innerHTML;
        //Values are converted to json-format and entered into the database 
        let jsonStr = JSON.stringify({
            id: id,
            fName: fname,
            sName: sname,
            phoneNumber: phone,
            email: email,
            numberOfGuests: numGuests,
            date: date,
            time: time
        });
        //Fetch is used to get the URL and the method PUT is used to update data in the database
        //The response is checked and if ok the data will get updated and a message about this will show on the screen
        //The function getInfo is run to print the new updated data in the database to the screen
        //console.log is used to print error messages in console
        fetch(bookurl, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: jsonStr
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The booking has been updated!";
                getBookings()
            })
            .catch(err => console.log(err))

    }

    //the "deleteBooking" function uses dataset target and prints the right id in the url
    //It uses the method DELETE to delete the item with the right id
    //The function getBookings is run to update the data after an item has been deletet and any errors will be displayed in the terminal
    function deleteBooking(e) {
        let id = e.target.dataset.id;
        fetch(bookurl + "?id=" + id, {
            "method": "DELETE"
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The reservation has been Deleted!";
                getBookings()
            })
            .catch(err => console.log(err))
    }
    //the function "addBooking" takes the values from the input fields in the form and turns them into JSON-format
    //the method POST is then used to post the data to the database, the form is cleared by using the function "clearForm" - 
    //This is done to prevent the same data to be sent several times. Console.log is used to display any errors in the terminal
    function addBooking(e) {
        e.preventDefault();

        let firstname = fName.value;
        let surname = sName.value;
        let phoneNum = phoneNumber.value;
        let mail = email.value;
        let guests = numberOfGuests.value;
        let t = time.value;
        let d = date.value;

        let jsonStr = JSON.stringify({

            fName: firstname,
            sName: surname,
            phoneNumber: phoneNum,
            email: mail,
            numberOfGuests: guests,
            date: d,
            time: t
        });
        //Fetch is used to get the URL and the method POST is used to post data in the database
        //The response is checked and if ok the data will get stored and a message about this will show on the screen
        //The function clearForm is run to empty all fields in the form
        //console.log is used to print error messages in console
        fetch(bookurl, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: jsonStr
        })
            .then(response => response.json())
            .then(data => {
                message.innerHTML = "";
                message.innerHTML = "The booking has been added!";
                clearForm()
            })
            .catch(err => console.log(err))
    }

    //The function "clearForm" sets all the values of the input fields to empty strings when the form has been submitted
    //the function "getBookings" is run to update the data printed on the screen
    function clearForm() {

        fName.value = "";
        sName.value = "";
        phoneNumber.value = "";
        email.value = "";
        numberOfGuests.value = "";
        time.value = "";
        date.value = "";

        getBookings();

    }

}



