module.exports = {
  users: [
    {
      id: '1', role: 'user', firstName: 'Jesse', lastName: 'Example',
      email: 'jesse@example.com', hash: '12345',
    },
    {
      id: '2', role: 'user', firstName: 'Patrick', lastName: 'Example',
      email: 'patrick@example.com', hash: '12345',
    },
    {
      id: '3', role: 'user', firstName: 'Jay', lastName: 'Example',
      email: 'jay@example.com', hash: '12345',
    },
  ],
  rewardHistory: [
    {
      id: '1', date: '2018-10-24T18:57:18.255Z',
      type: 'attendance', userId: '1',
    },
    {
      id: '2', date: '2018-10-23T18:57:18.255Z',
      type: 'attendance', userId: '1',
    },
    {
      id: '3', date: '2018-10-22T18:57:18.255Z',
      type: 'redemption', userId: '1', rewardId: '1',
    },
    {
      id: '4', date: '2018-10-21T18:57:18.255Z',
      type: 'attendance', userId: '2',
    },
    {
      id: '5', date: '2018-10-20T18:57:18.255Z',
      type: 'attendance', userId: '2',
    },
    {
      id: '6', date: '2018-10-20T18:57:18.255Z',
      type: 'attendance', userId: '3',
    },
  ],
  rewards: [
    {id: '1', name: 'Cadbury Dairy Milk', cost: 10},
    {id: '2', name: 'Cadbury Crunchy', cost: 15},
    {id: '3', name: 'Cadbury Picnic', cost: 20},
  ],
  inventory: [
    {id: '1', rewardId: '1', date: '2018-10-22T18:57:18.255Z', quantity: 12},
    {id: '2', rewardId: '1', date: '2018-10-22T18:57:18.255Z', quantity: 12},
    {id: '3', rewardId: '2', date: '2018-10-22T18:57:18.255Z', quantity: 12},
    {id: '4', rewardId: '3', date: '2018-10-22T18:57:18.255Z', quantity: 12},
  ],
};
