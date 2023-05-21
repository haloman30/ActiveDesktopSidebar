var show_weather = true;
var show_weather_today = true;
var show_outlook_today = true;
var show_stocks = true;

var weather_html_needs_update = false;
var cached_weather_html = "";

function AddDebug(text)
{
	var debug_element = document.getElementById("debug");
	debug_element.innerText += text;
	debug_element.innerHTML += "<br>";
}

function GetDayName(day)
{
    if (day == 0)
	{
	    return "Sunday";
	}
	else if (day == 1)
	{
	    return "Monday";
	}
	else if (day == 2)
	{
	    return "Tuesday";
	}
	else if (day == 3)
	{
	    return "Wednesday";
	}
	else if (day == 4)
	{
	    return "Thursday";
	}
	else if (day == 5)
	{
	    return "Friday";
	}
	else if (day == 6)
	{
	    return "Saturday";
	}
	
	return "Unknown";
}

function GetMonthName(month)
{
    if (month == 0)
	{
	    return "January";
	}
	else if (month == 1)
	{
	    return "February";
	}
	else if (month == 2)
	{
	    return "March";
	}
	else if (month == 3)
	{
	    return "April";
	}
	else if (month == 4)
	{
	    return "May";
	}
	else if (month == 5)
	{
	    return "June";
	}
	else if (month == 6)
	{
	    return "July";
	}
	else if (month == 7)
	{
	    return "August";
	}
	else if (month == 8)
	{
	    return "September";
	}
	else if (month == 9)
	{
	    return "October";
	}
	else if (month == 10)
	{
	    return "November";
	}
	else if (month == 11)
	{
	    return "December";
	}
	
	return "Unknown";
}

function GetTimeString(date)
{
	var pm = false;
	var time_string = "";
	
	if (date.getHours() > 12)
	{
	    pm = true;
		time_string += (date.getHours() - 12);
	}
	else
	{
	    time_string += date.getHours();
	}
	
	time_string += ":";
	
	if (date.getMinutes() > 9)
	{
		time_string += date.getMinutes();
	}
	else
	{
	    time_string += "0" + date.getMinutes();
	}
	
	if (pm)
	{
	    time_string += " PM";
	}
	else
	{
	    time_string += " AM";
	}
	
	return time_string;
}

function GetLeadingNumber(num)
{
    if (num > 9)
	{
	    return "" + num;
	}
	else
	{
	    return "0" + num;
	}
}

function GetDateStringForWeatherAPI(date)
{
	var date_string = date.getYear();
	date_string += "-";
	date_string += GetLeadingNumber(date.getMonth() + 1);
	date_string += "-";
	date_string += GetLeadingNumber(date.getDay() + 1);
	
	return date_string;
}

function GetWeatherURLString()
{
    var zip = 98052;
	var latitude = 52.52;
	var longitude = 13.41;
	
	var start_date = new Date();
	var end_date = new Date();
	end_date.setDate(date + 7);
	
	var start_date_string = GetDateStringForWeatherAPI(start_date);
	var end_date_string = GetDateStringForWeatherAPI(end_date);

	var weather_json_url = "http://api.open-meteo.com/v1/forecast?daily=weathercode&daily=temperature_2m_max&daily=temperature_2m_min&daily=apparent_temperature_max&daily=apparent_temperature_min&daily=uv_index_max&daily=precipitation_sum&daily=rain_sum&daily=precipitation_probability_max&daily=windspeed_10m_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=iso8601&past_days=0&forecast_days=1&timezone=GMT";
	
	weather_json_url += "&latitude=" + latitude;
	weather_json_url += "&longitude=" + longitude;
	
	weather_json_url += "&start_date=" + start_date_string;
	weather_json_url += "&end_date=" + start_date_string;
	
	return weather_json_url;
}

function GetURLContents(url)
{
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	
    /*xmlhttp.onreadystatechange = function() 
	{
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
		{ 
			return xmlhttp.responseText;
		}
    }*/
	
    xmlhttp.open("GET", url, false);
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xmlhttp.send();
	
	//alert(xmlhttp);
	
	return xmlhttp.responseText;
}

