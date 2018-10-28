module.exports = {
  singleReward: 'SELECT * FROM dbo.rewards WHERE id = @id',
  allRewards: 'SELECT * FROM dbo.rewards',
};
