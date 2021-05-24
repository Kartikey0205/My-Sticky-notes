// console.log("Hello");
showNotes(); // calling here also because so that as page is loaded it again show 
// Adding to local Storage the notes of user
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => {

    let addText = document.getElementById("addText");
    let addTitle = document.getElementById("addTitle");

    let notes = localStorage.getItem("notes"); // checking local storage and name it to notes 
    if (notes === null) {
        notesObj = [];// creating array here to null value
    }
    else {
        notesObj = JSON.parse(notes); // adding value to array here what local storage is giving back
    }

    let enterNotes = {
        title: addTitle.value,
        text: addText.value,
    }
    notesObj.push(enterNotes);// pushing the new text from user into array
    localStorage.setItem("notes", JSON.stringify(notesObj)); // updating local storage after user added a text 
    addText.value = "";// again keep the text empty
    addTitle.value = "";
    // console.log(notesObj);
    showNotes();

});


// Show note Card function 
function showNotes() {
    let notes = localStorage.getItem("notes"); // checking local storage and name it to notes
    if (notes === null) {
        notesObj = [];// creating array here to null value
    }
    else {
        notesObj = JSON.parse(notes); // adding value to array here what local storage is giving back
    }
    // Adding notes card as soon as add button is clicked
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
    let notes = localStorage.getItem("notes"); // checking local storage and name it to notes
    if (notes === null) {
        notesObj = [];// creating array here to null value
    }
    else {
        notesObj = JSON.parse(notes); // adding value to array here what local storage is giving back
    }
    notesObj.splice(index, 1);
    // updating agin a local storage
    localStorage.setItem("notes", JSON.stringify(notesObj)); // updating local storage after user added a text 
    showNotes();
}

// Now creating search button active
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
});