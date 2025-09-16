# راهنمای تم‌های رنگی مقالات / Article Color Themes Guide

## نحوه استفاده / How to Use

برای هر مقاله جدید، فقط کافی است کلاس مخصوص آن را به تگ `<body>` اضافه کنید:

### تم‌های موجود / Available Themes:

#### 1. OpenVPN (نارنجی) - فعلی
```html
<body class="article-page article-openvpn">
```
- رنگ: نارنجی (#ff8d19)
- مناسب برای: مقالات VPN، شبکه، امنیت

#### 2. Linux (قرمز)
```html
<body class="article-page article-linux">
```
- رنگ: قرمز (#f56565)
- مناسب برای: مقالات لینوکس، سرور، DevOps

#### 3. Windows (آبی روشن)
```html
<body class="article-page article-windows">
```
- رنگ: آبی روشن (#4299e1)
- مناسب برای: مقالات ویندوز، Microsoft

#### 4. Security (بنفش)
```html
<body class="article-page article-security">
```
- رنگ: بنفش (#9f7aea)
- مناسب برای: مقالات امنیت، هکینگ، پن‌تست

#### 5. Networking (سبز آبی)
```html
<body class="article-page article-networking">
```
- رنگ: سبز آبی (#38b2ac)
- مناسب برای: مقالات شبکه، روتر، سوئیچ

## اضافه کردن تم جدید / Adding New Theme

برای اضافه کردن تم جدید:

1. در `main.css` تم جدید اضافه کنید:
```css
.article-newtheme {
  --article-primary: #your-color;
  --article-primary-hover: #your-hover-color;
  --article-accent: #your-color;
  --article-shadow: rgba(your-rgb, 0.1);
  --article-gradient: linear-gradient(135deg, #your-color, #your-hover-color);
}
```

2. استایل‌های مشترک را اضافه کنید:
```css
.article-newtheme .article-banner .banner-card,
.article-newtheme .btn-primary,
.article-newtheme .article-category,
.article-newtheme .stat-item .stat-icon {
  /* استایل‌های مشترک */
}
```

3. در HTML مقاله:
```html
<body class="article-page article-newtheme">
```

## مثال کامل / Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- head content -->
</head>
<body class="article-page article-linux">
    <!-- article content -->
</body>
</html>
```

این کار باعث می‌شود که:
- بنر مقاله رنگ قرمز داشته باشد
- دکمه‌های اصلی قرمز باشند
- آیکون‌های آمار قرمز باشند
- دسته‌بندی مقاله قرمز باشد
