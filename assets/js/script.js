/*mapboxgl.accessToken =
    "pk.eyJ1IjoiYXNzYWRpLWRldiIsImEiOiJja3ZpZnRjbDMwNmc0MnduMXVoaG96eDZ6In0.XkAHHW4-MILmSgrUT3KesQ";
var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [-2.738876, 47.663801], // starting position [lng, lat]
    zoom: 12,
});*/

/** get Data by IP */

const api_link = "http://ip-api.com/json";

/**
 *
 * @param {number} lat latitude
 * @param {number} long longitude
 */
const showOnmap = (lat, long) => {
    mapboxgl.accessToken =
        "pk.eyJ1IjoiYXNzYWRpLWRldiIsImEiOiJja3ZpZnRjbDMwNmc0MnduMXVoaG96eDZ6In0.XkAHHW4-MILmSgrUT3KesQ";
    var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [long, lat], // starting position [lng, lat]
        zoom: 12,
    });
    const marker1 = new mapboxgl.Marker({ color: "black" })
        .setLngLat([long, lat])
        .addTo(map);
};

const localise = async() => {
    let ip_data = await fetch(api_link).then((res) => res.json());
    let offset = new Date().toString().match(/([A-Z]+[\+-][0-9]+)/)[1];
    console.log(ip_data);
    const { query, city, countryCode, zip, timezone, lat, lon, isp } = ip_data;
    let fullTime =
        offset.slice(0, 3) + " " + offset.slice(3, 6) + ":" + offset.slice(6, 8);
    let fullLocation = `${city},${countryCode} ${zip}`;
    showOnCardResult(query, fullLocation, fullTime, isp);
    showOnmap(lat, lon);
};

/**
 *
 * @param {string} ipAdress IP of user
 * @param {string} location Brooklyn,NY 1001
 * @param {string} timezone UTC-05:00
 * @param {string} isp SFR SA
 */
const showOnCardResult = (ipAdress, location, timezone, isp) => {
    let ip_user = document.getElementById("ip-address");
    let user_location = document.getElementById("location");
    let user_timezone = document.getElementById("timezone");
    let user_isp = document.getElementById("isp");
    ip_user.textContent = ipAdress;
    user_location.textContent = location;
    user_timezone.textContent = timezone;
    user_isp.textContent = isp;
};

localise();