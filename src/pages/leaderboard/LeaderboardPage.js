import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  FaTrophy, FaMedal, FaAward, FaCrown, 
  FaFilter, FaCalendar 
} from 'react-icons/fa';
import './LeaderboardPage.css';

const LeaderboardPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [timeframe, setTimeframe] = useState('monthly');
  const [category, setCategory] = useState('all');

  const leaderboardData = [
    {
      id: 1,
      rank: 1,
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      points: 2850,
      coursesCompleted: 15,
      certificates: 12,
      streak: 45,
      badge: 'gold'
    },
    {
      id: 2,
      rank: 2,
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      points: 2720,
      coursesCompleted: 13,
      certificates: 10,
      streak: 38,
      badge: 'silver'
    },
    {
      id: 3,
      rank: 3,
      name: 'Emily Davis',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      points: 2650,
      coursesCompleted: 12,
      certificates: 9,
      streak: 32,
      badge: 'bronze'
    },
    {
      id: 4,
      rank: 4,
      name: 'David Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      points: 2480,
      coursesCompleted: 11,
      certificates: 8,
      streak: 28,
      badge: null
    },
    {
      id: 5,
      rank: 5,
      name: 'Lisa Anderson',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      points: 2350,
      coursesCompleted: 10,
      certificates: 7,
      streak: 25,
      badge: null
    }
  ];

  const currentUserRank = {
    rank: 12,
    points: 1850,
    coursesCompleted: 8,
    certificates: 5,
    streak: 15
  };

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'gold': return <FaCrown className="badge-gold" />;
      case 'silver': return <FaMedal className="badge-silver" />;
      case 'bronze': return <FaAward className="badge-bronze" />;
      default: return null;
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <FaCrown className="rank-gold" />;
    if (rank === 2) return <FaMedal className="rank-silver" />;
    if (rank === 3) return <FaAward className="rank-bronze" />;
    return <span className="rank-number">#{rank}</span>;
  };

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-header">
        <h1 className="page-title">
          <FaTrophy /> Leaderboard
        </h1>
        <div className="leaderboard-filters">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="filter-select"
          >
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="yearly">This Year</option>
            <option value="all-time">All Time</option>
          </select>
          
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="programming">Programming</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
      </div>

      <div className="leaderboard-content">
        <div className="current-user-rank">
          <div className="rank-card">
            <div className="rank-header">
              <h2>Your Ranking</h2>
              <div className="rank-position">
                {getRankIcon(currentUserRank.rank)}
              </div>
            </div>
            
            <div className="rank-stats">
              <div className="rank-stat">
                <span className="stat-value">{currentUserRank.points}</span>
                <span className="stat-label">Points</span>
              </div>
              <div className="rank-stat">
                <span className="stat-value">{currentUserRank.coursesCompleted}</span>
                <span className="stat-label">Courses</span>
              </div>
              <div className="rank-stat">
                <span className="stat-value">{currentUserRank.certificates}</span>
                <span className="stat-label">Certificates</span>
              </div>
              <div className="rank-stat">
                <span className="stat-value">{currentUserRank.streak}</span>
                <span className="stat-label">Day Streak</span>
              </div>
            </div>
          </div>
        </div>

        <div className="top-performers">
          <h2>Top Performers</h2>
          <div className="podium">
            {leaderboardData.slice(0, 3).map((user, index) => (
              <div key={user.id} className={`podium-position position-${index + 1}`}>
                <div className="podium-user">
                  <div className="podium-avatar">
                    <img src={user.avatar} alt={user.name} />
                    {getBadgeIcon(user.badge)}
                  </div>
                  <h3 className="podium-name">{user.name}</h3>
                  <p className="podium-points">{user.points} pts</p>
                </div>
                <div className="podium-rank">{user.rank}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="leaderboard-table">
          <div className="table-header">
            <h3>Full Rankings</h3>
          </div>
          
          <div className="rankings-list">
            {leaderboardData.map(user => (
              <div key={user.id} className="ranking-item">
                <div className="ranking-position">
                  {getRankIcon(user.rank)}
                </div>
                
                <div className="ranking-user">
                  <img src={user.avatar} alt={user.name} className="ranking-avatar" />
                  <div className="ranking-info">
                    <h4 className="ranking-name">{user.name}</h4>
                    <div className="ranking-badges">
                      {getBadgeIcon(user.badge)}
                    </div>
                  </div>
                </div>
                
                <div className="ranking-stats">
                  <div className="ranking-stat">
                    <span className="stat-value">{user.points}</span>
                    <span className="stat-label">Points</span>
                  </div>
                  <div className="ranking-stat">
                    <span className="stat-value">{user.coursesCompleted}</span>
                    <span className="stat-label">Courses</span>
                  </div>
                  <div className="ranking-stat">
                    <span className="stat-value">{user.certificates}</span>
                    <span className="stat-label">Certificates</span>
                  </div>
                  <div className="ranking-stat">
                    <span className="stat-value">{user.streak}</span>
                    <span className="stat-label">Streak</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;