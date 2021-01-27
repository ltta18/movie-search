import React from 'react'

// Draw user score as donutcharts (draw arcs to create pie chart + 1 smaller pie chart
// to make a hole inside) 

class PieChart {
    constructor (options) {
        this.options = options;
        this.canvas = options.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.vote_average = options.vote_average;
        this.colors = options.colors;
        this.height = "38";
        this.width = "38";
        this.changeHeight = this.changeHeight.bind(this);
        this.changeWidth = this.changeWidth.bind(this);
    }

    changeHeight(newHeight) {
        this.height = newHeight;
    }

    changeWidth(newWidth) {
        this.width = newWidth;
    }


    //draw piechart, donut chart + fill texts inside chart
    drawArc(ctx, color, centerX, centerY, radius, start_angle, end_angle) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(centerX+0.5,centerY);
        ctx.arc(centerX+0.5, centerY,radius, start_angle, end_angle);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }

    fillText(ctx, centerX, centerY) {
        
        ctx.font = 'bolder 0.7em Lato';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (this.vote_average === 0) {
            ctx.fillText("N/A", centerX, centerY);
        } else {
        ctx.fillText(this.vote_average, centerX-1, centerY+1);
        ctx.textBaseline = 'bottom';
        ctx.textAlign = 'left';
        ctx.font = '0.4em Lato';
        ctx.fillText("%",centerX+5, centerY+2);
        }
    }

    drawPieChart() {
        var start_angle = (3/2)*Math.PI;
        var end_angle = (3/2)*Math.PI + 2*Math.PI*this.vote_average/100;

        this.drawArc(
            this.ctx,
            "#000",
            this.width/2,
            this.height/2,
            Math.min(this.width/2,this.height/2)-1.25,
            0,
            2 * Math.PI
        );

        //user score N/A -> piechart has only 1 grey arc
        //else: draw donutchart
        if (this.vote_average === 0) {
            this.drawArc(
                this.ctx,
                "#666666",
                this.width/2,
                this.height/2,
                Math.min(this.width/2,this.height/2)-4,
                0,
                2 * Math.PI
            );
        } else {
            for (var i of Array(2).keys()) {
                this.drawArc(this.ctx, 
                    this.colors[i],
                    this.width/2, 
                    this.height/2, 
                    Math.min(this.width/2,this.height/2)-4, 
                    start_angle, 
                    end_angle,
                    this.vote_average);
                var temp = start_angle;
                start_angle = end_angle;
                end_angle = temp;
            }
        }
        
        this.drawArc(
            this.ctx,
            "#000",
            this.width/2,
            this.height/2,
            this.options.doughnutHoleSize * Math.min(this.width/2,this.height/2),
            0,
            2 * Math.PI
        );

        this.fillText(this.ctx,
            this.width/2,
            this.height/2);
    }
}


class UserScore extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    //only execute this function when all components are rendered
    //since JS is asynchronize -> have errors when calling this function without the existence of the canvas
    componentDidMount() {
        var colors;
        var vote_average = this.props.vote_average*10;

        if (vote_average < 50) {
            colors = ['#db2360', '#571435']; //red
        } else if (vote_average < 75) {
            colors = ['#d2d531', '#423d0f']; //yellow
        } else {
            colors = ['#21d07a', '#204529']; //green
        }

        var myCanvas = this.myRef.current;
        if (myCanvas) {

            // each device has different pixel ratio so the canvas might be blurry
            // need to resize the canvas based on the devicePixelRatio
            var size = '40';
            myCanvas.style.width = size + "px";
            myCanvas.style.height = size + "px";
            var dpi = window.devicePixelRatio;
            myCanvas.height = size * dpi;
            myCanvas.width = size * dpi;

            var ctx = myCanvas.getContext("2d");
            ctx.scale(dpi, dpi);
            
            var myDonutChart = new PieChart({
                canvas: myCanvas,
                colors: colors,
                doughnutHoleSize: 0.6,
                vote_average: vote_average
            })
            myDonutChart.drawPieChart()
        }
    }

    render() {
        return (
            <div>
                <canvas id={`canvas-${this.props.id}`} ref={this.myRef} ></canvas>
                {this.componentDidMount()}
                
            </div>
        )
    }
}

export default UserScore;
