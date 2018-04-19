window.onload = function() {
  'use strict';

  /**
   * navbar
   */
  $('.navbar .search-icon > i').click( function () {
      let icon = $(this);
      if (icon.text() === 'search') {
        icon.text('close').parents('.content').addClass('searching');
      } else {
        icon.text('search').parents('.content').removeClass('searching');
      }
    });

   /**
    * sidebar
    */
    $('.menu-icon')
      .on('click',function(e) {
        /* 单击菜单按钮，展开边栏 */
        let sidebar = $('.sidebar');
        let navbar = $('.navbar');
        sidebar.show();
        navbar.addClass('navbarMove');

        /* 单击关闭按钮，关闭边栏 */
        $('.close-icon').one('click',function() {
          $('.sidebar').hide();
          $('.navbar').removeClass('navbarMove');
        });

        /* 单击其他空白区域，关闭边栏 */
        $(document).one('click', function() {
          sidebar.hide();
          navbar.removeClass('navbarMove');
        });

        /* 阻止事件冒泡，否则菜单将永远处于隐藏状态 */
        e.stopPropagation();
      });

    $('.sidebar').on('click',function(e) {
      /* 阻止事件冒泡，否则菜单将永远处于隐藏状态 */
      e.stopPropagation();
    });

    /* 从导航栏克隆菜单到边栏 */
    $('.navbar .menu')
      .clone()
      .appendTo('.sidebar');

    /**
     * slide
     */
    /* 复制首尾两张轮播图 */
    $('.slide .item:first').clone().appendTo('.banner');
    $('.slide .item:last').prev().clone().prependTo('.banner');

    /* 手动轮播 */
    // 鼠标单击按钮时
    let banner = $('.banner');
    // 初始化鼠标单击次数，设置为全局变量
    let offset = 0;
    $('.button').click(function () {
      // 避免鼠标单击时，动画未执行完成
      let slideWidth = parseFloat($('.slide').css('width'));
      let bannerLeft = Math.abs(parseFloat(banner.css('left')));
      let times = bannerLeft/slideWidth;
      // 判断当前的偏移量是否是当前轮播图宽度的整数倍，整数倍表示动画执行完成
      if (Math.abs(times - Math.round(times)) < 0.001) {
        // 区分左右
        if (this.id == 'next-button') {
          offset++;
          if (offset == 4) {
            offset = 1;
          }
        } else {
          offset--;
          if (offset == -2) {
            offset = 1;
          }
        }
        animate(offset);
        showCurrentDot(offset);
      }
    });

    /* 动画效果，实现无缝轮播 */
    function animate (animateOffset) {
      // 每次点击后banner的偏移量,考虑初始偏移量为-100%，故加上1
      let newLeft = -100*(animateOffset+1);
      banner.css('left', newLeft+'%');

      // 显示最右边图像后，设置无动画效果，切换回实际的第一张图片
      if (newLeft == -400) {
        setTimeout(function () {
          banner.css('transition', 'none');
          banner.css('left', '-100%');
        },1000);
      }

      // 显示最左边图像时,设置无动画效果，切换回实际的最后一张图片
      else if ( newLeft == 0) {
        setTimeout(function () {
          banner.css('transition', 'none');
          banner.css('left', '-300%');
        },1000);
      }

      // 恢复动画效果
      else {
        banner.css('transition', 'all 1s');
      }

    }

    /* 显示当前图片对应的小圆点 */
    function showCurrentDot(dotOffset) {
      // 超出小圆点的索引值，即移动到最右边和最左边的图像时
      if (dotOffset == 3) {
        dotOffset = 0;
      } else if (dotOffset == -1) {
        dotOffset = 2;
      }
      $('.dots>span').removeClass();
      $('.dots>span:eq('+dotOffset+')').addClass('current-dot');
    }

    /* 鼠标放置于小圆点上时 */
    $('.dots>span').mouseenter( function () {
      // 通过获取id值修改offset的值
      offset = parseInt(this.id)-1;
      $('.dots>span').removeClass();
      this.className = 'current-dot';
      banner.css('transition', 'all 1s');
      let newLeft = this.id * (-100);
      banner.css('left', newLeft+'%');
    });

    /* 自动轮播 */
    var timer;
    function autoPlay() {
      timer = setInterval(function () {
        // 向右轮播
        offset++;
        if (offset == 4) {
          offset = 1;
        }
        animate(offset);
        showCurrentDot(offset);
      }, 3000);
    }
    autoPlay();

    /* 鼠标放置时，轮播停止 */
    $('.slide').mouseenter( function () {
      clearInterval(timer);
    });
    $('.slide').mouseleave( function () {
      autoPlay();
    });

    /**
     * footer 小尺寸屏幕添加手风琴效果
     */
     enquire.register("screen and (max-width: 767px)", {
       match() {
         $('footer .container').addClass('accordion');
         /* 避免绑定多个click事件 */
         $('.accordion .header').off('click.amark');
         $('.accordion .header').on('click.amark', function () {
           $(this).parent().siblings().children('.list').removeClass('active');
           $(this).next().toggleClass('active');
         });
       },
       unmatch() {
         $('footer .container').removeClass('accordion');
       }
     });


     /**
      * 产品页：滚动页面控制视频播放
      */
      window.onscroll = function () {
        // 视频相对于文档的偏移
        if ($('.banner .video').length) {
          let scrollTop = document.documentElement.scrollTop;
          let video =  $('.banner .video');
          let height = parseInt(video.css('height'));
          if (scrollTop/height > 0.5) {
            video.get(0).pause();
          } else {
            video.get(0).play();
          }
        }
      }

      //产品页：固定子导航

     /**
      * 产品页：轮播效果
      */
      // 外观部分
      /* 复制首尾两端文字内容和两张轮播图 */
      $('#exterior-design .text .item:first').clone().appendTo('#exterior-design .text');
      $('#exterior-design .text .item:last').prev().clone().prependTo('#exterior-design .text');
      $('#exterior-design .image .item:lt(2)').clone().appendTo('#exterior-design .image');
      $('#exterior-design .image .item').slice(1,3).clone().prependTo('#exterior-design .image');
      /* 手动轮播 */
      // 鼠标单击按钮时
      let offset2 = 0;
      $('#exterior-design .button').click( function () {
        // 避免鼠标单击时，动画未执行完成
        let containerWidth = parseFloat($('#exterior-design').css('width'));
        let contentLeft = Math.abs(parseFloat($('#exterior-design .text').css('left')));
        let times = contentLeft/containerWidth;
        // 判断当前的偏移量是否是当前轮播图宽度的整数倍，整数倍表示动画执行完成
        if (Math.abs(times - Math.round(times)) < 0.001) {
          // 区分左右
          if (this.id == 'next-button') {
            offset2++;
            if (offset2 == 4) {
              offset2 = 1;
            }
          } else {
            offset2--;
            if (offset2 == -2) {
              offset2 = 1;
            }
          }

          animateOther($('#exterior-design .text'), 100, offset2, 3);
          animateOther($('#exterior-design .image'), 50, offset2, 3);
        }
      });


      /* 动画效果，实现无缝轮播 */
      function animateOther (content, originalLeft, animateOffset, num) {
        // 每次点击后banner的偏移量,考虑存在初始偏移量，故加上1
        let newLeft = -originalLeft*(animateOffset+1);
        content.css('left', newLeft+'%');

        // 显示最右边图像后，设置无动画效果，切换回实际的第一张图片
        if (newLeft == -originalLeft*(num+1)) {
          setTimeout(function () {
            content.css('transition', 'none');
            content.css('left', '-'+originalLeft+'%');
          },1000);
        }

        // 显示最左边图像时,设置无动画效果，切换回实际的最后一张图片
        else if ( newLeft == 0) {
          setTimeout(function () {
            content.css('transition', 'none');
            content.css('left', '-'+(originalLeft*num)+'%');
          },1000);
        }

        // 恢复动画效果
        else {
          content.css('transition', 'all 1s');
        }

      }

      // 内饰部分
      $('#interior-design .text .item:first').clone().appendTo('#interior-design .text');
      $('#interior-design .text .item:last').prev().clone().prependTo('#interior-design .text');
      $('#interior-design .image .item:lt(2)').clone().appendTo('#interior-design .image');
      $('#interior-design .image .item').slice(1,3).clone().prependTo('#interior-design .image');
      /* 手动轮播 */
      // 鼠标单击按钮时
      let offset3 = 0;
      $('#interior-design .button').click( function () {
        // 避免鼠标单击时，动画未执行完成
        let containerWidth = parseFloat($('#interior-design').css('width'));
        let contentLeft = Math.abs(parseFloat($('#interior-design .text').css('left')));
        let times = contentLeft/containerWidth;
        // 判断当前的偏移量是否是当前轮播图宽度的整数倍，整数倍表示动画执行完成
        if (Math.abs(times - Math.round(times)) < 0.001) {
          // 区分左右
          if (this.id == 'next-button') {
            offset3++;
            if (offset3 == 4) {
              offset3 = 1;
            }
          } else {
            offset3--;
            if (offset3 == -2) {
              offset3 = 1;
            }
          }
          animateOther($('#interior-design .text'), 100, offset3, 3);
          animateOther($('#interior-design .image'), 50, offset3, 3);
        }
      });

      // 产品页
      $('#experience .text .item:first').clone().appendTo('#experience .text');
      $('#experience .text .item:last').prev().clone().prependTo('#experience .text');
      $('#experience .image .item:lt(2)').clone().appendTo('#experience .image');
      $('#experience .image .item').slice(1,3).clone().prependTo('#experience .image');
      let offset4 = 0;
      $('#experience .button').click( function () {
        // 避免鼠标单击时，动画未执行完成
        let containerWidth = parseFloat($('#experience').css('width'));
        let contentLeft = Math.abs(parseFloat($('#experience .text').css('left')));
        let times = contentLeft/containerWidth;
        // 判断当前的偏移量是否是当前轮播图宽度的整数倍，整数倍表示动画执行完成
        if (Math.abs(times - Math.round(times)) < 0.001) {
          // 区分左右
          if (this.id == 'next-button') {
            offset4++;
            if (offset4 == 4) {
              offset4 = 1;
            }
          } else {
            offset4--;
            if (offset4 == -2) {
              offset4 = 1;
            }
          }
          animateOther($('#experience .text'), 100, offset4, 3);
          animateOther($('#experience .image'), 50, offset4, 3);
        }
      });

}
