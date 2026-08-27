/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * ✦ Thirunayan Pookalam ✦
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Developed with ♥ by : Ebin Reji
 * Project             : Code a Pookalam (Theyyam Art Inspired Traditional Floral Design)
 * Technologies        : HTML5 Canvas, Vanilla CSS, Native JavaScript
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

window.eyeData = {
    leftPupilCenter: null,
    rightPupilCenter: null,
    pupilRadius: 0,
    highlightRadius: 0,
    highlightOffset: 0
};

window.staticCanvas = null;

function calculate_arc_dimensions(radius, angle_degrees) {
    let angle_radians = (angle_degrees * Math.PI) / 180;
    let width = 2 * radius * Math.sin(angle_radians / 2);
    let height = radius - radius * Math.cos(angle_radians / 2);
    return [width, height];
}

function find_triangle_height_and_base(a, theta_degrees) {
    let theta_radians = (theta_degrees * Math.PI) / 180;
    let h = a * Math.sin(theta_radians);
    let b = 2 * Math.sqrt(a**2 - h**2);
    return [h, b];
}

function calculate_arc_radius_and_angle(width, height) {
    let half_width = width / 2;
    let radius = Math.sqrt(half_width**2 + height**2);
    let angle_rad = 2 * Math.atan(half_width / height);
    let angle_deg = (angle_rad * 180) / Math.PI;
    return [radius, angle_deg];
}

function draw_pentagon(x, y, side_length, pen_down = false, fillclr = null) {
    t.penup();
    let angle = 360 / 6; 
    let [h, a] = find_triangle_height_and_base(side_length, angle);
    t.goto(x - side_length / 2, y - a);
    if (pen_down) t.pendown();
    if (fillclr !== null) {
        t.fillcolor(fillclr);
        t.begin_fill();
    }
    for (let i = 0; i < 5; i++) {
        t.forward(side_length);
        t.left(angle);
    }
    if (fillclr !== null) t.end_fill();
}

function draw_eye(x, y, major, minor, fillclr = null, pen_down = true) {
    t.goto(x, y);
    t.penup();
    let [x_diff, _] = calculate_arc_dimensions(minor, 90);
    t.penup();
    t.left(45);
    t.forward(major * 0.02);
    let y_center = t.pos()[1];
    let x_center = x + (x_diff / 2);
    t.goto(x_center, y_center);
    if (pen_down) t.pendown();
    if (fillclr !== null) {
        t.fillcolor(fillclr);
        t.begin_fill();
    }
    for (let i = 0; i < 2; i++) {
        let chead = t.heading();
        t.forward(major * 0.02);
        t.left(60);
        t.forward(major * 0.02);
        t.setheading(chead + 90);
        t.circle(minor, 90);
    }
    if (fillclr !== null) t.end_fill();
}

function draw_dual_circle(x, y, rad, gap, fillclr, upper_size = 3) {
    t.penup();
    t.goto(x, y - rad - gap);
    t.setheading(0);
    t.fillcolor(fillclr);
    t.begin_fill();
    t.circle(rad - gap);
    t.end_fill();
    t.right(90);
    t.forward(gap);
    t.setheading(0);
    t.color(fillclr);
    t.pensize(upper_size);
    t.pendown();
    t.circle(rad);
    t.penup();
    t.color('#000000');
}

function draw_dashed_circle(x, y, rad, fillclr, peaces = 10) {
    t.penup();
    t.goto(x, y - rad);
    t.setheading(0);
    t.fillcolor(fillclr);
    for (let i = 1; i <= peaces; i++) {
        if (i % 2 === 0) {
            let [cx1, cy1] = t.pos();
            t.circle(rad, 360 / peaces);
            let [cx2, cy2] = t.pos();
            let chead = t.heading();
            t.circle(rad, -360 / peaces);
            t.begin_fill();
            t.circle(rad, 360 / peaces);
            t.goto(x, y);
            t.goto(cx1, cy1);
            t.end_fill();
            t.goto(cx2, cy2);
            t.setheading(chead);
        } else {
            t.circle(rad, 360 / peaces);
        }
    }
}

