# price-board
Joint Stock Price Board Explanation:
https://minhduc09.github.io/price-board/

Click + to add 1 row, - to remove the last row

Ticker Symbol: 3 random characters, symbols can not be identical

Reference price (RP): random number from 0.1 to 120.0

Ceiling price (CP): reference price + 10%

Floor price (FP): reference price - 10%

GenerateDate function – Generates: 
+) Match Price (MP): a random number between ceiling and floor price
+) Match Quantity (MQ): a random integer from 1 to 5	
+) +/-: Difference between the reference price and match price
+) Format color:
           MP > RP : green
           MP < RP: red
           MP = RP : RP’s color
           MP = CP: CP’s color
           MP = FP: FP’s color

GenerateData() runs on multiple rows in every 2s

Blink the cells with changed data for 0.5s (no blink in quantity cell if the same numbers were generated)

