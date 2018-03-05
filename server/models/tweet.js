import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  coords: { type: 'Array', required: true },
  coordType: { type: 'String', required: true },
  createdAt: { type: 'String', required: true },
  id: { type: 'Number', required: true },
  text: { type: 'String', required: true },
  name: { type: 'String', required: false },
  location: { type: 'String', required: false },
  profile_image_url: { type: 'String', required: false },
  screen_name: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Tweet', tweetSchema);