function draw_theyyam_face(x, y, height) {
    let eye_pos = height * 0.22;
    let mouth_pos = height * 0.10;
    let head_design_pos = height * 0.309;
    let top_band_pos = height * 0.516;
    let top_band_height = height * 0.098;
    let top_band_radius = height * 0.32;
    let top_band_angle = 95;
    t.penup();
    
    // kireedam (crown)
    let crown_height = height * 0.5;
    let crown_bottom_width = height * 0.94;
    let crown_top_circle_gap = height * 0.05;
    let crown_top_circle_penta_gap = height * 0.1;
    t.goto(x - (crown_bottom_width / 2), y + crown_height);
    t.setheading(90);
    t.fillcolor('#960018'); // Deep Red crown backing (updated from #2E7D32)
    t.begin_fill();
    t.circle(-crown_bottom_width / 2, 180);
    t.end_fill();
    
    // dots
    t.goto(x - ((crown_bottom_width / 2) - crown_top_circle_gap), y + crown_height);
    t.setheading(90);
    let num_peaces = 40;
    for (let i = 0; i < num_peaces; i++) {
        t.circle(-((crown_bottom_width / 2) - crown_top_circle_gap), 180 / num_peaces / 2);
        t.dot(height * 0.02, '#FFFFFF');
        t.circle(-((crown_bottom_width / 2) - crown_top_circle_gap), 180 / num_peaces / 2);
    }
    
    // hexagons / pentagons
    t.goto(x - ((crown_bottom_width / 2) - (crown_top_circle_gap + crown_top_circle_penta_gap)), y + crown_height);
    t.setheading(90);
    num_peaces = 4;
    for (let i = 0; i < num_peaces; i++) {
        t.circle(-((crown_bottom_width / 2) - (crown_top_circle_gap + crown_top_circle_penta_gap)), 180 / num_peaces / 2);
        let chead = t.heading();
        t.setheading(0);
        let [cx, cy] = t.pos();
        draw_pentagon(cx, cy, height * 0.082, false, '#F57C00'); // Orange (updated from #EEA003)
        t.setheading(chead);
        t.goto(cx, cy);
        t.setheading(0);
        draw_pentagon(cx, cy, height * 0.053, false, '#D84315'); // Dark Orange (updated from #F57C00)
        t.setheading(chead);
        t.goto(cx, cy);
        t.setheading(0);
        draw_pentagon(cx, cy, height * 0.037, false, '#8B1E24'); // Deep Maroon
        t.setheading(chead);
        t.goto(cx, cy);
        t.circle(-((crown_bottom_width / 2) - (crown_top_circle_gap + crown_top_circle_penta_gap)), 180 / num_peaces / 2);
    }
    t.setheading(0);
    
    // dashed circle
    draw_dashed_circle(x, y + crown_height + crown_bottom_width / 50, crown_bottom_width / 5, '#FFFFFF', 50);
    
    // Draw the face
    let face_bottom_circle_ang = 152;
    t.goto(x, y);
    t.circle(height * 0.2196, -face_bottom_circle_ang / 2);
    let chead = t.heading();
    let [tmp_x1, tmp_y1] = t.pos();
    t.setheading(90);
    t.forward(top_band_pos - height * 0.16);
    t.setheading(270);
    t.fillcolor('#D32F2F'); // Radiant Theyyam Crimson Red Face
    t.begin_fill();
    t.forward(top_band_pos - height * 0.16);
    t.setheading(chead);
    t.circle(height * 0.2196, face_bottom_circle_ang);
    t.setheading(90);
    t.forward(top_band_pos - height * 0.16);
    t.end_fill();
    
    // decoration1 (cheek ornaments)
    t.goto(tmp_x1 + height * 0.005, tmp_y1 + height * 0.035);
    t.setheading(chead);
    num_peaces = 9;
    for (let i = 1; i < num_peaces; i++) {
        let j = i < num_peaces / 2 ? i : num_peaces - i;
        let crad = (height * 0.017) * ((2 / num_peaces) * (j % (num_peaces / 2)));
        t.circle(height * 0.2196 - height * 0.005, face_bottom_circle_ang / num_peaces);
        let [tx1, ty1] = t.pos();
        let chead_inner = t.heading();
        draw_dual_circle(tx1, ty1, crad, crad / 2.3, '#F57C00', height * 0.003);
        t.setheading(chead_inner);
        t.goto(tx1, ty1);
    }
    
    // draw the band above face
    t.goto(x, y + top_band_pos);
    t.setheading(0);
    t.pendown();
    t.circle(-top_band_radius, -top_band_angle / 2);
    let [dec_tmp_x1, dec_tmp_y1] = t.pos();
    let dec_tmp_head1 = t.heading();
    t.fillcolor('#8B1E24'); // Deep Maroon Band
    t.begin_fill();
    t.circle(-top_band_radius, top_band_angle);
    let band_tmp_ang = t.heading();
    let [band_circle_pos_x, band_circle_pos_y] = t.pos();
    t.setheading(90);
    t.forward(top_band_height);
    t.setheading(band_tmp_ang + 180);
    t.circle(top_band_radius, top_band_angle);
    t.setheading(270);
    t.forward(top_band_height);
    let [band_circle_pos_x1, band_circle_pos_y1] = t.pos();
    t.end_fill();
    let band_side_circle_rad = height * 0.085;
    t.penup();
    
    // decorations
    // outside
    t.goto(dec_tmp_x1, dec_tmp_y1 - height * 0.02);
    t.setheading(dec_tmp_head1);
    let num_dots = 50;
    for (let i = 0; i < num_dots; i++) {
        t.dot(height * 0.005, '#FFFFFF');
        t.circle(-top_band_radius, top_band_angle / num_dots);
    }
    // inside
    for (let i = 1; i < 3; i++) {
        t.goto(dec_tmp_x1, dec_tmp_y1 + ((top_band_height / 3) * i));
        t.setheading(dec_tmp_head1);
        let num_dots_inner = 20;
        for (let j = 0; j < num_dots_inner; j++) {
            t.dot(height * 0.02, '#F57C00');
            t.circle(-top_band_radius, top_band_angle / num_dots_inner);
        }
    }
    
    // draw the side circle in the band (left earring)
    t.goto(band_circle_pos_x1, band_circle_pos_y1 + (band_side_circle_rad - top_band_height));
    t.setheading(0);
    t.fillcolor('#8B1E24'); // Crimson Red
    t.begin_fill();
    t.circle(band_side_circle_rad);
    t.end_fill();
    // decorations
    t.setheading(90);
    t.forward(height * 0.054);
    t.setheading(0);
    t.fillcolor('#F57C00'); // Orange inner (updated from #FBC02D)
    t.begin_fill();
    t.circle(band_side_circle_rad - height * 0.054);
    t.end_fill();
    t.setheading(270);
    t.forward(height * 0.027);
    t.setheading(0);
    let num_dots_left = 13;
    for (let i = 0; i < num_dots_left; i++) {
        t.circle((band_side_circle_rad - height * 0.027), 360 / num_dots_left);
        t.dot(height * 0.02, '#FFFFFF');
    }
    
    // right earring
    t.goto(band_circle_pos_x, band_circle_pos_y + (band_side_circle_rad - top_band_height));
    t.setheading(0);
    t.fillcolor('#8B1E24'); // Crimson Red
    t.begin_fill();
    t.circle(band_side_circle_rad);
    t.end_fill();
    t.setheading(90);
    t.forward(height * 0.054);
    t.setheading(0);
    t.fillcolor('#F57C00'); // Orange inner (updated from #FBC02D)
    t.begin_fill();
    t.circle(band_side_circle_rad - height * 0.054);
    t.end_fill();
    t.setheading(270);
    t.forward(height * 0.027);
    t.setheading(0);
    let num_dots_right = 13;
    for (let i = 0; i < num_dots_right; i++) {
        t.circle((band_side_circle_rad - height * 0.027), 360 / num_dots_right);
        t.dot(height * 0.024, '#FFFFFF');
    }
    
    // lips
    t.goto(x, y + mouth_pos);
    t.setheading(0);
    let lip_bottom_rad = height * 0.087;
    let lip_bottom_ang = 93;
    t.fillcolor('#8B1E24');
    t.circle(lip_bottom_rad, -lip_bottom_ang / 2);
    let [tmp_x2, tmp_y2] = t.pos();
    let chead_lip = t.heading();
    t.begin_fill();
    t.circle(lip_bottom_rad, lip_bottom_ang);
    let [tmp_x3, tmp_y3] = t.pos();
    let chead2_lip = t.heading();
    t.end_fill();
    t.fillcolor('#8B1E24');
    t.goto(tmp_x2, tmp_y2);
    t.setheading(360 - chead_lip);
    t.begin_fill();
    t.circle(-lip_bottom_rad / 2, lip_bottom_ang);
    t.end_fill();
    t.goto(tmp_x3, tmp_y3);
    t.setheading(360 - chead2_lip);
    t.begin_fill();
    t.circle(-lip_bottom_rad / 2, -lip_bottom_ang);
    t.end_fill();
    
    // eyes
    let eye_gap = height * 0.121;
    let eye_bottom_rad = height * 0.121;
    let eye_bottom_angle = 114;
    let eye_right_cir_rad = height * 0.09;
    let eye_right_cir_ang = 106;
    t.goto(x - eye_gap, y + eye_pos);
    t.setheading(0);
    t.circle(eye_bottom_rad, -eye_bottom_angle / 2);
    let chead_eye = t.heading();
    t.left(80);
    t.circle(eye_right_cir_rad, eye_right_cir_ang);
    t.fillcolor('#1A1A1A'); // Deep Kohl Black Mask
    t.begin_fill();
    t.left(180);
    t.circle(-eye_right_cir_rad, eye_right_cir_ang);
    t.setheading(chead_eye);
    let [tmp_x1_eye, tmp_y1_eye] = t.pos();
    let tmp_head = t.heading();
    t.circle(eye_bottom_rad, eye_bottom_angle);
    t.left(110);
    let eye_left_cir_rad = height * 0.215;
    let eye_left_cir_ang = 42;
    t.circle(-eye_left_cir_rad, eye_left_cir_ang);
    t.end_fill();
    t.setheading(0);
    draw_eye(x - eye_gap, tmp_y1_eye, height * 0.03, height * 0.06, '#FFFFFF', false);
    // Capture left eye pupil and highlight info for interactive rendering
    window.eyeData.leftPupilCenter = t.toCanvasCoords(x - eye_gap, tmp_y1_eye - height * 0.015);
    window.eyeData.pupilRadius = height * 0.015;
    window.eyeData.highlightRadius = height * 0.005;
    window.eyeData.highlightOffset = -height * 0.01;
    
    // decorations left eye
    t.setheading(tmp_head);
    t.goto(tmp_x1_eye, tmp_y1_eye - height * 0.02);
    let num_peaces_eye = 10;
    for (let i = 0; i < num_peaces_eye; i++) {
        t.circle(eye_bottom_rad, eye_bottom_angle / num_peaces_eye);
        t.dot(height * 0.009, '#FFFFFF');
    }
    
    // eye right
    t.goto(x + eye_gap, y + eye_pos);
    t.setheading(0);
    t.circle(eye_bottom_rad, eye_bottom_angle / 2);
    let chead_eye_r = t.heading();
    t.left(100);
    t.circle(-eye_right_cir_rad, eye_right_cir_ang);
    t.fillcolor('#1A1A1A');
    t.begin_fill();
    t.left(180);
    t.circle(eye_right_cir_rad, eye_right_cir_ang);
    t.setheading(chead_eye_r);
    let [tmp_x1_eye_r, tmp_y1_eye_r] = t.pos();
    let tmp_head_r = t.heading();
    t.circle(eye_bottom_rad, -eye_bottom_angle);
    t.left(70);
    let eye_left_cir_rad_r = height * 0.215;
    let eye_left_cir_ang_r = 42;
    t.circle(eye_left_cir_rad_r, eye_left_cir_ang_r);
    t.end_fill();
    t.setheading(0);
    draw_eye(x + eye_gap, tmp_y1_eye_r, height * 0.03, height * 0.06, '#FFFFFF', false);
    // Capture right eye pupil center
    window.eyeData.rightPupilCenter = t.toCanvasCoords(x + eye_gap, tmp_y1_eye_r - height * 0.015);
    
    // decorations right eye
    t.setheading(tmp_head_r);
    t.goto(tmp_x1_eye_r, tmp_y1_eye_r - height * 0.02);
    for (let i = 0; i < num_peaces_eye; i++) {
        t.circle(eye_bottom_rad, -eye_bottom_angle / num_peaces_eye);
        t.dot(height * 0.009, '#FFFFFF');
    }
    
    // nose
    let nose_gap = height * 0.184;
    t.goto(x, y + nose_gap);
    t.setheading(90);
    t.pensize(height * 0.02);
    t.pendown();
    t.color('#8B1E24');
    t.forward(height * 0.081);
    t.penup();
    t.pensize(1); // reset pensize
    
    // forehead decorations
    let angle_top_circles = 95;
    let top_circles_gap = height * 0.364;
    t.goto(x, y + top_circles_gap);
    t.fillcolor('#8B1E24');
    t.setheading(0);
    t.circle(-height * 0.1, -angle_top_circles / 2);
    let [tmp_x1_fore, tmp_y1_fore] = t.pos();
    let chead2_fore = t.heading();
    t.begin_fill();
    let chead1_fore = t.heading();
    t.circle(-height * 0.1, angle_top_circles);
    let chead_fore = t.heading();
    t.left(90);
    t.forward(height * 0.01);
    t.setheading(chead_fore + 180);
    t.circle(height * 0.1 + height * 0.01, angle_top_circles);
    t.end_fill();
    
    // second top half circle
    t.setheading(chead1_fore);
    t.left(90);
    t.forward(height * 0.067);
    t.right(90);
    t.fillcolor('#F57C00'); // Orange accent (updated from #EEA003)
    t.begin_fill();
    t.circle(-(height * 0.1 + height * 0.067), angle_top_circles);
    let chead_fore_outer = t.heading();
    t.left(90);
    t.forward(height * 0.01);
    t.setheading(chead_fore_outer + 180);
    t.circle(height * 0.1 + height * 0.067 + height * 0.01, angle_top_circles);
    t.end_fill();
    
    // Fill white forehead crescent
    t.goto(tmp_x1_fore, tmp_y1_fore);
    t.setheading(chead2_fore);
    t.fillcolor('#FFFFFF');
    t.begin_fill();
    t.circle(-height * 0.1, angle_top_circles);
    t.end_fill();
    
    // top dot dot
    t.setheading(chead2_fore);
    t.goto(tmp_x1_fore, tmp_y1_fore);
    t.left(90);
    t.forward(height * 0.05);
    t.right(90);
    let num_dots_fore = 20;
    for (let i = 0; i < num_dots_fore - 1; i++) {
        t.circle(-(height * 0.1 + height * 0.05), angle_top_circles / num_dots_fore);
        t.dot(height * 0.005, '#FFFFFF');
    }
}

