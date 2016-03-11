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
    canvas.style.left = (window.innerWidth - size) / 2 + 'px';
    if(window.innerHeight > size) canvas.style.top = (window.innerHeight - size) / 2 + 'px';
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
            size: 128,
        }
    },

    utf16to8: function(str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            }
        }
        return out;
    },

    render: function() {
        var size = this.props.size;
        var value = this.utf16to8(this.props.value);
        return (
            <View>
                <Canvas
                    context={{
                        size: size,
                        value: this.props.value,
                        bgColor: this.props.bgColor,
                        fgColor: this.props.fgColor,
                        cells: qr(value).modules,
                    }}
                    render={renderCanvas}
                    style={{height: size, width: size}}
                />
            </View>
        );
    }
});


module.exports = QRCode;