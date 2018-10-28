module.exports = {
  singleReward: 'SELECT * FROM dbo.rewards WHERE id = @id',
  allRewards: 'SELECT * FROM dbo.rewards',

  singleRewardHistory: 'SELECT * FROM dbo.reward_history WHERE id = @id',
  allRewardHistories: 'SELECT * FROM dbo.reward_history',
  allRewardHistoriesByUser: 'SELECT * FROM dbo.reward_history WHERE user_id = @userId',

  allUsers: 'SELECT * FROM dbo.users',
  singleUser: 'SELECT * FROM dbo.users WHERE id = @id',

  rewardInventory: 'SELECT * FROM dbo.inventory WHERE reward_id = @rewardId',
  rewardRedemptions: 'SELECT * FROM dbo.reward_history WHERE reward_id = @rewardId',
};
