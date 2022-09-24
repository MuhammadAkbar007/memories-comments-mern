import Posts from "../Posts/Posts"
import Form from '../Form/Form'
import Pagination from "../Pagination"

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'

import { getPosts, getPostsBySearch } from '../../actions/postsActions'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
  
    const dispatch = useDispatch()
    const query = useQuery()
    const navigate = useNavigate()

    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    const [currentId, setCurrentId] = useState(null)
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    useEffect(() => {
        if (!searchQuery) dispatch(getPosts())
    }, [searchQuery])


    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost()
        }
    }

    const handleAdd = tag => setTags([...tags, tag])

    const handleDelete = tagToDelete => setTags(tags.filter(tag => tag !== tagToDelete))

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
        } else {
            navigate('/posts/')
        }
    }

    return (
        <div>
            <div className="row mobile">
                <div className="col-md-8 col-sm-12">
                    <Posts setCurrentId={setCurrentId} />
                </div>
                <div className="col-md-4 col-sm-12">
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                    <div className="bg-transparent border p-3 mb-3 rounded shadow">
                        <input type="search" className="form-control me-1" placeholder="Search" aria-label="Search" value={search}
                            onChange={e => setSearch(e.target.value)} onKeyPress={handleKeyPress} />
                        <ChipInput className="my-2 bg-white rounded" fullWidth disableUnderline value={tags} label='Search Tags' onAdd={handleAdd}
                            onDelete={handleDelete} />
                        <div className="row px-3">
                            <button className="btn btn-primary" onClick={searchPost}>SEARCH</button>
                        </div>
                    </div>
                    {(!searchQuery && !tags.length) && <Pagination page={page} />}
                </div>
            </div>
        </div>
    )
}

export default Home