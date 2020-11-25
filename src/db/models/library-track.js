import mongoose from 'mongoose';

const libraryTrackSchema = new mongoose.Schema({
  libraryId: Number,
  libraryName: String,
  metrics: {
    open_issues: {
      count: Number,
      averageTimeInDays: Number,
      standardDeviationTimeInDays: Number,
    },
  },
}, {
  timestamps: true,
});

export default mongoose.model('LibraryTrack', libraryTrackSchema);
