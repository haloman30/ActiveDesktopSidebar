<?php
function GetJsonNumberParameter($param, $json)
{
    $substring = substr($json, strpos($json, '"' . $param . '":') + strlen('"' . $param . '":'));
	$substring_end = substr($substring, 0, strpos($substring, ","));
	return $substring_end;
}

function GetJsonStringParameter($param, $json)
{
    $substring = substr($json, strpos($json, '"' . $param . '":"') + strlen('"' . $param . '":"'));
	$substring_end = substr($substring, 0, strpos($substring, '",'));
	return $substring_end;
}


ini_set("display_errors", 1);

$zip = 98052;

if (isset($_GET["zip"]))
{
    $zip = $_GET["zip"];
}

$geo_json_url = "http://geocoding-api.open-meteo.com/v1/search?name=" . $zip . "&count=1&language=en&format=json";
$geo_json_string = file_get_contents($geo_json_url);
//$geo_json = json_decode($geo_json_string);

$latitude = GetJsonNumberParameter("latitude", $geo_json_string);

$longitude = GetJsonNumberParameter("longitude", $geo_json_string);

$geo_name = GetJsonStringParameter("name", $geo_json_string);
$geo_state = GetJsonStringParameter("admin1", $geo_json_string);

$start_date = date("Y-m-d");
$end_date = date("Y-m-d", strtotime($start_date . ' + 8 days'));

$weather_json_url = "http://api.open-meteo.com/v1/forecast?daily=weathercode&daily=temperature_2m_max&daily=temperature_2m_min&daily=apparent_temperature_max&daily=apparent_temperature_min&daily=uv_index_max&daily=precipitation_sum&daily=rain_sum&daily=precipitation_probability_max&daily=windspeed_10m_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=iso8601&past_days=0&forecast_days=1&timezone=GMT&hourly=temperature_2m&hourly=relativehumidity_2m&hourly=dewpoint_2m&hourly=rain&hourly=weathercode&hourly=temperature_80m";

$weather_json_url = $weather_json_url . "&latitude=" . $latitude;
$weather_json_url = $weather_json_url . "&longitude=" . $longitude;

$weather_json_url = $weather_json_url . "&start_date=" . $start_date;
$weather_json_url = $weather_json_url . "&end_date=" . $end_date;

$json = file_get_contents($weather_json_url);

$json = substr($json, 0, strlen($json) - 1);

$json = $json . ',"geo_name": "' . $geo_name . '"';
$json = $json . ',"geo_state": "' . $geo_state . '"';
$json = $json . "}";

//$json_decode = json_decode($json);

//$json_decode["geo_name"] = $geo_name;
//$json_decode["geo_state"] = $geo_state;

//$json = json_encode($json_decode);

echo($json);
?>