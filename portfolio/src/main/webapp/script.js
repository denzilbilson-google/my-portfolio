//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// add map to #map div
var map;
var styledMapType;
var map_key = keys.MAP_KEY;

// add API's to HTML head
load(`https://maps.googleapis.com/maps/api/js?key=${map_key}`); // map API
load("https://www.gstatic.com/charts/loader.js"); // charts API

// runs functions when the page is loaded
function _init_(){
    initMap();
    initComment();
    initStats(); 
}

// passes parameter as a script file
function load(file){
    var src = document.createElement("script");
    src.setAttribute("type", "text/javascript");
    src.setAttribute("src", file);
    document.getElementsByTagName("head")[0].appendChild(src);
}

// print comments into #comments-container div
function initComment(){
    fetch('/data').then(response => response.json()).then((comments) => {
        let commentSection = document.getElementById('comments-container');
        
        for(userComment of comments){
            commentSection.innerHTML += addComment(userComment);
        }
    });
}

// parse comments for html page
function addComment(comment){
    let string = `<li><h3> ${comment.name} </h3>`;
    string += `<p> ${comment.content} </p></li>`;
    return string;
}

// initialize map
function initMap(){
    var styledMapType = new google.maps.StyledMapType(
        [
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "weight": 1
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "weight": 0.8
                    }
                ]
            },
            {
                "featureType": "landscape",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            }
        ], {name: 'Styled Map'});

    map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 39.6845199, lng: -104.7863031},
            zoom: 12,
            mapTypeControlOptions: {
                mapTypeIds: ['styled_map']
            }
    });
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
}

function initStats(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    /** Creates a chart and adds it to the page. */
    function drawChart() {
        const data = new google.visualization.DataTable();
        data.addColumn('string', 'Date');
        data.addColumn('number', 'Visits');
        data.addRows([
        ['Lions', 10],
        ['Tigers', 5],
        ['Bears', 15]
        ]);

        const options = {
            'title': 'Website Traffic',
            'width':500,
            'height':500
    };

    const chart = new google.visualization.LineChart(document.getElementById('comment-stats'));
    chart.draw(data, options);
    }
}