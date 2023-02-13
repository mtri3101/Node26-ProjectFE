const { response } = require("../helpers/response")
const commentService = require("../services/comment.service")

const createComment = () => {
    return async (req, res, next) => {
        try {
            const data = req.body;
            const { user } = res.locals;
            await commentService.createComment(user, data)
            res.status(200).json(response({ data: data }))
        } catch (error) {
            next(error)
        }
    }
}

const getComment = () => {
    return async (req, res, next) => {
        try {
            const comments = await commentService.getComment()
            res.status(200).json(response({ comments }))
        } catch (error) {
            next(error)
        }
    }
}

const deleteComment = () => {
    return async (req, res, next) => {
        try {
            const { commentId } = req.params
            await commentService.deleteComment(commentId)
            res.status(200).json(response("Comment deleted !"))
        } catch (error) {
            next(error)
        }
    }
}

const getCommentById = () => {
    return async (req, res, next) => {
        try {
            const { roomId } = req.params;
            const comment = await commentService.getCommentsByRoomId(roomId)
            res.status(200).json(response({ comment }))
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

const updateComment = () => {
    return async (req, res, next) => {
        try {
            const { commentId } = req.params;
            const { user } = res.locals;
            const data = req.body;
            await commentService.updateComment(user, data, commentId)
            res.status(200).json(response({ data }))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    getComment,
    deleteComment,
    createComment,
    getCommentById,
    updateComment
}