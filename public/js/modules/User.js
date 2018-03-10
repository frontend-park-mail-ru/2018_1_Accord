export default class User {
  constructor(object) {
    this.email = object.email;
    this.username = object.nickname;
    this.rating = object.rating;
  }
}