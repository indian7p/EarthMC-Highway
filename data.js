
function loadData() {



function addCity(coords, title) {
    var city = cities.mapImages.create();
    city.longitude = coords.x * MAP_SCALE + 2;
    city.latitude = coords.y * -MAP_SCALE - 1;
    city.tooltipText = title;
    city.connections = []
    return city;
}

citiesD = [
    {"x": 13080.0, "y": -4440, "name": "Ahmedabad"},
	{"x": 13287.0, "y": -3624, "name": "Mumbai"},
	{"x": 13398.0, "y": -3077, "name": "Shiroda"},
	{"x": 13398.0, "y": -1429, "name": "Male"},
	{"x": 13595.0, "y": -2750, "name": "Koramyst"},
	{"x": 14608.0, "y": -1306, "name": "Ceylon"},
	{"x": 13656.0, "y": -3100, "name": "Crasmere"},
	{"x": 13832.0, "y": -3528, "name": "Latur"},
	{"x": 14023.0, "y": -3800, "name": "Akola"},
	{"x": 12884.0, "y": -4015, "name": "QuinnLand"},
	{"x": 13141.0, "y": -5851, "name": "Harappa"},
	{"x": 13367.0, "y": -588, "name": "Baa_Atoll"},
	{"x": 15056.0, "y": -5430, "name": "Kanpur"},
	{"x": 14848.0, "y": -3160, "name": "Bay_City"},
	{"x": 1752.0, "y": -6311, "name": "Houmt_Souk"},
	{"x": 20735.0, "y": -4440, "name": "Guangzhou"},
]
citiesL = {

}


connections = {
    "ice": [
        // Indian network
        // ["Ahmedabad", "Cheylon"],
        ["Ahmedabad", "Mumbai","NH01"],
        ["Mumbai", "Shiroda","NH02"],
        ["Shiroda", "Male","NH02"],
        ["Shiroda", "Koramyst","NH10"],
		["Ceylon", "Male","NH06"],
        ["Shiroda", "Crasmere","NH03"], 
        ["Latur", "Crasmere","NH04"], 
        ["Latur", "Mumbai","NH05"],
        ["Latur", "Akola","NH05"], 
        ["Ahmedabad", "QuinnLand","NH07"],
		["Ahmedabad", "Harappa","NH08"],
		["Male","Baa_Atoll","NH11"],
    "wip_ice": [
        ["Ahmedabad", "Kanpur","NH09"],
        ["Ahmedabad", "Houmt Souk","IH01"],
        ["Ahmedabad","Guangzhou","IH02"],
		["Crasmere","Bay_City","NH12"],
    ],
}

connectedTowns = new Set([]);
Object.values(connections).forEach(function(cities) {
    for (var i = 0; i < cities.length; i++) {
        connectedTowns.add(cities[i][0])
        connectedTowns.add(cities[i][1])
    }
});
for (var i = citiesD.length - 1; i >= 0; i--) {
    if (connectedTowns.has(citiesD[i].name) && citiesL[citiesD[i].name] == undefined) {
        citiesL[citiesD[i].name] = addCity({x: citiesD[i].x, y: citiesD[i].y}, citiesD[i].name)
    }
}


var connectedTownsArray = Array.from(connectedTowns)
for (var i = 0; i < connectedTownsArray.length; i++) {
    console.log(connectedTownsArray[i])
    $("#city_list").append($("<option></option>").val(connectedTownsArray[i]))
}


lineSeries = {
    "ice": chart.series.push(new am4maps.MapLineSeries()),
    "nether_ice": chart.series.push(new am4maps.MapLineSeries()),
    "wip_ice": chart.series.push(new am4maps.MapLineSeries()),
}

lineAttrs = {
    "ice": {
        stroke: "#286a91"
    },
    "wip_ice": {
        stroke: "#FF0000",
    }
}
// Add lines
window.updateMapLines = function() {

    Object.keys(lineSeries).forEach(function(k) {
        lineSeries[k].mapLines.each(function (item) {
            item.line = lineSeries[k].mapLines.template.line
        })
        
    });
}
for (var i = 0; i < Object.keys(lineAttrs).length; i++) {
    var k = Object.keys(lineAttrs)[i]
    lineSeries[k].mapLines.template.line.strokeWidth = 2;
    lineSeries[k].mapLines.template.line.strokeOpacity = 1;
    lineSeries[k].mapLines.template.line.stroke = "#000000";
    lineSeries[k].mapLines.template.line.strokeDasharray = "1 0.5"
    lineSeries[k].mapLines.template.line.nonScalingStroke = true;
    lineSeries[k].zIndex = 10;
    for (var j = 0; j < Object.keys(lineAttrs[k]).length; j++) {
        var key = Object.keys(lineAttrs[Object.keys(lineAttrs)[i]])[j]
        var val = lineAttrs[Object.keys(lineAttrs)[i]][key]
        lineSeries[k].mapLines.template.line[key] = val
    }
}
speedObj = {
    "walk": 4.3,
    "train": 8,
    "nether_train": 64,
    "water": 8,
    "ice": 40,
    "nether_ice": 320,
    "wip_ice": -1,
    "wip_nether_ice": -1,

    }
}
