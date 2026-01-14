const url = "http://localhost:3000/cars";

const messageModal = document.getElementById("messageModal");
const messageText = document.getElementById("messageText");
const closeMessageBtn = document.getElementById("closeMessageBtn");

const deleteModal = document.getElementById("deleteModal");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");

window.addEventListener("load", fetchData);

function fetchData() {
  fetch(url)
    .then((result) => result.json())
    .then((cars) => {
      let html = `<ul class="grid sm:grid-cols-1 sm:gap-10 md:grid-cols-2 md:gap-2 xl:grid-cols-3 xl:gap-2">`;
      cars.forEach((car) => {
        html += `
        <li
          class="bg-white basis-1/3 text-black p-2 rounded-md border-black-900 flex flex-row gap-4">
          <div class="car-color-${car.color} w-1/3 border border-2 border-black"></div>
          <div class="flex-1 flex flex-col">
            <h3 class="text-lg font-medium">${car.brand} ${car.model}</h3>
            <p>Regnr: ${car.regnr}</p>
            <p>Årsmodell: ${car.year}</p>
            <p>Pris: ${car.price}kr</p>
            <div>
              <button onclick="setCurrentCar(${car.id})" class="border border-blue-600 hover:bg-blue-600/100 rounded-md bg-blue-600/75 p-1 text-sm mt-2">
                Ändra
              </button>
              <button onclick="deleteCar(${car.id}, '${car.brand}', '${car.model}')" class="border border-red-600 hover:bg-red-600/100 rounded-md bg-red-600/75 p-1 text-sm mt-2" data-dialog-taret="removeModal">
                Ta bort
              </button>
            </div>
          </div>
        </li>`;
      });
      html += `</ul>`;

      const listContainer = document.getElementById("listContainer");
      listContainer.innerHTML = "";
      listContainer.insertAdjacentHTML("beforeend", html);
    });
}

function setCurrentCar(id) {
  console.log("currentId:", id);
  fetch(`${url}/${id}`)
    .then((result) => result.json())
    .then((car) => {
      console.log(car);
      userForm.brand.value = car.brand;
      userForm.model.value = car.model;
      userForm.regnr.value = car.regnr;
      userForm.color.value = car.color;
      userForm.year.value = car.year;
      userForm.price.value = car.price;

      localStorage.setItem("currentId", car.id);
    });
}

function deleteCar(id, brand, model) {
  console.log("delete id:", id, brand, model);
  localStorage.setItem("carIdDelete", id);

  const modalCar = document.getElementById("modalCar");
  modalCar.textContent = brand + " " + model;

  deleteModal.classList.remove("hidden");
  //fetch(`${url}/${id}`, { method: "DELETE" }).then((result) => fetchData());
}

confirmDelete.addEventListener("click", () => {
  const id = localStorage.getItem("carIdDelete");

  if (id) {
    fetch(`${url}/${id}`, { method: "DELETE" }).then((result) => {
      fetchData();
      closeModal();
    });
  }
  console.log("ID:", id, "has been deleted");
});

cancelDelete.addEventListener("click", closeModal);

function closeModal() {
  deleteModal.classList.add("hidden");
  localStorage.removeItem("carIdDelete");
}

console.log(userForm);
userForm.addEventListener("submit", handleSubmit);

userForm.addEventListener("reset", () => {
  localStorage.removeItem("currentId");
  userForm.reset();
});

closeMessageBtn.addEventListener("click", () => {
  messageModal.classList.add("hidden");
});

function handleSubmit(e) {
  e.preventDefault();
  const serverUserObject = {
    brand: "",
    model: "",
    regnr: "",
    color: "",
    year: "",
    price: "",
  };

  // Om tid finns, hämta datan via loop
  serverUserObject.brand = userForm.brand.value;
  serverUserObject.model = userForm.model.value;
  serverUserObject.regnr = userForm.regnr.value;
  serverUserObject.color = userForm.color.value;
  serverUserObject.year = userForm.year.value;
  serverUserObject.price = userForm.price.value;

  const id = localStorage.getItem("currentId");
  if (id) {
    serverUserObject.id = id;
  }

  const request = new Request(url, {
    method: id ? "PUT" : "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(serverUserObject),
  });

  fetch(request).then((response) => {
    fetchData();

    const actionType = id ? "uppdaterades" : "skapades";

    const brand = serverUserObject.brand;
    const model = serverUserObject.model;

    messageText.textContent = `${brand} ${model} ${actionType} korrekt!`;
    messageModal.classList.remove("hidden");

    if (actionType == "uppdaterades") {
      console.log("ID:", id, actionType);
    } else {
      console.log(brand, model, actionType);
    }

    localStorage.removeItem("currentId");
    userForm.reset();
  });
}
