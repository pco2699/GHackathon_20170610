$(function () {
    //ウインドウサイズをいい感じに合わせる
    $(window).on('load resize', function () {
        var h = $(window).height();
        var w = $(window).width();
    });


    $('.start_bt').on('click', function () {
        $('.janken').fadeIn(1000);
    });



    $(".gu_btn").on("click", function () {
        var humanGu = 1;
        var com = Math.floor(Math.random() * 3 + 1);

        if (com == 1) {
            $("#pc").text("グー")
            $("#result").text("あいこです")
        } else if (com == 2) {
            $("#pc").text("チョキ")
            $("#result").text("勝ちです")
        } else if (com == 3) {
            $("#pc").text("パー")
            $("#result").text("負けです")
        }
    });

    $("#cho_btn").on("click", function () {
        var humaCho = 2;
        var com = Math.floor(Math.random() * 3 + 1);

        if (com == 1) {
            $("#pc").text("グー")
            $("#result").text("負けです")
        } else if (com == 2) {
            $("#pc").text("チョキ")
            $("#result").text("あいこです")
        } else if (com == 3) {
            $("#pc").text("パー")
            $("#result").text("あいこです")
        }
    });
    $("#par_btn").on("click", function () {
        var humaPar = 3;
        var comp = Math.floor(Math.random() * 3 + 1);
        if (comp == 1) {
            $("#pc").text("グー")
            $("#result").text("勝ちです")
        } else if (comp == 2) {
            $("#pc").text("チョキ")
            $("#result").text("負けdす")
        } else if (comp == 3) {
            $("#pc").text("パー")
            $("#result").text("あいこです")
        }
    });




});
