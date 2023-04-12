export class User {
  constructor() {
    this.gender = "";
    this.name = {
      title: "",
      first: "",
      last: "",
    };
    this.location = {
      city: "",
      state: "",
      country: "",
    };
    this.email = "";
    this.dob = {
      date: "",
      age: 0,
    };
    this.phone = "";
    this.picture = {
      large: "",
      medium: "",
      thumbnail: "",
    };
    this.nat = "";
  }
}
