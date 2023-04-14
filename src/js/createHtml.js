import { randomUserApi } from "./services/randomUsersApi";

export async function createHtml() {
  const profilesContainer = document.getElementById("profilesContainer");

  const result = await randomUserApi();
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
  return createHtml;
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