function colored_star(x, y, size = 40, fillclr = null, angle = 120, pen_down = false) {
    t.penup();
    let chead = t.heading();
    t.goto(x, y);
    t.setheading(60);
    let targetAngle = 120;
    t.forward(size);
    let [x_diff1, y_len1] = t.pos();
    t.backward(size);
    for (let i = 0; i < 2; i++) {
        t.forward(size);
        t.right(targetAngle);
        t.forward(size);
        t.right(72 - targetAngle);
    }
    t.forward(size);
    t.right(targetAngle);
    let [y_diff, y_len2] = t.pos();
    let star_height = y_len2 - y_len1;
    let x_diff = x_diff1 - x;
    t.goto(x + x_diff, y_len1 + (star_height / 2));
    let [x1, y1] = t.pos();
    x_diff = x - x1;
    let y_diff_pos = y - y1;
    t.goto(x + x_diff, y + y_diff_pos);
    t.setheading(60);
    if (pen_down) t.pendown();
    if (fillclr !== null) {
        t.fillcolor(fillclr);
        t.begin_fill();
    }
    for (let i = 0; i < 5; i++) {
        t.forward(size);
        t.right(targetAngle);
        t.forward(size);
        t.right(72 - targetAngle);
    }
    if (fillclr !== null) {
        t.end_fill();
    }
    t.goto(x, y);
    t.setheading(chead);
}

function draw_double_diamond(x, y, size) {
    let chead = t.heading();
    t.penup();
    t.goto(x, y);
    
    // Draw outer diamond (white outline)
    t.right(90);
    t.forward(size);
    t.left(135);
    t.color('#FFFFFF');
    t.pensize(2.0);
    t.pendown();
    
    let side = Math.sqrt(2) * size;
    for (let i = 0; i < 4; i++) {
        t.forward(side);
        t.left(90);
    }
    t.penup();
    
    // Go back to center
    t.goto(x, y);
    t.setheading(chead);
    
    // Draw inner diamond (fully filled white)
    let inner_size = size * 0.45;
    t.right(90);
    t.forward(inner_size);
    t.left(135);
    t.fillcolor('#FFFFFF');
    t.begin_fill();
    let inner_side = Math.sqrt(2) * inner_size;
    for (let i = 0; i < 4; i++) {
        t.forward(inner_side);
        t.left(90);
    }
    t.end_fill();
    
    // Go back to center
    t.penup();
    t.goto(x, y);
    t.setheading(chead);
    t.pensize(1); // reset
}

function draw_flower_design(x, y, rad) {
    let num_petals = 12;
    for (let i = 0; i < num_petals; i++) {
        let theta = (i * (360 / num_petals) * Math.PI) / 180;
        let theta_left = ((i * (360 / num_petals) - 12) * Math.PI) / 180;
        let theta_right = ((i * (360 / num_petals) + 12) * Math.PI) / 180;
        
        let x1 = x + rad * 0.45 * Math.cos(theta_left);
        let y1 = y + rad * 0.45 * Math.sin(theta_left);
        let x2 = x + rad * Math.cos(theta);
        let y2 = y + rad * Math.sin(theta);
        let x3 = x + rad * 0.45 * Math.cos(theta_right);
        let y3 = y + rad * 0.45 * Math.sin(theta_right);
        
        t.color('#EEA003'); // Golden yellow outline
        t.pensize(1);
        t.fillcolor('#EEA003'); // Golden yellow fill
        t.penup();
        t.goto(x, y);
        t.pendown();
        t.begin_fill();
        t.goto(x1, y1);
        t.goto(x2, y2);
        t.goto(x3, y3);
        t.goto(x, y);
        t.end_fill();
    }
    
    // Central dark red/brown dot
    t.penup();
    t.goto(x, y - rad * 0.2);
    t.setheading(0);
    t.fillcolor('#7E0908');
    t.begin_fill();
    t.circle(rad * 0.2);
    t.end_fill();
    t.color('black');
    t.penup();
}

function draw_ellipse(x, y, major, minor, fillclr = null, pen_down = true) {
    t.penup();
    let [x_diff, y_diff] = calculate_arc_dimensions(minor, 90);
    let y_center = y + (major / 2) - y_diff;
    let x_center = x + (x_diff / 2);
    t.goto(x_center, y_center);
    t.setheading(45);
    if (pen_down) t.pendown();
    if (fillclr !== null) {
        t.fillcolor(fillclr);
        t.begin_fill();
    }
    for (let i = 0; i < 2; i++) {
        t.circle(major, 90);
        t.circle(minor, 90);
    }
    if (fillclr !== null) t.end_fill();
}

function draw_square(x, y, width, height, angle = 0, clr = "black", fill = false, border = 1, border_clr = "black") {
    t.penup();
    t.goto(x, y);
    if (border > 0) t.pendown();
    t.setheading(angle);
    t.color(border_clr);
    t.pensize(border);
    if (fill) {
        t.fillcolor(clr);
        t.begin_fill();
    }
    t.forward(width / 2);
    t.left(90);
    t.forward(height);
    t.left(90);
    t.forward(width);
    t.left(90);
    t.forward(height);
    t.left(90);
    t.forward(width / 2);
    if (fill) t.end_fill();
}

