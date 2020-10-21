import Board from '../models/Board.js'

export const getAll = async (req, res) => {
  try {
    const boards = await Board.find({userId: req.userId})
    res.status(201).json({
      boards
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

export const create = async (req, res) => {
  try {
    const board = new Board({
      name: req.body.name,
      userId: req.userId
    })
    await board.save()
    res.status(201).json({
      message: 'Board created',
      _id: board._id
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

export const edit = async (req, res) => {
  try {
    await Board.findByIdAndUpdate(req.body.id, {
      name: req.body.name
    })
    res.status(200).json({
      message: 'Board updated'
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

export const star = async (req, res) => {
  try {
    await Board.findByIdAndUpdate(req.body.id, {
      stared: req.body.stared
    })
    res.status(200).json({
      message: 'Board stared'
    })
  } catch (e) {
    res.status(500).json(e)
  }
}
