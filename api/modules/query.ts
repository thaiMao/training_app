import { mergeDeep } from 'immutable'

const testData = { message: 'hello' }

export const controllers = {
  async createOne(model: any, body: any) {
    try {
      return await model.create(body)
    } catch (err) {
      console.log(err)
      return { error: 'duplicate - already exists' }
    }
  },
  updateOne(docToUpdate: any, update: any) {
    const updatedDocument = mergeDeep(docToUpdate, update)
    return updatedDocument.save()
  },
  deleteOne(docToDelete: any) {
    return docToDelete.remove()
  },
  getOne(docToGet: any) {
    return Promise.resolve(docToGet)
  },
  getAll(model: any) {
    return model.find({}).exec()
  },
  findByParam(model: any, id: any) {
    return model.findById(id).exec()
  }
}

function getAll(model: any) {
  return function(req: any, res: any, next: any) {
    controllers
      .getAll(model)
      .then((result: any) => res.json(result))
      .catch((err: any) => res.status(504).send('Something went wrong'))
  }
}

function getOne(model: any) {
  return function(req: any, res: any) {
    return controllers
      .getOne(req.body)
      .then(result => res.status(200).json(result))
      .catch(err => res.status(504).send('Something went wrong'))
  }
}

function createOne(model: any) {
  return function(req: any, res: any, next: any) {
    return controllers
      .createOne(model, req.body)
      .then((doc: any) => res.status(201).json(doc))
      .catch((err: any) => next(err))
  }
}

function updateOne(model: any) {
  return function(req: any, res: any, next: any) {
    const docToUpdate = req.docFromId
    const update = req.body

    return controllers
      .updateOne(docToUpdate, update)
      .then((doc: any) => res.status(201).json(doc))
      .catch((err: any) => next(err))
  }
}

function deleteOne(model: any) {
  return function(req: any, res: any, next: any) {
    return controllers
      .deleteOne(req.body)
      .then((result: any) => {
        res.status(201).json(result)
      })
      .then((err: any) => {
        next(err)
      })
  }
}

function findByParam(model: any) {
  return function(req: any, res: any, next: any, id: any) {
    return controllers
      .findByParam(model, id)
      .then((doc: any) => {
        if (!doc) {
          next(new Error('Not Found Error'))
        } else {
          req.docFromId = doc
          next()
        }
      })
      .catch((err: any) => {
        next(err)
      })
  }
}

function generateControllers(model: any): Object {
  return {
    getAll: getAll(model),
    getOne: getOne(model),
    createOne: createOne(model),
    deleteOne: deleteOne(model),
    findByParam: findByParam(model)
  }
}
export default generateControllers
