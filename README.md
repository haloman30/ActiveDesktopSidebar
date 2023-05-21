# ActiveDesktopSidebar

ActiveDesktopSidebar is a webpage created for Active Desktop that serves as a sort of "sidebar", providing several
widgets that can be configured to display various information. The sidebar will also reference system colors,
ensuring it fits right in with any color scheme.

Currently, the available widgets include:

* Weather
* Stocks (TBA)

## Compatiability

This page has been tested to run under Windows 2000 and Internet Explorer 6.0. Additionally included is a PHP
script that is used to proxy the APIs used for geolocation and weather information. This script can be hosted on
any webserver that uses PHP 5.1.4 or newer, however a version of this script can also be found at `https://haloman30.com/projects/adsidebar/api/weather.php?zip=<ZIP>`, replacing `<ZIP>` with the ZIP code of the desired region.

## Features

Several widgets are included with the sidebar. Most widgets can be collapsed and expanded using a button on the
right side of the widget title bar. Some widgets may also have subsections which can be collapsed and expanded separately (such as the Today and Outlook sections of the weather widget).

### Weather

The weather widget is used to display current and future weather information, including:

* Current Weather (Storms, Rain, Sunny, Cloudy, etc)
* Temperature (Current, High, and Low)
* Humidity
* Dew Point
* UV Index
* Wind Speeds
* Chance of Rain

Additionally, a 7-day outlook is available, which displays the weather and high/low temperatures for the next 7 days.

### Stocks

The stocks widget is a planned future widget that will allow for several stocks to be displayed.

## Configuration

TBA

## Suggestions

Got a widget you'd like to see implemented? Feel free to create an issue! I can't promise that it'll get implemented due to various limitations of both technology, as well as just simply my own time - but if it's feasible, I just might be able to get it implemented. Either way, let me know!