import { initializeBlogs, updateBlog } from "../reducers/blogReducer"
import { useSelector, useDispatch } from 'react-redux';
import { useEffect} from 'react'
import { useParams } from 'react-router-dom'

const BlogDetail = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    const id = useParams().id
    const blog = useSelector(state => state.blogs.find(b => b.id === id))

    const handleLike = (e) => {
        e.preventDefault()
        dispatch(updateBlog(blog))
    }

    return (
        <>
            <h2>{blog.title}</h2>
            <p>{blog.url}</p>
            <span>{blog.likes} likes <button onClick={handleLike}>like</button></span>
            <p>added by {blog.author}</p>
            <h4>comments</h4>
            <ul>
                {blog.comments?.map(c => (
                    <li key={c}>{c}</li>
                ))}
            </ul>
        </>
    )
}

export default BlogDetail