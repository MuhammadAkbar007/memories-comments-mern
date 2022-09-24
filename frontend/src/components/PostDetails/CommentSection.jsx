import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { commentPost } from '../../actions/postsActions'

const CommentSection = ({ post }) => {

    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const commentsRef = useRef()

    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`
        const newComments = await dispatch(commentPost(finalComment, post._id))
        setComments(newComments)
        setComment('')

        commentsRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className='px-2'>
            <div className="row px-3">
                <div className="col-5 border" style={{ height: '30vh', overflowY: 'scroll' }}>
                    <h5><b>Comments Section</b></h5>
                    {comments.map((c, i) => <div key={i}>
                        <small className='text-muted'>
                            <strong>
                                {c.split(': ')[0]}:
                            </strong>
                            {c.split(':')[1]}
                        </small>
                    </div>)}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name &&
                    <div className="col-7">
                        <div className="form-group">
                            <label htmlFor="comment"><b>Write a Comment</b></label>
                            <textarea className="form-control" rows={4} id="comment" placeholder='Comment' value={comment}
                                onChange={e => setComment(e.target.value)}></textarea>
                            <button className='btn btn-primary mt-2 w-100' onClick={handleClick} disabled={!comment}>Comment</button>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default CommentSection