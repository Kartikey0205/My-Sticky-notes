
// console.log("Hello");
// method to show available notes
// let val =0;
showNotes(); 
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => {
        let messagesuccess =document.getElementById("message");
        messagesuccess.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> You had successfully added your note!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
        setTimeout(() => {
            messagesuccess.innerHTML = ``;
        }, 6000);
        
});

// addBtn.addEventListener("click",()=>{
//     document.getElementById("valDate").innerHTML = Date();
// });
addBtn.addEventListener("click", () => {

    let addText = document.getElementById("addText");
    let addTitle = document.getElementById("addTitle");
    // let addDate = document.getElementById("addDate");
// accessing local storage
    let notes = localStorage.getItem("notes"); 
    if (notes === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes); 
    }

    let enterNotes = {
        date: noteDate(),
        time : clocky(),
        title: addTitle.value,
        text: addText.value,
        
    }
    notesObj.push(enterNotes);
    localStorage.setItem("notes", JSON.stringify(notesObj)); 
    addText.value = "";
    addTitle.value = "";
    // addDate.value = "";
    // console.log(notesObj);
    showNotes();

});




var originalDate ,originalMonth,originalYear ,dt ,giveDate;
function noteDate() {
    dt = new Date();
    originalDate = dt.getDate();
    originalMonth = dt.getMonth() + 1;
    originalYear = dt.getFullYear();
    
    
    if (originalDate <= 9) {
        originalDate = '0' + originalDate;
    }
    if (originalMonth <= 9) {
        originalMonth = '0' + originalMonth;
    }
    if (originalYear <= 9) {
        originalYear = '0' + originalYear;
    }

    return (giveDate = originalDate + `<span class= "slash">/</span>` + originalMonth + `<span class= "slash">/</span>` + originalYear);
    
}
var dy, hr, min, sec, clock;

function clocky() {
    dy = new Date();
    hr = dy.getHours();
    min = dy.getMinutes();
    sec = dy.getSeconds();
    
    
    if (hr <= 9) {
        hr = '0' + hr;
    }
    if (min <= 9) {
        min = '0' + min;
    }
    if (sec <= 9) {
        sec = '0' + sec;
    }

    return (clock = hr + `<span class= "colon">:</span>` + min + `<span class= "colon">:</span>` + sec);
    
}

// Show note Card function 
function showNotes() {
    let notes = localStorage.getItem("notes"); 
    if (notes === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes); 
    }

    let html = "";
    notesObj.forEach((element, index) => {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;
        border-radius:6px;
        border:1px solid black;
        ">
        <div class="card-body">
    
    <h5 class="card-title"  style="font-family: 'Bungee', cursive;">${element.date}</h5>
    
    <h6 class="card-title" id="clock" style="font-family: 'Bungee Inline', cursive;">${element.time}</h6>
        <h2 class="card-title">${element.title}</h2>
        <p class="card-text">${element.text}</p>
        <button class="btn btn-warning dl" id="${index}" onclick="deleteButton(this.id)"><i class="fas fa-trash"></i> Delete Note</button>
        </div>
        </div>
        `;
    });

    let addedNotes = document.getElementById("notes");
    if (notesObj.length != 0) {
        addedNotes.innerHTML = html;
    } else {
        addedNotes.innerHTML = `<h2 class="text-dark" style="background-color: #ffb8b8;
        margin:2rem;
        padding:1rem;
        border-radius:6px;
        border:2px solid black;
        ";>Nothing to show Kindly add a note first!</h2>`;
    }


}

// // Adding Date
// function showDate(index) {
//     return document.getElementById(index).innerHTML = Date();
// }
// Deleting notes
function deleteButton(index) {
    // console.log("I am deleting", index);
    let notes = localStorage.getItem("notes"); 
    if (notes === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes); 
    }
    // remove first passed element and update further automatically
    notesObj.splice(index, 1);
    // converting notes into a string format
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    let messagedelete =document.getElementById("message");
    messagedelete.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Deleted!</strong> Oooppsss! You had deleted your note.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
    setTimeout(() => {
        messagedelete.innerHTML = ``;
    }, 6000);

}

// searching input
let searchText = document.getElementById("searchTxt");
searchText.addEventListener("input", () => {
    let inputLowerValue = searchText.value.toLowerCase();
    // console.log("input event fired" , inputValue);
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach((accessCard) => {
        let cardTxt = accessCard.getElementsByTagName("p")[0].innerText;
        if((cardTxt.includes(inputLowerValue)) ) {
            accessCard.style.display = "block";
        } else {
            accessCard.style.display = "none";
        }
      
    });
    let messageSearch =document.getElementById("message");
    messageSearch.innerHTML = `
    <div class="alert alert-info alert-dismissible fade show" role="alert">
        <strong>Ready!</strong> Your searched note is right here.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
    setTimeout(() => {
        messageSearch.innerHTML = ``;
    }, 6000);
});

