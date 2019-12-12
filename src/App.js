/*global chrome*/

import React, { useEffect, useState } from 'react';
import './App.css';
import { UPS_PATTERN } from "./regex-constants";
import TrackingNumberRow from './components/tracking-number-row/tracking-number-row';

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    try {
      chrome.runtime.sendMessage("hello", response => {
        const getUps = response.match(UPS_PATTERN);
        const upsSet = new Set(getUps);
        const upsNoDuplicates = [...upsSet];

        const formattedUpsArray = upsNoDuplicates.map(trackingCode =>
          ({
            carrier: "ups",
            tracking_code: trackingCode
          })
        );

        setMatches(prevMatches => formattedUpsArray.length
          ? [...prevMatches, ...formattedUpsArray]
          : []);
      });

    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="App">
      <header>
        <div className="app-logo">
          <img src="/logo.svg" alt="" />
        </div>
      </header>
      <main>
        {matches && matches.map(packageInfo => <TrackingNumberRow packageInfo={packageInfo} />)}
      </main>
    </div>
  );
}

export default App;
