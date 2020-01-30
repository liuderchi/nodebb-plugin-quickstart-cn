"use strict";

/* globals document, $ */

$(document).ready(function() {
  /*
  这个文件告诉我们：如何引入一个客户端 js 脚本
  在 `plugin.json` 中，你可以发现本文件列在 "scripts" 字段中。
  那个数组的意义是告知 NodeBB 构建时，需要引入并优化的客户端 js 脚本。

  这些方法你很可能会用到：

  $(document).ready();   当 DOM 加载完毕时会触发。
  $(window).on('action:ajaxify.end', function(data) { ... });  注："data" 包含 "url"
  Ajax 请求完成后触发，更明确的表述： Ajax操作完成， 并切换路由后触发。
 */

  // run in home page
  console.log("in main.js");
  console.log("nodebb-plugin-quickstart: 已载入");
  // 注意：这个会在着陆页触发。

  // fetch categories
  let categories = [];
  if (location && location.origin) {
    fetch(`${location.origin}/api`)
      .then(r => r.json())
      .then(data => {
        categories = (data.categories || []).map(({ name, icon, slug }) => {
          const html = `<li class=""><a class="navigation-link" href="/category/${slug}" title="" data-original-title="${name}"><i class="fa fa-fw ${icon}" data-content=""></i><span class="visible-xs-inline"> ${name}</span></a></li>`;
          return { name, icon, href: `/category/${slug}`, html };
        });
        // append nodes
        setTimeout(() => {
          const ulDom = document.querySelector("ul.menu-section-list");
          // TODO wait until ulDom has children
          const liDom = ulDom.querySelector("li:nth-child(2)");
          categories.forEach(c => {
            ulDom.insertBefore($.parseHTML(c.html)[0], liDom);
          });
        }, 500);
      })
      .catch(console.error);
  }
});
