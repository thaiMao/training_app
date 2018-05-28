const createPushSubscriptionRoute = (api: any) => {
  var PushSubscription = api.db.models['PushSubscription']
  return (req: any, res: any) => {
    let { endpoint, keys } = req.body
    PushSubscription.destroy({
      truncate: true
    })
      .then(() => {
        return PushSubscription.create({ endpoint, keys: JSON.stringify(keys) })
          .then((ps: any) => {
            let record = ps.get({ plain: true })
            record.keys = JSON.parse(record.keys)
            res.json(record)
          })
          .catch((err: any) => {
            res.json({ error: `Problem saving data: ${err}` })
          })
      })
      .catch((err: any) =>
        console.log(err, 'PushSubscription', PushSubscription)
      )
  }
}

export default createPushSubscriptionRoute
