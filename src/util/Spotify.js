const clientId = 'your token';
// clientId is bad naming convention.
// it's better to use clientId.
const redirectUri = 'http://localhost:3000/';

let accessToken;

// let headers = {Authorization: `Bearer ${accessToken}`};
// somehow the fetch function cannot access some variables outside of the obejct

const Spotify = {
  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }
    const evaluateToken = window.location.href.match(/access_token=([^&]*)/);
    const evaluateExpiry = window.location.href.match(/expires_in=([^&]*)/);

    // check Token Expiry 
    if (evaluateToken && evaluateExpiry) {
        accessToken = evaluateToken[1];
        const expiresIn = Number(evaluateExpiry[1]);
        // expiresIn = evaluateExpiry[1];
        // needs to be a number
        // otherwise the next line won't work porperly
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        // forgot to return the token
        return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    }
  },

  search(term) {
    accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
      headers: {Authorization: `Bearer ${accessToken}`}
    }
  ).then(response => {
      return response.json();
  }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
          //use 'return (..)' or use '(...)'
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
      }));
    });
  },

  savePlaylist(name, trackUris) {
    let userId = undefined;
    let playlistID = undefined;

    if (name && trackUris) {
      fetch('https://api.spotify.com/v1/me',
        {headers: {Authorization: `Bearer ${accessToken}`}}
      ).then(response => response.json()
      ).then(jsonReponse =>{
        userId = jsonReponse.id;
      });

      fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: 'POST',
          body: JSON.stringify({name: name}),
        }
      ).then(response => response.json()
      ).then(jsonReponse => {
        playlistID = jsonReponse.id;
      });

      fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
          method: 'POST',
          header: {Authorization: `Bearer ${accessToken}`},
          body: JSON.stringify({uris: trackUris})
      })
    } else {
      return;
    }
  },
};

export default Spotify;
