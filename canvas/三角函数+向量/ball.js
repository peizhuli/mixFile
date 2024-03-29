class Ball {
    constructor(props) {
        this.x = 0;
        this.y = 0;
        this.r = 20;
        this.scaleX = 1;
        this.scaleY = 1;
        this.fillStyle= 'rgb(57, 119, 224)';
        this.strokeStyle = 'rgba(0, 0, 0, 0)';
        this.alpha = 1;
        Object.assign(this, props);
        return this;
    }

    render(ctx) {
        let {x, y, r, scaleX, scaleY, fillStyle, strokeStyle, alpha} = this;
        ctx.save();
        ctx.translate(x, y);    // 定义画布起始点
        ctx.scale(scaleX, scaleY);
        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = fillStyle;
        ctx.globalAppha = alpha;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        return this;
    }
}