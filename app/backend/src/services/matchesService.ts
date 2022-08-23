import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class MatchesService {
  static async findAll() {
    const matches = await Matches.findAll({
      include: [
        { model: Teams, attributes: { exclude: ['id'] }, as: 'teamHome' },
        { model: Teams, attributes: { exclude: ['id'] }, as: 'teamAway' },
      ],
    });
    return matches;
  }
}
