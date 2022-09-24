import mongoose from "mongoose"

export default mongoose.model('PostMessage', mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
}))

// const postSchema = mongoose.Schema({
//     title: String,
//     message: String,
//     creator: String,
//     tags: [String],
//     selectedFile: String,
//     likeCount: {
//         type: Number,
//         default: 0,
//     },
//     createdAt: {
//         type: Date,
//         default: new Date(),
//     }
// })

// const PostMessage = mongoose.model('PostMessage', postSchema)

// export default PostMessage