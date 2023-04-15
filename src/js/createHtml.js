import { randomUserApi } from "./services/randomUsersApi";

let page = 1;
let userResults = 12;
let gender = "";

let paginationButton = document.getElementById("paginationButton");
paginationButton.addEventListener("click", () => {
  if (page < 4) {
    page++;
    createHtml();
    //return page;
    // } else if (page === 4) {
    //   userResults = 2;
    //   createHtml();
    //   return userResults;
    // }
    // if (page = 5) {
    //   page++;
    //   createHtml();
    //   return page;
    // } else {
    //   userResults = 2;
    //   return userResults;
    // }
  }
});

export async function createHtml() {
  filterUsers(page, userResults);
  let result = await randomUserApi(page, userResults, gender);

  const profilesContainer = document.getElementById("profilesContainer");
  profilesContainer.innerHTML = "";

  for (let i = 0; i < result.results.length; i++) {
    const response = result.results[i];
    // console.log("-->", result.results.location.street.number);

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
  userEmailButton.innerHTML = "Send an email!";
  userEmailButton.onclick = () => {
    window.location.href = "mailto:" + response.email;
  };
  usersInfoContainer.appendChild(userEmailButton);
  return userEmailButton;
}

export function filterUsers(page, userResults) {
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

  let filterbutton = document.createElement("button");
  filterbutton.setAttribute("type", "submit");
  filterbutton.innerHTML = "Sort";

  filterLabel.innerHTML = "Choose Gender:";

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
      console.log("male");
    } else if (chooseFilter.value === "2") {
      gender = "female";
    }

    await randomUserApi(page, userResults, gender);

    createHtml();
  });
}
