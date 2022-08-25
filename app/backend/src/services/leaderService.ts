// import IMatches from '../interfaces/IMatches';
import model from '../database/models';
// import Matches from '../database/models/Matches';

const queryHome = `
  select 
    t.team_name as 'name',
      sum(m.home_team_goals > m.away_team_goals) * 3 + 
      (sum(m.home_team_goals = m.away_team_goals)) as 'totalPoints',
      count(m.home_team) as 'totalGames',
    sum(
      case 
        when m.home_team_goals > m.away_team_goals then 1
        else 0
          end
      ) as 'totalVictories',
      sum(m.home_team_goals = m.away_team_goals) as 'totalDraws',
      sum(m.home_team_goals < m.away_team_goals) as 'totalLosses',
      sum(m.home_team_goals) as 'goalsFavor',
      sum(m.away_team_goals) as 'goalsOwn',
      sum(m.home_team_goals) - sum(m.away_team_goals) as 'goalsBalance',
    round((sum(
      case 
        when m.home_team_goals > m.away_team_goals then 3
        else 0
          end
      ) + sum(
      case 
        when  m.home_team_goals = m.away_team_goals then 1
              else 0
      end
      )
      ) / (
      sum(
        case
          when m.home_team = t.id then 1
                  else 0
        end
          ) * 3
      ) * 100, 2) as 'efficiency'   
  from teams as t
  inner join matches as m
  on t.id = m.home_team
  where t.id = m.home_team and m.in_progress = 0
  group by t.team_name
  order by totalPoints desc, goalsBalance desc, goalsFavor desc, goalsOwn;
`;

export default class LeaderService {
  constructor(public leaderModel = model) {}
  public async getHome() {
    const [querys] = await this.leaderModel.query(queryHome);

    return querys;
  }
}
