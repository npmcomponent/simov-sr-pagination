
$(function () {
    var template;
    file.load('pagination.html', function (err, html) {
        template = Hogan.compile(html);

        var result = pagination({page: 1, links: 5, rows: 5, total: 50});

        var content = template.render({pagination: result});

        var container = document.querySelector('#pagination');
        container.innerHTML = content;

        console.log('page %d result%O', 1, result);
    });

    $('#pagination').on('click', 'a', function (e) {
        var page = parseInt($(this).attr('href'));
        var result = pagination({page: page, links: 5, rows: 5, total: 50});
        console.log('page %d result %O', page, result);
        var content = template.render({pagination: result});
        $('#pagination').empty().append(content);
        return false;
    });
});
