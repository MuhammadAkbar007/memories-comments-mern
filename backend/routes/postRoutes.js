import { Router } from "express"
import { getPostsBySearch, addPost, getPosts, getPost, updatePost, deletePost, likePost, commentPost } from "../controllers/postControllers.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = Router()

/* Tartib muhim */

router.get('/search', getPostsBySearch)
router.get('/:id', getPost)
router.get('/', getPosts)
router.post('/', authMiddleware, addPost)
router.patch('/:id', authMiddleware, updatePost)
router.delete('/:id', authMiddleware, deletePost)
router.patch('/:id/likePost', authMiddleware, likePost)
router.post('/:id/commentPost', authMiddleware, commentPost)

export default router