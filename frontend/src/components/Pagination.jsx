import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPostsByPage } from '../actions/postsActions'

const Pagination = ({ page }) => {

    const dispatch = useDispatch()
    const [active, setActive] = useState(page)
    const { numberOfPages } = useSelector(state => state.posts)

    useEffect(() => {
        if (page) dispatch(getPostsByPage(page))
    }, [page])

    return (
        <div className='bg-transparent border rounded shadow pt-2 pb-1 mb-3'>
            <ul className="pagination justify-content-center">
                <li className='page-item' onClick={() => setActive(1)}>
                    <Link to={`/posts?page=${1}`} className={`page-link ${active === 1 ? `active` : ''}`}><b>1</b></Link>
                </li>
                <li className='page-item' onClick={() => setActive(2)}>
                    <Link to={`/posts?page=${2}`} className={`page-link rounded ${active === 2 ? `active` : ''}`}><b>2</b></Link>
                </li>
                <li className='page-item' onClick={() => setActive(3)}>
                    <Link to={`/posts?page=${3}`} className={`page-link rounded ${active === 3 ? `active` : ''}`}><b>3</b></Link>
                </li>
                <li className='page-item' onClick={() => setActive(4)}>
                    <Link to={`/posts?page=${4}`} className={`page-link rounded ${active === 4 ? `active` : ''}`}><b>4</b></Link>
                </li>
                <li className='page-item' onClick={() => setActive(5)}>
                    <Link to={`/posts?page=${5}`} className={`page-link ${active === 5 ? `active` : ''}`}><b>5</b></Link>
                </li>
            </ul>
        </div>
    )
}

export default Pagination