var lDates = [
	new Date("2013-11-12"),
	new Date("2013-11-15"),
	new Date("2013-12-05"),
	new Date("2014-01-20")
]
var hDates = {};
var y0 = 200;
var h0 = 20;
var nScale = 0;
var elems = [];
var refreshScale = false;

function setup() {
	createCanvas(400, 400);
	button = createButton('click me');
	button.position(0, 0);
	button.mousePressed(resetScale);
	hDates = hashDates();
	refreshDisplay();
}

function draw() {
	background(220);
}

function hashDates(){
	let hDates = {};
	for (var dDate of lDates){
		let nYear = dDate.getFullYear();
		let nMonth = dDate.getMonth() + 1;
		let nDay = dDate.getDate();
		if (!(nYear in hDates)){
			let hMonth = {};
				hMonth[nMonth] = [nDay];
				hDates[nYear] = hMonth;
			}
		else if (!(nMonth in hDates[nYear])) hDates[nYear][nMonth] = [nDay];
		else hDates[nYear][nMonth].push(nDay);
	}
	return hDates;
}

function drawBars(nScale){
	if (nScale == 0 || elems.length == 0) {
		var nMinYear = Math.min(...Object.keys(hDates));
		var nMaxYear = Math.max(...Object.keys(hDates));
		var nTimeWindow = nMaxYear - nMinYear + 1;
		var nYearStep = width/nTimeWindow;
		var nMonthStep = nYearStep/12;
		// draw horizontal bar
		for (let i = 0; i<nTimeWindow; i++){
			divelem = createDiv(i + nMinYear); 
			divelem.position(i*nYearStep, y0); 
			divelem.size(nYearStep, h0);
			divelem.style("text-align: center");
			divelem.style("border: 1px solid")
			divelem.style("background-color: white");
			divelem.mouseClicked(changeScale(i + nMinYear));
			elems.push(divelem);
		}
		// draw vertical bars
		for (let nYear of Object.keys(hDates)){
			for (let nMonth of Object.keys(hDates[nYear])){
				divelem = createDiv(); 
				divelem.position(((nYear-nMinYear)+(nMonth-1)/12)*nYearStep, y0+h0); 
				divelem.size(nMonthStep-2, 50*hDates[nYear][nMonth].length); 
				divelem.style("border: 1px solid"); 
				divelem.mouseOver(changeColor(divelem));
				divelem.mouseOut(removeColor(divelem));
				elems.push(divelem);
			}
		}
	} else {
		var nMinYear = nScale;
		var nMaxYear = nScale;
		var nTimeWindow = nMaxYear - nMinYear + 1;
		var nYearStep = width/nTimeWindow;
		var nMonthStep = nYearStep/12;
		// draw horizontal bar
		for (let i = 0; i<nTimeWindow; i++){
			divelem = createDiv(i + nMinYear); 
			divelem.position(i*nYearStep, y0); 
			divelem.size(nYearStep, h0);
			divelem.style("text-align: center");
			divelem.style("border: 1px solid")
			divelem.style("background-color: white");
			divelem.mouseClicked(changeScale(i + nMinYear));
			elems.push(divelem);
		}
		// draw vertical bars
		var nYear = nScale
		for (let nMonth of Object.keys(hDates[nYear])){
			divelem = createDiv(); 
			divelem.position(((nYear-nMinYear)+(nMonth-1)/12)*nYearStep, y0+h0); 
			divelem.size(nMonthStep-2, 50*hDates[nYear][nMonth].length); 
			divelem.style("border: 1px solid"); 
			divelem.mouseOver(changeColor(divelem));
			divelem.mouseOut(removeColor(divelem));
			elems.push(divelem);
		}
	}
}

function changeColor(target){
	let returnfunction = function(event) {target.style("background-color: lightblue");}
	return returnfunction;
}

function removeColor(target){
	let returnfunction = function(event) {target.style("background-color: transparent");}
	return returnfunction;
}

function changeScale(nYear){
	let returnfunction = function(event) {
		nScale = nYear;
		refreshDisplay();
	}
	return returnfunction;
}

function resetScale(){
	refreshScale = true;
	nScale = 0;
	refreshDisplay();
	
	elems = [];
}

function refreshDisplay(){
	removeElements();
	button = createButton('click me');
	button.position(0, 0);
	button.mousePressed(resetScale);
	drawBars(nScale);
}