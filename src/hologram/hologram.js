import { useState, useEffect } from 'react'

import { getSubs } from 'core/twitchAPI.js';
import config from 'config.json';

import Holo from 'assets/holo.webm'
import './hologram.scss';

function Hologram() {
  const [accessToken, setAccessToken] = useState();
  const [totalSub, setTotalSub] = useState(0);
  const [repeater, setRepeater] = useState(0);
  const [subGoal, setSubGoal] = useState(sessionStorage.getItem('storageSubGoal') || 0);

  const percentHologram = totalSub * 80 / subGoal;

  const handleSubGoal = (value) => {
    setSubGoal(value);
    sessionStorage.setItem('storageSubGoal', value);
  }

  const onClickOnTwitch = () => {
    var response_type = 'token';
    window.location.href = `https://id.twitch.tv/oauth2/authorize?response_type=${response_type}&client_id=uzkfwo8h32e4o082bnl9c7qp7lvb7t&redirect_uri=${config?.fullRedirectUri}&scope=channel:read:subscriptions`; // http://localhost:3000/
  }

  useEffect(() => {
    if (accessToken) {
      getSubs(accessToken, setTotalSub);
      setTimeout(() => {
        setRepeater(e => e + 1);
      }, 10000);
    }
  }, [repeater, accessToken]);

  useEffect(() => {
    if (document?.location?.hash || accessToken) {
      var hash = window.location.hash.substring(1);
      var params = {}
      hash.split('&').map(hk => {
        let temp = hk.split('=');
        params[temp[0]] = temp[1]
        return 1;
      });
      setAccessToken(params?.access_token);
    } else {
      var response_type = 'token';
      window.location.href = `https://id.twitch.tv/oauth2/authorize?response_type=${response_type}&client_id=uzkfwo8h32e4o082bnl9c7qp7lvb7t&redirect_uri=${config?.fullRedirectUri}&scope=channel:read:subscriptions`
    }
  }, [accessToken]);

  return (
    <section>
      <div className='wrapperSetting'>
        <button onClick={onClickOnTwitch} className='twitchBtn'>Login Twitch</button>
        <div className='buttonNav'>
          <p>SubGoal: </p>
          <input
            type="number"
            name="number"
            placeholder="...."
            onChange={(e) => handleSubGoal(e.target.value)}
            value={subGoal || undefined}
          />
        </div>
      </div>
      <div className='wrapper'>
        <h1 className="glitch" data-text={totalSub + ' / ' + subGoal + ' subs'}>
          {totalSub + ' / ' + subGoal + ' subs'}
        </h1>
        <div style={{ height: percentHologram + 'vh', 'maxHeight': '100vh' }} className='holoWrapper'>
          <video loop autoPlay muted src={Holo}></video>
        </div>
      </div>
    </section>
  )
}

export default Hologram