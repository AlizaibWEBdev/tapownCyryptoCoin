import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Boost from './pages/Boost';
import Tasks from './pages/Tasks';
import Stats from './pages/Stats';
import Header from './components/Header';
import Footer from './components/Footer';
import ConnectKrossWallet from './pages/ConnectKrossWallet';
import JoinBucconCommunity from './pages/JoinBucconCommunity';
import JoinHashgreedCommunity from './pages/JoinHashgreedCommunity';
import JoinTapOwnChannel from './pages/JoinTapOwnChannel';
import JoinKrossBlockchainCommunity from './pages/JoinKrossBlockchainCommunity';
import Rank from './pages/Rank';
import TapXTap from "./pages/TapXTap"
const App = () => {
   


    return (
      <Router>
      <div className="app-container">
         
          <div className="content">
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/boost" element={<Boost />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/stats" element={<Stats />} />
                  <Route path="/missions/connect-kross-wallet" element={<ConnectKrossWallet />} />
                  <Route path="/missions/join-tapown-channel" element={<JoinTapOwnChannel />} />
                  <Route path="/missions/join-buccon-community" element={<JoinBucconCommunity />} />
                  <Route path="/missions/join-hashgreed-community" element={<JoinHashgreedCommunity />} />
                  <Route path="/missions/join-kross-blockchain-community" element={<JoinKrossBlockchainCommunity />} />
                  <Route path="/leaderboard" element={<Rank />} />
                  <Route path="/TapXTap" element={<TapXTap />} />
              </Routes>
          </div>
          <Footer />
      </div>
  </Router>
    );
};

export default App;
