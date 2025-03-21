document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector(".search input");
  const filterList = document.querySelector(".filter ul");

  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter" && input.value.trim() !== "") {
      event.preventDefault();
      addTag(input.value.trim());
      input.value = "";
    }
  });

  function addTag(tagText) {
    const existingTags = Array.from(filterList.querySelectorAll("li")).map(
      (li) => li.textContent.trim()
    );

    if (!existingTags.includes(tagText)) {
      const li = document.createElement("li");
      li.innerHTML = `${tagText} <i class="fas fa-times"></i>`;

      li.querySelector("i").addEventListener("click", function () {
        li.remove();
      });

      filterList.appendChild(li);
    }
  }

  document.querySelectorAll(".filter li i").forEach((icon) => {
    icon.addEventListener("click", function () {
      this.parentElement.remove();
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.querySelector(".panel-box.plus");
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.style.display = "none";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100vw";
  modal.style.height = "100vh";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";

  modal.innerHTML = `
        <div class="modal-content" style="background: white; padding: 20px; border-radius: 10px; width: 400px; text-align: center;">
            <h2>Dodaj Przepis</h2>
            <label>Nazwa posiłku:</label>
            <input type="text" id="meal-name" style="width: 100%; margin-bottom: 10px;" />
            <label>Zdjęcie:</label>
            <input type="file" id="meal-image" accept="image/*" style="width: 100%; margin-bottom: 10px;" />
            <label>Składniki (oddzielone przecinkami):</label>
            <input type="text" id="meal-ingredients" style="width: 100%; margin-bottom: 10px;" />
            <label>Liczba kalorii:</label>
            <input type="number" id="meal-calories" style="width: 100%; margin-bottom: 10px;" />
            <button id="save-recipe" style="margin-right: 10px;">Zapisz</button>
            <button id="close-modal">Zamknij</button>
        </div>
    `;
  document.body.appendChild(modal);

  addButton.addEventListener("click", function () {
    modal.style.display = "flex";
  });

  modal.querySelector("#close-modal").addEventListener("click", function () {
    modal.style.display = "none";
  });

  modal.querySelector("#save-recipe").addEventListener("click", function () {
    const name = document.getElementById("meal-name").value;
    const imageInput = document.getElementById("meal-image");
    const ingredients = document
      .getElementById("meal-ingredients")
      .value.split(",")
      .map((ing) => ing.trim());
    const calories = document.getElementById("meal-calories").value;

    if (
      name &&
      imageInput.files.length > 0 &&
      ingredients.length > 0 &&
      calories
    ) {
      const imageUrl = URL.createObjectURL(imageInput.files[0]);
      const allRecipes = document.querySelector(".all-recipes ul");

      const newRecipe = document.createElement("li");
      newRecipe.innerHTML = `<img src="${imageUrl}" alt="${name}" />`;

      newRecipe.addEventListener("click", function () {
        const rightSide = document.querySelector(".right-side");
        rightSide.innerHTML = `
                    <img src="${imageUrl}" alt="${name}" />
                    <ul>
                        ${ingredients
                          .map((ing) => `<li><strong>${ing}</strong></li>`)
                          .join("")}
                    </ul>
                    <p><strong>Kalorie:</strong> ${calories} kcal</p>
                `;
      });

      allRecipes.appendChild(newRecipe);
      modal.style.display = "none";
    }
  });
});
