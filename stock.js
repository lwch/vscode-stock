const http = require('http');
const iconv = require('iconv-lite');

function get(id, bar, cb) {
    http.get(`http://hq.sinajs.cn/list=${id}`, function(ret) {
        if (ret.statusCode != 200) {
            return;
        }
        var content = '';
        ret.on('data', function(data) {
            content += iconv.decode(data, 'gb2312');
        });
        ret.on('end', function() {
            var data = content.substring(content.indexOf('="')+2);
            var col = data.split(',');
            var obj = {
                id:      id,
                name:    col[0],
                open:    col[1], // 今开
                close:   col[2], // 昨收
                current: col[3],
                rate:    Math.round((col[3]-col[2]) / col[2] * 10000) / 100
            }
            cb(bar, obj);
        });
    });
}

module.exports = {
    get
}