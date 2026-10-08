---
layout: false
title: 组件独立视口预览
head:
  - - script
    - {}
    - |
      (function() {
        var params = new URLSearchParams(window.location.search);
        if (params.get('theme') === 'dark') {
          document.documentElement.classList.add('dark');
        } else if (params.get('theme') === 'light') {
          document.documentElement.classList.remove('dark');
        }
      })();
---

<PreviewFrame />
