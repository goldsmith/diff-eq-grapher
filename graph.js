//http://staff.washington.edu/grigg/
scale = 50

function Point (x, y) {
	this.x = x
	this.y = y
}

function DrawLine(point1, point2, color) {
	ctx.strokeStyle = color
	ctx.beginPath()
	ctx.moveTo(point1.x, point1.y)
	ctx.lineTo(point2.x, point2.y)
	if (color === "purple") {
		ctx.lineWidth=3.0
		ctx.stroke()
		ctx.lineWidth=1.0
	}
	else {
		ctx.stroke()
	}
}

function DrawPoint (point, r) {
	ctx.beginPath()
	ctx.arc(point.x, point.y, r, 0, Math.PI*2, true)
	ctx.closePath()
	ctx.fill()
}

function DrawWithSlope(point, slopeFunction, n) {
	//draw a line with length n centered around point 
	//convert javascript points to real points
	real = new realPoint(point)

	//calculate stuff
	m = slopeFunction(real.x/scale, real.y/scale)
	deltax = n/(Math.sqrt(1 + Math.pow(m, 2)))
	newRealUp = new Point(real.x + deltax, real.y + m*deltax)
	newRealDown = new Point(real.x - deltax, real.y - m*deltax)

	//convert back to javascript points
	up = new fakePoint(newRealUp)
	down = new fakePoint(newRealDown)
	//DrawPoint(point, 1)
	DrawLine(up, down, 'black')
}

function DrawFromSlope(point, slopeFunction, stepSize) {
	//draw a line from point with slope
	DrawPoint(point, 1.5)
	p0 = new realPoint(point)
	x1 = p0.x + stepSize
	y1 = p0.y + stepSize*slopeFunction(p0.x/scale, p0.y/scale)
	p1 = new fakePoint(new Point(x1, y1))
	DrawLine(point, p1, 'blue')
	return p1
}

function realPoint(point) {
	return new Point(point.x-context.width/2, context.height/2-point.y)
}

function fakePoint(point) {
	return new Point(point.x+context.width/2, context.height/2-point.y)
}

function DrawDirectionField(n, slopeFunction) {
	for (var x=0; x<context.width; x+=10) {
		for (var y=0; y<context.height; y+=10) {
			DrawWithSlope(new Point(x, y), slopeFunction, n)
		}
	}
}

function EulerApprox(y0, slopeFunction, stepSize) {
	point = new Point(context.width/2, context.height/2 - y0)
	left = new Point(context.width/2, context.height/2 - y0)
	for (var x=0; x<context.width/2; x+=stepSize) {
		point = new DrawFromSlope(point, slopeFunction, stepSize)
		left = new DrawFromSlope(left, slopeFunction, -stepSize)
	}
	// for (var x=context.width/2; x<context.width; x+=stepSize) {
	// 	point = new DrawFromSlope(point, slopeFunction, stepSize)
	// }
}
	
function DrawAxes(n) {
	DrawLine(new Point(0, context.height/2), new Point(context.width, context.height/2), 'red')
	DrawLine(new Point(context.width/2, 0), new Point(context.width/2, context.height), 'red')
	DrawTickMarks(n)
}

function DrawTickMarks(n) {
	for (var x=0; x<context.width/2; x+=n) {
		DrawLine(new Point(context.width/2 + x, context.height/2-5), new Point(context.width/2 + x, context.height/2+5), 'purple')
		DrawLine(new Point(context.width/2 - x, context.height/2-5), new Point(context.width/2 - x, context.height/2+5), 'purple')
		DrawLine(new Point(context.width/2 - 5, context.height/2-x), new Point(context.width/2 + 5, context.height/2-x), 'purple')
		DrawLine(new Point(context.width/2 - 5, context.height/2+x), new Point(context.width/2 + 5, context.height/2+x), 'purple')
	}
}

function slopeFunc(x, y) {
	return x*(1-x)//temporary should be changed
}