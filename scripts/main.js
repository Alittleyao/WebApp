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
      .appendTo('.sidebar')
}
