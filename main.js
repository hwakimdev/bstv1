/* global calculatest */
"use strict";
window.onload = function(){
	document.getElementById("output").innerHTML =
    "<p>&copy;  " + new Date().getFullYear() + " BSTsecurity. All rights reserved.</p>";
	//var outv = document.getElementById("output");
	var resol = document.getElementById("resolid");
	var fps = document.getElementById("fpsid");
	var qty = document.getElementById("qtyid");
	var ndays = document.getElementById("daysid");
	var hours = document.getElementById("hoursid");
	var camlist = [];
	var btnadd = document.getElementById("addbtn");
	var tabmain= document.getElementById("tablerows");
	var cstt = document.getElementById("cst");
	var ctgt = document.getElementById("ctg");
	cstt.addEventListener("click",calculatest,false);
	ctgt.addEventListener("click", calculatetg, false);
	btnadd.addEventListener("click",addset,false);
	
	function addset(){
		var resolv = resol.value;
		var fpsv = fps.value;
		var qtyv = qty.value;
		var ndaysv = ndays.value;
		var hoursv = hours.value;
		var numfps = Number(fpsv);
		var numqty = Number(qtyv);
		var numnd = Number(ndaysv);
		var numhrs = Number(hoursv);
		var deltabrow = document.createElement("BUTTON");
		deltabrow.className = "btn btn-danger btn-xs";
		var btntxt = document.createTextNode("DELETE");
		deltabrow.appendChild(btntxt);
		//catch err
		var messageErr = document.getElementById("errM");
			        messageErr.innerHTML = "";
			        
			        try {
			            if (numfps > 30) throw "fps should be a number between 1 and 30";
			            if (numfps < 1) throw "fps should be a number between 1 and 30";
			            if (qtyv == "") throw "Quantity should be more than 0";
			            if (numqty < 0) throw "Quantity should be more than 0";
			            if (ndaysv == "") throw "Number of days should be more than 0";
			            if (numnd < 0) throw "Number of days should be more than 0";
			            if (numhrs > 24) throw "Motion Hours should be a number between 1 and 24";
			            if (numhrs < 1) throw "Motion Hours should be a number between 1 and 24";
			            //if (qtyv == "") throw "fps is empty";
			        }
			        catch (err) {
			            messageErr.innerHTML = "Error: " + err + ".";
			        }
			        if (messageErr.innerHTML == "") {

		//var total=numfps+numqty+numnd+numhrs;
		var setv=[resolv, numfps, numqty, numnd, numhrs];
		camlist.push(setv);
		var camL=camlist.length;
		var bodyitems=tabmain.insertRow(camL);
		var resbody=bodyitems.insertCell(0);
		var fpsbody=bodyitems.insertCell(1);
		var qtybody= bodyitems.insertCell(2);
		var daysbody=bodyitems.insertCell(3);
		var hrsbody=bodyitems.insertCell(4);
		var deletebody=bodyitems.insertCell(5);
		resbody.innerHTML=resolv;
		fpsbody.innerHTML=numfps;
		qtybody.innerHTML=numqty;
		daysbody.innerHTML=numnd;
		hrsbody.innerHTML=numhrs;
		deletebody.appendChild(deltabrow);
		deltabrow.addEventListener("click", deltabrowf, false);
		//delete function to remove the table row and remove its camlist values from the array		
		function deltabrowf(){
			var j=deltabrow.parentNode.parentNode.rowIndex;
			var j1=j-1;
			tabmain.deleteRow(j);
			camlist.splice(j1,1);
		}
		}
		//function calculate st
		 		//var total1=;
		//outv.innerHTML="test1 "+camlist;
	}
	//storage calaclulator function
	function calculatest(){
			var stresol="";
			var stfps=0;
			var stqty=0;
			var stdays=0;
			var sthrs=0;
			var st=0;
			var framesize=0;
			var perhours=0.0;
			var fperdayingb=0.0;
			var sttotal=0.0;
			var stvingb=0.0;
			var stintb=0.0;
			for (st=0; st<camlist.length; st++){
				stresol=camlist[st][0];
				stfps=Number(camlist[st][1]);
				stqty=Number(camlist[st][2]);
				stdays=Number(camlist[st][3]);
				sthrs=Number(camlist[st][4]);
		         switch (stresol) {
                    case "4CIF":
                      framesize = 74;
                    break;
                   case "720p":
                      framesize = 134;
                   break;
                   case "1080p":
                      framesize = 245;
                   break;
                   case "3M":
                      framesize = 324;
                }//close stwitch
		  perhours = framesize * stfps * 3600;
          fperdayingb =perhours * sthrs / 8 / 1024 / 1024;
		  stvingb = fperdayingb * stdays * stqty;
		  sttotal = sttotal + stvingb;

			} //end of forloop
			 stintb = sttotal / 1024;
			 document.getElementById("stresult").innerHTML="Your Total storage requirments will be in GB " + sttotal.toFixed(2)+" And in TB "+stintb.toFixed(2);

			//outv.innerHTML="test1 "+framesize;
		}//end of calculate storage function
	function calculatetg(){
		var tgresol="";
		var tgqty=0;
		var tg=0;
		var tgpercam=0;
		var tgkbps=0;
		var tgmbps=0.0;
		var totaltg=0.0;
		for (tg=0; tg<camlist.length; tg++){
			tgresol=camlist[tg][0];
			tgqty=camlist[tg][2];
			switch (tgresol) {
				case "4CIF":
					tgpercam=1024;
					break;
			    case "720p":
					tgpercam=2048;
					break;
			    case "1080p":
					tgpercam=4096;
					break;
				case "3M":
					tgpercam=6144;
					
			}//end of switch
			tgkbps = tgpercam * tgqty;
            tgmbps = tgkbps / 1024;
            totaltg = totaltg + tgmbps;

		}// end of loop
		document.getElementById("tgresult").innerHTML="Your total Throughput is " + totaltg + " Mbps";
	}// end of calculatetg function
}