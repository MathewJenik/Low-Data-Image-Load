function fastImageLoad(ID) {
    getImageData();
    //getImageDataSize();
    //setupImage();

    //loadImage(ID);


}

function readFile(file) {
  // Check if the file is a plain text file.
  if (file.type && !file.type.startsWith('text/plain')) {
    console.log('File is not a text file.', file.type, file);
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    parseImageData(event.target.result);

  });

   return reader.readAsText(file);

}

function parseImageData(d) {
    var data = d.toString();

    console.log(data.split("(").length - 1) //3


    var r = data.substring(data.indexOf("r {") + 3, data.indexOf("g") - 7);
    var g = data.substring(data.indexOf("g {") + 3, data.indexOf("b") - 7);
    var b = data.substring(data.indexOf("b {") + 3, data.lastIndexOf("}"));

    console.log("R : " + r);
    console.log("G : " + g);
    console.log("B : " + b);

    var colourSizes = r.split("(").length - 1;

    var redArray = new Array(colourSizes);
    var greenArray = new Array(colourSizes);
    var blueArray = new Array(colourSizes);

    for (var i = 0; i < colourSizes; i++) {
        // red
        redArray[i] = r.substring(r.indexOf("(")+1, r.indexOf(")"));
        r = r.substring(r.indexOf(")")+1, r.length);
        /*
        var rS = redArray[i].substring(0,r.indexOf(":"));
        var rX = redArray[i].substring(r.indexOf(":")+1, getPosition(redArray[i], ",", 1));
        var rY = redArray[i].substring(getPosition(redArray[i], ",", 1), getPosition(redArray[i], ",", 2));
        var rW = redArray[i].substring(getPosition(redArray[i], ",", 2), getPosition(redArray[i], ",", 3));
        var rH = redArray[i].substring(getPosition(redArray[i], ",", 3), redArray[i].length-1);
        redArray[i] = colourObject(rS, rX, rY, rW, rH);
        */

        // green
        greenArray[i] = g.substring(g.indexOf("(")+1, g.indexOf(")"));
        g = g.substring(g.indexOf(")")+1, g.length);
        /*
        var gS = greenArray[i].substring(0,r.indexOf(":"));
        var gX = greenArray[i].substring(g.indexOf(":")+1, getPosition(greenArray[i], ",", 1));
        var gY = greenArray[i].substring(getPosition(greenArray[i], ",", 1), getPosition(greenArray[i], ",", 2));
        var gW = greenArray[i].substring(getPosition(greenArray[i], ",", 2), getPosition(greenArray[i], ",", 3));
        var gH = greenArray[i].substring(getPosition(greenArray[i], ",", 3), greenArray[i].length-1);
        greenArray[i] = colourObject(gS, gX, gY, gW, gH);
        */

        // blue
        blueArray[i] = b.substring(b.indexOf("(")+1, b.indexOf(")"));
        b = b.substring(b.indexOf(")")+1, b.length);
        /*
        var bS = blueArray[i].substring(0,r.indexOf(":"));
        var bX = blueArray[i].substring(b.indexOf(":")+1, getPosition(blueArray[i], ",", 1));
        var bY = blueArray[i].substring(getPosition(blueArray[i], ",", 1), getPosition(blueArray[i], ",", 2));
        var bW = blueArray[i].substring(getPosition(blueArray[i], ",", 2), getPosition(blueArray[i], ",", 3));
        var bH = blueArray[i].substring(getPosition(blueArray[i], ",", 3), blueArray[i].length-1);
        blueArray[i] = colourObject(bS, bX, bY, bW, bH);
        */

        //console.log(redArray[i].x+ " " + greenArray[i].x + " " + blueArray[i].x);
    }


    setupImage(redArray, greenArray, blueArray);

}

function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

