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
  rewards: [
    {
      id: '1', date: '2018-10-24T18:57:18.255Z',
      points: 10, notes: 'attendance', userId: '1',
    },
    {
      id: '2', date: '2018-10-23T18:57:18.255Z',
      points: 10, notes: 'attendance', userId: '1',
    },
    {
      id: '3', date: '2018-10-22T18:57:18.255Z',
      points: -10, notes: 'redemption', userId: '1',
    },
    {
      id: '4', date: '2018-10-21T18:57:18.255Z',
      points: 10, notes: 'attendance', userId: '2',
    },
    {
      id: '5', date: '2018-10-20T18:57:18.255Z',
      points: 10, notes: 'attendance', userId: '2',
    },
    {
      id: '6', date: '2018-10-20T18:57:18.255Z',
      points: 10, notes: 'attendance', userId: '3',
    },
  ],
};
