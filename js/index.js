var persons = JSON.parse(localStorage.getItem("category") || "[]");
displayItems();


var red = "width:60px; height:60px;background: linear-gradient(to right bottom ,rgb(225 42 241),rgb(229 0 127));"
var blue = "width:60px; height:60px;background: linear-gradient(to right bottom ,rgb(41 125 255),rgb(22 95 252));"
var babyblue = "width:60px; height:60px;background: linear-gradient(to right bottom ,rgb(0 179 221),rgb(11 101 250));"
var orange = "width:60px; height:60px;background: linear-gradient(to right bottom ,rgb(255 180 0),rgb(255 112 0));"
var pink = "width:60px; height:60px;background: linear-gradient(to right bottom ,rgb(254 55 108),rgb(232 0 117));"
var green = "width:60px; height:60px;background: linear-gradient(to right bottom ,rgb(0, 255, 115),rgba(0, 179, 24, 1));"
var gray = "width:60px; height:60px;background: linear-gradient(to right bottom ,rgba(137, 137, 137, 1),rgba(54, 54, 54, 1));"
var colors = [red, blue, babyblue, orange, pink, green, gray];


document.getElementById("exit").addEventListener("click", function (x) { exit() });
document.getElementById("cancel").addEventListener("click", function (x) { exit() });
function exit() {
    document.getElementById("add-dashbord").classList.add("d-none");
    clearInput();
}
document.getElementById("addButton").addEventListener("click", function (x) { addButton() });
function addButton() {
    document.querySelector(".add-dashbord h1").innerHTML = "Add New Contact";
    document.getElementById("avatar").innerHTML = ` <i  class=" fa-solid fa-user text-white rounded-circle fs-3 d-flex align-items-center justify-content-center m-auto"
                                style="background: linear-gradient(to right bottom,rgb(71 152 255),rgb(29 105 253)); width: 100px;height:100px;"></i>`
    document.getElementById("add-dashbord").classList.remove("d-none");
}




var namePerson = document.getElementById("Name");
var phone = document.getElementById("phoneNumber");
var email = document.getElementById("Email");
var address = document.getElementById("Address");
var group = document.getElementById("Group");
var notes = document.getElementById("Notes");
var img = "";
var favorate = document.getElementById("fav");
var emergency = document.getElementById("eme");
var search = document.getElementById("search-inp");


document.getElementById("uploadFile").addEventListener("change", function (e) {
    addImg();
});
function addImg() {

    document.getElementById("image").src = `images/${document.getElementById("uploadFile").files[0].name}`;
    img = document.getElementById("image").src;
    document.getElementById("avatar").classList.add("d-none");
    document.getElementById("image").classList.remove("d-none");
}

function clearInput() {
    namePerson.value = null;
    phone.value = null;
    email.value = null;
    address.value = null;
    group.value = null;
    notes.value = null;
    favorate.checked = null;
    emergency.checked = null;
    img = ""
    document.getElementById("avatar").classList.remove("d-none");
    document.getElementById("image").classList.add("d-none");

}

document.querySelector(".add-dashbord .addButton").addEventListener("click", function (e) {
    var validName = validation(document.getElementById("Name"));
    var validPhone = validation(document.getElementById("phoneNumber"));
    var validEmail = validation(document.getElementById("Email"));
    if (validName && validPhone && validEmail) addItem();
    else {
        if (!validName) {
            Swal.fire({
                title: "Missing Name",
                text: "Please enter a name for the contact!",
                icon: "error"
            });
        }
        else if (!validPhone) {
            Swal.fire({
                title: "Missing Phone",
                text: "Please enter a phone number!",
                icon: "error"
            });
        }
        else if (!validEmail) {
            Swal.fire({
                title: "Missing Email",
                text: "Please enter a Email!",
                icon: "error"
            });
        }
    }
});

