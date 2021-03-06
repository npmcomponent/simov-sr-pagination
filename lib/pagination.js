
(function (name, root, factory) {
    if (typeof exports == 'object') {
        module.exports = factory();
    } else if (typeof define == 'function' && define.amd) {
        define(factory);
    } else {
        root[name] = factory();
    }
}('pagination', this, function () {


/**
 * Returns a pagination object.
 *
 * @param {Object} args
 * @return {Object} pager
 * @api public
 */

return function (args) {
    if (!args || !args.rows || !args.total)
        return new Error('parameters: {page: 1, links: 5, rows: 5, total: 50}');

    var page = args.page || 1,
        total = Math.ceil(parseInt(args.total) / parseInt(args.rows)),
        links = args.links || 5;
    links = links%2 ? links : links+1;
    links = Math.min(links, total);

    // no pagination
    if (page == 1 && page == total) {
        return null;
    }

    var pager = [];

    // left buttons
    if (page > 1) {
        pager.push({first: true, index: 1});
        pager.push({prev: true, index: page-1});
    }

    // page links
    var half = Math.floor(links/2);
    if (page-half <= 0) {
        var start = 1,
            end = links;
    } else if (page+half >= total) {
        var start = total-links+1,
            end = total;
    } else {
        var start = page-half,
            end = start+links-1;
    }
    for (var i=start; i <= end; i++) {
        pager.push(i == page ? {active: true, index: i} : {page: true, index: i});
    }

    // right buttons
    if (page < total) {
        pager.push({next: true, index: page+1});
        pager.push({last: true, index: total});
    }

    return pager;
}


}));