function draw_theyyam(x, y, width) {
    t.penup();
    t.setheading(0);
    
    let non_circle_len = width * 0.20;
    let len_square_bottom = width * 0.137;
    let len_half_circle = width * 0.5;
    let height = non_circle_len + len_square_bottom + len_half_circle;
    y = y - height / 2;
    
    t.goto(x - width / 2, y);
    t.left(90);
    t.forward(len_square_bottom + non_circle_len);
    t.fillcolor('#B22222'); // Outermost crown arch: Red (updated to #B22222)
    t.begin_fill();
    t.circle(-len_half_circle, 180);
    t.end_fill();
    
    t.fillcolor('#7E0908'); // Second arch: Crimson Red
    let half_circle_gap = width * 0.093;
    t.penup();
    t.setheading(90);
    t.goto(x - width / 2 + half_circle_gap, y + (len_square_bottom + non_circle_len));
    t.begin_fill();
    t.circle(-len_half_circle + half_circle_gap, 180);
    t.end_fill();
    
    t.setheading(90);
    t.goto(x - width / 2 + half_circle_gap * 2, y + (len_square_bottom + non_circle_len));
    t.fillcolor('#D84315'); // Third arch: Dark Orange (updated from #F57C00)
    t.begin_fill();
    t.circle(-len_half_circle + half_circle_gap * 2, 180);
    t.end_fill();
    
    t.setheading(90);
    t.goto(x - width * 0.27, y + (len_square_bottom + non_circle_len));
    t.fillcolor('#F57C00'); // Fourth arch: Orange (updated from #EEA003)
    t.begin_fill();
    t.circle(-width * 0.27, 180);
    t.end_fill();
    
    t.setheading(90);
    t.goto(x - width * 0.21, y + (len_square_bottom + non_circle_len));
    t.fillcolor('#960018'); // Fifth arch: Deep Red (updated from #0D5218)
    t.begin_fill();
    t.circle(-width * 0.21, 180);
    t.end_fill();
    
    // designs inside first half circle (detailed golden flowers on green)
    t.goto(x - (width / 2) + (half_circle_gap / 2), y + (len_square_bottom + non_circle_len));
    t.setheading(90);
    let num_flowers = 12;
    for (let i = 0; i < num_flowers - 1; i++) {
        t.circle(-len_half_circle + (half_circle_gap / 2), 180 / num_flowers);
        let [cx, cy] = t.pos();
        let chead = t.heading();
        draw_flower_design(cx, cy, width * 0.022);
        t.goto(cx, cy);
        t.setheading(chead);
    }
    
    // designs inside second half circle (white stars / dots on red)
    t.goto(x - width / 2 + half_circle_gap + (width * 0.015), y + (len_square_bottom + non_circle_len));
    t.setheading(90);
    let num_dots = 64;
    for (let i = 0; i < num_dots - 1; i++) {
        t.circle(-len_half_circle + (half_circle_gap + (width * 0.015)), 180 / num_dots);
        t.dot(width * 0.008, '#FFFFFF');
    }
    
    t.goto(x - width / 2 + (half_circle_gap * 2) - (width * 0.015), y + (len_square_bottom + non_circle_len));
    t.setheading(90);
    for (let i = 0; i < num_dots - 1; i++) {
        t.circle(-len_half_circle + ((half_circle_gap * 2) - (width * 0.015)), 180 / num_dots);
        t.dot(width * 0.008, '#FFFFFF');
    }
    
    t.goto(x - width / 2 + (half_circle_gap * 1.5), y + (len_square_bottom + non_circle_len));
    t.setheading(90);
    let num_stars = 11;
    for (let i = 0; i < num_stars - 1; i++) {
        t.circle(-len_half_circle + (half_circle_gap * 1.5), 180 / num_stars);
        let [cx, cy] = t.pos();
        draw_double_diamond(cx, cy, width * 0.018);
    }
    
    let center_no_circle_rad = width * 0.19;
    let center_mul_circle_gap = width * (0.061 - 0.006);
    
    // Draw white dots in the Orange and Yellow arches
    let dot_indices = [1, 2];
    for (let i of dot_indices) {
        t.goto(x - center_no_circle_rad - (center_mul_circle_gap * i), y + (len_square_bottom + non_circle_len));
        t.setheading(90);
        let num_dots_arch = 30 + (i * 10);
        for (let j = 0; j < num_dots_arch - 1; j++) {
            t.circle(-(center_no_circle_rad + (center_mul_circle_gap * i)), 180 / num_dots_arch);
            t.dot(width * 0.012, '#FFFFFF');
        }
    }
    
    // Draw flowers in the Green arch
    t.goto(x - width * 0.18, y + (len_square_bottom + non_circle_len));
    t.setheading(90);
    let num_flowers_inner = 8;
    for (let i = 0; i < num_flowers_inner - 1; i++) {
        t.circle(-width * 0.18, 180 / num_flowers_inner);
        let [cx, cy] = t.pos();
        let chead = t.heading();
        draw_flower_design(cx, cy, width * 0.016);
        t.goto(cx, cy);
        t.setheading(chead);
    }
    
    // Draw the square below the big half circle (horizontal bar)
    draw_square(x, y + non_circle_len, width, len_square_bottom, 0, '#F57C00', true, 0); // Orange border (updated from #EEA003)
    draw_square(x, y + non_circle_len + (width * 0.024), width - (width * 0.015), len_square_bottom - 2 * (width * 0.024), 0, '#960018', true, 0); // Deep Red inner (updated from #0D5218)
    
    // decoration
    t.setheading(0);
    t.goto(x - width / 2, y + non_circle_len + (width * 0.012));
    let num_peaces = 50;
    for (let i = 0; i < num_peaces - 1; i++) {
        t.forward(width / num_peaces);
        t.dot(width * 0.012, '#FFFFFF');
    }
    t.goto(x - width / 2, y + non_circle_len + len_square_bottom - (width * 0.012));
    for (let i = 0; i < num_peaces - 1; i++) {
        t.forward(width / num_peaces);
        t.dot(width * 0.012, '#FFFFFF');
    }
    
    t.goto(x - (width - (width * 0.015)) / 2, y + non_circle_len + (width * 0.024) + (len_square_bottom - 2 * (width * 0.024)) / 2);
    t.setheading(0);
    let wi_btm = width - (width * 0.015);
    let num_peaces_bottom = 8;
    for (let i = 0; i < num_peaces_bottom; i++) {
        t.forward(wi_btm / num_peaces_bottom / 2);
        t.dot(width * 0.028, '#7E0908');
        t.dot(width * 0.01, '#F57C00');
        t.setheading(270);
        t.forward(width * 0.031);
        let num = 20;
        t.setheading(0);
        for (let j = 0; j < num; j++) {
            t.dot(width * 0.005, '#F57C00');
            t.circle(width * 0.031, 360 / num);
        }
        t.setheading(90);
        t.forward(width * 0.031);
        t.setheading(0);
        t.forward(wi_btm / num_peaces_bottom / 2);
    }
    
    let bottom_len = width / 2;
    let bottom_one_height = width * 0.1;
    let bottom_band_height = width * 0.115;
    let bottom_band_ang = 90;
    let bottom_r2 = width * 0.17 / 2;
    
    t.penup();
    t.setheading(270);
    t.goto(x - (bottom_len / 4), y + non_circle_len);
    t.fillcolor('#8B1E24');
    t.begin_fill();
    t.forward(non_circle_len - bottom_band_height);
    t.left(90);
    t.forward(bottom_len / 2);
    t.left(90);
    t.forward(non_circle_len - bottom_band_height);
    t.end_fill();
    
    t.setheading(0);
    t.goto(x - (bottom_len / 2), y + non_circle_len + len_square_bottom);
    t.right(90);
    t.fillcolor('#F57C00');
    t.begin_fill();
    t.forward(bottom_one_height - bottom_r2 + len_square_bottom);
    t.circle(bottom_r2, 180);
    t.forward(bottom_one_height - bottom_r2 + len_square_bottom);
    let [tmp_cir_x1, tmp_cir_y1] = t.pos();
    t.end_fill();
    
    // right side
    t.setheading(270);
    t.goto(x + (bottom_len / 2), y + non_circle_len + len_square_bottom);
    t.begin_fill();
    t.forward(bottom_one_height - bottom_r2 + len_square_bottom);
    t.circle(-bottom_r2, 180);
    t.forward(bottom_one_height - bottom_r2 + len_square_bottom);
    let [tmp_cir_x2, tmp_cir_y2] = t.pos();
    t.end_fill();
    
    // decoration, left side
    t.setheading(0);
    t.goto(x - (bottom_len / 2) + (width * 0.02), y + non_circle_len + len_square_bottom);
    t.right(90);
    t.fillcolor('#8B1E24');
    t.begin_fill();
    t.forward(bottom_one_height - bottom_r2 + len_square_bottom - (width * 0.01));
    t.circle(bottom_r2 - (width * 0.02), 90);
    let [tmp_x1, tmp_y1] = t.pos();
    t.circle(bottom_r2 - (width * 0.02), 90);
    t.forward(bottom_one_height - bottom_r2 + len_square_bottom - (width * 0.01));
    t.end_fill();
    
    t.setheading(0);
    t.goto(tmp_x1, tmp_y1 + width * 0.03 / 2);
    let val_for_cir = tmp_cir_x1 - (x - (bottom_len / 2) + (width * 0.02)) - width * 0.03;
    t.fillcolor('#8B1E24');
    t.begin_fill();
    t.circle(val_for_cir / 2);
    t.end_fill();
    
    t.goto(tmp_x1, tmp_y1 + width * 0.03);
    t.setheading(0);
    let num_peaces_dec = 20;
    for (let i = 0; i < num_peaces_dec; i++) {
        t.circle(val_for_cir / 2 - width * 0.03 / 2, 360 / num_peaces_dec / 2);
        t.dot(width * 0.012, '#FFFFFF');
        t.circle(val_for_cir / 2 - width * 0.03 / 2, 360 / num_peaces_dec / 2);
    }
    
    t.goto(tmp_x1, tmp_y1 + width * 0.105);
    t.setheading(0);
    t.fillcolor('#FBC02D');
    t.begin_fill();
    t.circle(val_for_cir / 2 - width * 0.09);
    t.end_fill();
    
    // decoration, right side
    t.setheading(0);
    t.goto(x + (bottom_len / 2) - (width * 0.02), y + non_circle_len + len_square_bottom);
    t.right(90);
    t.fillcolor('#8B1E24');
    t.begin_fill();
    t.forward(bottom_one_height - bottom_r2 + len_square_bottom - (width * 0.01));
    t.circle(-(bottom_r2 - (width * 0.02)), 90);
    let [tmp_x1_r, tmp_y1_r] = t.pos();
    t.circle(-(bottom_r2 - (width * 0.02)), 90);
    t.forward(bottom_one_height - bottom_r2 + len_square_bottom - (width * 0.01));
    t.end_fill();
    
    t.setheading(0);
    t.goto(tmp_x1_r, tmp_y1_r + width * 0.03 / 2);
    t.fillcolor('#8B1E24');
    t.begin_fill();
    t.circle(val_for_cir / 2);
    t.end_fill();
    
    t.goto(tmp_x1_r, tmp_y1_r + width * 0.03);
    t.setheading(0);
    for (let i = 0; i < num_peaces_dec; i++) {
        t.circle(val_for_cir / 2 - width * 0.03 / 2, 360 / num_peaces_dec / 2);
        t.dot(width * 0.012, '#FFFFFF');
        t.circle(val_for_cir / 2 - width * 0.03 / 2, 360 / num_peaces_dec / 2);
    }
    
    t.goto(tmp_x1_r, tmp_y1_r + width * 0.105);
    t.setheading(0);
    t.fillcolor('#FBC02D');
    t.begin_fill();
    t.circle(val_for_cir / 2 - width * 0.09);
    t.end_fill();
    
    // Side red rectangular plates (updated from white/silver)
    draw_square(x, y + non_circle_len + (len_square_bottom / 2), bottom_len, len_square_bottom / 2, 0, '#8B1E24', true, 0);
    draw_square(x, y + non_circle_len + (len_square_bottom / 2) + (width * 0.01), bottom_len - (width * 0.036 * 1), len_square_bottom / 2 - (width * 0.01), 0, '#960018', true, 0);
    draw_square(x, y + non_circle_len + (len_square_bottom / 2) + (width * 0.01 * 2), bottom_len - (width * 0.036 * 2), len_square_bottom / 2 - (width * 0.01 * 2), 0, '#B22222', true, 0);
    draw_square(x, y + non_circle_len + (len_square_bottom / 2) + (width * 0.01 * 3), bottom_len - (width * 0.036 * 3), len_square_bottom / 2 - (width * 0.01 * 3), 0, '#D32F2F', true, 0);
    
    // Draw the shape at the bottom, which looks like a thaadi
    let r = bottom_len / 2;
    t.penup();
    t.setheading(0);
    t.goto(x, y);
    t.fillcolor('#8B1E24');
    t.right(180);
    t.circle(-r, bottom_band_ang / 2);
    t.begin_fill();
    t.right(180);
    t.circle(r, bottom_band_ang);
    let [tmp_x2_th, tmp_y2_th] = t.pos();
    let cur_head = t.heading();
    t.setheading(90);
    t.forward(bottom_band_height);
    t.setheading(cur_head + 180);
    let [tmp_x1_th, tmp_y1_th] = t.pos();
    let chead_th = t.heading();
    t.circle(-r, bottom_band_ang);
    t.setheading(270);
    t.forward(bottom_band_height);
    t.end_fill();
    
    // decorations
    t.goto(tmp_x1_th, tmp_y1_th - (width * 0.02));
    t.setheading(chead_th);
    let num_peaces_th = 28;
    for (let i = 0; i < num_peaces_th - 1; i++) {
        t.circle(-r, bottom_band_ang / num_peaces_th);
        t.dot(width * 0.01, '#FFFFFF');
    }
    t.goto(tmp_x2_th, tmp_y2_th + (width * 0.02));
    t.setheading(chead_th);
    for (let i = 0; i < num_peaces_th - 1; i++) {
        t.circle(-r, bottom_band_ang / num_peaces_th);
        t.dot(width * 0.01, '#FFFFFF');
    }
    
    t.goto(tmp_x2_th, tmp_y2_th + (bottom_band_height / 2));
    t.setheading(chead_th);
    let num_flowers_th = 8;
    for (let i = 0; i < num_flowers_th - 1; i++) {
        t.circle(-r, bottom_band_ang / num_flowers_th);
        let [cx, cy] = t.pos();
        let chead_fl = t.heading();
        draw_flower_design(cx, cy, width * 0.024);
        t.goto(cx, cy);
        t.setheading(chead_fl);
    }
    
    // draw the head of theyyam
    t.setheading(0);
    draw_theyyam_face(x, y + bottom_band_height, width * 0.455);
    
    return height;
}

