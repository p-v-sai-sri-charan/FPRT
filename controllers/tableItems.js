import Item from '../models/Tableitem'
import Table from '../models/Table.js'

export const create = async (req, res) => {
  try {
    const item = new Item({
      text: req.body.text,
      tableId: req.body.tableId
    })
    await Table.findOneAndUpdate(
      {_id: req.body.tableId},
      {$push: {items: item}}
    )
    await item.save()
    res.status(201).json({
      message: 'TableItem created',
      _id: item._id
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

export const edit = async (req, res) => {
  try {
    await Item.findByIdAndUpdate(req.body.id, {
      text: req.body.text
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
    const item1 = await Item.findById(req.body.itemOneId)
    const item2 = await Item.findById(req.body.itemTwoId)
    const tempPosition = item1.position
    item2.position = item1.position
    item2.position = tempPosition
    await item1.save()
    await item2.save()
    res.status(200).json({
      message: 'Items moved'
    })
  } catch (e) {
    res.status(500).json(e)
  }
}
