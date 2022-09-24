import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getPost, getPostsBySearch } from '../../actions/postsActions'
import moment from 'moment'

import Loader from '../Loader/Loader'
import CommentSection from './CommentSection'

const PostDetails = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { post, posts, isLoading } = useSelector(state => state.posts)

  useEffect(() => {
    dispatch(getPost(id))
  }, [id])

  useEffect(() => {
    if (post) dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }))
  }, [post])

  if (!post) return null

  if (isLoading) return <Loader />

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id)

  const openPost = id => navigate(`/posts/${id}`)

  return (
    <div>
      <div className="card p-1">
        <div className="row">
          <div className="col-md-7">
            <div className="card-body">
              <h1 className="card-title fw-bold">{post.title}</h1>
              <p className="card-text">
                <small className='text-muted'>
                  {post.tags.map(tag => `#${tag} `)}
                </small>
              </p>
              <p className="card-text">{post.message}</p> <hr />
              <h5 className='fst-italic'>Created by: {post.name || post.creator}</h5> <hr />
              <p><strong>{moment(post.createdAt).fromNow()}</strong></p>
            </div>
            <CommentSection post={post} />
          </div>
          <div className="col-md-5 pt-5">
            <img src={post.selectedFile} alt="post.img" className='img-fluid rounded' style={{ maxHeight: '70vh' }} />
          </div>
        </div>
        {recommendedPosts.length ? <div className='row'>
          <div className="col-md-8 offset-2 text-center">
            <hr /><h5><b>You may also like:</b></h5>
          </div>
        </div> : <div><hr /><h5><b>No related posts</b></h5></div>}
      </div>
      {recommendedPosts.length ? (
        <div className='row'>
          {recommendedPosts.map(({ title, message, name, creator, likes, selectedFile, _id }) => (
            <div className='col-md-3' key={_id} onClick={() => openPost(_id)}>
              <div className='card bg-white mt-1 rounded shadow p-1 text-center my-card-overlay' style={{ cursor: 'pointer' }}>
                <div className="row">
                  <div className="col-md-4">
                    <img src={selectedFile} alt="post.img" className='img-fluid rounded' />
                    <div className="my-overlay"></div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title fw-bold">{title}</h5> <hr />
                      <h5 className='fst-italic'>{name || creator}</h5> <hr />
                      <p className="card-text">{message}</p>
                      <p className="card-text">Likes: {likes.length} 👍</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>) : ''}
    </div>
  )
}

export default PostDetails