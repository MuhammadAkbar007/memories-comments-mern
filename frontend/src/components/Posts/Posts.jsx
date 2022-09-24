import { useSelector } from 'react-redux'

import Post from '../Posts/Post/Post'

import Loader from '../Loader/Loader'

const Posts = ({ setCurrentId }) => {

  const { posts, isLoading } = useSelector(state => state.posts)

  if (!posts.length && !isLoading) return (
      <>
        <div className='badge bg-warning text-black p-5'>
          <h1 className='fw-bold lh-lg'>No posts</h1>
        </div>
      </>
    )

  return (
    <div>
      {isLoading ? <Loader /> : <>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {posts.map(post => (
            <Post post={post} setCurrentId={setCurrentId} key={post._id} />
          ))}
        </div>
      </>}
    </div>
  )
}

export default Posts