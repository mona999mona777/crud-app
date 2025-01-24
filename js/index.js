var inputName = document.getElementById("name");
var inputLink = document.getElementById("link");
var bookList = [];
if (localStorage.getItem("thebooklist") !== null) {
  bookList = JSON.parse(localStorage.getItem("thebooklist"));
  display();
}
function addIteams() {
  if (linkValidation() || nameValidation()) {
    var book = {
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
function clear() {
  inputName.value = "";
  inputLink.value = null;
}
function display() {
  var cartona = "";
  for (var i = 0; i < bookList.length; i++) {
    cartona += `<tr >
      <td class="theade">${i + 1}</td>
      <td class="theade">${bookList[i].name}</td>
      <td class="p-0 text-center"> <a id="link" href="${bookList[i].link}">
     <button class="btn-js theade px-2 py-1 first text-light rounded"><i class="fa-solid fa-eye pe-2 fa-sm"></i> Visit</button>
     </a></td>
  <td class="p-0 text-center">
  <button onclick="deleteBook(${i})"
   class="btn-js theade px-2 py-1 second text-light rounded"><i class="fa-solid fa-trash-can pe-2 fa-sm"></i> Delete</button>
  </td>
  </tr>`;
  }
  document.getElementById("tbody").innerHTML = cartona;
}
function deleteBook(indexNumber) {
  bookList.splice(indexNumber, 1);
  localStorage.setItem("thebooklist", JSON.stringify(bookList));
  display();
}
function nameValidation() {
  var text = inputName.value;
  var nameRegex = /^\w{3,}(\s+\w+)*$/;
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
  var text = inputLink.value;
  var linkRegex =
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
}
