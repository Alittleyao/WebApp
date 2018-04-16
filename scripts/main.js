window.onload = function() {
  'use strict';

  /**
   * navbar
   */
   $('.navbar .search-icon > i')
    .click(function () {
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
     * 产品页：滚动页面控制视频播放
     */
     window.onscroll = function () {
       // 视频相对于文档的偏移
       let scrollTop = document.documentElement.scrollTop;
       let video =  $('.banner .video');
       let height = parseInt(video.css('height'));
       console.log(height);
       if (scrollTop/height > 0.5) {
         video.get(0).pause();
       } else {
         video.get(0).play();
       }
     }


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
}
