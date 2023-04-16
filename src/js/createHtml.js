import { randomUserApi } from "./services/randomUsersApi";

let page = 1;
let userResults = 12;
let gender = "";
let paginationButton = document.getElementById("paginationButton");
const buttonWrapper = document.getElementById("buttonWrapper");
const pageContainer = document.getElementById("pageContainer");

function updatePage() {
  createHtml();
  previousPage();
}

paginationButton.addEventListener("click", () => {
  if (page < 4) {
    page++;
  } else if (page === 4) {
    paginationButton.remove();
    userResults = 2;
  }
  updatePage();
});

function previousPage() {
  let paginationButtonBack = document.createElement("button");
  paginationButtonBack.setAttribute("type", "button");
  paginationButtonBack.setAttribute("class", "paginationButtonBack");
  paginationButtonBack.innerHTML = "Back";

  const existingPreviousButton = document.querySelector(
    ".paginationButtonBack"
  );
  if (existingPreviousButton) {
    existingPreviousButton.remove();
  }

  paginationButtonBack.addEventListener("click", () => {
    page--;
    if (page >= 0 && page < 4) {
      buttonWrapper.appendChild(paginationButton);
      userResults = 12;
      updatePage();
      if (page == 0) {
        console.log("hej");
      }
    }
  });

  buttonWrapper.appendChild(paginationButtonBack);
}

export async function createHtml() {
  filterUsers(page, userResults);
  let result = await randomUserApi(page, userResults, gender);

  const profilesContainer = document.getElementById("profilesContainer");
  profilesContainer.innerHTML = "";

  for (let i = 0; i < result.results.length; i++) {
    const response = result.results[i];

    const usersContainer = document.createElement("div");
    usersContainer.setAttribute("class", "usersContainer");

    const userNameAndNat = createUserNameAndNat(response, usersContainer);
    userNameAndNat.setAttribute("class", "usersContainer__info--name");

    const profileImg = createImg(response, usersContainer);
    profileImg.setAttribute("class", "usersContainer__img");

    const usersInfoContainer = document.createElement("div");
    usersInfoContainer.setAttribute("class", "usersContainer__info");

    const userLocation = createUserLocation(response, usersInfoContainer);
    userLocation.setAttribute("class", "usersContainer__info--location");

    const userAge = createUserInfo(response.dob.age, usersInfoContainer);
    userAge.setAttribute("class", "usersContainer__info--age");

    const userGender = createUserInfo(response.gender, usersInfoContainer);
    userGender.setAttribute("class", "usersContainer__info--gender");

    usersContainer.appendChild(usersInfoContainer);
    profilesContainer.appendChild(usersContainer);
    pageContainer.appendChild(buttonWrapper);

    const userEmailButton = createUserEmailButton(response, usersContainer);
    userEmailButton.setAttribute("class", "usersContainer__button");
  }
}

function createImg(response, usersContainer) {
  const userImg = document.createElement("img");
  userImg.setAttribute("src", response.picture.large);
  userImg.setAttribute("alt", response.name.first + " " + response.name.last);
  usersContainer.appendChild(userImg);
  return userImg;
}

function createUserInfo(response, usersInfoContainer) {
  const userInfo = document.createElement("p");
  userInfo.innerHTML = response;
  usersInfoContainer.appendChild(userInfo);
  return userInfo;
}

function createUserNameAndNat(response, usersInfoContainer) {
  const userName = document.createElement("p");
  userName.innerHTML =
    response.name.title +
    " " +
    response.name.first +
    " " +
    response.name.last +
    " " +
    "(" +
    response.nat +
    ")";
  usersInfoContainer.appendChild(userName);
  return userName;
}

function createUserLocation(response, usersInfoContainer) {
  const userLocation = document.createElement("p");
  userLocation.innerHTML =
    response.location.city + ", " + response.location.country;
  usersInfoContainer.appendChild(userLocation);
  return userLocation;
}

function createUserEmailButton(response, usersInfoContainer) {
  const userEmailButton = document.createElement("button");
  userEmailButton.setAttribute("type", "button");
  userEmailButton.innerHTML = "Send email!";
  userEmailButton.onclick = () => {
    window.location.href = "mailto:" + response.email;
  };
  usersInfoContainer.appendChild(userEmailButton);
  return userEmailButton;
}

function filterUsers(page, userResults) {
  const filterGender = document.getElementById("filterUsers");

  const existingForm = filterGender.querySelector("form");
  if (existingForm) {
    filterGender.removeChild(existingForm);
  }

  const filterForm = document.createElement("form");
  const chooseFilter = document.createElement("select");
  const filterMale = document.createElement("option");
  const filterFemale = document.createElement("option");
  const filterLabel = document.createElement("label");

  filterForm.setAttribute("class", "filterUsers__form");

  let filterbutton = document.createElement("button");
  filterbutton.setAttribute("type", "submit");
  filterbutton.setAttribute("class", "filterUsers__button");
  filterbutton.innerHTML = "Sort";

  filterMale.value = "1";
  filterMale.text = "Male";
  filterFemale.value = "2";
  filterFemale.text = "Female";

  filterForm.appendChild(filterLabel);
  chooseFilter.appendChild(filterMale);
  chooseFilter.appendChild(filterFemale);
  filterForm.appendChild(chooseFilter);
  filterForm.appendChild(filterbutton);
  filterGender.appendChild(filterForm);

  filterbutton.addEventListener("click", async (e) => {
    e.preventDefault();
    if (chooseFilter.value === "1") {
      gender = "male";
    } else if (chooseFilter.value === "2") {
      gender = "female";
    }
    createHtml();
  });
}
