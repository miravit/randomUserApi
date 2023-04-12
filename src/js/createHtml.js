import { randomUserApi } from "./services/randomUsersApi";

export async function createHtml() {
  const profilesContainer = document.getElementById("profilesContainer");

  const result = await randomUserApi();
  for (let i = 0; i < result.results.length; i++) {
    const response = result.results[i];
    // console.log("-->", result.results.location.street.number);

    const usersContainer = document.createElement("div");
    usersContainer.setAttribute("class", "usersContainer__hej");

    const profileImg = createImg(response, usersContainer);
    profileImg.setAttribute("class", "usersContainer__img");

    const usersInfoContainer = document.createElement("div");
    usersContainer.setAttribute("class", "usersContainer");

    const userName = createUserName(response, usersInfoContainer);
    userName.setAttribute("class", "usersContainer__info--name");

    const userAge = createUserInfo(response.dob.age, usersInfoContainer);
    userAge.setAttribute("class", "usersContainer__info--age");

    const userGender = createUserInfo(response.gender, usersInfoContainer);
    userGender.setAttribute("class", "usersContainer__info--gender");

    const userLocation = createUserLocation(response, usersInfoContainer);
    userLocation.setAttribute("class", "usersContainer__info--location");

    usersContainer.appendChild(usersInfoContainer);
    profilesContainer.appendChild(usersContainer);
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

function createUserName(response, usersInfoContainer) {
  const userName = document.createElement("p");
  userName.innerHTML =
    response.name.title + " " + response.name.first + " " + response.name.last;
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