function setupImage(r,g,b) {
    var canvas = document.getElementById("canvas");

    console.log(r + " " + g + " " + b);

    var ctx = canvas.getContext("2d");
    for (var i = 0; i < r.length; i++) {

        var rS = Number(r[i].substring(0,r[i].indexOf(":")));
        var rX = Number(r[i].substring(r[i].indexOf(":")+1, getPosition(r[i], ",", 1)));
        var rY = Number(r[i].substring(getPosition(r[i], ",", 1)+1, getPosition(r[i], ",", 2)));
        var rW = Number(r[i].substring(getPosition(r[i], ",", 2)+1, getPosition(r[i], ",", 3)));
        var rH = Number(r[i].substring(getPosition(r[i], ",", 3)+1, r[i].length));

        var gS = Number(g[i].substring(0,g[i].indexOf(":")));
        var gX = g[i].substring(g[i].indexOf(":")+1, getPosition(g[i], ",", 1));
        var gY = g[i].substring(getPosition(g[i], ",", 1), getPosition(g[i], ",", 2));
        var gW = g[i].substring(getPosition(g[i], ",", 2), getPosition(g[i], ",", 3));
        var gH = g[i].substring(getPosition(g[i], ",", 3), g[i].length);
        g[i] = colourObject(gS, gX, gY, gW, gH);


        var bS = Number(b[i].substring(0,b[i].indexOf(":")));
        var bX = b[i].substring(b[i].indexOf(":")+1, getPosition(b[i], ",", 1));
        var bY = b[i].substring(getPosition(b[i], ",", 1), getPosition(b[i], ",", 2));
        var bW = b[i].substring(getPosition(b[i], ",", 2), getPosition(b[i], ",", 3));
        var bH = b[i].substring(getPosition(b[i], ",", 3), b[i].length);

        //context.fillStyle = 'rgb('+25+', '+90+', '+50+')';
        ctx.fillStyle = 'rgb('+rS+', '+gS+', '+bS+')';
        //console.log(rX+'.'+rY+'.'+rW+'.'+rH);
        ctx.fillRect(rX, rY, rW, rH);
    }


    var url = canvas.toDataURL();

    var a = document.createElement('a');
    a.download = 'my.png';
    a.href = url;
    a.textContent = 'Download PNG';


    document.body.appendChild(a);

    var img = document.createElement('img');
    img.src=url;
    document.body.appendChild(img);
    //convertImageToLDIL();

}

function getImageDataSize() {

}

function getImageData() {
    let r = [];
    let g = [];
    let b = [];

    var files = document.getElementById('file-selector');
    const fileList = files.files;


    readFile(fileList[0]);

}


function loadImage(ID) {

}

function colourObject(strength, x, y, width, height) {
    const colObject = {
        strength: this.strength,
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
    };

    return colObject;
}

/*
    This algorithm can speed up the load as well as reduce the bandwidth of data sent required to the client,
    decreasing the resources used. Although this algorithm has some more limited uses, currently it is used for images that have simpler colour
    schemes, meaning that the less colour there are, the more data this algorithm saves.

    --currently only works on images that have the same width and height (square images)
    -- best time improvements are shown when less colours are being used with minimal changes betweent he colours during the scanning phase
*/

// the above, which loads the image from the supplied data works, the conversion process from image to data is lacking though.


//// fast image load conversion

function convertImageToLDIL() {

    var canvas = document.getElementById("canvas");

    var ctx = canvas.getContext("2d");

    let imageData = ctx.getImageData(180, 180, 40, 40);
    ctx.putImageData(imageData, 150, 10);

    var imgData = ctx.getImageData(0, 0, 1, 1).data;
    document.getElementById('imageData').innerText = imgData;
    console.log(imgData);
}


