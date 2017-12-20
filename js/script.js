// Змішуємо jQuery та Node.js код в одному файлі



$(function(){

    // Відображаємо інформацію про комп'ютер, використовуючи node-модуль os.

    var os = require('os');
    var prettyBytes = require('pretty-bytes');

    $('.stats').append('Number of cpu cores: <span>' + os.cpus().length + '</span>');
    $('.stats').append('Free memory: <span>' + prettyBytes(os.freemem())+ '</span>');

    // Бібліотека UI компонентів Electron. Знадобиться пізніше.

    var shell = require('electron').shell;


    // Отримуємо найновіші записи з Tutorialzine.

    var ul = $('.flipster ul');

    // Політика безпеки в Electron не застосовується, тому
    // ми можемо відправляти ajax-запити на інші сайти. Звернемося до Tutorialzine

    $.get('http://feeds.feedburner.com/Tutorialzine', function(response){

        var rss = $(response);

        // Знайдемо всі статті в RSS потоці:

        rss.find('item').each(function(){
            var item = $(this);

            var content = item.find('encoded').html().split('</a></div>')[0]+'</a></div>';
            var urlRegex = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/g;

            // Отримаємо перше зображення зі статті.
            var imageSource = content.match(urlRegex)[1];


            // Створимо li для кажної статті та додамо в неупорядкований список.

            var li = $('<li><img /><a target="_blank"></a></li>');

            li.find('a')
                .attr('href', item.find('link').text())
                .text(item.find("title").text());

            li.find('img').attr('src', imageSource);

            li.appendTo(ul);

        });

        // Ініціалізуємо плагін flipster.

        $('.flipster').flipster({
            style: 'carousel'
        });

        // При натисканні на статтю відкриємо вікно в браузері за замовчуванням.
        // В протилежному випадку відкриємо статтю у вікні Electron.

        $('.flipster').on('click', 'a', function (e) {

            e.preventDefault();

            shell.openExternal(e.target.href);

        });

    });

});
