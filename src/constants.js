
    //localhost 
// export const API = 'http://localhost:5000/'

    //localLAN
export const API = `http://${window.location.hostname}:5000/`

    //deployment
// export const API = ''

    //WS_URL localhost
// export const WS_URL = 'ws://localhost:5000/cable'

    //flexible WS_URL
export const WS_URL = `ws://${window.location.hostname}:5000/cable`

    //hardset WS_URL
// export const WS_URL = "ws://10.113.106.139:3500/cable"

export const GAMES_API = `${API}games/`
export const LOGIN_API = `${API}login/`


// export const classUrl = `http://${window.location.hostname}:5000/class`;
// export const charUrl = `http://${window.location.hostname}:5000/characters`;
// export const campaignUrl = `http://${window.location.hostname}:5000/campaigns`;

// export const defaultImg = "https://via.placeholder.com/200"