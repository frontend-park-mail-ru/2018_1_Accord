export default class User {
  constructor(object) {
    this.id = object.id;
    this.email = object.email;
    this.username = object.nickname;
    this.rating = object.rating;
  }

  getProfileData() {
    return {
      'username': this.username,
      'rating': this.rating
    };
  }
}