function addItem() {
    var color = colors[Math.floor(Math.random() * colors.length)];
    person = {
        name: namePerson.value,
        phoneNumber: phone.value,
        email: email.value,
        address: address.value,
        group: group.value,
        notes: notes.value,
        img: img,
        color: color,
        favorate: favorate.checked,
        emergency: emergency.checked,
    };
    if (isExist()) {
        if (isExist() === 1) {
            Swal.fire({
                title: "Duplicate Name",
                text: "A contact with this Name already exists!",
                icon: "error"
            });
        }
        else if (isExist() === 2) {
            Swal.fire({
                title: "Duplicate Phone Number",
                text: "A contact with this phone number already exists!",
                icon: "error"
            });
        }
        else if (isExist() === 3) {
            Swal.fire({
                title: "Duplicate Email",
                text: "A contact with this email already exists!",
                icon: "error"
            });
        }
        return;
    }

    persons.push(person);
    console.log(persons);
    localStorage.setItem("category", JSON.stringify(persons));
    clearInput();
    displayItems();
    document.getElementById("add-dashbord").classList.add("d-none");
    Swal.fire({
        icon: "success",
        title: "Added!",
        text: "your item has been added successfully",
        showConfirmButton: false,
        timer: 1500,
    });

}



function displayItems() {
    var item = "";
    var fav = "";
    var eme = "";
    var favLenth = 0;
    var emeLenth = 0;
    for (var i = 0; i < persons.length; i++) {
        var arrName = persons[i].name.trim().split(" ");

        item += `
         <div class="col-md-6">
                            <div class="box pb-5 position-relative h-100 bg-white rounded-4 border border-1 border-secondary-subtle overflow-hidden "
                                style="box-shadow: 0 1px 3px rgb(211, 211, 211);">
                                <div class="p-3 pb-0">
                                    <div class="top d-flex gap-3 mb-3 align-items-center">
                                        <figure class="position-relative m-0">
                                           <div>
                                                ${persons[i].img
                ? `<img src="${persons[i].img}" class="rounded-4" width="60px" height="60px">`
                : `<div style="${persons[i].color};" class="image-item fs-5 d-flex align-items-center justify-content-center fw-bold text-white rounded-4">
                                                                ${arrName.length === 1 ? arrName[0][0] : arrName[0][0] + arrName[arrName.length - 1][0]}
                                                            </div>`
            }
                                            </div>
                                                
                                            <i class="${persons[i].favorate ? "" : "d-none"} image-icone-star fa-solid fa-star text-white bg-warning rounded-circle d-flex justify-content-center align-items-center position-absolute border border-2 border-white"
                                                style="font-size: .5rem;padding:7px 11px;top: -5px;right: -5px;"></i>
                                            <i class="${persons[i].emergency ? "" : "d-none"} image-icone-heart fa-solid fa-heart-pulse text-white rounded-circle d-flex justify-content-center align-items-center position-absolute border border-2 border-white"
                                                style="font-size: .5rem;padding:7px 11px;bottom: -5px;right: -5px;background-color: rgb(255, 0, 60)"></i>
                                        </figure>
                                        <div>
                                            <p class="name fw-bold mb-1 mt-0">${persons[i].name}</p>
                                            <div class="d-flex align-items-center gap-2">
                                                <i class="fa-solid fa-phone text-primary rounded-3 bg-primary-subtle d-flex align-items-center justify-content-center"
                                                    style="font-size: 10px; padding:8px 14px;"></i>
                                                <small class="text-secondary">${persons[i].phoneNumber}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center my-2 gap-2">
                                        <i class="fa-solid fa-envelope rounded-3 d-flex align-items-center justify-content-center"
                                            style="font-size: 10px; padding:8px 14px;color: rgb(152, 48, 250);background-color: rgba(137, 43, 226, 0.18);"></i>
                                        <small class="text-secondary">${persons[i].email}</small>
                                    </div>
                                    <div class="d-flex align-items-center my-2 gap-2">
                                        <i class="fa-solid fa-location-dot rounded-3 d-flex align-items-center justify-content-center"
                                            style="font-size: 10px; padding:8px 14px;color: rgb(2, 155, 2); background-color: rgba(2, 209, 2, 0.174);"></i>
                                        <small class="text-secondary">${persons[i].address}</small>
                                    </div>
                                    <div class="d-flex align-items-center gap-2 my-2 py-1 fw-semibold"
                                        style="font-size: 11px;">
                                        <div class="${persons[i].group === "selected" || persons[i].group === "" ? "d-none" : ""} rounded-3 py-1 px-2"
                                            style="color: rgb(152, 48, 250);background-color: rgba(137, 43, 226, 0.18);">${persons[i].group}</div>
                                        <div class="d-flex rounded-3 py-1 px-2 align-items-center gap-1 ${persons[i].emergency ? "" : "d-none"}"
                                            style="background-color: rgba(255, 0, 60, 0.132)">
                                            <i class="fa-solid fa-heart-pulse"
                                                style="font-size: 10px; color: rgb(255, 0, 60)"></i>
                                            <p class="m-0 " style="color: rgb(255, 0, 60)">Emergency</p>
                                        </div>
                                    </div>

                                </div>

                                <div class="bottom position-absolute w-100 bottom-0 px-3 py-2 border-top border-1 d-flex justify-content-between align-items-center"
                                    style="background-color: rgb(249, 249, 249);">
                                    <div class="left d-flex gap-2">
                                        <i class="phone fa-solid fa-phone text-success d-flex align-items-center justify-content-center rounded-3"
                                            style="padding:10px 18px; background-color: rgba(27, 255, 80, 0.087);"></i>
                                        <i class="email fa-solid fa-envelope d-flex align-items-center justify-content-center rounded-3"
                                            style="padding:10px 18px;color: rgb(170, 0, 255); background-color: rgba(168, 27, 255, 0.05);"></i>
                                    </div>
                                    <div class="right d-flex align-items-center gap-2">
                                        <i onclick="star_empty_change(${i})" class="${!persons[i].favorate ? "" : "d-none"} star-empty fa-regular fa-star text-secondary rounded-3 d-flex align-items-center justify-content-center"
                                            style="padding:10px 18px;"></i>
                                        <i onclick="star_change(${i})" class="${persons[i].favorate ? "" : "d-none"} star fa-solid fa-star text-secondary rounded-3 d-flex align-items-center justify-content-center"
                                            style="padding:10px 18px;"></i>
                                        <i onclick="heart_empty_change(${i})" class="${!persons[i].emergency ? "" : "d-none"} heart-empty  fa-regular fa-heart text-secondary rounded-3 d-flex align-items-center justify-content-center"
                                            style="padding:10px 18px;"></i>
                                        <i onclick="heart_change(${i})" class="${persons[i].emergency ? "" : "d-none"} heart fa-solid fa-heart-pulse text-secondary rounded-3 d-flex align-items-center justify-content-center"
                                            style="padding:10px 18px;"></i>
                                        <i onclick= "updateItem(${i})" class="pen fa-solid fa-pen text-secondary rounded-3 d-flex align-items-center justify-content-center"
                                            style="padding:10px 18px;"></i>
                                        <i onclick= "deleteItem(${i})" class="bin fa-solid fa-trash text-secondary rounded-3 d-flex align-items-center justify-content-center"
                                            style="padding:10px 18px;"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
         `


        if (persons[i].favorate) {
            favLenth++;
            fav += `<div class="d-flex justify-content-between p-2 rounded-3 align-items-center rec"
                                    style="background-color: rgb(249, 249, 249);margin-bottom:12px">
                                    <div class="left d-flex align-items-center gap-2">
                                        
                                            <div>
                                                ${persons[i].img
                    ? `<img src="${persons[i].img}" class="rounded-3" width="40px" height="40px">`
                    : `<div style="${persons[i].color};width:40px;height:40px;" class="image-item d-flex align-items-center justify-content-center fw-bold text-white rounded-3">
                                                                ${arrName.length === 1 ? arrName[0][0] : arrName[0][0] + arrName[arrName.length - 1][0]}
                                                            </div>`
                }
                                            </div>
                                        <div class="px-1" style="line-height: 1;">
                                            <p class="m-0 fw-bold" style="font-size: 14px;">${persons[i].name}</p>
                                            <small style="font-size: small;" class="text-secondary">${persons[i].phoneNumber}</small>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <i class="phone fa-solid fa-phone text-success d-flex align-items-center justify-content-center rounded-3"
                                            style="padding:10px 18px; background-color: rgba(73, 255, 115, 0.281); font-size: small;"></i>
                                    </div>
                                </div>`
        }
        if (persons[i].emergency) {
            emeLenth++;
            eme += `<div class="d-flex justify-content-between p-2 rounded-3 align-items-center rec"
                                    style="background-color: rgb(249, 249, 249); margin-bottom:12px">
                                    <div class="left d-flex align-items-center gap-2">
                                        
                                            <div>
                                                ${persons[i].img
                    ? `<img src="${persons[i].img}" class="rounded-3" width="40px" height="40px">`
                    : `<div style="${persons[i].color};width:40px;height:40px;" class="image-item d-flex align-items-center justify-content-center fw-bold text-white rounded-3">
                                                                ${arrName.length === 1 ? arrName[0][0] : arrName[0][0] + arrName[arrName.length - 1][0]}
                                                            </div>`
                }
                                            </div>
                                        <div class="px-1" style="line-height: 1;">
                                            <p class="m-0 fw-bold" style="font-size: 14px;">${persons[i].name}</p>
                                            <small style="font-size: small;" class="text-secondary">${persons[i].phoneNumber}</small>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <i class="phone fa-solid fa-phone d-flex align-items-center justify-content-center rounded-3"
                                            style="padding:10px 18px; background-color: rgb(255, 226, 231);color: crimson; font-size: small;"></i>
                                    </div>
                                </div>`

        }


    }

    document.getElementsByClassName("boxes")[0].innerHTML = item;
    if (!favLenth) {
        document.querySelector(".favorites .bottom-part").innerHTML = `<div class="text-secondary my-4 d-flex justify-content-center">No favorates yet</div>`;

    }
    else document.querySelector(".favorites .bottom-part").innerHTML = fav;

    if (!emeLenth) {
        document.querySelector(".emergency .bottom-part").innerHTML = `<div class="text-secondary my-4 d-flex justify-content-center">No emergency contacts</div>`;

    }
    else document.querySelector(".emergency .bottom-part").innerHTML = eme;

    document.getElementById("total").innerHTML = persons.length
    document.getElementById("totalFavorites").innerHTML = favLenth
    document.getElementById("totalEmergency").innerHTML = emeLenth
}

