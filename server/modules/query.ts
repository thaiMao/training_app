const controllers = {
  getAll(model: any, body: any) {
    return Promise.resolve({ [model]: `Get all ${model}` })
  },
  getOne(model: any, body: any) {
    return Promise.resolve({ [model]: `Get one ${model}` })
  },
  createOne(model: any, body: any) {
    return Promise.resolve({ [model]: `Create one ${model}` })
  },
  updateOne(model: any, body: any) {
    return Promise.resolve({ [model]: `Update one ${model}` })
  },
  deleteOne(model: any, body: any) {
    return Promise.resolve({ [model]: `Delete a ${model}` })
  },
  findByParam(model: any, id: any) {
    return Promise.resolve({ [model]: `Find by param for ${model}` })
  }
}

function getAll(model: any) {
  return function(req: any, res: any, next: any) {
    controllers
      .getAll(model, req.body)
      .then(result => res.json(result))
      .catch(err => res.status(504).send('Something went wrong'))
  }
}

function getOne(model: any) {
  return function(req: any, res: any) {
    return controllers
      .getOne(model, req.body)
      .then(result => res.status(200).json(result))
      .catch(err => res.status(504).send('Something went wrong'))
  }
}

function createOne(model: any) {
  return function(req: any, res: any, next: any) {
    return controllers
      .createOne(model, req.body)
      .then(doc => res.status(201).json(doc))
      .catch(err => next(err))
  }
}

function updateOne(model: any) {
  return function(req: any, res: any, next: any) {
    const docToUpdate = req.docFromId
    const update = req.body

    return controllers
      .updateOne(docToUpdate, update)
      .then(doc => res.status(201).json(doc))
      .catch(err => next(err))
  }
}

function deleteOne(model: any) {
  return function(req: any, res: any, next: any) {
    return controllers
      .deleteOne(model, req.body)
      .then(result => {
        res.status(201).json(result)
      })
      .then(err => {
        next(err)
      })
  }
}

function findByParam(model: any) {
  return function(req: any, res: any, next: any, id: any) {
    return controllers
      .findByParam(model, id)
      .then(doc => {
        if (!doc) {
          next(new Error('Not Found Error'))
        } else {
          req.docFromId = doc
          next()
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

const generateControllers = function(model: any) {
  return {
    getAll: getAll(model),
    getOne: getOne(model),
    createOne: createOne(model),
    deleteOne: deleteOne(model),
    findByParam: findByParam(model)
  }
}

export default generateControllers
