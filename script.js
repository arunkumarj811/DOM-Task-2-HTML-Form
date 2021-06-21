
let checkLocalData = JSON.parse(localStorage.getItem("customerData"));
if (checkLocalData != null) {
    var customerData = checkLocalData;
    for (let i = 0; i < checkLocalData.length; i++) {
        const rowData = document.createElement('tr');
        rowData.innerHTML = `
        <td>${checkLocalData[i].fname}</td>
        <td>${checkLocalData[i].lname}</td>
        <td>${checkLocalData[i].gender}</td>
        <td>${checkLocalData[i].address}</td>
        <td>${checkLocalData[i].pincode}</td>
        <td>${checkLocalData[i].country}</td>
        <td>${checkLocalData[i].state}</td>
        <td>${checkLocalData[i].likedFood}</td>
        `;
        document.querySelector(".table > table > tbody").append(rowData);
        document.querySelector("#button").style.visibility = "visible";
        document.querySelector(".table > table").style.visibility = "visible";
    }
} else {
    var customerData = [];
}// this if condition checks for local storage data is available or not. if available for loop will display all data in screen in a table 
//FYI: the data will be available when form is filled once or more because of <line no:73> in following script 



function myFunction() {
    let inputForm = document.forms[0], count = 0;
    var txt = "";
    for (let i = 0; i < inputForm.length; i++) {
        if (inputForm[i].checked) {
            count++;
            txt = txt + inputForm[i].value + " ";
        }
    }
    if (count < 2) {
        alert("Please select atleast 2 foods")
    } else {
        tableAppend(txt);
    }
}// this myFunction() is the first to execute on form submission and checks whether atleast 2 foods are selected by the user and alert if not.

function tableAppend(food) {
    let foodChoice = food.split(" ");
    foodChoice.pop();
    // this along with line:59 will join two or more foods together with comma seperation
    document.querySelector(".table > table").style.visibility = "visible";
    document.querySelector("#button").style.visibility = "visible";//this codes will make the table visible only when there is any data available.

    let
        fname = document.getElementById("fname").value,
        lname = document.getElementById("lname").value,
        gender = document.getElementById("gender").value,
        address = document.getElementById("address").value,
        pincode = document.getElementById("pincode").value,
        country = document.getElementById("country").value,
        state = document.getElementById("state").value,
        likedFood = foodChoice.join(", ");

    let obj = {
        fname: fname,
        lname: lname,
        gender: gender,
        address: address,
        pincode: pincode,
        country: country,
        state: state,
        likedFood: likedFood
    }// the key and value names look same but it is not. the value part of object only takes the defined variable data and store it to the keys while keys are just string names that does not change.
    customerData.push(obj);
    // this above codes create an object and push all form details as an array of objects.
    localStorage.setItem("customerData", JSON.stringify(customerData));
    // this creates a local storage for form details submitted so on refresh the data will not be lost.

    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${fname}</td>
    <td>${lname}</td>
    <td>${gender}</td>
    <td>${address}</td>
    <td>${pincode}</td>
    <td>${country}</td>
    <td>${state}</td>
    <td>${likedFood}</td>
    `;
    document.querySelector(".table > table > tbody").append(row);
    // this codes above will create new row element on each form submission and append it to the table.
    document.querySelector("body > form").reset();// this line resets the form to empty on each submission.
}

function clearTable() {
    var removeData = confirm("Data cannot be retrived after deletion. confirm delete table data?");
    if (removeData == true) {
        localStorage.removeItem("customerData");
        location.reload();
    }
}// this function clear all form datas appended to the table by getting user confirmation.


//the following set of codes fetch county data from API and populates the dropdown datalist of country input in the form. 
fetch('https://countriesnow.space/api/v0.1/countries/states', {
    method: "GET"
}).then(data => data.json())
    .then(data => {
        // console.log(data.data[0].name);
        let dataList = document.querySelector("#mycountries");
        let option = "";
        let data1 = data.data;
        for (var i in data1) {
            // console.log(data1[i].name);
            option += `<option value="${data1[i].name}">`
        }
        // console.log(option);
        dataList.innerHTML = option;
    });



//the following set of codes fetch state data of respective country choosen from API 
//and populates the dropdown datalist of state input in the form.
document.querySelector("#country").onchange = function () {
    let country = document.querySelector("#country").value;

    fetch(`https://countriesnow.space/api/v0.1/countries/states`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            country: country
        })
    })
        .then((data) => data.json())
        .then((user) => {
            // console.log(user.data.name);
            let dataList = document.querySelector("#mystate");
            let option = "";
            let data1 = user.data.states;
            for (var i in data1) {
                // console.log(data1[i].name);
                option += `<option value="${data1[i].name}">`
            }
            // console.log(option);
            dataList.innerHTML = option;
        });
}
