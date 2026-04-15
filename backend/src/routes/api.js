import { Router } from 'express'

const router = Router()

// TODO: replace in-memory store with a database
const containers = []

router.get('/containers', (_req, res) => {
  res.json(containers)
})

router.post('/containers', (req, res) => {
  const container = { id: Date.now(), ...req.body }
  containers.push(container)
  res.status(201).json(container)
})

router.put('/containers/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = containers.findIndex((c) => c.id === id)
  if (index === -1) return res.status(404).json({ error: 'Not found' })
  containers[index] = { ...containers[index], ...req.body }
  res.json(containers[index])
})

router.delete('/containers/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = containers.findIndex((c) => c.id === id)
  if (index === -1) return res.status(404).json({ error: 'Not found' })
  containers.splice(index, 1)
  res.status(204).end()
})

export default router
