$(function () {
    //ウインドウサイズ調整用
    $(window).on('load resize', function () {
        var h = $(window).height();
        var w = $(window).width();
    });


    //メニューの1-5番目カウント用
    var j_stage = 1;
    var menu_data;


    $.get("js/data.json", function (data) {
        // menu_data = $.parseJSON(data);
        menu_data = data;

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
            //            alert(menu_data["menu1"]["win"]["gu"]["message"]);

            var humanGu = 1;
            //敵の手を乱数で決める
            var com = Math.floor(Math.random() * 3 + 1);

            if (com == 1) {
                $('.enemy_result').text("グー");
                $('.win_lose').text("あいこ");
                if (j_stage == 1) {
                    $('.result_txt').text(menu_data["menu1"]["draw"]["gu"]["message"]);
                    $('.menu1').text(menu_data["menu1"]["draw"]["gu"]["item"]);
                } else if (j_stage == 2) {
                    $('.result_txt').text(menu_data["menu2"]["draw"]["gu"]["message"]);
                    $('.menu2').text(menu_data["menu2"]["draw"]["gu"]["item"]);
                } else if (j_stage == 3) {
                    $('.result_txt').text(menu_data["menu3"]["draw"]["gu"]["message"]);
                    $('.menu3').text(menu_data["menu3"]["draw"]["gu"]["item"]);
                } else if (j_stage == 4) {
                    $('.result_txt').text(menu_data["menu4"]["draw"]["gu"]["message"]);
                    $('.menu4').text(menu_data["menu4"]["draw"]["gu"]["item"]);
                } else if (j_stage == 5) {
                    $('.result_txt').text(menu_data["menu5"]["draw"]["gu"]["message"]);
                    $('.menu5').text(menu_data["menu5"]["draw"]["gu"]["item"]);
                    $('.start_bt').hide();
                }
                $('.janken_result').fadeIn(500);
                j_stage++;
            } else if (com == 2) {
                $('.enemy_result').text("チョキ");
                $('.win_lose').text("勝ち");
                if (j_stage == 1) {
                    $('.result_txt').text(menu_data["menu1"]["win"]["gu"]["message"]);
                    $('.menu1').text(menu_data["menu1"]["win"]["gu"]["item"]);
                } else if (j_stage == 2) {
                    $('.result_txt').text(menu_data["menu2"]["win"]["gu"]["message"]);
                    $('.menu2').text(menu_data["menu1"]["win"]["gu"]["item"]);
                } else if (j_stage == 3) {
                    $('.result_txt').text(menu_data["menu3"]["win"]["gu"]["message"]);
                    $('.menu3').text(menu_data["menu1"]["win"]["gu"]["item"]);
                } else if (j_stage == 4) {
                    $('.result_txt').text(menu_data["menu4"]["win"]["gu"]["message"]);
                    $('.menu4').text(menu_data["menu1"]["win"]["gu"]["item"]);
                } else if (j_stage == 5) {
                    $('.result_txt').text(menu_data["menu5"]["win"]["gu"]["message"]);
                    $('.menu5').text(menu_data["menu1"]["win"]["gu"]["message"]);
                    $('.start_bt').hide();
                }

                $('.janken_result').fadeIn(500);
                j_stage++;
            } else if (com == 3) {
                $('.enemy_result').text("パー");
                $('.win_lose').text("負け");
                if (j_stage == 1) {
                    $('.result_txt').text(menu_data["menu1"]["lose"]["gu"]["message"]);
                    $('.menu1').text(menu_data["menu1"]["lose"]["gu"]["item"]);
                } else if (j_stage == 2) {
                    $('.result_txt').text(menu_data["menu2"]["win"]["gu"]["message"]);
                    $('.menu2').text(menu_data["menu2"]["lose"]["gu"]["item"]);
                } else if (j_stage == 3) {
                    $('.result_txt').text(menu_data["menu3"]["win"]["gu"]["message"]);
                    $('.menu3').text(menu_data["menu3"]["lose"]["gu"]["item"]);
                } else if (j_stage == 4) {
                    $('.result_txt').text(menu_data["menu4"]["win"]["gu"]["message"]);
                    $('.menu4').text(menu_data["menu4"]["lose"]["gu"]["item"]);
                } else if (j_stage == 5) {
                    $('.result_txt').text(menu_data["menu5"]["win"]["gu"]["message"]);
                    $('.menu5').text(menu_data["menu5"]["lose"]["gu"]["item"]);
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
                    $('.result_txt').text(menu_data["menu1"]["lose"]["choki"]["message"]);
                    $('.menu1').text(menu_data["menu1"]["lose"]["choki"]["item"]);
                } else if (j_stage == 2) {
                    $('.result_txt').text(menu_data["menu2"]["lose"]["choki"]["message"]);
                    $('.menu2').text(menu_data["menu2"]["lose"]["choki"]["item"]);
                } else if (j_stage == 3) {
                    $('.result_txt').text(menu_data["menu3"]["lose"]["choki"]["message"]);
                    $('.menu3').text(menu_data["menu3"]["lose"]["choki"]["item"]);
                } else if (j_stage == 4) {
                    $('.result_txt').text(menu_data["menu4"]["lose"]["choki"]["message"]);
                    $('.menu4').text(menu_data["menu4"]["lose"]["choki"]["item"]);
                } else if (j_stage == 5) {
                    $('.result_txt').text(menu_data["menu5"]["lose"]["choki"]["message"]);
                    $('.menu5').text(menu_data["menu5"]["lose"]["choki"]["item"]);
                    $('.start_bt').hide();
                }
                $('.janken_result').fadeIn(500);
                j_stage++;
            } else if (com == 2) {
                $('.enemy_result').text("チョキ");
                $('.win_lose').text("あいこ");
                if (j_stage == 1) {
                    $('.result_txt').text(menu_data["menu1"]["draw"]["choki"]["message"]);
                    $('.menu1').text(menu_data["menu1"]["draw"]["choki"]["item"]);
                } else if (j_stage == 2) {
                    $('.result_txt').text(menu_data["menu2"]["draw"]["choki"]["message"]);
                    $('.menu2').text(menu_data["menu2"]["draw"]["choki"]["item"]);
                } else if (j_stage == 3) {
                    $('.result_txt').text(menu_data["menu3"]["draw"]["choki"]["message"]);
                    $('.menu3').text(menu_data["menu3"]["draw"]["choki"]["item"]);
                } else if (j_stage == 4) {
                    $('.result_txt').text(menu_data["menu4"]["draw"]["choki"]["message"]);
                    $('.menu4').text(menu_data["menu4"]["draw"]["choki"]["item"]);
                } else if (j_stage == 5) {
                    $('.result_txt').text(menu_data["menu5"]["draw"]["choki"]["message"]);
                    $('.menu5').text(menu_data["menu5"]["draw"]["choki"]["item"]);
                    $('.start_bt').hide();
                }
                $('.janken_result').fadeIn(500);
                j_stage++;
            } else if (com == 3) {
                $('.enemy_result').text("パー");
                $('.win_lose').text("勝ち");
                if (j_stage == 1) {
                    $('.result_txt').text(menu_data["menu1"]["win"]["choki"]["message"]);
                    $('.menu1').text(menu_data["menu1"]["win"]["choki"]["item"]);
                } else if (j_stage == 2) {
                    $('.result_txt').text(menu_data["menu2"]["win"]["choki"]["message"]);
                    $('.menu2').text(menu_data["menu2"]["win"]["choki"]["item"]);
                } else if (j_stage == 3) {
                    $('.result_txt').text(menu_data["menu3"]["win"]["choki"]["message"]);
                    $('.menu3').text(menu_data["menu3"]["win"]["choki"]["item"]);
                } else if (j_stage == 4) {
                    $('.result_txt').text(menu_data["menu4"]["win"]["choki"]["message"]);
                    $('.menu4').text(menu_data["menu4"]["win"]["choki"]["item"]);
                } else if (j_stage == 5) {
                    $('.result_txt').text(menu_data["menu5"]["win"]["choki"]["message"]);
                    $('.menu5').text(menu_data["menu5"]["win"]["choki"]["item"]);
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
                    $('.result_txt').text(menu_data["menu1"]["win"]["par"]["message"]);
                    $('.menu1').text(menu_data["menu1"]["win"]["par"]["item"]);
                } else if (j_stage == 2) {
                    $('.result_txt').text(menu_data["menu2"]["win"]["par"]["message"]);
                    $('.menu2').text(menu_data["menu2"]["win"]["par"]["item"]);
                } else if (j_stage == 3) {
                    $('.result_txt').text(menu_data["menu3"]["win"]["par"]["message"]);
                    $('.menu3').text(menu_data["menu3"]["win"]["par"]["item"]);
                } else if (j_stage == 4) {
                    $('.result_txt').text(menu_data["menu4"]["win"]["par"]["message"]);
                    $('.menu4').text(menu_data["menu4"]["win"]["par"]["item"]);
                } else if (j_stage == 5) {
                    $('.result_txt').text(menu_data["menu5"]["win"]["par"]["message"]);
                    $('.menu5').text(menu_data["menu5"]["win"]["par"]["item"]);
                    $('.start_bt').hide();
                }
                $('.janken_result').fadeIn(500);
                j_stage++;
            } else if (com == 2) {
                $('.enemy_result').text("チョキ");
                $('.win_lose').text("負け");
                if (j_stage == 1) {
                    $('.result_txt').text(menu_data["menu1"]["lose"]["par"]["message"]);
                    $('.menu1').text(menu_data["menu1"]["lose"]["par"]["message"]);
                } else if (j_stage == 2) {
                    $('.result_txt').text(menu_data["menu2"]["win"]["par"]["message"]);
                    $('.menu2').text(menu_data["menu2"]["lose"]["par"]["message"]);
                } else if (j_stage == 3) {
                    $('.result_txt').text(menu_data["menu3"]["win"]["par"]["message"]);
                    $('.menu3').text(menu_data["menu3"]["lose"]["par"]["message"]);
                } else if (j_stage == 4) {
                    $('.result_txt').text(menu_data["menu4"]["win"]["par"]["message"]);
                    $('.menu4').text(menu_data["menu4"]["lose"]["par"]["message"]);
                } else if (j_stage == 5) {
                    $('.result_txt').text(menu_data["menu5"]["win"]["par"]["message"]);
                    $('.menu5').text(menu_data["menu5"]["lose"]["par"]["message"]);
                    $('.start_bt').hide();
                }
                $('.janken_result').fadeIn(500);
                j_stage++;
            } else if (com == 3) {
                $('.enemy_result').text("パー");
                $('.win_lose').text("あいこ");
                if (j_stage == 1) {
                    $('.result_txt').text(menu_data["menu1"]["draw"]["par"]["message"]);
                    $('.menu1').text(menu_data["menu1"]["draw"]["par"]["item"]);
                } else if (j_stage == 2) {
                    $('.result_txt').text(menu_data["menu2"]["draw"]["par"]["message"]);
                    $('.menu2').text(menu_data["menu2"]["draw"]["par"]["item"]);
                } else if (j_stage == 3) {
                    $('.result_txt').text(menu_data["menu3"]["draw"]["par"]["message"]);
                    $('.menu3').text(menu_data["menu3"]["draw"]["par"]["item"]);
                } else if (j_stage == 4) {
                    $('.result_txt').text(menu_data["menu4"]["draw"]["par"]["message"]);
                    $('.menu4').text(menu_data["menu4"]["draw"]["par"]["item"]);
                } else if (j_stage == 5) {
                    $('.result_txt').text(menu_data["menu5"]["draw"]["par"]["message"]);
                    $('.menu5').text(menu_data["menu5"]["draw"]["par"]["item"]);
                    $('.start_bt').hide();
                }
                $('.janken_result').fadeIn(500);
                j_stage++;
            }
        });


    });


});
