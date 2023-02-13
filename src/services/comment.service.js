const { AppError } = require("../helpers/error")
const { Room, Comment, User } = require("../models");

const createComment = async (token, data) => {
    try {
        const room = await Room.findByPk(data.roomId)
        if (!room) {
            throw new AppError(404, "Room not found")
        }
        if (!data.content) {
            throw new AppError(400, "Please give a content")
        }
        if (!data.rateComment) {
            throw new AppError(400, "Please rate")
        }
        if (data.rateComment < 0 || data.rateComment > 5) {
            throw new AppError(400, "Please rate from 1 to 5");
        }
        const comment = await room.addUserComments(token.id, {
            through: {
                roomId: data.roomId,
                content: data.content,
                rateComment: data.rateComment
            }
        })
        return comment
    } catch (error) {
        throw error
    }
}

const getComment = async () => {
    try {
        const comment = await Comment.findAll();
        return comment
    } catch (error) {
        throw error
    }
}

const deleteComment = async (commentId) => {
    try {
        const comment = await Comment.findOne({
            where: {
                id: commentId
            }
        })
        if (!comment) {
            throw new AppError(404, "Id comment not found")
        }
        await Comment.destroy({ where: { id: commentId } })
    } catch (error) {
        throw error
    }
}

const getCommentsByRoomId = async (roomId) => {
    try {
        console.log(roomId)
        const comment = await Comment.findAll({
            where: {
                roomId: roomId
            }
        })
        if (!comment) {
            throw new AppError(404, "Comment not found")
        }


        return comment
    } catch (error) {
        throw error
    }
}

const updateComment = async (token, data, commentId) => {
    try {
        console.log(commentId)
        const comment = await Comment.findOne({
            where: {
                id: commentId
            }
        })
        if (!comment) {
            throw new AppError(404, "Comment not found")
        }

        const user = await User.findOne({
            where: {
                id: token.id
            }
        })
        if (!user) {
            throw new AppError(404, "This user is not comment ")
        }
        if (!data.content) {
            throw new AppError(400, "Please give a content")
        }
        if (!data.rateComment) {
            throw new AppError(400, "Please rate")
        }
        if (data.rateComment < 0 || data.rateComment > 5) {
            throw new AppError(400, "Please rate from 1 to 5");
        }

        const updatedComment = await Comment.update(data, {
            where: {
                id: commentId
            }
        })
        return updatedComment
    } catch (error) {
        throw error
    }
}



module.exports = {
    createComment,
    getComment,
    deleteComment,
    getCommentsByRoomId,
    updateComment,
}