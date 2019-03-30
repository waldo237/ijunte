const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-exercises', { useNewUrlParser: true })
  .then(() => console.log('connected to db'))
  .catch(err => console.log(err));
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 250,
  },
  category: {
    type: String,
    lowercase: true,
    trim: true,
    enum: ['web', 'mobile', 'tv'],
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator(v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 1000);
      },
      message: 'A course should have at least one tag.',
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required() { return this.isPublished; },
    min: 10,
    max: 200,
    get: v => Math.round(v),
    set: v => Math.round(v),
  },
});
const Item = new mongoose.model('Item', courseSchema);

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

async function run() {
  try {
    const display = await createItem();
    console.log(display);

  } catch (error) {
    console.log(error);
  }

}
run();
// removeItem('5c9cd6f6c2e3ec1e080003dd');
exports.Item = Item;
