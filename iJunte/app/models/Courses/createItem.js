const { Item } = require('../exercise');

async function createItem() {
  const course = new Item({
    name: 'Angular course',
    category: 'web',
    author: 'waldo',
    tags: ['tag1'],
    isPublished: true,
    price: 200,
  });
  try {
    const result = await course.save();
    return result;
  }
  catch (ex) {
    console.log(ex);
  }
}
exports.createItem = createItem;
