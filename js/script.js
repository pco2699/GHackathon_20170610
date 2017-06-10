$(function () {
    //ウインドウサイズ調整用
    $(window).on('load resize', function () {
        var h = $(window).height();
        var w = $(window).width();
    });

    //スタートボタンでじゃんけんウインドウ表示
    $('.start_bt').on('click', function () {
        //敵の種類を選ぶ
        var enemy = Math.floor(Math.random() * 3 + 1);
        if (com == 1) {
            $('.enemy').html('敵1')
            $('.enemy_txt').html('神は死んだ')
        } else if (com == 2) {
            $('.enemy').html('敵2')
            $('.enemy_txt').html('考えるのではなく感じるのだ')
        } else if (com == 3) {
            $('.enemy').html('敵3')
            $('.enemy_txt').html('諦めたらそこで試合終了ですよ')
        }
        $('.janken').fadeIn(1000);
    });

    $('.janken_finish').on('click', function () {
        $('.janken').fadeOut(1000);
    });


    //じゃんけん関数(多分使わない)
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