function GenerateTableRow(column1, column2)
{
	var table_row = "<tr><td class=\"col1\">" + column1 + "</td><td class=\"col2\">" + column2 + "</td></tr>";
	return table_row;
}
function GenerateTableRow3(column1, column2, column3)
{
	var table_row = "<tr><td class=\"col1\">" + column1 + "</td><td class=\"col2\">" + column2 + "</td><td class=\"col3\">" + column3 + "</td></tr>";
	return table_row;
}

function GetWeathercodeDisplayName(code)
{
	switch (code)
	{
	case 0:
		return "Clear";
	case 1:
		return "Mostly Clear";
	case 2:
		return "Partly Cloudy";
	case 3:
		return "Cloudy";
	case 45:
		return "Fog";
	case 48:
		return "Freezing Fog";
	case 51:
		return "Slight Drizzle";
	case 53:
		return "Moderate Drizzle";
	case 55:
		return "Dense Drizzle";
	case 56:
		return "Freezing Slight Drizzle";
	case 57:
		return "Freezing Dense Drizzle";
	case 61:
		return "Light Rain";
	case 63:
		return "Moderate Rain";
	case 65:
		return "Heavy Rain";
	case 66:
		return "Freezing Light Rain";
	case 67:
		return "Freezing Heavy Rain";
	case 71:
		return "Light Snow";
	case 73:
		return "Moderate Snow";
	case 75:
		return "Heavy Snow";
	case 77:
		return "Sparse Snowfall";
	case 80:
		return "Few Showers";
	case 81:
		return "Moderate Showers";
	case 82:
		return "Heavy Showers";
	case 85:
		return "Few Snow Showers";
	case 86:
		return "Heavy Snow Showers";
	case 95:
		return "Thunderstorms";
	case 96:
		return "Light Hail";
	case 99:
		return "Heavy Hail";
	}
	
	return "Unknown";
}

