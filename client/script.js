const url = "http://localhost:3000/cars";

window.addEventListener("load", fetchData);

function fetchData() {
  fetch(url)
    .then((result) => result.json())
    .then((cars) => {
      let html = `<ul class="w-3/4 my-3 mx-auto flex flex-wrap gap-2 justify-center">`;
      cars.forEach((car) => {
        html += `
        <li
          class="bg-white basis-1/3 text-black p-2 rounded-md border-2 border-black-100 flex flex-row gap-4">
          <div class="bg-${car.color}-950 w-1/3"></div>
          <div class="flex-1 flex flex-col">
            <h3 class="text-lg font-medium">${car.brand} ${car.model}</h3>
            <p>Regnr: ${car.regnr}</p>
            <p>Årsmodell: ${car.year}</p>
            <p>Pris: ${car.price}kr</p>
            <div>
              <button class="border border-green-800 hover:bg-green-900/100 rounded-md bg-green-900/50 p-1 text-sm mt-2">
                Köp
              </button>
              <button class="border border-blue-800 hover:bg-blue-900/100 rounded-md bg-blue-900/50 p-1 text-sm mt-2">
                Ändra
              </button>
              <button class="border border-red-800 hover:bg-red-900/100 rounded-md bg-red-800/50 p-1 text-sm mt-2">
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

console.log(userForm);
userForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const serverUserObject = {
    brand: "",
    model: "",
    regnr: "",
    color: "",
    year: "",
    price: "",
    forSale: "",
  };

  // Om tid finns, hämta datan via loop
  serverUserObject.brand = userForm.brand.value;
  serverUserObject.model = userForm.model.value;
  serverUserObject.regnr = userForm.regnr.value;
  serverUserObject.color = userForm.color.value;
  serverUserObject.year = userForm.year.value;
  serverUserObject.price = userForm.price.value;
  serverUserObject.forSale = userForm.forSale.value;

  console.log(serverUserObject);

  const request = new Request(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(serverUserObject),
  });

  fetch(request).then((response) => {
    console.log(response);
    fetchData();
    userForm.reset();
  });
}
