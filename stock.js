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
            var obj = {id: id};
            switch (id.substring(0, 2)) {
            case 'sh':
            case 'sz':
                obj.name    = col[0];
                obj.open    = col[1]; // 今开
                obj.close   = col[2]; // 昨收
                obj.current = col[3];
                break;
            case 'hk':
                obj.name    = col[1];
                obj.open    = col[2];
                obj.close   = col[3];
                obj.current = col[6];
                break;
            case 'gb':
                obj.name    = col[0];
                obj.open    = col[5];
                obj.close   = col[26];
                obj.current = col[1];
                break;
            }
            obj.rate = Math.round((obj.current - obj.close) / obj.close * 10000) / 100
            cb(bar, obj);
        });
    });
}

module.exports = {
    get
}