function draw_triangle_ring(rad, band_width = 55, num_peaces = 28) {
    let inner_rad = rad - band_width;
    let ang_step = 360.0 / num_peaces;
    
    let colors_inward = ['#0D5218', '#F57C00', '#EEA003', '#7E0908'];
    let colors_outward = ['#7E0908', '#0D5218', '#F57C00', '#EEA003'];
    if (window.pookalamTheme && window.pookalamTheme.current === 'marigold_theyyam') {
        colors_inward = ['#0D5218', '#8B1E24', '#EEA003', '#7E0908'];
        colors_outward = ['#7E0908', '#0D5218', '#8B1E24', '#EEA003'];
    }
    
    // 1. Background dark green foundation ring
    t.penup();
    t.goto(0, -rad);
    t.setheading(0);
    t.fillcolor('#0D5218');
    t.begin_fill();
    t.circle(rad);
    t.end_fill();
    
    t.goto(0, -inner_rad);
    t.setheading(0);
    t.fillcolor('#F3EBD7');
    t.begin_fill();
    t.circle(inner_rad);
    t.end_fill();
    
    // 2. Inward-pointing triangles
    for (let i = 0; i < num_peaces; i++) {
        let a1 = (i * ang_step * Math.PI) / 180;
        let a2 = ((i + 1) * ang_step * Math.PI) / 180;
        let am = ((i + 0.5) * ang_step * Math.PI) / 180;
        
        let p1 = [rad * Math.cos(a1), rad * Math.sin(a1)];
        let p2 = [rad * Math.cos(a2), rad * Math.sin(a2)];
        let p_tip = [inner_rad * Math.cos(am), inner_rad * Math.sin(am)];
        
        t.penup();
        t.goto(p1[0], p1[1]);
        t.color('#FFFFFF');
        t.pensize(2);
        t.fillcolor(colors_inward[i % colors_inward.length]);
        t.pendown();
        t.begin_fill();
        t.goto(p2[0], p2[1]);
        t.goto(p_tip[0], p_tip[1]);
        t.goto(p1[0], p1[1]);
        t.end_fill();
        t.penup();
    }
    
    // 3. Outward-pointing triangles
    for (let i = 0; i < num_peaces; i++) {
        let am1 = ((i + 0.5) * ang_step * Math.PI) / 180;
        let am2 = ((i + 1.5) * ang_step * Math.PI) / 180;
        let a_tip = ((i + 1) * ang_step * Math.PI) / 180;
        
        let p1 = [inner_rad * Math.cos(am1), inner_rad * Math.sin(am1)];
        let p2 = [inner_rad * Math.cos(am2), inner_rad * Math.sin(am2)];
        let p_tip = [rad * Math.cos(a_tip), rad * Math.sin(a_tip)];
        
        t.penup();
        t.goto(p1[0], p1[1]);
        t.color('#FFFFFF');
        t.pensize(2);
        t.fillcolor(colors_outward[i % colors_outward.length]);
        t.pendown();
        t.begin_fill();
        t.goto(p2[0], p2[1]);
        t.goto(p_tip[0], p_tip[1]);
        t.goto(p1[0], p1[1]);
        t.end_fill();
        t.penup();
    }
    
    // 4. Concentric white boundary rings
    t.color('#FFFFFF');
    t.pensize(2.5);
    t.goto(0, -rad);
    t.setheading(0);
    t.pendown();
    t.circle(rad);
    t.penup();
    
    t.goto(0, -inner_rad);
    t.setheading(0);
    t.pendown();
    t.circle(inner_rad);
    t.penup();
    t.color('#000000');
    t.pensize(1);
    
    return band_width;
}

