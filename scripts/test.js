window.onload = function() {
  'use strict';
  function carousel (container, text, image, button, textLeft, imageLeft) {
    /* 手动轮播 */
    // 初始化鼠标单击次数，设置为全局变量
    let offset = 0;
    // 鼠标单击按钮时
    button.click(function () {
      // 避免鼠标单击时，动画未执行完成
      let containerWidth = parseFloat(container.css('width'));
      let textLeft = Math.abs(parseFloat(text.css('left')));
      let times = textLeft/containerWidth;
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
      let newLeft1 = -textLeft*(animateOffset+1);
      let newLeft2 = -imageLeft*(animateOffset+1);
      text.css('left', newLeft+'%');
      image.css('left',newLeft+'%');

      // 显示最右边图像后，设置无动画效果，切换回实际的第一张图片
      if (newLeft == -400) {
        setTimeout(function () {
          text.css('transition', 'none');
          text.css('left', '-'+textLeft+'%');
          image.css('transition', 'none');
          image.css('left', '-'+imageLeft+'%');
        },1000);
      }

      // 显示最左边图像时,设置无动画效果，切换回实际的最后一张图片
      else if ( newLeft == 0) {
        setTimeout(function () {
          text.css('transition', 'none');
          content.css('left', '-300%');
        },1000);
      }

      // 恢复动画效果
      else {
        content.css('transition', 'all 1s');
      }

    }

    // /* 显示当前图片对应的小圆点 */
    // function showCurrentDot(dotOffset) {
    //   // 超出小圆点的索引值，即移动到最右边和最左边的图像时
    //   if (dotOffset == 3) {
    //     dotOffset = 0;
    //   } else if (dotOffset == -1) {
    //     dotOffset = 2;
    //   }
    //   $('.dots>span').removeClass();
    //   $('.dots>span:eq('+dotOffset+')').addClass('current-dot');
    // }
    //
    // /* 鼠标放置于小圆点上时 */
    // $('.dots>span').mouseenter( function () {
    //   // 通过获取id值修改offset的值
    //   offset = parseInt(this.id)-1;
    //   $('.dots>span').removeClass();
    //   this.className = 'current-dot';
    //   banner.css('transition', 'all 1s');
    //   let newLeft = this.id * (-100);
    //   banner.css('left', newLeft+'%');
    // });

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
    container.mouseenter( function () {
      clearInterval(timer);
    });
    container.mouseleave( function () {
      autoPlay();
    });

  }
}
