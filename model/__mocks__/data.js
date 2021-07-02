const contacts = [
  {
    favorite: false,
    _id: '60940d18b9f0ed2f5cac96a4',
    name: 'Aleksei Kukharchuk',
    email: 'kukharchuk@mail.com',
    phone: '(067) 733-73-21',
    owner: {
      _id: '6093cba331836f24509c9522',
      email: 'test1@test.com',
    },
    __v: 0,
  },
  {
    favorite: false,
    _id: '60940d30b9f0ed2f5cac96a5',
    name: 'Ivan Kukharchuk',
    email: 'ivan.kukharchuk@mail.com',
    phone: '(067) 525-73-21',
    owner: {
      _id: '6093cba331836f24509c9522',
      email: 'test1@test.com',
    },
    __v: 0,
  },
];

const newContact = {
  favorite: false,
  name: 'Vladislav Kukharchuk',
  email: 'vlad.kukharchuk@mail.com',
  phone: '(067) 733-93-21',
};

const User = {
  _id: { $oid: '6093cba331836f24509c9522' },
  subscription: 'business',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTNjYmEzMzE4MzZmMjQ1MDljOTUyMiIsImlhdCI6MTYyMTM1MTU2MSwiZXhwIjoxNjIxMzU4NzYxfQ.2JloG7B_BEbgFdqbr1cuPFqmctkQgmo_527gTVx7104',
  email: 'test1@test.com',
  password: '$2a$06$Kf05pN1zltfHOdrI6k14q.R5N2VznSgICFhucdL0J9mEzyeHSpPVy',
  createdAt: { $date: '2021-05-06T10:57:39.698Z' },
  updatedAt: { $date: '2021-05-18T15:26:01.661Z' },
  avatar: 'avatars/1621272914598-2.jpg',
};

const users = [];
users[0] = User;

const newUser = { email: 'test3@test.com', password: '12345' };

module.exports = {
  contacts,
  newContact,
  User,
  users,
  newUser,
};
