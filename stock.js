const https = require('https');
const iconv = require('iconv-lite');

function get(id, bar, cb) {
    https.get(`https://qt.gtimg.cn/q=${id}`, function(ret) {
        if (ret.statusCode != 200) {
            return;
        }
        var content = '';
        ret.on('data', function(data) {
            content += iconv.decode(data, 'gb2312');
        });
        ret.on('end', function() {
            var row = content.split(";\n")[0];
            var data = row.split('=')[1];
            var params = data.replace('"', '').split('~');
            var obj = {
                id: id,
                name:    params[1],
                open:    params[5], // 今开
                close:   params[4], // 昨收
                current: params[3],
            };
            obj.rate = Math.round((obj.current - obj.close) / obj.close * 10000) / 100
            cb(bar, obj);
        });
    });
}

module.exports = {
    get
}