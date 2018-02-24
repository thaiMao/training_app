export function getAll(req: any, res: any) {
  res.json({ usersRouter: 'Get all users' })
}

export function getOne(req: any, res: any) {
  res.json({ usersRouter: 'Get one user' })
}

export function createOne(req: any, res: any) {
  res.json({ usersRouter: 'Create one user' })
}

export function findByParam(req: any, res: any) {
  res.json({ usersRouter: 'Find by param' })
}
