import mongoose from 'mongoose';
import ttl from 'mongoose-ttl';
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  longitude: { type: 'Number', required: true },
  latitude: { type: 'Number', required: true },
  coordType: { type: 'String', required: true },
  createdAt: { type: 'String', required: true },
  id: { type: 'Number', required: true },
  text: { type: 'String', required: true },
  name: { type: 'String', required: false },
  location: { type: 'String', required: false },
  profileImageUrl: { type: 'String', required: false },
  screenName: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

tweetSchema.plugin(ttl, { ttl: '1d' });

export default mongoose.model('Tweet', tweetSchema);
