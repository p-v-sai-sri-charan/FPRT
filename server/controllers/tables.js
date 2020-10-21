import Table from '../models/Table.js'

export const getAll = async (req, res) => {
  try {
    const tables = await Table.find({boardId:req.params.boardId})
      .populate('items')
    res.status(201).json({
      message: 'Tables',
      tables
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

export const create = async (req, res) => {
  try {
    const table = new Table({
      name: req.body.name,
      boardId: req.body.boardId
    })
    await table.save()
    res.status(201).json({
      message: 'Table created',
      _id: table._id
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

export const edit = async (req, res) => {
  try {
    await Table.findByIdAndUpdate(req.body.id, {
      name: req.body.name
    })
    res.status(200).json({
      message: 'Table updated'
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

export const move = async (req, res) => {
  try {
    const table1 = await Table.findById(req.body.tableOneId)
    const table2 = await Table.findById(req.body.tableTwoId)
    const tempPosition = table2.position
    table2.position = table1.position
    table1.position = tempPosition
    await table1.save()
    await table2.save()
    res.status(200).json({
      message: 'Tables moved'
    })
  } catch (e) {
    res.status(500).json(e)
  }
}
