console.log("welcome to notes app. this is note.js");
showNotes();

//if user add a note , add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addText = document.getElementById("addText");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addText.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addText.value = "";
  //console.log(notesObj);
  showNotes();
  //function to show elements from localStorage
});
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
            <div class="my-2 mx-2 card" style="width: 18rem;">
                 <div class="card-body">
                     <h5 class="card-title">NOTES ${index + 1}</h5>
                     <p class="card-text">${element}</p>
                 <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete note</button>
                 </div>
            </div>`;
  });
  let noteElm = document.getElementById('notes');
  if (notesObj.length != 0) {
    noteElm.innerHTML = html;
  }
  else{
      noteElm.innerHTML =` Nothing to show! Use "Add notes" section to add notes.`;
  }
}
//function to delete note
function deleteNote(index){
   // console.log("im deleting" , index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
    let inputVal = search.value.toLowerCase();
    //console.log("input event fired!",inputVal);
    let noteCards = document.getElementsByClassName('my-2 mx-2 card');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
       // console.log(cardTxt);
    })
})