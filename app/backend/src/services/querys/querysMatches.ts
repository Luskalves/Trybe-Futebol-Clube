const homeQuery = `
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

const awayQuery = `
  select 
    t.team_name as 'name',
      sum(m.away_team_goals > m.home_team_goals) * 3 + 
      (sum(m.home_team_goals = m.away_team_goals)) as 'totalPoints',
      count(m.away_team) as 'totalGames',
    sum(
      case 
        when m.away_team_goals > m.home_team_goals then 1
        else 0
          end
      ) as 'totalVictories',
      sum(m.home_team_goals = m.away_team_goals) as 'totalDraws',
      sum(m.home_team_goals > m.away_team_goals) as 'totalLosses',
      sum(m.away_team_goals) as 'goalsFavor',
      sum(m.home_team_goals) as 'goalsOwn',
      sum(m.away_team_goals) - sum(m.home_team_goals) as 'goalsBalance',
    round((sum(
      case 
        when m.away_team_goals > m.home_team_goals then 3
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
          when m.away_team = t.id then 1
                  else 0
        end
          ) * 3
      ) * 100, 2) as 'efficiency'   
  from teams as t
  inner join matches as m
  on t.id = m.away_team
  where m.in_progress = 0
  group by t.team_name
  order by totalPoints desc, goalsBalance desc, goalsFavor desc, goalsOwn;
`;

export { homeQuery, awayQuery };
