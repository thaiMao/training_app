let PushSubscription = null

function definePushSubscriptionModel(database, dataTypes) {
  PushSubscription = database.define('PushSubscription', {
    endpoint: {
      type: dataTypes.STRING,
      allowNull: false
    },
    keys: {
      type: dataTypes.STRING,
      allowNull: false
    }
  })
  return PushSubscription
}

module.exports = definePushSubscriptionModel
