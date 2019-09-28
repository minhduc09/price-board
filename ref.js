/*
2018-07-10 09:56:40 ngocta2
lam 1 class tao ra UI bang gia chung khoan online va update data random
tham khao http://priceboard.fpts.com.vn/
----------------------------
chi lay cac cot sau
+ Ma  
+ TC 
+ Tran 
+ San 
+ Khop Lenh gia 
+ Khop lenh KL 
+ Khop lenh +/- 
+ Tong KL
------------------------------------------------------------------------------------
cac cong viec can lam
01. gian trang HTML tao giao dien ban dau (sua code htm.htm + css.css) => da co table header + 3 dong data
02. sua UI: bo het 3 dong data >> chi con table header + nut "ADD" + nut nut "REMOVE"
03. an nut "ADD" thi them 1 row data vao table
	a. cell 0 (ma chung khoan) co text "ma chung khoan" => la random string gom 3 ky tu A-Z, vi du: ABC, XZC, IJS. ma nay khong duoc trung voi ma o cac row tren
	b. cell 1 (gia tham chieu) la 1 so random từ 0.10 cho den 120.00 (le 2 chu so sau  dau phay)
	c. cell 2 (gia tran) la gia them chieu + 10%
	d. cell 3 (gia san) la gia them chieu - 10%
04. an nut "REMOVE" thi xoa 1 row duoi cung trong table
05. tao 1 timer chu ky 2s thi call 2 function generateData + updateData
	a. generateData tao ra "gia khop" va "khoi luong khop" va "thay doi" tai 1 row bat ky dang co trong table
	b. "gia khop" la 1 gia tri nam trong khoang giua gia tran va gia san
	c. "KL khop" la 1 gia tri nam trong khoang giua 1 va 10 >> phai la so nguyen duong
	d. "thay doi" la 1 hieu cua "gia khop" va "gia tham chieu"
	e. show "gia khop" va "KL khop" va "thay doi" vao cell Khop Lenh gia va Khop lenh KL va Khop lenh +/-
	f. format mau sac cho group "KHOP LENH"
		+ neu gia khop > gia tc thi gia / KL / +/- phai la mau xanh
		+ neu gia khop < gia tc thi gia / KL / +/- phai la mau do
		+ neu gia khop = gia san thi gia / KL / +/- phai la mau gia san (class gia san)
		+ neu gia khop = gia tran thi gia / KL / +/- phai la mau gia tran (class gia tran)
		+ neu gia khop = gia tc thi gia / KL / +/- phai la mau gia tc (class gia tc)
	g. cot "Tong KL" phai la tong khoi luong cua cac giao dich khop lenh truoc do
		VD: tai dong dau tien, co 1 khop lenh 2 co phieu thi tong KL = 2, sau do co them khop lenh 5 co phieu thi tong KL = 7 ....
06. tia tot, trinh bay la code cho dep >> tat ca value ko gan truc tiep ma khai const , move len top
07. sua lai ty le random sao cho random GIA KHOP phai du ca 5 truong hop, hien tai chi co xanh + do ma chua co value = tran,san,tc => sua thap phan tu 2 so thanh 1 so
08. sua lai ty le random sao cho random KL KHOP chi la tu 1-5 de co the xay ra truong hop trung gia tri KL KHOP voi lan khop truoc. 
	VD: lan khop 1 la gia/KL la 15.5/3 va lan khop 2 la 15.7/3. 
	code phai dam bao la ko nhay' sang cell KL=3 tai lan khop 2 vi gia tri 3 ko thay doi
09. sua code de chu ky timer update la 500ms
10. sua code de nhay update tren nhieu row chu ko phai 1 row nua. VD total 10 rows thi co the update 3 rows, lan 2 update 1 rows, lan 3 update 9 rows .....
11.
12.
13.
........
*/