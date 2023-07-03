/**
 * @file     script.js
 * @brief    Draws 2D animations in a canvas
 * @author   Created by AntoineM
 * @version  03.07.2023
 */

var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");

ctx.strokeStyle = "dark";
ctx.lineWidth = 10;

var leftYPos = 0;   // Y coordinate of the left origin of the lines
var rightYPos = 0;  // Y coordinate of the right origin of the lines
var nbLines = 500;  // Amount of lines to draw
var space = 50;     // Space between each end of line
var posSpeed = 1.5; // Speed of the vertical movement of the origins of the lines
var limit = 1000;   // Limit to reach before inverting movement of the origins
var invert = 0;     // Whether the origins of the lines are moving up or down

setInterval(draw, 5);

function draw(){
    // Cleans the canvas before drawing again
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draws lines from one point on the left of the canvas (50px left of the border) to several points on the right on the canvas (on the border)
    for(let i = 0; i <= nbLines; i++){
        ctx.beginPath();
        ctx.moveTo(-50, leftYPos);
        // + 5 so that we don't see the rectangular end of the line
        ctx.lineTo(canvas.width + 5, i*space - leftYPos);
        ctx.stroke();
    }

    // Draws lines from one point on the right of the canvas (50px right of the border) to several points on the left on the canvas (on the border)
    for(let i = 0; i <= nbLines; i++){
        ctx.beginPath();
        ctx.moveTo(canvas.width + 50, rightYPos);
        // -5 so that we don't see the rectangular end of the line
        ctx.lineTo(-5, i*space - rightYPos);
        ctx.stroke();
    }

    // Decrement or increment the Y coordinates of the origins of the lines
    if(invert){
        leftYPos -= posSpeed;
        rightYPos -= posSpeed;
    }
    else{
        leftYPos += posSpeed;
        rightYPos += posSpeed;
    }

    // Conditions to meet to invert movement of the origins of the lines
    if(leftYPos > limit * 2 || rightYPos > limit * 2){
        invert = 1;
    }
    else if(leftYPos < -limit|| rightYPos < -limit){
        invert = 0;
    }
}