function draw_designed_scallop(t, sc_cx, sc_cy, theta, rad_len) {
    const prev_stroke = t.strokeColor;
    const prev_fill = t.fillColor;
    const prev_pensize = t.lineWidth;

    // 1. Draw outer dark red FULL circle
    t.penup();
    t.goto(sc_cx, sc_cy - rad_len);
    t.setheading(0);
    t.fillcolor('#8B1E24');
    t.begin_fill();
    t.circle(rad_len);
    t.end_fill();

    // 2. Draw middle orange full circle
    t.penup();
    t.goto(sc_cx, sc_cy - (rad_len - 3.5));
    t.setheading(0);
    t.fillcolor(window.pookalamTheme && window.pookalamTheme.current === 'marigold_theyyam' ? '#0D5218' : '#F57C00');
    t.begin_fill();
    t.circle(rad_len - 3.5);
    t.end_fill();

    // 3. Draw inner yellow full circle
    t.penup();
    t.goto(sc_cx, sc_cy - (rad_len - 7));
    t.setheading(0);
    t.fillcolor('#EEA003');
    t.begin_fill();
    t.circle(rad_len - 7);
    t.end_fill();

    // Half-flower fan: 7 petals spread 170° outward from yellow core
    const inner_r = rad_len - 7;
    const num_petals = 7;
    const petal_spread = 170; // degrees — fills the semicircle
    const petal_length = inner_r * 0.72;
    const petal_tip_r = petal_length * 0.18;
    
    // Base of the fan — center of the scallop circle
    const fan_base_x = sc_cx;
    const fan_base_y = sc_cy;
    const fp_base = t.toCanvasCoords(fan_base_x, fan_base_y);
    
    t.ctx.fillStyle = '#FFFFFF';
    for (let p = 0; p < num_petals; p++) {
        const petal_offset_deg = -petal_spread / 2 + (p / (num_petals - 1)) * petal_spread;
        const petal_dir = (theta + petal_offset_deg) * Math.PI / 180;
        
        // Tip of petal
        const tip_x = fan_base_x + petal_length * Math.cos(petal_dir);
        const tip_y = fan_base_y + petal_length * Math.sin(petal_dir);
        const fp_tip = t.toCanvasCoords(tip_x, tip_y);
        
        // Draw circular head at tip
        t.ctx.beginPath();
        t.ctx.arc(fp_tip.x, fp_tip.y, petal_tip_r, 0, 2 * Math.PI);
        t.ctx.fill();
        
        // Tapered stem from base to head
        const perp_dx = -Math.sin(petal_dir) * petal_tip_r * 0.5;
        const perp_dy =  Math.cos(petal_dir) * petal_tip_r * 0.5;
        const sl = t.toCanvasCoords(tip_x + perp_dx, tip_y + perp_dy);
        const sr = t.toCanvasCoords(tip_x - perp_dx, tip_y - perp_dy);
        
        t.ctx.beginPath();
        t.ctx.moveTo(fp_base.x, fp_base.y);
        t.ctx.lineTo(sl.x, sl.y);
        t.ctx.lineTo(sr.x, sr.y);
        t.ctx.closePath();
        t.ctx.fill();
    }
    
    // Yellow core at center
    t.ctx.beginPath();
    t.ctx.arc(fp_base.x, fp_base.y, inner_r * 0.16, 0, 2 * Math.PI);
    t.ctx.fillStyle = '#EEA003';
    t.ctx.fill();

    t.color(prev_stroke, prev_fill);
    t.pensize(prev_pensize);
}

