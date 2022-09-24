import * as api from '../api'
import * as action from '../constants/actionTypes'

export const getPosts = () => async (dispatch) => {
    try {
        dispatch({ type: action.START_LOADING })

        const { data } = await api.fetchPosts()
        dispatch({ type: action.FETCH_ALL, payload: data })

        dispatch({ type: action.END_LOADING })
    } catch (err) {
        console.log(err)
    }
}

export const getPost = id => async (dispatch) => {
    try {
        dispatch({ type: action.START_LOADING })

        const { data } = await api.fetchPost(id)
        dispatch({ type: action.FETCH_POST, payload: data })

        dispatch({ type: action.END_LOADING })
    } catch (err) {
        console.log(err)
    }
}

export const getPostsByPage = (page) => async (dispatch) => {
    try {
        dispatch({ type: action.START_LOADING })

        const { data } = await api.fetchPosts(page)
        dispatch({ type: action.FETCH_ALL, payload: data })

        dispatch({ type: action.END_LOADING })
    } catch (err) {
        console.log(err)
    }
}

export const getPostsBySearch = searchQuery => async (dispatch) => {
    try {
        const { data } = await api.fetchPostsBySearch(searchQuery)
        
        dispatch({ type: action.START_LOADING })

        dispatch({ type: action.FETCH_BY_SEARCH, payload: { data } })

        dispatch({ type: action.END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

export const createPost = (newPost, navigate) => async (dispatch) => {
    try {
        dispatch({ type: action.START_LOADING })

        const { data } = await api.createPost(newPost)
        dispatch({ type: action.CREATE, payload: data })

        dispatch({ type: action.END_LOADING })

        navigate(`/posts/${data._id}`)
    } catch (err) {
        console.log(err)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({ type: action.UPDATE, payload: data })
    } catch (err) {
        console.log(err)
    }
}

export const deletePost = id => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({ type: action.DELETE, payload: id })
    } catch (err) {
        console.log(err)
    }
}

export const likePost = id => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({ type: action.LIKE, payload: data })
    } catch (err) {
        console.log(err)
    }
}

export const commentPost = (comment, id) => async (dispatch) => {
    try {
        const { data } = await api.commentPost(comment, id)
        dispatch({ type: action.COMMENT, payload: data })
        return data.comments
    } catch (err) {
        console.log(err)
    }
}