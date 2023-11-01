import axios from 'axios';
import config from 'config.json';

export async function getSubs(accessToken, setTotalSub) {
  const twitchApi = 'https://api.twitch.tv/helix/subscriptions?broadcaster_id=' + config.broadcasterId; //256677231
  axios
    .get(twitchApi, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'client-id': config.clientID
      },
    })
    .then((response) => {
      setTotalSub(response?.data?.total);
    })
    .catch((error) => {
      console.error(error);
    });
}