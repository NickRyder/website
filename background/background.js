$(window).load(function(){

var bgColor = '#0e0004'
var fgColor = 'white'


//Initialize canvas properties
var canvas = $("canvas");

var ctx = canvas[0].getContext("2d");
canvas.width = $(document).width();
canvas.height = $(document).height();
var width, height;
var max_dist = 50; //max distance to show pairwise lines
var density = 10000;

//Point Data Declarations
var point_x = [];
var point_y = [];

var point_theta = [];
var point_v_theta = [];
//var point_a_theta = [];

var point_N = 150;



//OPTIONAL: SLIDERS
// var slider_density = document.getElementById("slider_density");
// var slider_render_dist = document.getElementById("slider_render_dist");
// slider_density.oninput = function () { density = this.value; resize(); }
// slider_render_dist.oninput = function () { max_dist = this.value; resize(); }










//Data structure for pairwise distance
var point_array = [];
var row_N = 10;
var col_N = 10;


function initalize_array()	{
	point_array = [];
	for(var row = 0; row < row_N+1; row++){
		point_array.push([]);
		for(var col = 0; col < col_N+1; col++){
			point_array[row].push([]);
		}
	}
}


//Handle resizing on window resize
window.addEventListener('resize', resize, false);

resize();
initalize_array();
initialize_points();

function resize() {
	doc_height = window.innerHeight;
    doc_width = window.innerWidth;
	height = doc_height;
	width = doc_width;
	
	
	canvas.attr("width", width);
	canvas.attr("height", height);
	
	//max_dist = Math.min(1.0*width/col_N, 1.0*height/row_N)
	row_N = Math.floor(height/max_dist)
	col_N = Math.floor(width/max_dist)
	point_N = Math.ceil((width*height)/density)
	console.log(row_N)
	console.log(col_N)
	
}

function initialize_points(){
//Point Initialization
	while(point_x.length > point_N){
		point_x.pop()
		point_y.pop()
		
		point_theta.pop()
		point_v_theta.pop()
		
	}


	for(var i = point_x.length; i < point_N; i++) {
		point_x.push(Math.random());
		point_y.push(Math.random());
		
		
		
		point_theta.push(Math.random()*2*Math.PI);
		point_v_theta.push(.01*(Math.random()*2-1));
		//point_a_theta.push(0*(Math.random()*2-1));
	}
}



window.requestAnimationFrame(animate)

function animate() {
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle=bgColor;
	ctx.fillRect(0, 0, width, height);
	ctx.strokeStyle=fgColor;
	update_points();
	paint_pairs();
	paint();
	//ctx.stroke();
	requestAnimationFrame(animate);
}


function paint() {
	for(var i = 0; i < point_N; i++)	{
		ctx.globalAlpha = 1;
		ctx.fillStyle = fgColor;
		ctx.fillRect(width*point_x[i],height*point_y[i],2,2);
	}
}

function paint_pairs() {
	for(var row = 0; row < row_N; row++)
	{
		for(var col = 0; col < col_N; col++)
		{
			pair_list = box_neighbors(row,col);
			for(var i = 0; i < point_array[row][col].length; i++){
				for(var j = i + 1; j < pair_list.length; j++){
					point_1_ind = pair_list[i];
					point_2_ind = pair_list[j];
					dist = Math.sqrt(Math.pow(width*(point_x[point_1_ind]-point_x[point_2_ind]),2)+Math.pow(height*(point_y[point_1_ind]-point_y[point_2_ind]),2))
					if(dist < max_dist)
					{
						opacity = Math.min(2 - dist/max_dist * 2,1)
						ctx.beginPath();
						ctx.moveTo(width*point_x[point_1_ind],height*point_y[point_1_ind])
						ctx.lineTo(width*point_x[point_2_ind],height*point_y[point_2_ind])
					
						ctx.strokeStyle = fgColor;
						
						ctx.setLineDash([1, 2]);
						ctx.globalAlpha = opacity;
						ctx.closePath();
						ctx.stroke();
					}
					
				}
			}
		}
	}
}


function box_neighbors(box_row, box_col){
	var return_point_list = point_array[box_row][box_col];
	return_point_list= return_point_list.concat(point_array[box_row+1][box_col]);
	return_point_list= return_point_list.concat(point_array[box_row][box_col+1]);
	return_point_list= return_point_list.concat(point_array[box_row+1][box_col+1]);
	if(box_row> 0){
	return_point_list= return_point_list.concat(point_array[box_row-1][box_col+1]);
	}
	return return_point_list;
	
}
	
function update_points()	{
	// if(point_array.length != row_N || point_array[0].length != col_N)
	// {
		// console.log("Array Reshaped")
		initalize_array();
	// }
	if(point_x.length != point_N){
		initialize_points()}
	
	update_theta()
	
	for(var i = 0; i < point_N; i++)	{
		point_x[i] = ((point_x[i] + Math.cos(point_theta[i])/width + 1) % 1);
		point_y[i] = ((point_y[i] + Math.sin(point_theta[i])/height + 1) % 1);
		point_x_bin = Math.floor(point_x[i] * col_N);
		point_y_bin = Math.floor(point_y[i] * row_N);
		((point_array[point_y_bin])[point_x_bin]).push(i);
		}
}
	


function update_theta()		{
	rand_bit = Math.random()
	for(var i = 0; i < point_N; i++)	{
		point_v_theta[i] = ((point_v_theta[i] + (.1*rand_bit-.05) + 1) % 2) - 1
		point_theta[i] = (point_theta[i] + .01*point_v_theta[i]  + 2*Math.PI) % (2*Math.PI)	
	}
	
}


})