import { Challenge } from '../../components/Challenge';
import challengesData from '../../data/challenges.json';
import {LogOut} from "/src/components/LogOut.jsx"
import './myfavorites.css';

export const MyFavorites = ({ token, user }) => (
  <div className="secret-page">
    <h2>Challenges</h2>
    <LogOut />
    <div className="challenge-list">
      {challengesData.map((challenge, index) => (
        <Challenge key={index} {...challenge} user={user} token={token} />
      ))}
    </div>
    
  </div>
);