function deleteItem(index) {
    Swal.fire({
        title: "Delete Contact?",
        text: `Are you sure you want to delete ${persons[index].name} ? This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#cf0000ff",
        cancelButtonColor: "rgba(136, 136, 136, 1)",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            persons.splice(index, 1);
            localStorage.setItem("category", JSON.stringify(persons));
            displayItems();
            Swal.fire({
                showConfirmButton: false,
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
                timer: 1500,
            });
        }
    });

}



var indexItem = null;
function updateItem(index) {
    document.querySelector(".add-dashbord h1").innerHTML = "Edit Contact";
    indexItem = index;
    namePerson.value = persons[index].name;
    phone.value = persons[index].phoneNumber
    email.value = persons[index].email;
    address.value = persons[index].address;
    group.value = persons[index].group;
    notes.value = persons[index].notes;
    favorate.checked = persons[index].favorate;
    emergency.checked = persons[index].emergency;


    var arrName = persons[index].name.trim().split(" ");
    if (persons[index].img) {
        document.getElementById("image").src = persons[index].img
        document.getElementById("avatar").classList.add("d-none");
        document.getElementById("image").classList.remove("d-none");
    }
    else
        document.getElementById("avatar").innerHTML = `<div id="avatar" class="text-white rounded-circle fs-4 fw-bold d-flex align-items-center justify-content-center m-auto"
                                style="${persons[index].color}; width: 100px;height:100px;">${arrName.length === 1 ? arrName[0][0] : arrName[0][0] + arrName[arrName.length - 1][0]}</div>`

    document.getElementById("add-dashbord").classList.remove("d-none");
    document.getElementById("add-btn-dashBoard").classList.add("d-none");
    document.getElementById("update-btn-dashBoard").classList.remove("d-none");
}



document.getElementById("update-btn-dashBoard").addEventListener("click", function (e) {
    var validName = validation(document.getElementById("Name"));
    var validPhone = validation(document.getElementById("phoneNumber"));
    var validEmail = validation(document.getElementById("Email"));
    if (validName && validPhone && validEmail) update();
    else {
        if (!validName) {
            Swal.fire({
                title: "Missing Name",
                text: "Please enter a name for the contact!",
                icon: "error"
            });
        }
        else if (!validPhone) {
            Swal.fire({
                title: "Missing Phone",
                text: "Please enter a phone number!",
                icon: "error"
            });
        }
        else if (!validEmail) {
            Swal.fire({
                title: "Missing Email",
                text: "Please enter a Email!",
                icon: "error"
            });
        }
    }
});
function update() {
    if (isExist()) {
        if (isExist() === 1) {
            Swal.fire({
                title: "Duplicate Name",
                text: "A contact with this Name already exists!",
                icon: "error"
            });
        }
        else if (isExist() === 2) {
            Swal.fire({
                title: "Duplicate Phone Number",
                text: "A contact with this phone number already exists!",
                icon: "error"
            });
        }
        else if (isExist() === 3) {
            Swal.fire({
                title: "Duplicate Email",
                text: "A contact with this email already exists!",
                icon: "error"
            });
        }
        return;

    }

    persons[indexItem].name = namePerson.value;
    persons[indexItem].phoneNumber = phone.value;
    persons[indexItem].email = email.value;
    persons[indexItem].address = address.value;
    persons[indexItem].group = group.value;
    persons[indexItem].notes = notes.value;
    persons[indexItem].img = img;
    persons[indexItem].favorate = favorate.checked;
    persons[indexItem].emergency = emergency.checked;
    localStorage.setItem("category", JSON.stringify(persons));
    clearInput();
    displayItems();
    document.getElementById("add-dashbord").classList.add("d-none");
    document.getElementById("add-btn-dashBoard").classList.remove("d-none");
    document.getElementById("update-btn-dashBoard").classList.add("d-none");

    Swal.fire({
        icon: "success",
        title: "Edited!",
        text: "your item has been edited successfully",
        showConfirmButton: false,
        timer: 1500,
    });




}


document.getElementById("Name").addEventListener("input", function (e) {
    validation(this);
})
document.getElementById("phoneNumber").addEventListener("input", function (e) {
    validation(this);
})
document.getElementById("Email").addEventListener("input", function (e) {
    validation(this);
})

function validation(element) {
    var regex =
    {
        Name: /^[\w|\s]{2,50}$/,
        phoneNumber: /^(\+2|2)?01[0125]\d{8}$/,
        Email: /^[\w]{2,20}@[a-zA-Z]{2,20}\.[a-zA-Z]{2,20}$/,
    }

    if (regex[element.id].test(element.value) || !element.value) {
        document.querySelector(`#${element.id} + .error`).classList.add("d-none");
        document.getElementById(element.id).classList.remove("is-invalid");
        return element.value ? true : false;
    }
    else {
        document.querySelector(`#${element.id} + .error`).classList.remove("d-none");
        document.getElementById(element.id).classList.add("is-invalid");
        return false;
    }

}

function isExist() {
    var nameExist = false;
    var phoneExist = false;
    var emailExist = false;
    for (var i = 0; i < persons.length; i++) {
        if (persons[i] === persons[indexItem]) continue;

        if (namePerson.value === persons[i].name) nameExist = true;
        if (phone.value === persons[i].phoneNumber) phoneExist = true;
        if (email.value === persons[i].email) emailExist = true
    }

    if (nameExist) { return 1; }
    else if (phoneExist) { return 2; }
    else if (emailExist) { return 3; }
    else { return 0; }

}

document.getElementById("search-inp").addEventListener("input" , function(e) {
    searchInput();
})
function searchInput(){
    var item = "";
    var fav = "";
    var eme = "";
    var favLenth = 0;
    var emeLenth = 0;

    var item =``;
    for (var i = 0; i < persons.length; i++) {
        if(persons[i].name.toLowerCase().includes(search.value.toLowerCase())||
        persons[i].phoneNumber.toLowerCase().includes(search.value.toLowerCase())||
        persons[i].email.toLowerCase().includes(search.value.toLowerCase())){
            var arrName = persons[i].name.trim().split(" ");
            item += `
            <div class="col-md-6">
                                <div class="box pb-5 position-relative h-100 bg-white rounded-4 border border-1 border-secondary-subtle overflow-hidden "
                                    style="box-shadow: 0 1px 3px rgb(211, 211, 211);">
                                    <div class="p-3 pb-0">
                                        <div class="top d-flex gap-3 mb-3 align-items-center">
                                            <figure class="position-relative m-0">
                                            <div>
                                                    ${persons[i].img
                    ? `<img src="${persons[i].img}" class="rounded-4" width="60px" height="60px">`
                    : `<div style="${persons[i].color};" class="image-item fs-5 d-flex align-items-center justify-content-center fw-bold text-white rounded-4">
                                                                    ${arrName.length === 1 ? arrName[0][0] : arrName[0][0] + arrName[arrName.length - 1][0]}
                                                                </div>`
                }
                                                </div>
                                                    
                                                <i class="${persons[i].favorate ? "" : "d-none"} image-icone-star fa-solid fa-star text-white bg-warning rounded-circle d-flex justify-content-center align-items-center position-absolute border border-2 border-white"
                                                    style="font-size: .5rem;padding:7px 11px;top: -5px;right: -5px;"></i>
                                                <i class="${persons[i].emergency ? "" : "d-none"} image-icone-heart fa-solid fa-heart-pulse text-white rounded-circle d-flex justify-content-center align-items-center position-absolute border border-2 border-white"
                                                    style="font-size: .5rem;padding:7px 11px;bottom: -5px;right: -5px;background-color: rgb(255, 0, 60)"></i>
                                            </figure>
                                            <div>
                                                <p class="name fw-bold mb-1 mt-0">${persons[i].name}</p>
                                                <div class="d-flex align-items-center gap-2">
                                                    <i class="fa-solid fa-phone text-primary rounded-3 bg-primary-subtle d-flex align-items-center justify-content-center"
                                                        style="font-size: 10px; padding:8px 14px;"></i>
                                                    <small class="text-secondary">${persons[i].phoneNumber}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center my-2 gap-2">
                                            <i class="fa-solid fa-envelope rounded-3 d-flex align-items-center justify-content-center"
                                                style="font-size: 10px; padding:8px 14px;color: rgb(152, 48, 250);background-color: rgba(137, 43, 226, 0.18);"></i>
                                            <small class="text-secondary">${persons[i].email}</small>
                                        </div>
                                        <div class="d-flex align-items-center my-2 gap-2">
                                            <i class="fa-solid fa-location-dot rounded-3 d-flex align-items-center justify-content-center"
                                                style="font-size: 10px; padding:8px 14px;color: rgb(2, 155, 2); background-color: rgba(2, 209, 2, 0.174);"></i>
                                            <small class="text-secondary">${persons[i].address}</small>
                                        </div>
                                        <div class="d-flex align-items-center gap-2 my-2 py-1 fw-semibold"
                                            style="font-size: 11px;">
                                            <div class="${persons[i].group === "selected" || persons[i].group === "" ? "d-none" : ""} rounded-3 py-1 px-2"
                                                style="color: rgb(152, 48, 250);background-color: rgba(137, 43, 226, 0.18);">${persons[i].group}</div>
                                            <div class="d-flex rounded-3 py-1 px-2 align-items-center gap-1 ${persons[i].emergency ? "" : "d-none"}"
                                                style="background-color: rgba(255, 0, 60, 0.132)">
                                                <i class="fa-solid fa-heart-pulse"
                                                    style="font-size: 10px; color: rgb(255, 0, 60)"></i>
                                                <p class="m-0 " style="color: rgb(255, 0, 60)">Emergency</p>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="bottom position-absolute w-100 bottom-0 px-3 py-2 border-top border-1 d-flex justify-content-between align-items-center"
                                        style="background-color: rgb(249, 249, 249);">
                                        <div class="left d-flex gap-2">
                                            <i class="phone fa-solid fa-phone text-success d-flex align-items-center justify-content-center rounded-3"
                                                style="padding:10px 18px; background-color: rgba(27, 255, 80, 0.087);"></i>
                                            <i class="email fa-solid fa-envelope d-flex align-items-center justify-content-center rounded-3"
                                                style="padding:10px 18px;color: rgb(170, 0, 255); background-color: rgba(168, 27, 255, 0.05);"></i>
                                        </div>
                                        <div class="right d-flex align-items-center gap-2">
                                            <i onclick="star_empty_change(${i})" class="${!persons[i].favorate ? "" : "d-none"} star-empty fa-regular fa-star text-secondary rounded-3 d-flex align-items-center justify-content-center"
                                                style="padding:10px 18px;"></i>
                                            <i onclick="star_change(${i})" class="${persons[i].favorate ? "" : "d-none"} star fa-solid fa-star text-secondary rounded-3 d-flex align-items-center justify-content-center"
                                                style="padding:10px 18px;"></i>
                                            <i onclick="heart_empty_change(${i})" class="${!persons[i].emergency ? "" : "d-none"} heart-empty  fa-regular fa-heart text-secondary rounded-3 d-flex align-items-center justify-content-center"
                                                style="padding:10px 18px;"></i>
                                            <i onclick="heart_change(${i})" class="${persons[i].emergency ? "" : "d-none"} heart fa-solid fa-heart-pulse text-secondary rounded-3 d-flex align-items-center justify-content-center"
                                                style="padding:10px 18px;"></i>
                                            <i onclick= "updateItem(${i})" class="pen fa-solid fa-pen text-secondary rounded-3 d-flex align-items-center justify-content-center"
                                                style="padding:10px 18px;"></i>
                                            <i onclick= "deleteItem(${i})" class="bin fa-solid fa-trash text-secondary rounded-3 d-flex align-items-center justify-content-center"
                                                style="padding:10px 18px;"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
            `


            if (persons[i].favorate) {
                favLenth++;
                fav += `<div class="d-flex justify-content-between p-2 rounded-3 align-items-center rec"
                                        style="background-color: rgb(249, 249, 249);margin-bottom:12px">
                                        <div class="left d-flex align-items-center gap-2">
                                            
                                                <div>
                                                    ${persons[i].img
                        ? `<img src="${persons[i].img}" class="rounded-3" width="40px" height="40px">`
                        : `<div style="${persons[i].color};width:40px;height:40px;" class="image-item d-flex align-items-center justify-content-center fw-bold text-white rounded-3">
                                                                    ${arrName.length === 1 ? arrName[0][0] : arrName[0][0] + arrName[arrName.length - 1][0]}
                                                                </div>`
                    }
                                                </div>
                                            <div class="px-1" style="line-height: 1;">
                                                <p class="m-0 fw-bold" style="font-size: 14px;">${persons[i].name}</p>
                                                <small style="font-size: small;" class="text-secondary">${persons[i].phoneNumber}</small>
                                            </div>
                                        </div>
                                        <div class="right">
                                            <i class="phone fa-solid fa-phone text-success d-flex align-items-center justify-content-center rounded-3"
                                                style="padding:10px 18px; background-color: rgba(73, 255, 115, 0.281); font-size: small;"></i>
                                        </div>
                                    </div>`
            }
            if (persons[i].emergency) {
                emeLenth++;
                eme += `<div class="d-flex justify-content-between p-2 rounded-3 align-items-center rec"
                                        style="background-color: rgb(249, 249, 249); margin-bottom:12px">
                                        <div class="left d-flex align-items-center gap-2">
                                            
                                                <div>
                                                    ${persons[i].img
                        ? `<img src="${persons[i].img}" class="rounded-3" width="40px" height="40px">`
                        : `<div style="${persons[i].color};width:40px;height:40px;" class="image-item d-flex align-items-center justify-content-center fw-bold text-white rounded-3">
                                                                    ${arrName.length === 1 ? arrName[0][0] : arrName[0][0] + arrName[arrName.length - 1][0]}
                                                                </div>`
                    }
                                                </div>
                                            <div class="px-1" style="line-height: 1;">
                                                <p class="m-0 fw-bold" style="font-size: 14px;">${persons[i].name}</p>
                                                <small style="font-size: small;" class="text-secondary">${persons[i].phoneNumber}</small>
                                            </div>
                                        </div>
                                        <div class="right">
                                            <i class="phone fa-solid fa-phone d-flex align-items-center justify-content-center rounded-3"
                                                style="padding:10px 18px; background-color: rgb(255, 226, 231);color: crimson; font-size: small;"></i>
                                        </div>
                                    </div>`
            } 
        }
    }
    document.getElementsByClassName("boxes")[0].innerHTML = item;
    if (!favLenth) {
        document.querySelector(".favorites .bottom-part").innerHTML = `<div class="text-secondary my-4 d-flex justify-content-center">No favorates yet</div>`;

    }
    else document.querySelector(".favorites .bottom-part").innerHTML = fav;

    if (!emeLenth) {
        document.querySelector(".emergency .bottom-part").innerHTML = `<div class="text-secondary my-4 d-flex justify-content-center">No emergency contacts</div>`;

    }
    else document.querySelector(".emergency .bottom-part").innerHTML = eme;

    document.getElementById("total").innerHTML = persons.length
    document.getElementById("totalFavorites").innerHTML = favLenth
    document.getElementById("totalEmergency").innerHTML = emeLenth
}



function star_empty_change(index) {
    persons[index].favorate = true;
    localStorage.setItem("category", JSON.stringify(persons));
    displayItems()
}
function star_change(index) {
    persons[index].favorate = undefined;
    localStorage.setItem("category", JSON.stringify(persons));
    displayItems()
}
function heart_empty_change(index) {
    persons[index].emergency = true;
    localStorage.setItem("category", JSON.stringify(persons));
    displayItems()
}
function heart_change(index) {
    persons[index].emergency = undefined;
    localStorage.setItem("category", JSON.stringify(persons));
    displayItems()
}
