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
        $('.janken').fadeIn(500);
    });

    //仮に勝つボタンを押すと結果表示
    //    $('.janken_win_kari').on('click', function () {
    //        $('.janken_result').fadeIn(1000);
    //    })

    //終了を押すとウインドウ消去
    $('.janken_finish').on('click', function () {
        $('.janken').fadeOut(500);
        $('.janken_result').fadeOut(500);
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
            if (j_stage == 1) {
                $('.result_txt').text("肉1を手に入れた");
                $('.menu1').text("肉1");
            } else if (j_stage == 2) {
                $('.result_txt').text("草1を手に入れた");
                $('.menu2').text("草1");
            } else if (j_stage == 3) {
                $('.result_txt').text("米1を手に入れた");
                $('.menu3').text("米1");
            } else if (j_stage == 4) {
                $('.result_txt').text("麺1を手に入れた");
                $('.menu4').text("麺1");
            } else if (j_stage == 5) {
                $('.result_txt').text("豆1を手に入れた");
                $('.menu5').text("豆1");
                $('.start_bt').hide();
            }
            $('.janken_result').fadeIn(500);
            j_stage++;
        } else if (com == 2) {
            $('.enemy_result').text("チョキ");
            $('.win_lose').text("勝ち");
            if (j_stage == 1) {
                $('.result_txt').text("肉2を手に入れた");
                $('.menu1').text("肉2");
            } else if (j_stage == 2) {
                $('.result_txt').text("草2を手に入れた");
                $('.menu2').text("草2");
            } else if (j_stage == 3) {
                $('.result_txt').text("米2を手に入れた");
                $('.menu3').text("米2");
            } else if (j_stage == 4) {
                $('.result_txt').text("麺2を手に入れた");
                $('.menu4').text("麺2");
            } else if (j_stage == 5) {
                $('.result_txt').text("豆2を手に入れた");
                $('.menu5').text("豆2");
                $('.start_bt').hide();
            }

            $('.janken_result').fadeIn(500);
            j_stage++;
        } else if (com == 3) {
            $('.enemy_result').text("パー");
            $('.win_lose').text("負け");
            if (j_stage == 1) {
                $('.result_txt').text("肉3を手に入れた");
                $('.menu1').text("肉3");
            } else if (j_stage == 2) {
                $('.result_txt').text("草3を手に入れた");
                $('.menu2').text("草3");
            } else if (j_stage == 3) {
                $('.result_txt').text("米3を手に入れた");
                $('.menu3').text("米3");
            } else if (j_stage == 4) {
                $('.result_txt').text("麺3を手に入れた");
                $('.menu4').text("麺3");
            } else if (j_stage == 5) {
                $('.result_txt').text("豆3を手に入れた");
                $('.menu5').text("豆3");
                $('.start_bt').hide();
            }

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
            if (j_stage == 1) {
                $('.result_txt').text("肉1を手に入れた");
                $('.menu1').text("肉1");
            } else if (j_stage == 2) {
                $('.result_txt').text("草1を手に入れた");
                $('.menu2').text("草1");
            } else if (j_stage == 3) {
                $('.result_txt').text("米1を手に入れた");
                $('.menu3').text("米1");
            } else if (j_stage == 4) {
                $('.result_txt').text("麺1を手に入れた");
                $('.menu4').text("麺1");
            } else if (j_stage == 5) {
                $('.result_txt').text("豆1を手に入れた");
                $('.menu5').text("豆1");
                $('.start_bt').hide();
            }
            $('.janken_result').fadeIn(500);
            j_stage++;
        } else if (com == 2) {
            $('.enemy_result').text("チョキ");
            $('.win_lose').text("あいこ");
            if (j_stage == 1) {
                $('.result_txt').text("肉1を手に入れた");
                $('.menu1').text("肉1");
            } else if (j_stage == 2) {
                $('.result_txt').text("草1を手に入れた");
                $('.menu2').text("草1");
            } else if (j_stage == 3) {
                $('.result_txt').text("米1を手に入れた");
                $('.menu3').text("米1");
            } else if (j_stage == 4) {
                $('.result_txt').text("麺1を手に入れた");
                $('.menu4').text("麺1");
            } else if (j_stage == 5) {
                $('.result_txt').text("豆1を手に入れた");
                $('.menu5').text("豆1");
                $('.start_bt').hide();
            }
            $('.janken_result').fadeIn(500);
            j_stage++;
        } else if (com == 3) {
            $('.enemy_result').text("パー");
            $('.win_lose').text("勝ち");
            if (j_stage == 1) {
                $('.result_txt').text("肉1を手に入れた");
                $('.menu1').text("肉1");
            } else if (j_stage == 2) {
                $('.result_txt').text("草1を手に入れた");
                $('.menu2').text("草1");
            } else if (j_stage == 3) {
                $('.result_txt').text("米1を手に入れた");
                $('.menu3').text("米1");
            } else if (j_stage == 4) {
                $('.result_txt').text("麺1を手に入れた");
                $('.menu4').text("麺1");
            } else if (j_stage == 5) {
                $('.result_txt').text("豆1を手に入れた");
                $('.menu5').text("豆1");
                $('.start_bt').hide();
            }
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
            if (j_stage == 1) {
                $('.result_txt').text("肉1を手に入れた");
                $('.menu1').text("肉1");
            } else if (j_stage == 2) {
                $('.result_txt').text("草1を手に入れた");
                $('.menu2').text("草1");
            } else if (j_stage == 3) {
                $('.result_txt').text("米1を手に入れた");
                $('.menu3').text("米1");
            } else if (j_stage == 4) {
                $('.result_txt').text("麺1を手に入れた");
                $('.menu4').text("麺1");
            } else if (j_stage == 5) {
                $('.result_txt').text("豆1を手に入れた");
                $('.menu5').text("豆1");
                $('.start_bt').hide();
            }
            $('.janken_result').fadeIn(500);
            j_stage++;
        } else if (com == 2) {
            $('.enemy_result').text("チョキ");
            $('.win_lose').text("負け");
            if (j_stage == 1) {
                $('.result_txt').text("肉1を手に入れた");
                $('.menu1').text("肉1");
            } else if (j_stage == 2) {
                $('.result_txt').text("草1を手に入れた");
                $('.menu2').text("草1");
            } else if (j_stage == 3) {
                $('.result_txt').text("米1を手に入れた");
                $('.menu3').text("米1");
            } else if (j_stage == 4) {
                $('.result_txt').text("麺1を手に入れた");
                $('.menu4').text("麺1");
            } else if (j_stage == 5) {
                $('.result_txt').text("豆1を手に入れた");
                $('.menu5').text("豆1");
                $('.start_bt').hide();
            }
            $('.janken_result').fadeIn(500);
            j_stage++;
        } else if (com == 3) {
            $('.enemy_result').text("パー");
            $('.win_lose').text("あいこ");
            if (j_stage == 1) {
                $('.result_txt').text("肉1を手に入れた");
                $('.menu1').text("肉1");
            } else if (j_stage == 2) {
                $('.result_txt').text("草1を手に入れた");
                $('.menu2').text("草1");
            } else if (j_stage == 3) {
                $('.result_txt').text("米1を手に入れた");
                $('.menu3').text("米1");
            } else if (j_stage == 4) {
                $('.result_txt').text("麺1を手に入れた");
                $('.menu4').text("麺1");
            } else if (j_stage == 5) {
                $('.result_txt').text("豆1を手に入れた");
                $('.menu5').text("豆1");
                $('.start_bt').hide();
            }
            $('.janken_result').fadeIn(500);
            j_stage++;
        }
    });




});
