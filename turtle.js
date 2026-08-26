class CanvasTurtle {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    // Turtle state
    this.x = 0;
    this.y = 0;
    this.currHeading = 0; // in degrees, 0 = East, 90 = North
    this.isPenDown = true;
    
    this.strokeColor = '#000000';
    this.fillColor = '#000000';
    this.lineWidth = 1;
    
    // Fill tracking
    this.fillVertices = [];
    this.isFilling = false;
  }
  
  toCanvasCoords(x, y) {
    // Map turtle coords (origin at center, Y goes up) to Canvas coords (origin top-left, Y goes down)
    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2;
    return {
      x: cx + x,
      y: cy - y
    };
  }
  
  penup() {
    this.isPenDown = false;
  }
  
  pendown() {
    this.isPenDown = true;
  }
  
  goto(x, y) {
    const prevX = this.x;
    const prevY = this.y;
    this.x = x;
    this.y = y;
    
    if (this.isFilling) {
      this.fillVertices.push({ x: this.x, y: this.y });
    }
    
    if (this.isPenDown) {
      const p1 = this.toCanvasCoords(prevX, prevY);
      const p2 = this.toCanvasCoords(this.x, this.y);
      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.strokeStyle = this.strokeColor;
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.stroke();
    }
  }
  
  forward(distance) {
    const rad = (this.currHeading * Math.PI) / 180;
    const newX = this.x + distance * Math.cos(rad);
    const newY = this.y + distance * Math.sin(rad);
    this.goto(newX, newY);
  }
  
  backward(distance) {
    this.forward(-distance);
  }
  
  left(angle) {
    this.currHeading += angle;
  }
  
  right(angle) {
    this.currHeading -= angle;
  }
  
  setheading(angle) {
    this.currHeading = angle;
  }
  
  pos() {
    return [this.x, this.y];
  }
  
  heading() {
    return this.currHeading;
  }
  
  color(strokeColor, fillColor = null) {
    this.strokeColor = strokeColor;
    if (fillColor !== null) {
      this.fillColor = fillColor;
    } else {
      this.fillColor = strokeColor;
    }
  }
  
  fillcolor(colorStr) {
    this.fillColor = colorStr;
  }
  
  pensize(size) {
    this.lineWidth = size;
  }
  
  begin_fill() {
    this.isFilling = true;
    this.fillVertices = [{ x: this.x, y: this.y }];
  }
  
  end_fill() {
    this.isFilling = false;
    if (this.fillVertices.length > 0) {
      this.ctx.beginPath();
      const pStart = this.toCanvasCoords(this.fillVertices[0].x, this.fillVertices[0].y);
      this.ctx.moveTo(pStart.x, pStart.y);
      for (let i = 1; i < this.fillVertices.length; i++) {
        const p = this.toCanvasCoords(this.fillVertices[i].x, this.fillVertices[i].y);
        this.ctx.lineTo(p.x, p.y);
      }
      this.ctx.closePath();
      this.ctx.fillStyle = this.fillColor;
      this.ctx.fill();
    }
    this.fillVertices = [];
  }
  
  dot(size, colorStr) {
    const p = this.toCanvasCoords(this.x, this.y);
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, size / 2, 0, 2 * Math.PI);
    this.ctx.fillStyle = colorStr || this.fillColor;
    this.ctx.fill();
  }
  
  circle(radius, extent = 360) {
    const startHeadingRad = (this.currHeading * Math.PI) / 180;
    
    // Center of circle
    const centerAngleRad = startHeadingRad + Math.PI / 2;
    const cx = this.x + radius * Math.cos(centerAngleRad);
    const cy = this.y + radius * Math.sin(centerAngleRad);
    
    // Start angle from center to turtle
    const startAngleRad = Math.atan2(this.y - cy, this.x - cx);
    
    // Use line segments to simulate circle drawing
    const absExtent = Math.abs(extent);
    const steps = Math.max(1, Math.ceil(absExtent * 2)); // 2 steps per degree for smoothness
    const extentRad = (extent * Math.PI) / 180;
    
    const signRad = radius >= 0 ? 1 : -1;
    const totalAngleChangeRad = extentRad * signRad;
    const stepAngleRad = totalAngleChangeRad / steps;
    
    const rAbs = Math.abs(radius);
    
    for (let i = 1; i <= steps; i++) {
      const currAngleRad = startAngleRad + i * stepAngleRad;
      const nextX = cx + rAbs * Math.cos(currAngleRad);
      const nextY = cy + rAbs * Math.sin(currAngleRad);
      this.goto(nextX, nextY);
    }
    
    this.currHeading += extent * signRad;
  }
}
