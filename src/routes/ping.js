import { Router } from 'express'

const router = new Router()

router.route('/').get((req, res) => res.json('Server Working Fine'))

export default router
