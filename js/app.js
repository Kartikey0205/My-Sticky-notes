
// console.log("Hello");
// method to show available notes
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
addBtn.addEventListener("click", () => {

    let addText = document.getElementById("addText");
    let addTitle = document.getElementById("addTitle");
// accessing local storage
    let notes = localStorage.getItem("notes"); 
    if (notes === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes); 
    }

    let enterNotes = {
        title: addTitle.value,
        text: addText.value,
    }
    notesObj.push(enterNotes);
    localStorage.setItem("notes", JSON.stringify(notesObj)); 
    addText.value = "";
    addTitle.value = "";
    // console.log(notesObj);
    showNotes();

});


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
        <h5 class="card-title">${element.title}</h5>
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

