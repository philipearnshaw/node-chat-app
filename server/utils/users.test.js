const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Fred',
      room: 'Freds chat room'
    }, {
      id: '2',
      name: 'Barney',
      room: 'Barneys chat room'
    }, {
      id: '3',
      name: 'Sam',
      room: 'Freds chat room'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Fred',
      room: 'Freds chat room'
    };
    var result = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);  // Adds to internal users array.
  });

  it('should remove a user', () => {
    var user = users.removeUser('1');
    expect(user.id).toBe('1');
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var user = users.removeUser('99');
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    var user = users.getUser('2');
    expect(user.id).toBe('2');
  });

  it('should not find a user', () => {
    var user = users.getUser('99');
    expect(user).toNotExist();
  });

  it('should return names for Freds chat room', () => {
    var userList = users.getUserList('Freds chat room');

    expect(userList).toEqual(['Fred', 'Sam']);
  });

  it('should return names for Barneys chat room', () => {
    var userList = users.getUserList('Barneys chat room');

    expect(userList).toEqual(['Barney']);
  });
});
