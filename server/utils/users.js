class Users {
  constructor() {
    this.users = [];
  }

  addUser (id, name, room) {
    var room = room.toLowerCase()
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    var user = this.users.filter((user) => user.id === id)[0];

    if (user) {
      // Create new users array without the removed user
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }

  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  getUserList(room) {
    var users = this.users.filter((user) => user.room === room.toLowerCase());
    var nameArray = users.map((user) => user.name);  // map to string array
    return nameArray;
  }
}

module.exports = {Users};
