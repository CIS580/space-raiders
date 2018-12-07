/** @function nineSlice
  * The fillText function does not contain any way to deal with wrap around or multiple lines. 
    The bulk of this has to do with managing that.
    This also isn't a nineslice implementation at all, that is just the name that we are running with.
  * @param {int} x - the x coordinate of where the upper left of the text box should go
  * @param {int} y - the y coordinate of where the upper left of the text box should go
  * @param {string} name - the planet name
  * @param {string} color - a string that contains the hex code for the planet
  * @param {string} txt - string containing the description
  * @param {context} ctx - the screen context
  */

function nineSlice(x, y, name, color, txt){
    var textContent = txt;
    var textX = x;
    var textY = y;
    var charArr = Array.from(textContent); //string converted to char arr
    var arrLength = charArr.length; //length of char arr
    var maxLineLength = 55; //max amount of characters on one line
    var planetName = name //string
    var planetColor = color; //hex string
    var lineSpace = 14; //buffer space between lines
    var fontSize = 12; //size of text
    var planetNameLength = 35; //length of space that the planet name and buffer space takes up
    var borderBuffer = 10; //space between text and border
    var borderDimension = 1; //width, or length, of border around text
    
    var newCharArr = [];
    var lengthCounter = 0; //counts vertical length of text
	
    ctx.font = fontSize + "px Times New Roman";//font of the Planet Name
    ctx.fillStyle = planetColor; //color of the planet
    ctx.fillText(planetName, textX, textY-6);//writing the Planet Name on screen
    
    /**
	Since fillText does not have multiline functionality, this for loop allows for that
	fauxI takes the iterator and looks for when i is at the desired max length.
	It then draws the text that has been iterated through on screen and clears the array
	and then moves onto the next line by increasing the lengthCounter
	**/
    for(var i = 0; i < arrLength; i++){
        var fauxI = i % maxLineLength;
        if(fauxI === 0 && charArr[i] === " "){
            newCharArr[fauxI] = "";
        }
        else if(fauxI % (maxLineLength-1) === 0 && fauxI !== 0){
            if(charArr[i+1] !== " " && charArr[i] !== "."){
                newCharArr[fauxI+1] = "-"
            }
            else{
                newCharArr[fauxI+1] = "";
            }
            newCharArr[fauxI] = charArr[i];
            lengthCounter += lineSpace;
	    ctx.font = fontSize-2 + "px Arial";
            ctx.fillText(newCharArr.join(""), textX, textY+lengthCounter);
        }
        else{
            newCharArr[fauxI] = charArr[i];
        }
        
        if(i === arrLength - 1){
            for(var j = fauxI + 1; j < newCharArr.length; j++){
                newCharArr[j] = "";
            }
        }
    }
    
    //If the array is not after going through the entire char arr, write the remaining text
	//on screen and clear array. Then draw border around it.
	//Otherwise, if the array is empty, create the broder.
    if(newCharArr !== []){
	ctx.font = fontSize-2 + "px Arial";
	ctx.fillStyle = planetColor;
        ctx.fillText(newCharArr.join(""), textX, textY+lengthCounter+lineSpace);
        newCharArr = [];
		
		
	ctx.fillStyle = "white";
	ctx.fillRect(textX-lineSpace, textY-lineSpace-borderBuffer, borderDimension, lengthCounter+lineSpace+planetNameLength); //left border (x, y, width, length)
	ctx.fillRect(textX-lineSpace+(maxLineLength*(Math.floor(fontSize/2))), textY-lineSpace-borderBuffer, borderDimension, lengthCounter+lineSpace+planetNameLength); //right border
	//(x, y, width, length)
	ctx.fillRect(textX-lineSpace, textY-lineSpace-borderBuffer, maxLineLength*(Math.floor(fontSize/2)), borderDimension);//top border (x, y, width, length)
	ctx.fillRect(textX-lineSpace, textY+lengthCounter+lineSpace+borderBuffer, maxLineLength*(Math.floor(fontSize/2)), borderDimension); //bottom border (x, y, width, length)
    }
	else{
		ctx.fillStyle = "white";
		ctx.fillRect(textX-lineSpace, textY-lineSpace-borderBuffer, borderDimension, lengthCounter+lineSpace+nameLength); //left border (x, y, width, length)
		ctx.fillRect(textX-lineSpace+(maxLineLength*(Math.floor(fontSize/2))), textY-lineSpace-borderBuffer, borderDimension, lengthCounter+lineSpace+nameLength); //right border
		//(x, y, width, length)
		ctx.fillRect(textX-lineSpace, textY-lineSpace-borderBuffer, maxLineLength*(Math.floor(fontSize/2)), borderDimension);//top border (x, y, width, length)
		ctx.fillRect(textX-lineSpace, textY+lengthCounter+lineSpace+borderBuffer, maxLineLength*(Math.floor(fontSize/2)), borderDimension); //bottom border (x, y, width, length)
	}
}
