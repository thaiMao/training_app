let Advertiser = null
function defineAdvertiserModel(database, dataTypes) {
  if (!Advertiser) {
    Advertiser = database.define('Advertiser', {
      name: dataTypes.TEXT,
      age: dataTypes.INTEGER,
      createdAt: dataTypes.DATE,
      updatedAt: dataTypes.DATE
    })
  }
  return Advertiser
}

module.exports = defineAdvertiserModel
