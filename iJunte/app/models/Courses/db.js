const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/YourDB', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log(err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Item = mongoose.model('Item', courseSchema);
const course = new Item({
  name: 'Angular course',
  author: 'mosh',
  tags: ['node', 'backend'],
  isPublished: true,
});

async function createItem() {
  const result = await course.save();
  console.log(result);
}

async function getItems() {

  const courses = await Item;
  // .find({price:{$gte: 10, $lte: 20}, isPublished: true})
  find({ price: { $in: [10, 15, 20] } })
    .limit(2)
    .sort({ date: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

async function getDifferentAuthor() {
  const courses = await Item
    .find({ author: /^Waldo/ })
    .find({ author: /Milanes$/i })
    .find({ author: /.*os*./i })
    .or([{ author: 'mosh' }, { isPublished: true }])
    .and([{}])
    .limit()
    .sort()
    .select();
}

async function getCount() {
  const courses = await Item
    .find({ author: 'mosh' }, { isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .countDocuments();
  console.log(courses);
}


async function getPages() {
  const pageNum = 2;
  const pageSize = 10;

  const courses = await Item
    .find({ author: 'mosh' }, { isPublished: true })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .countDocuments();
  console.log(courses);
}

getDifferentAuthor();
