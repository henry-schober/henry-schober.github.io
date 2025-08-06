// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQDLM74yk1_Vqow6V6KLxSYuXSwqAXj-q0zSuas6jVPG1U72ILWDNzIoQAkFYSBNblF2t9hjIyc5lbrV08iGP_2AHRdn6cnWcmVURtjq1yaYqz3hPjYMunUxDl8usKmC03f8sELq5Fp7P33V83s0_yuDpoMrysgmiuOqSvorcXJZFqlEA0yLG4xiJjnyn-39wphIK1tSkN-p_--VEUsHhmh8rgc6DF1Jw_oy2QalWshNQzZOeXNnxJPHYCIaJ_V3t8OgjchdCg5Sp7V4y9m6d_UtOG9NcbYzEHvjBaI_oTwooLYn';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
  )).items;
}

// This function runs when button is clicked
async function displayTopTracks() {
  const topTracks = await getTopTracks();
  const list = document.getElementById('top-tracks');
  list.innerHTML = ''; // Clear old results
  topTracks.forEach(({ name, artists }) => {
    const li = document.createElement('li');
    li.textContent = `${name} by ${artists.map(artist => artist.name).join(', ')}`;
    list.appendChild(li);
  });
}

// Add event listener to the button
document.getElementById('load-tracks').addEventListener('click', displayTopTracks);