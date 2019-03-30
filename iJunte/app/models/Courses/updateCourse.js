const { Item } = require('./exercise');

async function updateItem(id) {
  // method 1
  try {
    const result = await Item.updateMany({ author: 'waldo' }, {
      $set: {
        author: 'Pedrito',
        isPublished: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
  // method 2
  //   const updatable = await Item.findById({ isPublished: false });
  //   if (!updatable) return;
  //   updatable.set({
  //     isPublished: false,
  //     author: 'carlos',
  //   });
  //   const result = await updatable.save();
  // method 3
  // const updatable = await Item.findById({ isPublished: false });
  //   updatable.isPublished = false;
  //   updatable.author = 'Julian';
  //   const result = await updatable.save();
  console.log(result);
}
