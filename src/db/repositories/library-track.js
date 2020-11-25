import LibraryTrackModel from '../models/library-track';
import PersistenceError from '../../utils/errors/persistence';

export default class LibraryTrackRepository {
  static async create(payload) {
    try {
      return LibraryTrackModel.create(payload);
    } catch (err) {
      throw new PersistenceError(err);
    }
  }

  static async findLibrarySearchedTodayById(libraryId) {
    try {
      const today = new Date();

      return LibraryTrackModel.findOne({
        libraryId,
        createdAt: {
          $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate(), '00'),
          $lt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), '23', '59'),
        },
      });
    } catch (err) {
      throw new PersistenceError(err);
    }
  }
}
