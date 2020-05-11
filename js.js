
--------------------------------------------------------------------------------------------------------------------------------------------
*/
// "use strict";
 
(function(){	
	// ----------------------------------------------- 
	// CONSTS
	const INTERVAL_TIMER_UPDATE 		= 2000,
		  INTERVAL_TIMER_COLORCHANGE	= 500;
	const COLOR_REFERENCE 	= '#f7ff31',     
		  COLOR_CEILING 	= '#ff00ff',
		  COLOR_FLOOR 		= '#66ccff',
		  COLOR_PROFIT 		= '#00ff00',
		  COLOR_LOSS 		= '#ff0000',
		  BGCOLOR_MATCH 	= '#444444',
		  NEW_BGCOLOR_MATCH = '#555555';
	const STOCK_CODE_LENGTH = 3,
		  CHARCODE_A		= 65,
		  CHARCODE_Z 		= 90,
		  RATE_CEILING 		= 1.1,
		  RATE_FLOOR 		= 0.9,
		  REFERENCE_MIN		= 0.1,
		  REFERENCE_MAX 	= 120.0,
		  QUANTITY_MIN 		= 1,
		  QUANTITY_MAX 		= 5,
		  HEADER_ROWS		= 2,
		  DECIMAL_PRICE 	= 1,
		  DECIMAL_QUANTITY 	= 0;
	const CELL_REFERENCE 			= 1,
		  CELL_CEILING 				= 2,
		  CELL_FLOOR 				= 3,
		  CELL_MATCH_PRICE 			= 4,
		  CELL_MATCH_QUANTITY 		= 5,
		  CELL_MATCH_CHANGE 		= 6,
		  CELL_SUM_MATCH_QUANTITY 	= 7;
	const TEMPLATE_ROW = '' +
		  '<tr class="unselect temp">' + 
		  '<td class="cccu fixedcol hold"><input type="checkbox" class="cbTop priceboard"><span>(code)</span></td>' +
		  '<td class="g_r hold ref">(vRE)</td>' +
		  '<td class="g_c hold cei">(vCE)</td>' +
		  '<td class="grf hold flo">(vFL)</td>' +
		  '<td class="g_u hold mp"></td>' +
		  '<td class="g_u mq"></td>' +
		  '<td class="gru hold mc"></td>' +
		  '<td class="g__"></td>' +
		  '</tr>';

	// ----------------------------------------------- 
	// VARS						
	let m_codeArr = [];		//array that stores stock codes
	let m_Table = document.getElementById("table-priceboard");
	let m_currentRows = [];
	// ----------------------------------------------- 
	// METHODS
	
	// public function
	this.getRandomArbitrary = function(min, max) {
		return Math.random() * (max - min) + min;
	}
	
	// private function
	function addRow(e){
		e.preventDefault();
		// get the length of table's row
		let vRowLen = m_Table.rows.length;
		//get value for Reference prices
		let vRE = this.getRandomArbitrary(REFERENCE_MIN,REFERENCE_MAX).toFixed(DECIMAL_PRICE);
		//get value for Ceiling prices
		let vCE = (vRE*RATE_CEILING).toFixed(DECIMAL_PRICE);
		//get value for Floor prices
		let vFL = (vRE*RATE_FLOOR).toFixed(DECIMAL_PRICE);
		//get random stock code
		do{
			var code = "";
			for(let i = 0; i < STOCK_CODE_LENGTH; i++){
				let vCharRan = this.getRandomArbitrary(CHARCODE_A,CHARCODE_Z);
				let vChar = String.fromCharCode(vCharRan);
				code+=vChar;
			}
		}while(m_codeArr.indexOf(code) !== -1);	//prevent getting the same stock code 
		//store stock code
		m_codeArr.push(code);
		//create row with stock code and prices to table
		let vRowHTML = TEMPLATE_ROW;
		vRowHTML = vRowHTML.replace('(code)',code).replace('(vRE)',vRE).replace('(vCE)',vCE).replace('(vFL)',vFL);
		//add new row
		m_Table.insertRow(vRowLen).innerHTML = vRowHTML;
	}
	
	// private function
	function removeRow(e){
		e.preventDefault();
		// get the length of table's row
		let vRowLen = m_Table.rows.length;
		//delete row but not the header
		if(vRowLen > HEADER_ROWS){
			m_Table.deleteRow(vRowLen-1);
		}	
	}
	
	// private function
	function initEventHandlers(){
		//function click button add
		$('button.add').click(function(event){
			addRow(event);
		});

		//fucntion click remove button
		$('button.remove').click(function(event){
			removeRow(event);
		})		
	}
	
	// private function
	function generateData(){
		// get the length of table's row
		let vRowLen = m_Table.rows.length;
		// get a random int between 2 (header rows) and table row's length
		let vRand;
		do{
			vRand = Math.floor(this.getRandomArbitrary(HEADER_ROWS,m_Table.rows.length));
		}while(m_currentRows.includes(vRand)===true) //prevent generating the same row in a time
        m_currentRows.push(vRand);
        // get row's stock values 
        let vRE = Number(m_Table.rows[vRand].cells[CELL_REFERENCE].innerHTML),	// Reference price
            vCE = Number(m_Table.rows[vRand].cells[CELL_CEILING].innerHTML),	// Ceiling price
            vFL = Number(m_Table.rows[vRand].cells[CELL_FLOOR].innerHTML);	// Floor price
        // set Match prices
        let vMP = Number(getRandomArbitrary(vCE,vFL).toFixed(DECIMAL_PRICE));
        // set Match quantity
        let vMQ = Number(getRandomArbitrary(QUANTITY_MIN,QUANTITY_MAX).toFixed(DECIMAL_QUANTITY));
        // set Match change
        let vMC = (vMP - vRE).toFixed(DECIMAL_PRICE);
        // get the current quantity
        let vCMQ = Number(m_Table.rows[vRand].cells[CELL_MATCH_QUANTITY].innerHTML);
        // get the current sum of quantities
        let vSMQ = Number(m_Table.rows[vRand].cells[CELL_SUM_MATCH_QUANTITY].innerHTML);
        // add the new match quantity to the sum
        vSMQ+=vMQ;

        let vMpCss 	= m_Table.rows[vRand].cells[CELL_MATCH_PRICE].style,
            vMqCss 	= m_Table.rows[vRand].cells[CELL_MATCH_QUANTITY].style,
            vMcCss 	= m_Table.rows[vRand].cells[CELL_MATCH_CHANGE].style,
            vSmqCss = m_Table.rows[vRand].cells[CELL_SUM_MATCH_QUANTITY].style;  
        // change match's colors acording to Match Prices and Reference Prices
        if(vMP === vRE){
        	vMpCss.color = COLOR_REFERENCE;
        	vMqCss.color = COLOR_REFERENCE;
        	vMcCss.color = COLOR_REFERENCE;
        }
        else if(vMP === vFL){
        	vMpCss.color = COLOR_FLOOR;
        	vMqCss.color = COLOR_FLOOR;
        	vMcCss.color = COLOR_FLOOR;
        }
        else if(vMP === vCE){
        	vMpCss.color = COLOR_CEILING;
        	vMqCss.color = COLOR_CEILING;
        	vMcCss.color = COLOR_CEILING;
        }
        else if(vMP < vRE){
        	vMpCss.color = COLOR_LOSS;
        	vMqCss.color = COLOR_LOSS;
        	vMcCss.color = COLOR_LOSS;
        }
        else if(vMP > vRE){
        	vMpCss.color = COLOR_PROFIT;
        	vMqCss.color = COLOR_PROFIT;
        	vMcCss.color = COLOR_PROFIT;
        }
        // change bg color when new values appear
        vMpCss.backgroundColor  = NEW_BGCOLOR_MATCH;
		vMcCss.backgroundColor  = NEW_BGCOLOR_MATCH;
		vSmqCss.backgroundColor = NEW_BGCOLOR_MATCH;
		// only change match quantity's color if appear new value
		if(vCMQ !== vMQ){
        	vMqCss.backgroundColor  = NEW_BGCOLOR_MATCH;
        }

		// change back to old bg color after 100 millisec
		setTimeout(function(){
			vMpCss.backgroundColor  = BGCOLOR_MATCH;
			vMqCss.backgroundColor  = BGCOLOR_MATCH;
			vMcCss.backgroundColor  = BGCOLOR_MATCH;
			vSmqCss.backgroundColor = BGCOLOR_MATCH;
		},INTERVAL_TIMER_COLORCHANGE)

        //passing values to updateData function
        let objData = {	table: m_Table,
        				ran: vRand, 
        				mp: vMP, 
        				mq: vMQ, 
        				mc: vMC,
        				smq: vSMQ
        			}
        updateData(objData); 
	}

	// private function
	function updateData(objData){
		//show new values to table
		let vRowRan = objData["table"].rows[objData["ran"]];
        vRowRan.cells[CELL_MATCH_PRICE].innerHTML = objData.mp;
        vRowRan.cells[CELL_MATCH_QUANTITY].innerHTML = objData.mq;
        vRowRan.cells[CELL_MATCH_CHANGE].innerHTML = objData.mc;
        vRowRan.cells[CELL_SUM_MATCH_QUANTITY].innerHTML = objData.smq;
	}

	// private function
	function generateManyData(){
		// get the length of table's row
		let vRowLen = m_Table.rows.length;
		// get the number changing rows by random
 		let vChangeRows = this.getRandomArbitrary(HEADER_ROWS,vRowLen-1).toFixed(0);
 		// generate data for many rows
		for(let i = 1; i < vChangeRows; i++){
			generateData();
		}
		m_currentRows = [];
	}

	// private function
	function initTimer(){
		setInterval(generateManyData,INTERVAL_TIMER_UPDATE);	//set timer to execute data every 2s
	}

	// exec
	initEventHandlers();
	initTimer();
	

 })(); // Self-Executing Anonymous Function

// --------------------------------------------------------------------------------------------------------------------------------------------
