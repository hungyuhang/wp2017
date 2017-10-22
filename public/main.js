
var front_button_status = "left";
var btn_angle = -3;
var pic_number = 3;
var pic_title = ["Porsche", "Ferrari", "Lamborghini"];
var pic_primary_color = ["#FFDE59", "#E68E8E", "#B2FFB2"];

	var current_pic_container = 1;
	var pic_showing = 0; // leftmost picture (index = 0)
	document.getElementById("button_front").style.transform = 
		"rotate(" + btn_angle + "deg)";
	document.getElementById("button_back").style.transform = 
		"rotate(" + -1*btn_angle + "deg)";
	document.getElementById("card_title").innerHTML = 
		pic_title[pic_showing];
	document.getElementById("pic1").src = 
		(pic_showing + 1) + ".jpg";
	setButtonText(
		document.getElementById("button_next_title_left"),
		document.getElementById("button_next_title_right")
	);
	document.getElementById("container").style.backgroundColor = 
		pic_primary_color[pic_showing];
	
	$("#button_leftside").click(function(){
	var front = document.getElementById("button_front");
	var back = document.getElementById("button_back");
	
		if(front_button_status === "right"){
			buttonLoop(front, btn_angle, -1*btn_angle, 0, 0);
			buttonLoop(back, -1*btn_angle, btn_angle, 0, 0);
			btn_angle *= -1;
			front_button_status = "left";
		} else {
			buttonLoop(front, btn_angle, btn_angle, 0, -1);
			buttonLoop(back, -1*btn_angle, -1*btn_angle, 0, 1);
		}
		picChange("left");
		setButtonText(
			document.getElementById("button_next_title_left"),
			document.getElementById("button_next_title_right")
		);
	}); 
	
	$("#button_rightside").click(function(){
		var front = document.getElementById("button_front");
		var back = document.getElementById("button_back");
		
		if(front_button_status === "right"){
			buttonLoop(front, btn_angle, btn_angle, 0, 1);
			buttonLoop(back, -1*btn_angle, -1*btn_angle, 0, -1);
		} else {
			buttonLoop(front, btn_angle, -1*btn_angle, 0, 0);
			buttonLoop(back, -1*btn_angle, btn_angle, 0, 0);
			btn_angle *= -1;
			front_button_status = "right";
		}
		picChange("right");
		setButtonText(
			document.getElementById("button_next_title_left"),
			document.getElementById("button_next_title_right")
		);
	}); 
	
	function buttonLoop(obj, pos, pos_end, time, speed) {
		
		if(time > 17) {
			obj.style.transform = "rotate(" + pos_end + "deg)";
			return;
		}
		setTimeout(function(){ 
			obj.style.transform = "rotate(" + pos + "deg)";
			var pos_old = pos;
			pos += 0.2*(pos_end - pos) + (0.9 * speed / (time*0.03 + 1));
			speed = pos - pos_old;
			time++;
			buttonLoop(obj, pos, pos_end, time, speed);
		}, 30);
	}
	
	function picChange(pic_to_change) {
		var middle_container = 
			document.getElementById("pic" + current_pic_container);
		var right_container = 
			document.getElementById("pic" + (current_pic_container + 2) % 3);
		var left_container = 
			document.getElementById("pic" + (current_pic_container + 1) % 3);
		var back_card = document.getElementById("back_card");
			
		if(pic_to_change === "left"){
			if(pic_showing === 0){ // now showing the leftmost pic, 
				
			}else{
				pic_showing--;
				left_container.src = (pic_showing + 1) + ".jpg";
				middle_container.style.animation = 
					"move_downright 400ms ease 1 forwards";
				left_container.style.animation = 
					"move_upright 400ms ease 1 forwards";
				right_container.style.left = "-300px";
				
				current_pic_container = (current_pic_container + 1) % 3;
				
				backCardSpinLoop(1, back_card, 0, 0);
				$("#container").animate({
					backgroundColor: pic_primary_color[pic_showing]
				});
			}
			
		}else if (pic_to_change === "right"){
			if(pic_showing === pic_number - 1){ // now showing the rightmost pic, 
				
			}else{
				pic_showing++;
				//right_container.getElementsByTagName("img")[0].src = (pic_showing + 1) + ".jpg";
				right_container.src = (pic_showing + 1) + ".jpg";
				middle_container.style.animation = 
					"move_downleft 400ms ease 1 forwards";
				right_container.style.animation = 
					"move_upleft 400ms ease 1 forwards";
				left_container.style.left = "300px";
				
				current_pic_container = (current_pic_container + 2) % 3;
				
				backCardSpinLoop(-1, back_card, 0, 0);
				$("#container").animate({
					backgroundColor: pic_primary_color[pic_showing]
				});
			}
		}
	}
	
	function backCardSpinLoop(direction, obj, time, degree) {
		
		if(time > 20) {
			return;
		}
		setTimeout(function(){ 
			obj.style.transform = "rotateY(" + direction*degree*9 + "deg)";
			if(time === 10){// halfway
			obj.getElementsByTagName("p")[0].innerHTML = pic_title[pic_showing];
				degree *= -1;
			}
			time++;
			degree++;
			backCardSpinLoop(direction, obj, time, degree);
		}, 12);
	}
	
	function setButtonText(obj_left, obj_right) {
		if(pic_number <= 1){
			obj_left.innerHTML = "(none)";
			obj_right.innerHTML = "(none)";
			return;
		}
		if(pic_showing === 0){
			obj_left.innerHTML = "(none)";
			obj_right.innerHTML = pic_title[pic_showing + 1];
		}else if(pic_showing === (pic_number - 1)){
			obj_left.innerHTML = pic_title[pic_showing - 1];
			obj_right.innerHTML = "(none)";
		}else{
			obj_left.innerHTML = pic_title[pic_showing - 1];
			obj_right.innerHTML = pic_title[pic_showing + 1];
		}
	}
	