var totaltime = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
var going = 0;
var mode = "up";
var ampm = 12;

var img;
var dispampm;

function formattime()
{
	if(mode == "set" || mode == "real")
	{
			totaltime %= 24*3600;
	}
	
    hours = Math.floor(totaltime/3600);
    minutes = Math.floor(totaltime/60)%60;
    seconds = totaltime%60;
	dispampm = Math.floor(hours/12);
	
	if(mode == "set" || mode == "real")
	{
		hours = hours%ampm;
	}
}

function realstring()
{
	formattime();
	
	timestring = "";
	if(hours < 10) timestring += "0" + hours;
	else timestring += hours;
	timestring += ":";
	
	if(minutes < 10) timestring += "0" + minutes;
	else timestring += minutes;
	timestring += ":";
	
	if(seconds < 10) timestring += "0" + seconds;
	else timestring += seconds;
	
	if(ampm == 12 && (mode == "set" || mode == "real"))
	{
		if(dispampm)
			timestring+="pm";
		else timestring+="am";
	}
	
	return timestring;
}

function stringulate()
{
	formattime();
    
    document.getElementById("hr10").innerHTML="<img src = \""+Math.floor(hours/10)%10+".png\"></img>";
    document.getElementById("hr01").innerHTML= "<img src = \""+hours%10+".png\"></img>";
    
    document.getElementById("mn10").innerHTML="<img src = \""+Math.floor(minutes/10)%10+".png\"></img>";
    document.getElementById("mn01").innerHTML= "<img src = \""+minutes%10+".png\"></img>";
    
    document.getElementById("sc10").innerHTML="<img src = \""+Math.floor(seconds/10)%10+".png\"></img>";
    document.getElementById("sc01").innerHTML= "<img src = \""+seconds%10+".png\"></img>";
    
	if(ampm == 12 && (mode == "set" || mode == "real"))
	{
		if(dispampm)
			document.getElementById("ampm").innerHTML="pm";
		else document.getElementById("ampm").innerHTML="am";
	}
	else
	{
		document.getElementById("ampm").innerHTML="";
	}
}

function countdown()
{
    
    if(totaltime > 0)
    {
        totaltime--;
    }
    if(totaltime == 0)
    {
        stoptime();
    }
    stringulate();
}

function countup()
{
    totaltime++;
    
    stringulate();
}



function timedown()
{
    if(!going)
    {
        going = setInterval(function(){countdown()},1000);
    }
    if(totaltime == 0)
    {
        stoptime();
    }
    
}

function timeup()
{
    if(!going)
    {
        going = setInterval(function(){countup()},1000);
    }  
}

function begintime()
{
	if(mode == "down")
	{
		timedown();
	}
	if(mode == "up")
	{
		timeup();
	}
}

function stoptime()
{
    if(going)
    {
        window.clearInterval(going);
        going = 0;
        stringulate();
		if(mode == "down")
			alarm();
    }
}

function cleartime()
{
    totaltime = 0;
    stringulate();
}

function setmode(x)
{
	window.clearInterval(going);
	cleartime();
	stoptime();
	
		
	if(x == 0) //Countdown
	{
		mode = "down";
	}
	if(x == 1) //Stopwatch
	{

		mode = "up";
	}
	if(x == 2) //Realtime
	{
		going = setInterval(function(){realtime()},1000);
		mode = "real";
		realtime();
	}
	if(x == 3) //Alarm Set
	{
		mode = "set";
	}
	
	stringulate();
}

function hrup()
{
    totaltime += 3600;
    stringulate();
}
function hrdn()
{
    if(totaltime >= 3600)totaltime -= 3600;
    stringulate();
}

function mnup()
{
    totaltime += 60;
    stringulate();
}
function mndn()
{
    if(totaltime >= 60)totaltime -= 60;
    stringulate();
}

function scup()
{
    totaltime += 1;
    stringulate();
}
function scdn()
{
    if(totaltime >= 1)totaltime -= 1;
    stringulate();
}