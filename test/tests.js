
var should = chai.should();
mocha.setup({
    ui: 'bdd',
    globals: ['']
});

window.addEventListener('load', function (e) {
    mocha.run();
});


describe('pagination', function () {
    var html = '';
    before(function (done) {
        file.load('pagination.html', function (err, str) {
            html = str;
            done();
        });
    });

    it('should hide the pagination on single page', function (done) {
        var result = pagination({page:1, links: 5, rows: 5, total: 5});
        should.equal(result, null);
        done();
    });
    it('should hide first and prev buttons on first page', function (done) {
        var result = pagination({page:1, links: 5, rows: 5, total: 15});
        should.not.exist(result[0].first);
        should.not.exist(result[0].prev);
        done();
    });
    it('should hide last and next buttons on last page', function (done) {
        var result = pagination({page:3, links: 5, rows: 5, total: 15});
        should.not.exist(result[result.length-1].last);
        should.not.exist(result[result.length-1].next);
        done();
    });
    it('should add +1 to even links count', function (done) {
        var result = pagination({page:1, links: 4, rows: 5, total: 50});
        count(result).should.equal(5);
        done();
    });
    it('should not show more links than the total page count', function (done) {
        var result = pagination({page:1, links: 20, rows: 5, total: 50});
        count(result).should.equal(10);
        done();
    });
    it('should maintain the page links count', function (done) {
        var result;
        for (var i=1; i < 10; i++) {
            result = pagination({page: i, links: 5, rows: 5, total: 50});
            count(result).should.equal(5);
        }
        done();
    });
    it('should center the active page', function (done) {
        var result;
        for (var i=1; i < 10; i++) {
            result = pagination({page: i, links: 5, rows: 5, total: 50});
            var pos = position(result);
            switch (i) {
                case 1:
                    pos.left.should.equal(0);
                    pos.right.should.equal(4);
                    break;
                case 2:
                    pos.left.should.equal(1);
                    pos.right.should.equal(3);
                    break;
                case 9:
                    pos.left.should.equal(3);
                    pos.right.should.equal(1);
                    break;
                case 10:
                    pos.left.should.equal(4);
                    pos.right.should.equal(0);
                    break;
                default:
                    pos.left.should.equal(2);
                    pos.right.should.equal(2);
                break;
            }
        }
        done();
    });
});

function count (result) {
    var count = 0;
    for (var i=0; i < result.length; i++) {
        if (result[i].page || result[i].active) {
            count++;
        }
    }
    return count;
}

function position (result) {
    var active;
    for (var i=0; i < result.length; i++) {
        if (result[i].active) {
            active = i;
            break;
        }
    }
    var pos = {left: 0, right: 0};
    for (var i=0; i < result.length; i++) {
        if (result[i].page)
            (i < active) ? pos.left++ : pos.right++;
    }
    return pos;
}