function draw_circular(rad, rad_len, sub_circle_count = 3, colors = ['red', 'green', 'blue'], num_peaces = 20, pen_down = true) {
    let [x, y] = t.pos();
    t.penup();
    
    // Total width of this block is 66 pixels.
    // Inner boundary of this block starts at radius 234.
    let vis_len = 66; 
    let ruler_ang = 360 / num_peaces;
    
    // 1. Draw the outermost scallops (radius 300 down to 270)
    for (let j = 0; j < Math.floor(num_peaces); j++) {
        const [tx, ty] = t.pos();
        const th = t.heading();
        
        const th_rad = ((th + 90) * Math.PI) / 180;
        const sc_cx = tx + rad_len * Math.cos(th_rad);
        const sc_cy = ty + rad_len * Math.sin(th_rad);
        
        const theta = Math.atan2(sc_cy, sc_cx) * 180 / Math.PI;
        
        draw_designed_scallop(t, sc_cx, sc_cy, theta, rad_len);
        
        t.penup();
        t.goto(tx, ty);
        t.setheading(th);
        t.circle(rad, ruler_ang);
    }
    
    // 2. Draw the dark red ring with white dots (radius 272.5 to 264 to cover the flat-to-curve gap)
    t.penup();
    reset_position(x, y + rad_len - 2.5); // radius 272.5
    t.fillcolor('#8B1E24');
    t.begin_fill();
    t.circle(rad - rad_len + 2.5);
    t.end_fill();
    
    // Draw white dots on this red ring
    // Placed at radius 267
    const red_ring_dot_r = 267;
    const num_red_ring_dots = 96;
    for (let i = 0; i < num_red_ring_dots; i++) {
        const angle_rad = (i * (360 / num_red_ring_dots) * Math.PI) / 180;
        const dx = red_ring_dot_r * Math.cos(angle_rad);
        const dy = red_ring_dot_r * Math.sin(angle_rad);
        t.goto(dx, dy);
        t.dot(3, '#FFFFFF');
    }
    
    // 3. Draw the green ring with white semicircular fans (radius 264 to 244)
    t.penup();
    reset_position(x, y + rad_len + 6); // radius 264
    t.fillcolor('#0D5218');
    t.begin_fill();
    t.circle(rad - rad_len - 6);
    t.end_fill();
    
    // Draw alternating white semicircles (from bottom inner boundary) and dark red triangles (from top outer boundary) along the green ring
    const num_patterns = 56;
    const r_inner = 244;
    const r_outer = 264;
    const semi_radius = 10; // Reduced size for tighter fit
    const tri_length = 12;  // Kept triangle size exactly the same
    const tri_base_half_angle = 2.0 * Math.PI / 180;
    
    for (let i = 0; i < num_patterns; i++) {
        const angle = i * (360 / num_patterns);
        const angle_rad = (angle * Math.PI) / 180;
        
        if (i % 2 === 0) {
            // Half-flower fan from inner boundary pointing outwards
            // Base of flower sits on r_inner, fan spreads outward
            const base_x = r_inner * Math.cos(angle_rad);
            const base_y = r_inner * Math.sin(angle_rad);
            const p_base = t.toCanvasCoords(base_x, base_y);
            
            const num_petals = 7;
            const petal_spread = 170; // spread across full semicircle
            const petal_length = semi_radius * 0.95; // shorter for a smaller fan
            
            t.ctx.fillStyle = '#FFFFFF';
            for (let p = 0; p < num_petals; p++) {
                // Fan spread: evenly distribute petals across the semicircle outward
                const petal_angle_offset = (-petal_spread / 2 + (p / (num_petals - 1)) * petal_spread) * (Math.PI / 180);
                const petal_dir = angle_rad + petal_angle_offset;
                
                // Tip of petal
                const tip_x = base_x + petal_length * Math.cos(petal_dir);
                const tip_y = base_y + petal_length * Math.sin(petal_dir);
                const p_tip = t.toCanvasCoords(tip_x, tip_y);
                
                // Draw teardrop petal: circle at tip + narrow triangle to base
                const petal_tip_r = petal_length * 0.18;
                t.ctx.beginPath();
                t.ctx.arc(p_tip.x, p_tip.y, petal_tip_r, 0, 2 * Math.PI);
                t.ctx.fill();
                
                // Stem of petal
                const perp_dx = -Math.sin(petal_dir) * petal_tip_r * 0.5;
                const perp_dy = Math.cos(petal_dir) * petal_tip_r * 0.5;
                const stem_lp = t.toCanvasCoords(tip_x + perp_dx, tip_y + perp_dy);
                const stem_rp = t.toCanvasCoords(tip_x - perp_dx, tip_y - perp_dy);
                
                t.ctx.beginPath();
                t.ctx.moveTo(p_base.x, p_base.y);
                t.ctx.lineTo(stem_lp.x, stem_lp.y);
                t.ctx.lineTo(stem_rp.x, stem_rp.y);
                t.ctx.closePath();
                t.ctx.fill();
            }
            
            // Yellow core circle at the base
            t.ctx.beginPath();
            t.ctx.arc(p_base.x, p_base.y, semi_radius * 0.28, 0, 2 * Math.PI);
            t.ctx.fillStyle = '#EEA003';
            t.ctx.fill();
        } else {
            // Triangle from top (outer boundary) pointing inwards (colored dark red)
            const tx1 = r_outer * Math.cos(angle_rad - tri_base_half_angle);
            const ty1 = r_outer * Math.sin(angle_rad - tri_base_half_angle);
            const p1 = t.toCanvasCoords(tx1, ty1);
            
            const tx2 = r_outer * Math.cos(angle_rad + tri_base_half_angle);
            const ty2 = r_outer * Math.sin(angle_rad + tri_base_half_angle);
            const p2 = t.toCanvasCoords(tx2, ty2);
            
            const tx3 = (r_outer - tri_length) * Math.cos(angle_rad);
            const ty3 = (r_outer - tri_length) * Math.sin(angle_rad);
            const p3 = t.toCanvasCoords(tx3, ty3);
            
            t.ctx.beginPath();
            t.ctx.moveTo(p1.x, p1.y);
            t.ctx.lineTo(p2.x, p2.y);
            t.ctx.lineTo(p3.x, p3.y);
            t.ctx.closePath();
            t.ctx.fillStyle = '#8B1E24';
            t.ctx.fill();
            
            // Draw a small orangish yellow circle inside the triangle (near its center)
            const dot_r_dist = r_outer - 4.8;
            const dc_x = dot_r_dist * Math.cos(angle_rad);
            const dc_y = dot_r_dist * Math.sin(angle_rad);
            const d_cp = t.toCanvasCoords(dc_x, dc_y);
            
            t.ctx.beginPath();
            t.ctx.arc(d_cp.x, d_cp.y, 2.2, 0, 2 * Math.PI);
            t.ctx.fillStyle = '#EEA003';
            t.ctx.fill();
        }
    }
    
    // 4. Draw the dark red ring (radius 244 to 240)
    t.penup();
    reset_position(x, y + rad_len + 6 + 20); // radius 244
    t.fillcolor('#8B1E24');
    t.begin_fill();
    t.circle(rad - rad_len - 6 - 20);
    t.end_fill();
    
    // 5. Draw the yellow ring with red/green dots (radius 240 to 234)
    t.penup();
    reset_position(x, y + rad_len + 6 + 20 + 4); // radius 240
    t.fillcolor('#EEA003');
    t.begin_fill();
    t.circle(rad - rad_len - 6 - 20 - 4);
    t.end_fill();
    
    // Draw dots on yellow ring (alternating red and green)
    const yellow_ring_dot_r = 237;
    const num_yellow_ring_dots = 120;
    for (let i = 0; i < num_yellow_ring_dots; i++) {
        const angle_rad = (i * (360 / num_yellow_ring_dots) * Math.PI) / 180;
        const dx = yellow_ring_dot_r * Math.cos(angle_rad);
        const dy = yellow_ring_dot_r * Math.sin(angle_rad);
        t.goto(dx, dy);
        const dot_color = i % 2 === 0 ? '#8B1E24' : '#0D5218';
        t.dot(3, dot_color);
    }
    
    return vis_len;
}

function reset_position(x = 0, y = 0) {
    t.setheading(0);
    t.goto(x, y);
}

