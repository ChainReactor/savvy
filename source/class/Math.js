(function () {
	core.Class("savvy.Vector", {
		construct: function (x,y) {
			this.x = x || 0;
			this.y = y || 0;
		},
		members: {
			ZERO: function () {
				return new savvy.Vector();
			},
			makeZero: function () {
				this.x = 0;
				this.y = 0;
				return this;
			},
			translate: function (x,y) {
				this.x += x;
				this.y += y;
				return this;
			},
			rotate: function (c, s) {
				var x = this.x, y = this.y;
				this.x = x*c - y*s;
				this.y = x*s + y*c;
				return this;
			},
			rotateRadians: function (rad) {
				return this.rotate(Math.cos(rad), Math.sin(rad));
			},
			rotateDegrees: function (deg) {
				return this.rotateRadians(deg * Math.PI / 180);
			},
			scale: function (x, y) {
				this.x *= x;
				this.y *= y;
				return this;
			}
		}
	});

	core.Class("savvy.M3x2", {
		construct: function () {
			this.a_x = 1; this.b_x = 0; this.c_x = 0;
			this.a_y = 0; this.b_y = 1; this.c_y = 0;
		},
		members: {
			IDENTITY: function () {
				return new savvy.M3x2();
			},
			makeIdentity: function () {
				this.a_x = 1; this.b_x = 0; this.c_x = 0;
				this.a_y = 0; this.b_y = 1; this.c_y = 0;
				return this;
			},
			translate: function (x, y) {
				this.c_x += this.a_x * x + this.b_x * y;
				this.c_y += this.a_y * x + this.b_y * y;
				return this;
			},
			rotate: function (c, s) {
				var A_a_x = this.a_x, A_a_y = this.a_y;
				var A_b_x = this.b_x, A_b_y = this.b_y;
				var B_a_x = c, B_a_y = s;
				var B_b_x = -s, B_b_y = c;
				this.a_x = A_a_x * B_a_x + A_b_x * B_a_y;
				this.a_y = A_a_y * B_a_x + A_b_y * B_a_y;
				this.b_x = A_a_x * B_b_x + A_b_x * B_b_y;
				this.b_y = A_a_y * B_b_x + A_b_y * B_b_y;
				return this;
			},
			rotateRadians: function (rad) {
				return this.rotate(Math.cos(rad), Math.sin(rad));
			},
			rotateDegrees: function (deg) {
				return this.rotateRadians(deg * Math.PI / 180);
			},
			scale: function (x, y) {
				this.a_x *= x; this.a_y *= x;
				this.b_x *= y; this.b_y *= y;
				return this;
			},
			applyVector: function (v, out) {
				var v_x = v.x, v_y = v.y;
				out.x = this.a_x * v_x + this.b_x * v_y + this.c_x;
				out.y = this.a_y * v_x + this.b_y * v_y + this.c_y;
				return out;
			}
		}
	});
})();