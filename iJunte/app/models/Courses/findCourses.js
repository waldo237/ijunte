const { Item } = require('../exercise');

async function findItems() {
  try {
    const result = await Item
      .find({ isPublished: true })
      .or([{ price: { $gte: 15 } },
        { name: /.*by*./i }])
      .sort('price')
      .select('name author price')
      .limit(1);
    return result;

  } catch (error) {
    console.log(error);

  }
}
