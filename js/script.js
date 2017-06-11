$(function () {
    //ウインドウサイズ調整用
    $(window).on('load resize', function () {
        var h = $(window).height();
        var w = $(window).width();
    });

    function playSound(src, loop) {
        // src = 再生する音楽のパス
        // loop = loopする or not

        if (loop === "noloop") {
            $(".audio").removeAttr("loop");
        }
        $(".audio").removeAttr("src");
        $(".audio").attr("src", src);
        $(".audio")[0].play();
    }

    function playSE(src, type) {
        // SEを流す関数
        // src = 再生するSEのパス(e.g. sound/hoge.wav)
        // type = 再生するファイルのタイプ(e.g. wav)
        // e.g. playSE("sound/boco.mp3", "mp3");


        // audio.classからsrc属性とtype属性を削除
        $(".se").removeAttr("src");
        $(".se").removeAttr("type");


        // audio.classからsrc属性とtype属性を追加
        $(".se").attr("src", src);
        $(".se").attr("type", "audio/" + type);

        $(".se")[0].play();
    }

    // じゃんけん検知可能か
    let leap_can_track_janken = false;

    // ジェスチャ検知可能か
    let leap_can_track_gesture = true;

    // じゃんけん結果画面か
    let is_jk_rslt = false;

    Leap.loop({
        enableGestures: true
    }, function (frame) {
        if (frame.hands.length > 0 && leap_can_track_janken) {
            for (hand of frame.hands) {
                let extendedFingers = 0;
                for (finger of hand.fingers) {
                    if (finger.extended) extendedFingers++;
                }
                if (extendedFingers === 0) {
                    $(".gu_btn").click();
                } else if (extendedFingers === 5) {
                    $(".pa_btn").click();
                } else if (extendedFingers === 2) {
                    $(".cho_btn").click();
                }
            }
        }
        if (frame.gestures.length > 0 && leap_can_track_gesture) {
            console.log("Hey");
            frame.gestures.forEach(function (gesture) {
                switch (gesture.type) {
                    case "circle":
                        break;
                    case "keyTap":
                        break;
                    case "screenTap":
                        $('.start_bt').click();
                        break;
                    case "swipe":
                        if (is_jk_rslt) {
                            $('.janken_finish').click();
                        }
                        break;
                }
            });
        }
    });


    //外部データの読み込み
    $.get("js/data.json", function (data) {
        //メニューの1-5番目カウント用
        var j_stage = 1;
        //データ格納用
        var menu_data = data;

        $.get("js/message.json", function (data) {

            var message_data = data;
            //スタートボタンでじゃんけん開始gi
            $('.start_bt').on('click', function () {
                // Leap じゃんけん検知開始
                leap_can_track_janken = true;
                // Leap ジェスチャ検知OFF
                leap_can_track_gesture = false;

                //敵のセリフの種類をランダムで選ぶ
                var enemy = Math.floor(Math.random() * 20 + 1);
                if (j_stage == 1) {
                    playSound("sound/battle1.mp3", "loop");
                    $('.enemy').css({
                        backgroundImage: 'url("img/enemy1.jpg")'
                    });
                    $('.enemy_txt').html(message_data["ms" + enemy]);
                    $('.keihin_gu').text(menu_data["menu1"]["win"]["gu"]["item"]);
                    $('.keihin_cho').text(menu_data["menu1"]["win"]["choki"]["item"]);
                    $('.keihin_pa').text(menu_data["menu1"]["win"]["par"]["item"]);
                } else if (j_stage == 2) {
                    playSound("sound/battle2.mp3", "loop");
                    $('.enemy').css({
                        backgroundImage: 'url("img/enemy2.jpg")'
                    });
                    $('.enemy_txt').html(message_data["ms" + enemy]);
                    $('.keihin_gu').text(menu_data["menu2"]["win"]["gu"]["item"]);
                    $('.keihin_cho').text(menu_data["menu2"]["win"]["choki"]["item"]);
                    $('.keihin_pa').text(menu_data["menu2"]["win"]["par"]["item"]);
                } else if (j_stage == 3) {
                    playSound("sound/battle3.mp3", "loop");
                    $('.enemy').css({
                        backgroundImage: 'url("img/enemy3.jpg")'
                    });
                    $('.enemy_txt').html(message_data["ms" + enemy]);
                    $('.keihin_gu').text(menu_data["menu3"]["win"]["gu"]["item"]);
                    $('.keihin_cho').text(menu_data["menu3"]["win"]["choki"]["item"]);
                    $('.keihin_pa').text(menu_data["menu3"]["win"]["par"]["item"]);
                } else if (j_stage == 4) {
                    playSound("sound/battle4.mp3", "loop");
                    $('.enemy').css({
                        backgroundImage: 'url("img/enemy4.jpg")'
                    });
                    $('.enemy_txt').html(message_data["ms" + enemy]);
                    $('.keihin_gu').text(menu_data["menu4"]["win"]["gu"]["item"]);
                    $('.keihin_cho').text(menu_data["menu4"]["win"]["choki"]["item"]);
                    $('.keihin_pa').text(menu_data["menu4"]["win"]["par"]["item"]);
                } else if (j_stage == 5) {
                    playSound("sound/battle5.mp3", "loop");
                    $('.enemy').css({
                        backgroundImage: 'url("img/enemy5.jpg")'
                    });
                    $('.enemy_txt').html(message_data["ms" + enemy]);
                    //                    $('.keihin_gu').text(menu_data["menu5"]["win"]["item"]);
                    //                    $('.keihin_cho').text(menu_data["menu5"]["win"]["item"]);
                    //                    $('.keihin_pa').text(menu_data["menu5"]["win"]["item"]);
                }

                //ロード画面表示→消去
                $('.doragon').fadeIn(300);
                $('.doragon').delay(400).fadeOut(300);

                //じゃんけんウインドウ表示
                $('.janken').delay(300).fadeIn(300);
            });

            //拳醤ボタンを押すと結果表示，閉じるボタンで消去
            $('.explain_bt').on('click', function () {
                $('.doragon').fadeIn(300);
                $('.doragon').delay(400).fadeOut(300);
                $('.explain').delay(300).fadeIn(300);
            });
            $('.explain_close').on('click', function () {
                $('.explain').fadeOut(300);
                $('.doragon').fadeIn(300);
                $('.doragon').delay(400).fadeOut(300);
            });

            //終了を押すとウインドウ消去
            $('.janken_finish').on('click', function () {
                $('.doragon').fadeIn(300);
                $('.doragon').delay(400).fadeOut(300);
                $('.janken').fadeOut(300);
                $('.janken_result').fadeOut(300);
                is_jk_rslt = false;
                if (j_stage == 2) {
                    $('.explain_bt').hide();
                    $('.start_bt').text('つづける。');
                }
                if (j_stage == 6) {
                    $('header').delay(2000).slideUp(1000);
                    $('.start_cooking').delay(2000).fadeIn(1000);
                }
            });

            $('.start_cooking').on('click', function () {
                $(".audio")[0].pause();
                $('.blues').fadeIn(500);
                $('.blues_inner').html('<iframe width="100%" height="315" src="https://www.youtube.com/embed/OW_txwqmjQQ?rel=0&amp;showinfo=0;autoplay=1" frameborder="0" allowfullscreen></iframe>');
            });

            //じゃんけん勝敗判定関数
            $('.gu_btn').on("click", function () {
                // Leap じゃんけん検知OFF
                leap_can_track_janken = false;
                // Leap ジェスチャ検知ON
                leap_can_track_gesture = true;


                var humanGu = 1;

                for (var i = 0; i++; i < 20) {
                    //敵の手を乱数で決める
                    var com = Math.floor(Math.random() * 3 + 1);
                    if (com == 1) {
                        $('.enemy_result').html('<img src="img/gu.png">');
                        $('.win_lose').html('<img src="img/draw.png">');
                        playSE("sound/draw.wav", "wav");
                        if (j_stage == 1) {
                            $('.enemy_no_ken').html('田中の<span class="bold">拳</span>');
                            $('.result_txt').text(menu_data["menu1"]["draw"]["gu"]["message"]);
                            $('.menu1').text(menu_data["menu1"]["draw"]["gu"]["item"]);
                            $('.result_img').html(menu_data["menu1"]["draw"]["gu"]["image"]);
                            $('.menu_img1').html(menu_data["menu1"]["draw"]["gu"]["image"]);
                            $('.menu_win_lose1').html('<img src="img/draw.png">');
                        } else if (j_stage == 2) {
                            $('.enemy_no_ken').html('木村の<span class="bold">拳</span>');
                            $('.result_txt').text(menu_data["menu2"]["draw"]["gu"]["message"]);
                            $('.menu2').text(menu_data["menu2"]["draw"]["gu"]["item"]);
                            $('.result_img').html(menu_data["menu2"]["draw"]["gu"]["image"]);
                            $('.menu_img2').html(menu_data["menu2"]["draw"]["gu"]["image"]);
                            $('.menu_win_lose2').html('<img src="img/draw.png">');
                        } else if (j_stage == 3) {
                            $('.enemy_no_ken').html('栗林の<span class="bold">拳</span>');
                            $('.result_txt').text(menu_data["menu3"]["draw"]["gu"]["message"]);
                            $('.menu3').text(menu_data["menu3"]["draw"]["gu"]["item"]);
                            $('.result_img').html(menu_data["menu3"]["draw"]["gu"]["image"]);
                            $('.menu_img3').html(menu_data["menu3"]["draw"]["gu"]["image"]);
                            $('.menu_win_lose3').html('<img src="img/draw.png">');
                        } else if (j_stage == 4) {
                            $('.enemy_no_ken').html('山崎の<span class="bold">拳</span>');
                            $('.result_txt').text(menu_data["menu4"]["draw"]["gu"]["message"]);
                            $('.menu4').text(menu_data["menu4"]["draw"]["gu"]["item"]);
                            $('.result_img').html(menu_data["menu4"]["draw"]["gu"]["image"]);
                            $('.menu_img4').html(menu_data["menu4"]["draw"]["gu"]["image"]);
                            $('.menu_win_lose4').html('<img src="img/draw.png">');
                        } else if (j_stage == 5) {
                            $('.enemy_no_ken').html('児玉の<span class="bold">拳</span>');
                            $('.result_txt').text(menu_data["menu5"]["draw"]["message"]);
                            $('.menu5').text(menu_data["menu5"]["draw"]["item"]);
                            $('.result_img').html(menu_data["menu5"]["draw"]["image"]);
                            $('.menu_img5').html(menu_data["menu5"]["draw"]["image"]);
                            $('.menu_win_lose5').html('<img src="img/draw.png">');
                            $('.start_bt').hide();
                        }
                        $('.janken_result').fadeIn(300);
                        is_jk_rslt = true;
                        j_stage++;
                    } else if (com == 2) {
                        $('.enemy_result').html('<img src="img/cho.png">');
                        $('.win_lose').html('<img src="img/win.png">');
                        playSE("sound/cheers.mp3", "mp3");
                        if (j_stage == 1) {
                            $('.enemy_no_ken').html('田中の<span class="bold">拳</span>');
                            $('.result_txt').text(menu_data["menu1"]["win"]["gu"]["message"]);
                            $('.menu1').text(menu_data["menu1"]["win"]["gu"]["item"]);
                            $('.result_img').html(menu_data["menu1"]["win"]["gu"]["image"]);
                            $('.menu_img1').html(menu_data["menu1"]["win"]["gu"]["image"]);
                            $('.menu_win_lose1').html('<img src="img/win.png">');
                        } else if (j_stage == 2) {
                            $('.enemy_no_ken').html('木村の<span class="bold">拳</span>');
                            $('.result_txt').text(menu_data["menu2"]["win"]["gu"]["message"]);
                            $('.menu2').text(menu_data["menu2"]["win"]["gu"]["item"]);
                            $('.result_img').html(menu_data["menu2"]["win"]["gu"]["image"]);
                            $('.menu_img2').html(menu_data["menu2"]["win"]["gu"]["image"]);
                            $('.menu_win_lose2').html('<img src="img/win.png">');
                        } else if (j_stage == 3) {
                            $('.enemy_no_ken').html('栗林の<span class="bold">拳</span>');
                            $('.result_txt').text(menu_data["menu3"]["win"]["gu"]["message"]);
                            $('.menu3').text(menu_data["menu3"]["win"]["gu"]["item"]);
                            $('.result_img').html(menu_data["menu3"]["win"]["gu"]["image"]);
                            $('.menu_img3').html(menu_data["menu3"]["win"]["gu"]["image"]);
                            $('.menu_win_lose3').html('<img src="img/win.png">');
                        } else if (j_stage == 4) {
                            $('.enemy_no_ken').html('山崎の<span class="bold">拳</span>');
                            $('.result_txt').text(menu_data["menu4"]["win"]["gu"]["message"]);
                            $('.menu4').text(menu_data["menu4"]["win"]["gu"]["item"]);
                            $('.result_img').html(menu_data["menu4"]["win"]["gu"]["image"]);
                            $('.menu_img4').html(menu_data["menu4"]["win"]["gu"]["image"]);
                            $('.menu_win_lose4').html('<img src="img/win.png">');
                        } else if (j_stage == 5) {
                            $('.enemy_no_ken').html('児玉の<span class="bold">拳</span>');
                            $('.result_txt').text(menu_data["menu5"]["win"]["message"]);
                            $('.menu5').text(menu_data["menu5"]["win"]["item"]);
                            $('.result_img').html(menu_data["menu5"]["win"]["image"]);
                            $('.menu_img5').html(menu_data["menu5"]["win"]["image"]);
                            $('.menu_win_lose5').html('<img src="img/win.png">');
                            $('.start_bt').hide();
                        }
                        $('.janken_result').fadeIn(300);
                        is_jk_rslt = true;
                        j_stage++;
                    } else if (com == 3) {
                        $('.enemy_result').html('<img src="img/pa.png">');
                        $('.win_lose').html('<img src="img/lose.png">');
                        playSE("sound/lose.wav", "wav");
                        if (j_stage == 1) {
                            $('.enemy_no_ken').html('田中の<span class="bold">拳</span>');
                            $('.result_txt').text(menu_data["menu1"]["lose"]["gu"]["message"]);
                            $('.menu1').text(menu_data["menu1"]["lose"]["gu"]["item"]);
                            $('.result_img').html(menu_data["menu1"]["lose"]["gu"]["image"]);
                            $('.menu_img1').html(menu_data["menu1"]["lose"]["gu"]["image"]);
                            $('.menu_win_lose1').html('<img src="img/lose.png">');
                        } else if (j_stage == 2) {
                            $('.enemy_no_ken').html('木村の<span class="bold">拳</span>');
                            $('.result_txt').text(menu_data["menu2"]["lose"]["gu"]["message"]);
                            $('.menu2').text(menu_data["menu2"]["lose"]["gu"]["item"]);
                            $('.result_img').html(menu_data["menu2"]["lose"]["gu"]["image"]);
                            $('.menu_img2').html(menu_data["menu2"]["lose"]["gu"]["image"]);
                            $('.menu_win_lose2').html('<img src="img/lose.png">');
                        } else if (j_stage == 3) {
                            $('.enemy_no_ken').html('栗林の<span class="bold">拳</span>');
                            $('.result_txt').text(menu_data["menu3"]["lose"]["gu"]["message"]);
                            $('.menu3').text(menu_data["menu3"]["lose"]["gu"]["item"]);
                            $('.result_img').html(menu_data["menu3"]["lose"]["gu"]["image"]);
                            $('.menu_img3').html(menu_data["menu3"]["lose"]["gu"]["image"]);
                            $('.menu_win_lose3').html('<img src="img/lose.png">');
                        } else if (j_stage == 4) {
                            $('.enemy_no_ken').html('山崎の<span class="bold">拳</span>');
                            $('.result_txt').text(menu_data["menu4"]["lose"]["gu"]["message"]);
                            $('.menu4').text(menu_data["menu4"]["lose"]["gu"]["item"]);
                            $('.result_img').html(menu_data["menu4"]["lose"]["gu"]["image"]);
                            $('.menu_img4').html(menu_data["menu4"]["lose"]["gu"]["image"]);
                            $('.menu_win_lose4').html('<img src="img/lose.png">');
                        } else if (j_stage == 5) {
                            $('.enemy_no_ken').html('児玉の<span class="bold">拳</span>');
                            $('.result_txt').text(menu_data["menu5"]["lose"]["message"]);
                            $('.menu5').text(menu_data["menu5"]["lose"]["item"]);
                            $('.result_img').html(menu_data["menu5"]["lose"]["image"]);
                            $('.menu_img5').html(menu_data["menu5"]["lose"]["image"]);
                            $('.menu_win_lose5').html('<img src="img/lose.png">');
                            $('.start_bt').hide();
                        }
                        $('.janken_result').fadeIn(300);
                        is_jk_rslt = true;

                        j_stage++;
                    }
                    console.log(i);
                }

            });



            $('.cho_btn').on("click", function () {
                // Leap じゃんけん検知OFF
                leap_can_track_janken = false;
                // Leap ジェスチャ検知ON
                leap_can_track_gesture = true;


                var humaCho = 2;
                //敵の手を乱数で決める
                var com = Math.floor(Math.random() * 3 + 1);
                if (com == 1) {
                    $('.enemy_result').html('<img src="img/gu.png">');
                    $('.win_lose').html('<img src="img/lose.png">');
                    playSE("sound/lose.wav", "wav");
                    if (j_stage == 1) {
                        $('.enemy_no_ken').html('田中の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu1"]["lose"]["choki"]["message"]);
                        $('.menu1').text(menu_data["menu1"]["lose"]["choki"]["item"]);
                        $('.result_img').html(menu_data["menu1"]["lose"]["choki"]["image"]);
                        $('.menu_img1').html(menu_data["menu1"]["lose"]["choki"]["image"]);
                        $('.menu_win_lose1').html('<img src="img/lose.png">');
                    } else if (j_stage == 2) {
                        $('.enemy_no_ken').html('木村の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu2"]["lose"]["choki"]["message"]);
                        $('.menu2').text(menu_data["menu2"]["lose"]["choki"]["item"]);
                        $('.result_img').html(menu_data["menu2"]["lose"]["choki"]["image"]);
                        $('.menu_img2').html(menu_data["menu2"]["lose"]["choki"]["image"]);
                        $('.menu_win_lose2').html('<img src="img/lose.png">');
                    } else if (j_stage == 3) {
                        $('.enemy_no_ken').html('栗林の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu3"]["lose"]["choki"]["message"]);
                        $('.menu3').text(menu_data["menu3"]["lose"]["choki"]["item"]);
                        $('.result_img').html(menu_data["menu3"]["lose"]["choki"]["image"]);
                        $('.menu_img3').html(menu_data["menu3"]["lose"]["choki"]["image"]);
                        $('.menu_win_lose3').html('<img src="img/lose.png">');
                    } else if (j_stage == 4) {
                        $('.enemy_no_ken').html('山崎の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu4"]["lose"]["choki"]["message"]);
                        $('.menu4').text(menu_data["menu4"]["lose"]["choki"]["item"]);
                        $('.result_img').html(menu_data["menu4"]["lose"]["choki"]["image"]);
                        $('.menu_img4').html(menu_data["menu4"]["lose"]["choki"]["image"]);
                        $('.menu_win_lose4').html('<img src="img/lose.png">');
                    } else if (j_stage == 5) {
                        $('.enemy_no_ken').html('児玉の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu5"]["lose"]["message"]);
                        $('.menu5').text(menu_data["menu5"]["lose"]["item"]);
                        $('.result_img').html(menu_data["menu5"]["lose"]["image"]);
                        $('.menu_img5').html(menu_data["menu5"]["lose"]["image"]);
                        $('.menu_win_lose5').html('<img src="img/lose.png">');
                        $('.start_bt').hide();
                    }
                    $('.janken_result').fadeIn(300);
                    is_jk_rslt = true;

                    j_stage++;
                } else if (com == 2) {
                    $('.enemy_result').html('<img src="img/cho.png">');
                    $('.win_lose').html('<img src="img/draw.png">');
                    playSE("sound/draw.wav", "wav");
                    if (j_stage == 1) {
                        $('.enemy_no_ken').html('田中の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu1"]["draw"]["choki"]["message"]);
                        $('.menu1').text(menu_data["menu1"]["draw"]["choki"]["item"]);
                        $('.result_img').html(menu_data["menu1"]["draw"]["choki"]["image"]);
                        $('.menu_img1').html(menu_data["menu1"]["draw"]["choki"]["image"]);
                        $('.menu_win_lose1').html('<img src="img/draw.png">');
                    } else if (j_stage == 2) {
                        $('.enemy_no_ken').html('木村の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu2"]["draw"]["choki"]["message"]);
                        $('.menu2').text(menu_data["menu2"]["draw"]["choki"]["item"]);
                        $('.result_img').html(menu_data["menu2"]["draw"]["choki"]["image"]);
                        $('.menu_img2').html(menu_data["menu2"]["draw"]["choki"]["image"]);
                        $('.menu_win_lose2').html('<img src="img/draw.png">');
                    } else if (j_stage == 3) {
                        $('.enemy_no_ken').html('栗林の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu3"]["draw"]["choki"]["message"]);
                        $('.menu3').text(menu_data["menu3"]["draw"]["choki"]["item"]);
                        $('.result_img').html(menu_data["menu3"]["draw"]["choki"]["image"]);
                        $('.menu_img3').html(menu_data["menu3"]["draw"]["choki"]["image"]);
                        $('.menu_win_lose3').html('<img src="img/draw.png">');
                    } else if (j_stage == 4) {
                        $('.enemy_no_ken').html('山崎の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu4"]["draw"]["choki"]["message"]);
                        $('.menu4').text(menu_data["menu4"]["draw"]["choki"]["item"]);
                        $('.result_img').html(menu_data["menu4"]["draw"]["choki"]["image"]);
                        $('.menu_img4').html(menu_data["menu4"]["draw"]["choki"]["image"]);
                        $('.menu_win_lose4').html('<img src="img/draw.png">');
                    } else if (j_stage == 5) {
                        $('.enemy_no_ken').html('児玉の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu5"]["draw"]["message"]);
                        $('.menu5').text(menu_data["menu5"]["draw"]["item"]);
                        $('.result_img').html(menu_data["menu5"]["draw"]["image"]);
                        $('.menu_img5').html(menu_data["menu5"]["draw"]["image"]);
                        $('.menu_win_lose5').html('<img src="img/draw.png">');
                        $('.start_bt').hide();
                    }
                    $('.janken_result').fadeIn(300);
                    is_jk_rslt = true;

                    j_stage++;
                } else if (com == 3) {
                    $('.enemy_result').html('<img src="img/pa.png">');
                    $('.win_lose').html('<img src="img/win.png">');
                    playSE("sound/cheers.mp3", "mp3");
                    if (j_stage == 1) {
                        $('.enemy_no_ken').html('田中の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu1"]["win"]["choki"]["message"]);
                        $('.menu1').text(menu_data["menu1"]["win"]["choki"]["item"]);
                        $('.result_img').html(menu_data["menu1"]["win"]["choki"]["image"]);
                        $('.menu_img1').html(menu_data["menu1"]["win"]["choki"]["image"]);
                        $('.menu_win_lose1').html('<img src="img/win.png">');
                    } else if (j_stage == 2) {
                        $('.enemy_no_ken').html('木村の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu2"]["win"]["choki"]["message"]);
                        $('.menu2').text(menu_data["menu2"]["win"]["choki"]["item"]);
                        $('.result_img').html(menu_data["menu2"]["win"]["choki"]["image"]);
                        $('.menu_img2').html(menu_data["menu2"]["win"]["choki"]["image"]);
                        $('.menu_win_lose2').html('<img src="img/win.png">');
                    } else if (j_stage == 3) {
                        $('.enemy_no_ken').html('栗林の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu3"]["win"]["choki"]["message"]);
                        $('.menu3').text(menu_data["menu3"]["win"]["choki"]["item"]);
                        $('.result_img').html(menu_data["menu3"]["win"]["choki"]["image"]);
                        $('.menu_img3').html(menu_data["menu3"]["win"]["choki"]["image"]);
                        $('.menu_win_lose3').html('<img src="img/win.png">');
                    } else if (j_stage == 4) {
                        $('.enemy_no_ken').html('山崎の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu4"]["win"]["choki"]["message"]);
                        $('.menu4').text(menu_data["menu4"]["win"]["choki"]["item"]);
                        $('.result_img').html(menu_data["menu4"]["win"]["choki"]["image"]);
                        $('.menu_img4').html(menu_data["menu4"]["win"]["choki"]["image"]);
                        $('.menu_win_lose4').html('<img src="img/win.png">');
                    } else if (j_stage == 5) {
                        $('.enemy_no_ken').html('児玉の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu5"]["win"]["message"]);
                        $('.menu5').text(menu_data["menu5"]["win"]["item"]);
                        $('.result_img').html(menu_data["menu5"]["win"]["image"]);
                        $('.menu_img5').html(menu_data["menu5"]["win"]["image"]);
                        $('.menu_win_lose5').html('<img src="img/win.png">');
                        $('.start_bt').hide();
                    }
                    $('.janken_result').fadeIn(300);
                    is_jk_rslt = true;

                    j_stage++;
                }
            });

            $('.pa_btn').on("click", function () {
                // Leap じゃんけん検知OFF
                leap_can_track_janken = false;
                // Leap ジェスチャ検知ON
                leap_can_track_gesture = true;

                var humaPar = 3;
                //敵の手を乱数で決める
                var com = Math.floor(Math.random() * 3 + 1);
                if (com == 1) {
                    $('.enemy_result').html('<img src="img/gu.png">');
                    $('.win_lose').html('<img src="img/win.png">');
                    playSE("sound/cheers.mp3", "mp3");
                    if (j_stage == 1) {
                        $('.enemy_no_ken').html('田中の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu1"]["win"]["par"]["message"]);
                        $('.menu1').text(menu_data["menu1"]["win"]["par"]["item"]);
                        $('.result_img').html(menu_data["menu1"]["win"]["par"]["image"]);
                        $('.menu_img1').html(menu_data["menu1"]["win"]["par"]["image"]);
                        $('.menu_win_lose1').html('<img src="img/win.png">');
                    } else if (j_stage == 2) {
                        $('.enemy_no_ken').html('木村の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu2"]["win"]["par"]["message"]);
                        $('.menu2').text(menu_data["menu2"]["win"]["par"]["item"]);
                        $('.result_img').html(menu_data["menu2"]["win"]["par"]["image"]);
                        $('.menu_img2').html(menu_data["menu2"]["win"]["par"]["image"]);
                        $('.menu_win_lose2').html('<img src="img/win.png">');
                    } else if (j_stage == 3) {
                        $('.enemy_no_ken').html('栗林の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu3"]["win"]["par"]["message"]);
                        $('.menu3').text(menu_data["menu3"]["win"]["par"]["item"]);
                        $('.result_img').html(menu_data["menu3"]["win"]["par"]["image"]);
                        $('.menu_img3').html(menu_data["menu3"]["win"]["par"]["image"]);
                        $('.menu_win_lose3').html('<img src="img/win.png">');
                    } else if (j_stage == 4) {
                        $('.enemy_no_ken').html('山崎の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu4"]["win"]["par"]["message"]);
                        $('.menu4').text(menu_data["menu4"]["win"]["par"]["item"]);
                        $('.result_img').html(menu_data["menu4"]["win"]["par"]["image"]);
                        $('.menu_img4').html(menu_data["menu4"]["win"]["par"]["image"]);
                        $('.menu_win_lose4').html('<img src="img/win.png">');
                    } else if (j_stage == 5) {
                        $('.enemy_no_ken').html('児玉の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu5"]["win"]["message"]);
                        $('.menu5').text(menu_data["menu5"]["win"]["item"]);
                        $('.result_img').html(menu_data["menu5"]["win"]["image"]);
                        $('.menu_img5').html(menu_data["menu5"]["win"]["image"]);
                        $('.menu_win_lose5').html('<img src="img/win.png">');
                        $('.start_bt').hide();
                    }
                    $('.janken_result').fadeIn(300);
                    is_jk_rslt = true;

                    j_stage++;
                } else if (com == 2) {
                    $('.enemy_result').html('<img src="img/cho.png">');
                    $('.win_lose').html('<img src="img/lose.png">');
                    playSE("sound/lose.wav", "wav");
                    if (j_stage == 1) {
                        $('.enemy_no_ken').html('田中の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu1"]["lose"]["par"]["message"]);
                        $('.menu1').text(menu_data["menu1"]["lose"]["par"]["item"]);
                        $('.result_img').html(menu_data["menu1"]["lose"]["par"]["image"]);
                        $('.menu_img1').html(menu_data["menu1"]["lose"]["par"]["image"]);
                        $('.menu_win_lose1').html('<img src="img/lose.png">');
                    } else if (j_stage == 2) {
                        $('.enemy_no_ken').html('木村の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu2"]["lose"]["par"]["message"]);
                        $('.menu2').text(menu_data["menu2"]["lose"]["par"]["item"]);
                        $('.result_img').html(menu_data["menu2"]["lose"]["par"]["image"]);
                        $('.menu_img2').html(menu_data["menu2"]["lose"]["par"]["image"]);
                        $('.menu_win_lose2').html('<img src="img/lose.png">');
                    } else if (j_stage == 3) {
                        $('.enemy_no_ken').html('栗林の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu3"]["lose"]["par"]["message"]);
                        $('.menu3').text(menu_data["menu3"]["lose"]["par"]["item"]);
                        $('.result_img').html(menu_data["menu3"]["lose"]["par"]["image"]);
                        $('.menu_img3').html(menu_data["menu3"]["lose"]["par"]["image"]);
                        $('.menu_win_lose3').html('<img src="img/lose.png">');
                    } else if (j_stage == 4) {
                        $('.enemy_no_ken').html('山崎の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu4"]["lose"]["par"]["message"]);
                        $('.menu4').text(menu_data["menu4"]["lose"]["par"]["item"]);
                        $('.result_img').html(menu_data["menu4"]["lose"]["par"]["image"]);
                        $('.menu_img4').html(menu_data["menu4"]["lose"]["par"]["image"]);
                        $('.menu_win_lose4').html('<img src="img/lose.png">');
                    } else if (j_stage == 5) {
                        $('.enemy_no_ken').html('児玉の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu5"]["lose"]["message"]);
                        $('.menu5').text(menu_data["menu5"]["lose"]["item"]);
                        $('.result_img').html(menu_data["menu5"]["lose"]["image"]);
                        $('.menu_img5').html(menu_data["menu5"]["lose"]["image"]);
                        $('.menu_win_lose5').html('<img src="img/lose.png">');
                        $('.start_bt').hide();
                    }
                    $('.janken_result').fadeIn(300);
                    is_jk_rslt = true;

                    j_stage++;
                } else if (com == 3) {
                    $('.enemy_result').html('<img src="img/pa.png">');
                    $('.win_lose').html('<img src="img/draw.png">');
                    playSE("sound/draw.wav", "wav");
                    if (j_stage == 1) {
                        $('.enemy_no_ken').html('田中の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu1"]["draw"]["par"]["message"]);
                        $('.menu1').text(menu_data["menu1"]["draw"]["par"]["item"]);
                        $('.result_img').html(menu_data["menu1"]["draw"]["par"]["image"]);
                        $('.menu_img1').html(menu_data["menu1"]["draw"]["par"]["image"]);
                        $('.menu_win_lose1').html('<img src="img/draw.png">');
                    } else if (j_stage == 2) {
                        $('.enemy_no_ken').html('木村の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu2"]["draw"]["par"]["message"]);
                        $('.menu2').text(menu_data["menu2"]["draw"]["par"]["item"]);
                        $('.result_img').html(menu_data["menu2"]["draw"]["par"]["image"]);
                        $('.menu_img2').html(menu_data["menu2"]["draw"]["par"]["image"]);
                        $('.menu_win_lose2').html('<img src="img/draw.png">');
                    } else if (j_stage == 3) {
                        $('.enemy_no_ken').html('栗林の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu3"]["draw"]["par"]["message"]);
                        $('.menu3').text(menu_data["menu3"]["draw"]["par"]["item"]);
                        $('.result_img').html(menu_data["menu3"]["draw"]["par"]["image"]);
                        $('.menu_img3').html(menu_data["menu3"]["draw"]["par"]["image"]);
                        $('.menu_win_lose3').html('<img src="img/draw.png">');
                    } else if (j_stage == 4) {
                        $('.enemy_no_ken').html('山崎の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu4"]["draw"]["par"]["message"]);
                        $('.menu4').text(menu_data["menu4"]["draw"]["par"]["item"]);
                        $('.result_img').html(menu_data["menu4"]["draw"]["par"]["image"]);
                        $('.menu_img4').html(menu_data["menu4"]["draw"]["par"]["image"]);
                        $('.menu_win_lose4').html('<img src="img/draw.png">');
                    } else if (j_stage == 5) {
                        $('.enemy_no_ken').html('児玉の<span class="bold">拳</span>');
                        $('.result_txt').text(menu_data["menu5"]["draw"]["message"]);
                        $('.menu5').text(menu_data["menu5"]["draw"]["item"]);
                        $('.result_img').html(menu_data["menu5"]["draw"]["image"]);
                        $('.menu_img5').html(menu_data["menu5"]["draw"]["image"]);
                        $('.menu_win_lose5').html('<img src="img/draw.png">');
                        $('.start_bt').hide();
                    }
                    $('.janken_result').fadeIn(300);
                    is_jk_rslt = true;

                    j_stage++;
                }
            });
        });
    });
});
