import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import IMatch from '../interfaces/IMatch';
import jwtValidade from '../helpers/jwtValidate';
import NotAuthorized from '../errors/notAuthorized';
import NotFound from '../errors/notFound';

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

  static async newMatch(match: IMatch, token: string) {
    const email = await jwtValidade.validate(token);

    if (!email) throw new NotAuthorized('Token must be a valid token');

    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;

    if (homeTeam === awayTeam) {
      throw new NotAuthorized('It is not possible to create a match with two equal teams');
    }

    const home = await Teams.findOne({ where: { id: homeTeam } });
    const away = await Teams.findOne({ where: { id: awayTeam } });

    if (!home?.id || !away?.id) throw new NotFound('There is no team with such id!');

    const newMatch = await Matches.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return newMatch;
  }

  static async finishMatch(id: number) {
    await Matches.update({
      inProgress: false,
    }, {
      where: {
        id,
      },
    });
  }
}
