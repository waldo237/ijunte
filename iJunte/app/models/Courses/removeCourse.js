const { Item } = require('../exercise');

async function removeItem(id) {
  try {
    const deleted = await Item.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
  }
  //   const deleted = await Item.deleteMany({ _id: id });
  //   const deleted = await Item.findByIdAndRemove(id);
  return deleted;
}