function drawPupils(mx, my, customCtx) {
    const canvas = document.getElementById('pookalamCanvas');
    const ctx = customCtx || canvas.getContext('2d');
    
    // If drawing without a custom context, we follow original behavior of clearing/drawing staticCanvas
    if (!customCtx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(staticCanvas, 0, 0);
    }
    
    // Safety check: prevent calling drawPupils before window.eyeData is initialized
    if (!window.eyeData || !window.eyeData.leftPupilCenter) return;
    
    const eyes = [
        { center: window.eyeData.leftPupilCenter },
        { center: window.eyeData.rightPupilCenter }
    ];
    
    // Increase maximum shift to 1.1x pupilRadius for highly visible tracking
    const maxShift = window.eyeData.pupilRadius * 1.1; 
    
    for (let eye of eyes) {
        if (!eye.center) continue;
        
        let shiftX = 0;
        let shiftY = 0;
        
        if (mx !== undefined && my !== undefined) {
            let dx = mx - eye.center.x;
            let dy = my - eye.center.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 0) {
                // Increased sensitivity to make eye tracking very noticeable
                let shiftDist = Math.min(dist * 0.12, maxShift);
                shiftX = (dx / dist) * shiftDist;
                shiftY = (dy / dist) * shiftDist;
            }
        }
        
        const px = eye.center.x + shiftX;
        const py = eye.center.y + shiftY;
        
        // Draw pupil (deep kohl black)
        ctx.beginPath();
        ctx.arc(px, py, window.eyeData.pupilRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#1A1A1A';
        ctx.fill();
        
        // Draw highlight (white dot)
        const hx = px;
        const hy = py + window.eyeData.highlightOffset;
        
        ctx.beginPath();
        ctx.arc(hx, hy, window.eyeData.highlightRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
    }
}

window.initPookalam = function() {
    // Main drawing entry point - Created by Ebin Reji
    const canvas = document.getElementById('pookalamCanvas');
    canvas.width = 750;
    canvas.height = 750;
    
    // Declare layer canvases so they are in closure scope for drawing and rendering
    const baseCanvas = document.createElement('canvas');
    baseCanvas.width = 750;
    baseCanvas.height = 750;

    const triangleCanvas = document.createElement('canvas');
    triangleCanvas.width = 750;
    triangleCanvas.height = 750;

    const outerCanvas = document.createElement('canvas');
    outerCanvas.width = 750;
    outerCanvas.height = 750;

    window.drawPookalamLayers = function() {
        // Create static offscreen canvas to pre-render the static pookalam elements
        staticCanvas = document.createElement('canvas');
        staticCanvas.width = 750;
        staticCanvas.height = 750;
        
        // Initialize our turtle targeting the static canvas
        window.t = new CanvasTurtle(staticCanvas);
        
        // Set line join and cap styles for smooth drawing
        t.ctx.lineCap = 'round';
        t.ctx.lineJoin = 'round';
        
        const rad = 300;
        t.penup();
        reset_position(0, -rad);
        const [x, y] = t.pos();
        
        // 1. Outermost Scallop Ring — exactly matching Python original
        const circular_width = 30;
        const cut_threshold = 1.3;
        const colors2 = ['#8B1E24', '#F57C00', '#FBC02D', '#FFFFFF'];
        
        const occ_circular = draw_circular(
            rad,
            circular_width,
            4,
            colors2,
            Math.floor((rad * Math.PI * 2) / (circular_width * cut_threshold)),
            false
        );
        
        reset_position(0, y + occ_circular);
        
        const padding_circle = 5;
        t.fillcolor('#0D5218');
        t.begin_fill();
        t.circle(rad - occ_circular + 2.5);
        t.end_fill();
        
        // Draw outer white outline at the border edge
        reset_position(0, -(rad - occ_circular + 2.5));
        t.color('#FFFFFF');
        t.pensize(2.5);
        t.pendown();
        t.circle(rad - occ_circular + 2.5);
        t.penup();
        
        const new_rad = rad - occ_circular - padding_circle;
        
        // 2. Second Outer Layer: Series of Interlocking Triangles
        const triangle_band_width = 44;
        const num_triangles = 28;
        const occ_triangle = draw_triangle_ring(new_rad, triangle_band_width, num_triangles);
        
        const inner_rad = new_rad - occ_triangle;
        
        // Draw the green border circle between the triangles and the Theyyam area
        reset_position(0, -inner_rad);
        t.fillcolor('#0D5218');
        t.begin_fill();
        t.circle(inner_rad);
        t.end_fill();
        
        const face_padding = 5;
        const inner_rad_face = inner_rad - face_padding;
        
        reset_position(0, -inner_rad_face);
        t.fillcolor('#F3EBD7');
        t.begin_fill();
        t.circle(inner_rad_face);
        t.end_fill();
        
        // Draw inner white outline at the border edge
        reset_position(0, -inner_rad_face);
        t.color('#FFFFFF');
        t.pensize(2.5);
        t.pendown();
        t.circle(inner_rad_face);
        t.penup();
        
        const num_spokes = 15;
        const angle_step = 360 / (num_spokes * 2);
        const spoke_colors = ['#F3EBD7', '#DDD4B6'];
        for (let i = 0; i < num_spokes * 2; i++) {
            const clr = spoke_colors[i % spoke_colors.length];
            t.penup();
            t.goto(0, -inner_rad_face);
            t.setheading(0);
            t.circle(inner_rad_face, i * angle_step);
            const [cx1, cy1] = t.pos();
            t.fillcolor(clr);
            t.begin_fill();
            t.circle(inner_rad_face, angle_step);
            t.goto(0, 0);
            t.goto(cx1, cy1);
            t.end_fill();
        }
        
        // Scale theyyam to fit the inner circle (radius 180) perfectly as a half circle
        const theyyamWidth = inner_rad_face * 2.0;
        const theyyamHeight = (theyyamWidth * 0.20) + (theyyamWidth * 0.137) + (theyyamWidth * 0.5);
        const theyyamYOffset = (theyyamWidth * 0.5) - (theyyamHeight / 2);
        draw_theyyam(0, theyyamYOffset, theyyamWidth);
        
        // Clear and draw base offscreen canvas
        const ctxBase = baseCanvas.getContext('2d');
        ctxBase.clearRect(0, 0, 750, 750);
        ctxBase.drawImage(staticCanvas, 0, 0);

        // Clear the triangle ring region on baseCanvas (radius 184 to 230)
        ctxBase.globalCompositeOperation = 'destination-out';
        ctxBase.beginPath();
        ctxBase.arc(375, 375, 230, 0, 2 * Math.PI);
        ctxBase.arc(375, 375, 184, 0, 2 * Math.PI, true);
        ctxBase.fill();

        // Clear the outer scallop ring region on baseCanvas (radius 233 to 305)
        ctxBase.beginPath();
        ctxBase.arc(375, 375, 305, 0, 2 * Math.PI);
        ctxBase.arc(375, 375, 233, 0, 2 * Math.PI, true);
        ctxBase.fill();

        // Reset composite operation
        ctxBase.globalCompositeOperation = 'source-over';

        // Clear and draw triangle offscreen canvas (radius 183 to 231)
        const ctxTri = triangleCanvas.getContext('2d');
        ctxTri.clearRect(0, 0, 750, 750);
        ctxTri.save();
        ctxTri.beginPath();
        ctxTri.arc(375, 375, 231, 0, 2 * Math.PI);
        ctxTri.arc(375, 375, 183, 0, 2 * Math.PI, true);
        ctxTri.clip('evenodd');
        ctxTri.drawImage(staticCanvas, 0, 0);
        ctxTri.restore();

        // Clear and draw outer offscreen canvas (radius 233 to 305)
        const ctxOuter = outerCanvas.getContext('2d');
        ctxOuter.clearRect(0, 0, 750, 750);
        ctxOuter.save();
        ctxOuter.beginPath();
        ctxOuter.arc(375, 375, 305, 0, 2 * Math.PI);
        ctxOuter.arc(375, 375, 233, 0, 2 * Math.PI, true);
        ctxOuter.clip('evenodd');
        ctxOuter.drawImage(staticCanvas, 0, 0);
        ctxOuter.restore();
    };

    // Draw initially
    window.drawPookalamLayers();

    // Rotation angles
    let triangleAngle = 0;
    let outerAngle = 0;
    let isHovered = canvas.matches(':hover');

    // Slow-paced speeds (one clockwise, one anticlockwise)
    const triangleSpeed = -0.0015; // anticlockwise, slow
    const outerSpeed = 0.0015;      // clockwise, slow

    let mouseX = undefined;
    let mouseY = undefined;

    // Track mouse movement globally for eye tracking
    window.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * canvas.width;
        mouseY = ((e.clientY - rect.top) / rect.height) * canvas.height;
    });

    // Detect hover state on the canvas container to pause/resume rotations
    canvas.addEventListener('mouseenter', function() {
        isHovered = true;
    });

    canvas.addEventListener('mouseleave', function() {
        isHovered = false;
    });

    // Render loop
    const mainCtx = canvas.getContext('2d');
    function render() {
        if (!isHovered) {
            triangleAngle += triangleSpeed;
            outerAngle += outerSpeed;
        }

        // Clear main canvas
        mainCtx.clearRect(0, 0, canvas.width, canvas.height);

        // 1. Draw static base layer
        mainCtx.drawImage(baseCanvas, 0, 0);

        // 2. Draw rotated triangle layer
        mainCtx.save();
        mainCtx.translate(375, 375);
        mainCtx.rotate(triangleAngle);
        mainCtx.translate(-375, -375);
        mainCtx.drawImage(triangleCanvas, 0, 0);
        mainCtx.restore();

        // 3. Draw rotated outer layer
        mainCtx.save();
        mainCtx.translate(375, 375);
        mainCtx.rotate(outerAngle);
        mainCtx.translate(-375, -375);
        mainCtx.drawImage(outerCanvas, 0, 0);
        mainCtx.restore();

        // 4. Draw pupils interactive layers on top
        drawPupils(mouseX, mouseY, mainCtx);

        requestAnimationFrame(render);
    }

    // Start the animation render loop
    render();

    // Notify the preloader that everything is rendered and the loop has started
    if (typeof window.onPookalamReady === 'function') {
        window.onPookalamReady();
    }
};
window.initPookalam();
