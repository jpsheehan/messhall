module.exports = {
  users: [
    {
      id: '1', role: 'user', name: 'Jesse',
      email: 'jesse@example.com',
    },
    {
      id: '2', role: 'user', name: 'Patrick',
      email: 'patrick@example.com',
    },
    {
      id: '3', role: 'user', name: 'Jay',
      email: 'jay@example.com',
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
