let inputName = document.getElementById("name");
let inputLink = document.getElementById("link");
let btnAdd = document.getElementById("add");
let btnUpdate = document.getElementById("update");
var indexItem = 0;
let bookList = [];
if (localStorage.getItem("thebooklist") !== null) {
  bookList = JSON.parse(localStorage.getItem("thebooklist"));
  display();
}
function addIteams() {
  if (
    (inputName.value.length == 0 && inputLink.value.length == 0) ||
    inputName.value.length == 0 ||
    inputLink.value.length == 0
  ) {
    inputName.classList.add("is-invalid");
    inputLink.classList.add("is-invalid");
    document.getElementById("mesg").classList.remove("visually-hidden");
    document.getElementById("mesg").classList.remove("d-none");
  } else {
    if (linkValidation() && nameValidation()) {
      let book = {
        name: inputName.value.replace(
          inputName.value.charAt(0),
          inputName.value.charAt(0).toUpperCase()
        ),
        link: inputLink.value,
      };
      bookList.push(book);
      localStorage.setItem("thebooklist", JSON.stringify(bookList));
      display();
      clear();
    } else {
      document.getElementById("mesg").classList.remove("visually-hidden");
      document.getElementById("mesg").classList.remove("d-none");
    }
  }
}
function clear() {
  inputName.value = "";
  inputLink.value = null;
}
function display() {
  let cartona = "";
  for (let i = 0; i < bookList.length; i++) {
    cartona += `<tr >
      <td class="theade">${i + 1}</td>
      <td class="theade">${bookList[i].name}</td>
      <td class="text-center"> <a id="link" href="${bookList[i].link}">
     <button class="btn-js theade p-1 first text-light rounded text-center"><i class="fa-solid fa-eye mx-1"></i> Visit</button>
     </a></td>
     <td class="text-center">
       <button onclick="update(${i})"
   class="btn-js theade p-1 third text-light rounded text-center"><i class="fa-regular fa-pen-to-square mx-1"></i> Update</button>
     </td>
  <td class="text-center">
  <button onclick="deleteBook(${i})"
   class="btn-js theade p-1 second text-light rounded text-center"><i class="fa-solid fa-trash-can mx-1"></i> Delete</button>
  </td>
  </tr>`;
  }
  inputName.classList.remove("is-valid");
  inputLink.classList.remove("is-valid");
  document.getElementById("tbody").innerHTML = cartona;
}
function deleteBook(indexNumber) {
  bookList.splice(indexNumber, 1);
  localStorage.setItem("thebooklist", JSON.stringify(bookList));
  display();
}
function nameValidation() {
  let text = inputName.value;
  let nameRegex = /^\w{3,}(\s+\w+)*$/;
  if (nameRegex.test(text)) {
    inputName.classList.add("is-valid");
    inputName.classList.remove("is-invalid");
    return true;
  } else {
    inputName.classList.add("is-invalid");
    inputName.classList.remove("is-valid");
    return false;
  }
}
function linkValidation() {
  let text = inputLink.value;
  let linkRegex =
    /^(https?:\/\/|ftp:\/\/|www\.|\/\/)?([\w-]+(\.[\w-]+)+)(\/[^\s]*)?$/i;
  if (linkRegex.test(text)) {
    inputLink.classList.add("is-valid");
    inputLink.classList.remove("is-invalid");
    return true;
  } else {
    inputLink.classList.add("is-invalid");
    inputLink.classList.remove("is-valid");
    return false;
  }
}
function closeBox() {
  document.getElementById("mesg").classList.add("d-none");
  inputName.classList.remove("is-invalid");
  inputLink.classList.remove("is-invalid");
}
function update(index) {
  inputName.value = bookList[index].name;
  inputLink.value = bookList[index].link;
  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
  indexItem = index;
}
function updateData() {
  if (linkValidation() || nameValidation()) {
    let book = {
      name: inputName.value.replace(
        inputName.value.charAt(0),
        inputName.value.charAt(0).toUpperCase()
      ),
      link: inputLink.value,
    };
    bookList.splice(indexItem, 1, book);
    localStorage.setItem("thebooklist", JSON.stringify(bookList));
    display();
    clear();
    btnAdd.classList.remove("d-none");
    btnUpdate.classList.add("d-none");
  }
}