function convertData() {

    // create the lists of rgb data
    var rArray = [];
    var gArray = [];
    var bArray = [];


    var cuttoffThreshold = 10;

    var canvas = document.getElementById("canvas");

    var ctx = canvas.getContext("2d");

    var withinLimits = true;
    var boundingBox = 0;
    for (var i = 0; i < 400; i++) {
        var p = ctx.getImageData(0, 0, 1, 1).data;
        var centralRGB = p;//rgbToHex(p[0], p[1], p[2]);
        var boxBoundsWidth = -1;
        var boxBoundsHeight = -1;
        var boundsStartingX = 0;
        var boundsStartingY = 0;



        if (ctx.getImageData(0+i,0,1,1).data[0] < p[0]-cuttoffThreshold || ctx.getImageData(0+i,0,1,1).data[1] < p[1]-cuttoffThreshold || ctx.getImageData(0+i,0,1,1).data[2] < p[2]-cuttoffThreshold
    || ctx.getImageData(0+i,0,1,1).data[0] > p[0]+cuttoffThreshold || ctx.getImageData(0+i,0,1,1).data[1] > p[1]+cuttoffThreshold || ctx.getImageData(0+i,0,1,1).data[2] > p[2]+cuttoffThreshold) {
            withinLimits = false;
        } else if (ctx.getImageData(0,0+i,1,1).data[0] < p[0]-cuttoffThreshold || ctx.getImageData(0+i,0,1,1).data[1] < p[1]-cuttoffThreshold || ctx.getImageData(0+i,0,1,1).data[2] < p[2]-cuttoffThreshold
    || ctx.getImageData(0+i,0,1,1).data[0] > p[0]+cuttoffThreshold || ctx.getImageData(0+i,0,1,1).data[1] > p[1]+cuttoffThreshold || ctx.getImageData(0+i,0,1,1).data[2] > p[2]+cuttoffThreshold) {
            withinLimits = false;
        } else if (ctx.getImageData(0+i,0+i,1,1).data[0] < p[0]-cuttoffThreshold || ctx.getImageData(0+i,0+i,1,1).data[1] < p[1]-cuttoffThreshold || ctx.getImageData(0+i,0+i,1,1).data[2] < p[2]-cuttoffThreshold
    || ctx.getImageData(0+i,0+i,1,1).data[0] > p[0]+cuttoffThreshold || ctx.getImageData(0+i,0+i,1,1).data[1] > p[1]+cuttoffThreshold || ctx.getImageData(0+i,0+i,1,1).data[2] > p[2]+cuttoffThreshold) {
            withinLimits = false;
        }

        if (withinLimits == false) {
            boundingBox = i;

            // now run through the box with a smaller bounding box, checking for collisions.
            // this can be made into a recursive function with inputs, startX, startY, boundingBox

            for (var rows = 0; rows < boundingBox; rows++) {
                for (var cols = 0; cols < boundingBox; cols++) {


                    if (boxBoundsWidth == -1 || boxBoundsHeight == -1) {
                        var colour = ctx.getImageData(rows, cols,1,1).data;
                        if (cols == boundingBox - 1) {
                            if (colour[0] < p[0]-cuttoffThreshold || colour[0] > p[0]+cuttoffThreshold || colour[1] < p[1]-cuttoffThreshold || colour[1] > p[1]+cuttoffThreshold ||
                            colour[2] < p[2]-cuttoffThreshold || colour[2] > p[2]+cuttoffThreshold || colour[3] < p[3]-cuttoffThreshold || colour[3] > p[3]+cuttoffThreshold ) {
                                boxBoundsWidth = cols;
                            }
                        } else {
                            if (colour[0] < p[0]-cuttoffThreshold || colour[0] > p[0]+cuttoffThreshold || colour[1] < p[1]-cuttoffThreshold || colour[1] > p[1]+cuttoffThreshold ||
                            colour[2] < p[2]-cuttoffThreshold || colour[2] > p[2]+cuttoffThreshold || colour[3] < p[3]-cuttoffThreshold || colour[3] > p[3]+cuttoffThreshold) {
                                boxBoundsHeight = rows;
                            }
                        }

                    }


                }
            }


            // now once we have the size of the smaller box we add the box to the list of RGB colour positions and strengths.
            addColourValue(rArray, gArray, bArray, p[0], p[1], p[2], boundsStartingX, boundsStartingY, boxBoundsWidth, boxBoundsHeight);
            withinLimits = true;
        }

    }

    console.log(rArray);

    for (var cols = 0; cols < 400; cols++) {
        for(var rows = 0; rows < 400; rows++) {

        }
    }
}


function BBPruning() {

}


function addColourValue(rA, gA, bA, r, g, b, x, y, w, h) {
    // add a new colour value to the array

    if (rA == undefined) {
        rA[0] = [r, x, y, w, h];
        gA[0] = [g, x, y, w, h];
        bA[0] = [b, x, y, w, h];
    } else {
        rA[rA.length+1] = [r, x, y, w, h];
        gA[gA.length+1] = [g, x, y, w, h];
        bA[bA.length+1] = [b, x, y, w, h];
    }



}
