import axios from 'axios'

// const url = 'https://memories-akbar.herokuapp.com/posts'
// const url = 'http://localhost:5000/posts'

// const API = axios.create({ baseURL: 'http://localhost:5000' })
const API = axios.create({ baseURL: 'https://memories-comments.herokuapp.com/' })
// const API = axios.create({ baseURL: 'https://memories-search-mern.herokuapp.com/' })
// const API = axios.create({ baseURL: 'https://auth-memories-akbar.herokuapp.com/' })

API.interceptors.request.use(req => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const fetchPosts = () => API.get('/posts')
export const fetchPost = id => API.get(`/posts/${id}`)
export const fetchPostsByPage = page => API.get(`/posts?page=${page}`)
export const fetchPostsBySearch = searchQuery => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = newPost => API.post('/posts', newPost)
export const updatePost = (id, updatingPost) => API.patch(`/posts/${id}`, updatingPost)
export const deletePost = id => API.delete(`/posts/${id}`)
export const likePost = id => API.patch(`/posts/${id}/likePost`)
export const commentPost = (comment, id) => API.post(`/posts/${id}/commentPost`, { comment })

export const signIn = formData => API.post('/user/signin', formData)
export const signUp = formData => API.post('/user/signup', formData)