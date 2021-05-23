// console.log("Hello");
let val =0;
showNotes(); // calling here also because so that as page is loaded it again show 

// Adding to local Storage the notes of user

let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", () => {

    let addText = document.getElementById("addText");
    let notes = localStorage.getItem("notes"); // checking local storage and name it to notes 

    if (notes === null) {
        notesObj = [];// creating array here to null value
    }
    else {
        notesObj = JSON.parse(notes); // adding value to array here what local storage is giving back
    }

    notesObj.push(addText.value);// pushing the new text from user into array

    localStorage.setItem("notes", JSON.stringify(notesObj)); // updating local storage after user added a text 

    addText.value = "";// again keep the text empty

    console.log(notesObj);
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
    notesObj.forEach((text, index) => {
        val=index;
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;
        border-radius:6px;
        border:1px solid black;
        ">
        <div class="card-body">
        <h5 class="card-title">Note-${index + 1}</h5>
        <p class="card-text">${text}</p>
        <button class="btn btn-warning dl" id="${index}"><i class="fas fa-trash"></i> Delete Note</button>
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

let deleteBtn = document.getElementById(`${notesObj.length}`);
deleteBtn.addEventListener("click", () => {
    deleteButton(this.id);
});

function deleteButton(index) {
    console.log("I am deleting",index);
}