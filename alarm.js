var alarms = [];
alarms.push(21*3600+43*60+25);
var sound = new Audio("blip.wav");
var alarmNOW = false;
var alarming = 0;

function setalarm()
{
	alarms.push(totaltime%(24*3600));
	document.getElementById('alarmlist').innerHTML +='<br>There is an alarm set for: '
		+realstring();
}

function setampm()
{
	if(ampm == 12)
	{
		ampm = 24;
		document.getElementById('ampm').innerHTML = "";
	}
	else if(ampm == 24)	ampm = 12;
	stringulate();
}

function stopalarm()
{
	window.clearInterval(alarming);
	alarming = 0;
}

function blip()
{
		sound.play();
		sound.currentTime=0;
}

function alarm()
{
	alarming = setInterval(function(){blip()},200);
}

function checkalarm()
{
	for(i = 0; i < alarms.length; i++)
	{
		curdate = new Date();
		temptime = curdate.getHours()*3600 + curdate.getMinutes()*60 + curdate.getSeconds();
		if(temptime == alarms[i])
		{
			alarm();
		}
	}
}

function realtime()
{
	curdate = new Date();
	temptime = curdate.getHours()*3600 + curdate.getMinutes()*60 + curdate.getSeconds();
	totaltime = temptime;
	stringulate();
}

setInterval(function(){checkalarm()},1000);