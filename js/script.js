$(function () {
    //ウインドウサイズ調整用
    $(window).on('load resize', function () {
        var h = $(window).height();
        var w = $(window).width();
    });

    var j_stage = 1;

    //スタートボタンでじゃんけん開始
    $('.start_bt').on('click', function () {
        //敵の種類を選ぶ
        var enemy = Math.floor(Math.random() * 3 + 1);
        if (enemy == 1) {
            $('.enemy').html('敵1')
            $('.enemy_txt').html('神は死んだ')
        } else if (enemy == 2) {
            $('.enemy').html('敵2')
            $('.enemy_txt').html('考えるのではなく感じるのだ')
        } else if (enemy == 3) {
            $('.enemy').html('敵3')
            $('.enemy_txt').html('諦めたらそこで試合終了ですよ')
        }
        //じゃんけんウインドウ表示
        $('.janken').fadeIn(1000);
    });

    //仮に勝つボタンを押すと結果表示
    $('.janken_win_kari').on('click', function () {
        $('.janken_result').fadeIn(1000);
    })

    //終了を押すとウインドウ消去
    $('.janken_finish').on('click', function () {
        $('.janken').fadeOut(1000);
        $('.janken_result').fadeOut(1000);
    });







    Leap.loop(function (frame) {
        let track_flag = false;
        if (frame.hands.length > 0 && !track_flag) {
            for (hand of frame.hands) {
                let extendedFingers = 0;
                for (finger of hand.fingers) {
                    if (finger.extended) extendedFingers++;
                }

                if (extendedFingers === 0) {
                    track_flag = true;
                    $("#gu_btn").click();
                } else if (extendedFingers === 5) {
                    track_flag = true;
                    $("#pa_btn").click();
                } else if (extendedFingers === 2) {
                    track_flag = true;
                    $("#cho_btn").click();
                }
            }
        }
    });







    //じゃんけん勝敗判定関数
    $('.gu_btn').on("click", function () {
        var humanGu = 1;
        //敵の手を乱数で決める
        var com = Math.floor(Math.random() * 3 + 1);

        if (com == 1) {
            $('.enemy_result').text("グー");
            $('.win_lose').text("あいこ");
            $('.janken_result').fadeIn(500);
            j_stage++;
        } else if (com == 2) {
            $('.enemy_result').text("チョキ");
            $('.win_lose').text("勝ち");
            $('.janken_result').fadeIn(500);
            j_stage++;
        } else if (com == 3) {
            $('.enemy_result').text("パー");
            $('.win_lose').text("負け");
            $('.janken_result').fadeIn(500);
            j_stage++;
        }
    });

    $('.cho_btn').on("click", function () {
        var humaCho = 2;
        //敵の手を乱数で決める
        var com = Math.floor(Math.random() * 3 + 1);

        if (com == 1) {
            $('.enemy_result').text("グー");
            $('.win_lose').text("負け");
            $('.janken_result').fadeIn(500);
            j_stage++;
        } else if (com == 2) {
            $('.enemy_result').text("チョキ");
            $('.win_lose').text("あいこ");
            $('.janken_result').fadeIn(500);
            j_stage++;
        } else if (com == 3) {
            $('.enemy_result').text("パー");
            $('.win_lose').text("勝ち");
            $('.janken_result').fadeIn(500);
            j_stage++;
        }
    });
    $('.pa_btn').on("click", function () {
        var humaPar = 3;
        //敵の手を乱数で決める
        var com = Math.floor(Math.random() * 3 + 1);
        if (com == 1) {
            $('.enemy_result').text("グー");
            $('.win_lose').text("勝ち");
            $('.janken_result').fadeIn(500);
            j_stage++;
        } else if (com == 2) {
            $('.enemy_result').text("チョキ");
            $('.win_lose').text("負け");
            $('.janken_result').fadeIn(500);
            j_stage++;
        } else if (com == 3) {
            $('.enemy_result').text("パー");
            $('.win_lose').text("あいこ");
            $('.janken_result').fadeIn(500);
            j_stage++;
        }
    });




});