function UpdateSidebar()
{
    if (show_weather)
	{
	    var weather_block_content = document.getElementById("weather_block_content");
		
		if (weather_html_needs_update)
		{
		    weather_block_content.innerHTML = cached_weather_html;
			weather_html_needs_update = false;
		}
		
		// Update Time and Date
		{
			var date_element = document.getElementById("date"); //Thursday, January 42, 7022
			var time_element = document.getElementById("time"); //3:43 PM
			//var weather_time_element = document.getElementById("weather_time"); //3:43 PM
			
			var date = new Date();
			
			var weekday = GetDayName(date.getDay());
			var month = GetMonthName(date.getMonth());
			
			var date_string = weekday + ", " + month + " " + date.getDate() + ", " + date.getYear();
			
			date_element.innerText = date_string;
			time_element.innerText = GetTimeString(date);
			//weather_time_element.innerText = GetTimeString(date);
		}
		
		var weather_api_string = GetWeatherURLString();
		
		var json_test = GetURLContents("http://localhost/weather/weather.php?zip=98052");
		var json = JSON.parse(json_test);
		
		//AddDebug(json["generationtime_ms"]);
		//alert(json_test);
		
		// Update Immediate Weather
		{
			var date = new Date();
			var hour = date.getHours();
		
			var weather_now_temp = document.getElementById("weather_now_temp");
			var weather_now_state = document.getElementById("weather_now_state");
			var weather_now_table = document.getElementById("weather_now");
			
			weather_now_temp.innerText = json["hourly"]["temperature_2m"][hour] + " °F";
			weather_now_state.innerText = GetWeathercodeDisplayName(json["hourly"]["weathercode"][hour]);
			
			var new_weather_now_table = "<table class=\"weather_table\">";
			
			new_weather_now_table += GenerateTableRow("Humidity", json["hourly"]["relativehumidity_2m"][hour] + "%");
			new_weather_now_table += GenerateTableRow("Dew Point", json["hourly"]["dewpoint_2m"][hour] + " °F");
			
			new_weather_now_table += "</table>";
			weather_now_table.innerHTML = new_weather_now_table;
		}
		
		// Update Weather Temperatures
		if (show_weather_today)
		{
			var date = new Date();
			
			var hour = date.getHours();
		
			var today_table = document.getElementById("weather_today");
			var new_today_table = "<table class=\"weather_table\">";
			
			new_today_table += GenerateTableRow("Temperature (High/Low)", json["daily"]["temperature_2m_max"][0] + " / " + json["daily"]["temperature_2m_min"][0] + " °F");
			new_today_table += GenerateTableRow("Feels Like (High/Low)", json["daily"]["apparent_temperature_max"][0] + " / " + json["daily"]["apparent_temperature_min"][0] + " °F");
			new_today_table += GenerateTableRow("Humidity", json["daily"]["uv_index_max"][0] + "%");
			new_today_table += GenerateTableRow("Chance of Rain",  json["daily"]["precipitation_probability_max"][0] + "%");
			new_today_table += GenerateTableRow("UV Index", json["daily"]["uv_index_max"][0]);
			new_today_table += GenerateTableRow("Wind", json["daily"]["windspeed_10m_max"][0] + " mph");
			new_today_table += "</table>";
			
			today_table.innerHTML = new_today_table;
		}
		else
		{
			var today_table = document.getElementById("weather_today");
			today_table.innerHTML = "<em>Hidden - Click button to expand</em>";
		}
		
		// Update Weather Outlook
		if (show_outlook_today)
		{
			var forecast_table = document.getElementById("weather_outlook");
			var new_forecast_table = "<table class=\"weather_table\">";
		
			for (var i = 1; i < 8; i++)
			{
				var temp_max = json["daily"]["temperature_2m_max"][i];
				var temp_min = json["daily"]["temperature_2m_min"][i];
				
				var date = new Date();
				date.setDate(date.getDate() + i);
			
				var day = GetDayName(date.getDay()) + ", " + (date.getMonth() + 1) + "/" + date.getDate();
				var temps = temp_max + "/" + temp_min + " °F";
				var state = GetWeathercodeDisplayName(json["daily"]["weathercode"][i]);
				
				new_forecast_table += GenerateTableRow3(day, temps, state);
			}
			
			new_forecast_table += "</table>";
			forecast_table.innerHTML = new_forecast_table;
		}
		else
		{
			var forecast_table = document.getElementById("weather_outlook");
			forecast_table.innerHTML = "<em>Hidden - Click button to expand</em>";
		}
		
		// Update location
		{
		    var weather_location = document.getElementById("weather_location");
			weather_location.innerHTML = json["geo_name"] + ", " + json["geo_state"];
		}
	}
	else
	{
	    var weather_block_content = document.getElementById("weather_block_content");
		
		if (weather_html_needs_update)
		{
		    cached_weather_html = weather_block_content.innerHTML;
			weather_block_content.innerHTML = "";
			weather_html_needs_update = false;
		}
	}
	
	// Update Stocks
	if (show_stocks)
	{
	    var stocks_block_content = document.getElementById("stocks_block_content");
		var new_stocks_table = "<div class=\"block_content\">";
		
		new_stocks_table += "<table class=\"stocks_table\" id=\"stocks_table\">";
		
		new_stocks_table += "<tr> \
		    <td class=\"stock_name\">MSFT</td> \
			<td class=\"stock_price up\">+0.6% - $512.00 USD</td> \
		</tr> \
		<tr> \
		    <td class=\"stock_name\">YES</td> \
			<td class=\"stock_price down\">-3.0% - $1.00 USD</td> \
		</tr>";
		
		new_stocks_table += "</table>";
		new_stocks_table += "</div>";
		stocks_block_content.innerHTML = new_stocks_table;
	}
	else
	{
	    var stocks_block_content = document.getElementById("stocks_block_content");
		stocks_block_content.innerHTML = "";
	}
}

function ToggleWeatherTodayButton(button)
{
    show_weather_today = !show_weather_today;
	ToggleButton(button, show_weather_today);
}

function ToggleWeatherOutlookButton(button)
{
    show_outlook_today = !show_outlook_today;
	ToggleButton(button, show_outlook_today);
}

function ToggleWeatherButton(button)
{
    show_weather = !show_weather;
	weather_html_needs_update = true;
	ToggleButton(button, show_weather);
}

function ToggleStocksButton(button)
{
    show_stocks = !show_stocks;
	ToggleButton(button, show_stocks);
}

function ToggleButton(button, toggle_state)
{
    if (toggle_state)
	{
		button.innerText = "-";
	}
	else 
	{
		button.innerText = "+";
	}
	
	UpdateSidebar();
}