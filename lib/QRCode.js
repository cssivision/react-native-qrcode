'use strict';

var React = require('react-native');
var Canvas = require('./Canvas.js');
var qr = require('qr.js');
var {
    Text,
    WebView,
    View
} = React;

function renderCanvas(canvas) {
    var ctx = canvas.getContext('2d');
    var size = this.size;
    var fgColor = this.fgColor;
    var bgColor = this.bgColor;
    canvas.width = size;
    canvas.height = size;
    canvas.style.left = (window.innerWidth - size)/2 + 'px';
    if(window.innerHeight > size) canvas.style.top = (window.innerHeight - size)/2 + 'px';
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, size, size);
    var cells = this.cells;
    var cellWidth = this.size / cells.length;
    var cellHeight = this.size / cells.length;
    cells.forEach(function(row, rowIndex) {
        row.forEach(function(column, columnIndex) {
            ctx.fillStyle = column ? bgColor : fgColor;
            var w = Math.ceil((rowIndex + 1) * cellWidth) - Math.floor(rowIndex * cellWidth);
            var h = Math.ceil((columnIndex + 1) * cellHeight) - Math.floor(columnIndex * cellHeight);
            ctx.fillRect(Math.round(rowIndex * cellWidth), Math.round(columnIndex * cellHeight), w, h);
        });
    });
}

var QRCode = React.createClass({
    PropTypes: {
        value: React.PropTypes.string,
        size: React.PropTypes.number,
        bgColor: React.PropTypes.string,
        fgColor: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            value: 'https://github.com/cssivision',
            fgColor: 'white',
            bgColor: 'black',
        }
    },

    render: function() {
        var size = this.props.size;
        return (
            <View>
                <Canvas
                    context={{
                        size: size,
                        value: this.props.value,
                        bgColor: this.props.bgColor,
                        fgColor: this.props.fgColor,
                        cells: qr(this.props.value).modules,
                    }}
                    render={renderCanvas}
                    style={{height: size + 2, width: size + 2}}
                />
            </View>
        );
    }
});


module.exports = QRCode;