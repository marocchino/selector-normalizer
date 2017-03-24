# Selector Normalizer

Scripts that normalize selector to kebab case

```html
<header class="mainHeader">
  <div class="head_01">
    <div class="head01_inner">
      <p class="siteDisc">サイトです</p>
      <ul class="firstMenu">
        <li><a href="">新規会員登録</a></li>
        <li><a href="">ログイン</a></li>
        <li><a href="">ご利用ガイド</a></li>
      </ul>
    </div>
  </div>
</header>
```

```html
<header class="main-header">
  <div class="head01">
    <div class="head01-inner">
      <p class="site-disc">サイトです</p>
      <ul class="first-menu">
        <li><a href="">新規会員登録</a></li>
        <li><a href="">ログイン</a></li>
        <li><a href="">ご利用ガイド</a></li>
      </ul>
    </div>
  </div>
</header>
```

## Usage

```vue
node html-kebab.js path/to/dir/
```
