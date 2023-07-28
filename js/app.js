// selectors

const app = document.querySelector("#app");
const dataInput = document.querySelector("#dataInput");
const textInput = document.querySelector("#textInput");
const addBtn = document.querySelector("#addBtn");
const lists = document.querySelector(".lists");
const totalListCount = document.querySelector("#totalListCount");
const doneCount = document.querySelector("#doneCount");
const createForm = document.querySelector("#createForm");
const allSelectBtn = document.querySelector("#allSelect");
let listIndex = 0;

// ............................ Select All ................................

allSelectBtn.addEventListener("click", () => {
  const allList = document.querySelectorAll(".list");
  allList.forEach((list) => {
    list.querySelector(".form-check-input").click(); // *** Check List click invoked
    // list.querySelector(".form-check-input").checked = true; // only attribute
  });
});

// ..................... Checkbox => Done ( 3 / 3 ) .....................

const countDone = () => {
  const total = document.querySelectorAll(".form-check-input:checked").length;
  doneCount.innerText = total;
  return total;
};

// ........................ Done ( 0 / 3 ) .............................

const countList = () => {
  // counting total list number
  const total = document.querySelectorAll(".list").length;
  // UI update
  totalListCount.innerText = total;
  return total;
};

// function to generate random string *** stackoverflow

const randomId = (length = "5") => {
  let result = "";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charsLength = chars.length;
  let counter = 0;
  while (counter < length) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
    counter += 1;
    // counter++;
  }
  return result;
};

// function to generate lists

const createList = (task, autoCheck) => {
  const list = document.createElement("div");
  // const autoCheck = randomId();
  // const autoCheck = "uniqueNumber" + listIndex++;  // *** random Id generated
  //   list.className = "list";
  list.classList.add("list");
  list.innerHTML = ` 
  <div
  class="border border-2 p-3 d-flex justify-content-between align-items-center mb-3 animate__animated animate__backInRight bg-light-subtle"
>
  <div class="form-check">
    <input type="checkbox" id="${autoCheck}" class="form-check-input"/>
    <label for="${autoCheck}" class="form-check-label">${task}</label>
  </div>

  <div class="controls">
    <button class="btn btn-sm btn-outline-primary list-edit-btn me-1">
      <i class="bi bi-pencil-fill"></i>
    </button>
    <button class="btn btn-sm btn-outline-primary list-del-btn">
      <i class="bi bi-trash3-fill pe-none"></i>
    </button>
  </div>
</div>
`;

  // Global variable // checkBox , EditBtn
  const label = list.querySelector(".form-check-label");

  // ........................... Check List ..............................

  const checkBox = list.querySelector(".form-check-input");
  checkBox.addEventListener("click", () => {
    countDone();
    // const label = list.querySelector(".form-check-label");
    label.classList.toggle("text-decoration-line-through");
    // listEditBtn.classList.toggle("disabled");
    listEditBtn.toggleAttribute("disabled");

    // if (checkBox.checked) {
    //   label.classList.add("text-decoration-line-through");
    // } else {
    //   label.classList.remove("text-decoration-line-through");
    // }
  });

  // ............................ Edit List ..............................

  const listEditBtn = list.querySelector(".list-edit-btn");
  listEditBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    // const label = list.querySelector(".form-check-label");
    input.classList.add("form-control");
    input.value = label.innerText;
    // input.autofocus = true;

    label.innerHTML = "";
    label.append(input);
    input.focus(); // focus() only after append

    input.addEventListener("blur", () => {
      if (input.value === "") {
        alert("You cannot leave the list empty !");
      } else {
        label.innerText = input.value;
      }
    });
  });

  // const listEditBtn = list.querySelector(".list-edit-btn");
  // listEditBtn.addEventListener("click", () => {
  //   const input = document.createElement("input");
  //   const newList = list.querySelector(".form-check-label");
  //   newList.innerText = null;
  //   newList.append(input);
  //   newList.addEventListener("keyup", (event) => {
  //     if (event.key === "Enter") {
  //       newList.innerText = input.value;
  //     }
  //   });
  // });

  //   const listEditBtn = list.querySelector(".list-edit-btn");
  //   listEditBtn.addEventListener("dblclick", () => {
  //     const input = document.createElement("input");
  //     const formLabel = list.querySelector(".form-check-label");
  //     formLabel.innerText = null;
  //     formLabel.append(input);
  //     listEditBtn.addEventListener("click", () => {
  //       formLabel.innerText = input.value;
  //     });
  //   });

  // ............................ Delete List ............................

  // document.querySelector(".list").querySelector(".list-del-btn")
  const listDelBtn = list.querySelector(".list-del-btn");
  listDelBtn.addEventListener("click", (event) => {
    // console.log(event.target);
    // confirm() returns boolean

    // console.log(list.children[0]); // detect child of list => list.children[0]

    if (confirm("Are you sure you want to remove this list ?")) {
      list.children[0].classList.replace(
        "animate__backInRight",
        "animate__zoomOut"
      );

      list.children[0].addEventListener("animationend", () => {
        list.remove();
        countList();
        countDone();
      });
    }
  });

  return list;
};

// ............................. Add List ...............................

createForm.addEventListener("submit", (event) => {
  event.preventDefault();
  lists.append(createList(textInput.value, randomId()));
  textInput.value = "";
  countList();
});

// addBtn.addEventListener("click", () => {
//   if (textInput.value === "") {
//     alert("Please insert To-Do list first");
//   } else {
//     lists.append(createList(textInput.value));
//     textInput.value = null;
//     countList();
//   }
// });

// // Adding list using "Enter" button
// textInput.addEventListener("keyup", (event) => {
//   if (textInput.value === "") {
//     alert("Please insert To-Do list first");
//   } else if (event.key === "Enter") {
//     lists.append(createList(textInput.value));
//     textInput.value = "";
//     countList();
//   }
// });
