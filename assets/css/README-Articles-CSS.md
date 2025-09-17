# Articles CSS System - راهنمای استفاده

## 📋 توضیحات کلی

این سیستم CSS برای مدیریت استایل‌های مقالات طراحی شده است. هر مقاله می‌تواند تم رنگی مخصوص خودش را داشته باشد بدون اینکه با صفحه اصلی یا مقالات دیگر تداخل داشته باشد.

## 🎨 تم‌های رنگی موجود

### 1. OpenVPN Article (نارنجی)
```css
.article-openvpn {
  --article-primary: #ff8d19;      /* نارنجی اصلی */
  --article-accent: #0c3a53;       /* آبی تیره */
  --article-secondary: #1a5490;    /* آبی مکمل */
}
```

### 2. Website Blocking Article (قرمز/آبی/کرم)
```css
.article-blocking {
  --article-primary: #d04338;      /* قرمز */
  --article-accent: #3388a5;       /* آبی */
  --article-secondary: #e7e3cc;    /* کرم */
}
```

### 3. Network Security Article (سبز/آبی)
```css
.article-security {
  --article-primary: #059669;      /* سبز */
  --article-accent: #1e40af;       /* آبی */
  --article-secondary: #f0f9ff;    /* سفید مایل به آبی */
}
```

### 4. Linux Article (بنفش/نارنجی)
```css
.article-linux {
  --article-primary: #7c3aed;      /* بنفش */
  --article-accent: #ea580c;       /* نارنجی */
  --article-secondary: #fef3c7;    /* زرد کمرنگ */
}
```

## 📁 ساختار فایل‌ها

```
assets/css/
├── main.css              # استایل‌های اصلی سایت
├── articles.css          # استایل‌های مقالات
└── rtl.css               # پشتیبانی RTL اصلی سایت
```

## 🚀 نحوه استفاده

### 1. ایجاد مقاله جدید

برای ایجاد یک مقاله جدید با تم رنگی مخصوص:

#### الف) تعریف تم جدید در `articles.css`:
```css
.article-newtheme {
  --article-primary: #your-color;
  --article-primary-hover: #your-hover-color;
  --article-accent: #your-accent-color;
  --article-shadow: rgba(your-color, 0.1);
  --article-gradient: linear-gradient(135deg, #your-color, #your-accent);
  --article-secondary: #your-secondary-color;
  --article-text-light: rgba(your-text-color, 0.9);
  --article-text-medium: rgba(your-text-color, 0.8);
  --article-bg-light: rgba(your-color, 0.1);
  --article-bg-medium: rgba(your-color, 0.05);
}
```

#### ب) اضافه کردن کلاس به `<body>`:
```html
<body class="article-page article-newtheme">
```

#### ج) اضافه کردن لینک‌های CSS:
```html
<link href="../assets/css/main.css?v=999" rel="stylesheet" />
<link href="../assets/css/articles.css?v=999" rel="stylesheet" />
<link href="../assets/css/rtl.css?v=999" rel="stylesheet" />
```

### 2. استفاده از کامپوننت‌های آماده

#### کد بلاک:
```html
<div class="code-block">
  <div class="code-header">
    <span class="code-lang">MikroTik</span>
    <button class="copy-btn">کپی</button>
  </div>
  <pre><code>/ip firewall filter add chain=forward dst-address=1.1.1.1 action=drop</code></pre>
</div>
```

#### جعبه نکات:
```html
<div class="highlight-box">
  <h4>نکته مهم</h4>
  <ul>
    <li>نکته اول</li>
    <li>نکته دوم</li>
  </ul>
</div>
```

#### کارت متد:
```html
<div class="method-card">
  <div class="method-number-badge">1</div>
  <div class="method-icon">🔒</div>
  <h3 class="method-title">عنوان متد</h3>
  <p class="method-description">توضیحات متد</p>
  <div class="method-tips">
    <h4>نکات مهم</h4>
    <ul>
      <li>نکته اول</li>
    </ul>
  </div>
</div>
```

#### مزایا و معایب:
```html
<div class="method-pros-cons">
  <div class="pros">
    <h5>مزایا</h5>
    <ul>
      <li>مزیت اول</li>
    </ul>
  </div>
  <div class="cons">
    <h5>معایب</h5>
    <ul>
      <li>عیب اول</li>
    </ul>
  </div>
</div>
```

## 🎯 ویژگی‌های کلیدی

### 1. متغیرهای CSS
تمام رنگ‌ها با متغیرهای CSS تعریف شده‌اند که امکان تغییر آسان را فراهم می‌کند.

### 2. پشتیبانی RTL
فایل `rtl.css` اصلی پشتیبانی کامل از راست به چپ را فراهم می‌کند.

### 3. ریسپانسیو
تمام کامپوننت‌ها برای موبایل و دسکتاپ بهینه شده‌اند.

### 4. انیمیشن‌ها
انیمیشن‌های نرم و زیبا برای بهبود تجربه کاربری.

### 5. دسترسی‌پذیری
رعایت استانداردهای WCAG 2.1 AA برای دسترسی‌پذیری.

## 🔧 تنظیمات پیشرفته

### تغییر رنگ‌های خاص:
```css
.article-yourtheme .method-card {
  border-left-color: #custom-color;
}

.article-yourtheme .code-block .code-header {
  background: linear-gradient(135deg, #custom-color1, #custom-color2);
}
```

### اضافه کردن انیمیشن جدید:
```css
@keyframes yourAnimation {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.article-yourtheme .your-element {
  animation: yourAnimation 2s ease-in-out infinite;
}
```

## 📱 تست و بررسی

### بررسی در مرورگرهای مختلف:
- Chrome/Edge (Windows)
- Firefox (Windows/Linux)
- Safari (macOS/iOS)

### بررسی ریسپانسیو:
- موبایل (320px - 768px)
- تبلت (768px - 1024px)
- دسکتاپ (1024px+)

### بررسی RTL:
- تغییر `dir="rtl"` در HTML
- بررسی تراز متن‌ها
- بررسی جهت border ها

## 🐛 رفع مشکلات رایج

### مشکل: رنگ‌ها اعمال نمی‌شوند
**راه حل**: بررسی کنید که کلاس `article-page` و کلاس تم روی `<body>` اضافه شده باشد.

### مشکل: RTL درست کار نمی‌کند
**راه حل**: مطمئن شوید که `rtl.css` لود شده و `dir="rtl"` در HTML تنظیم شده باشد.

### مشکل: کد بلاک‌ها در RTL خراب می‌شوند
**راه حل**: کد بلاک‌ها همیشه LTR هستند و این طبیعی است.

## 📞 پشتیبانی

برای سوالات و مشکلات:
- ایمیل: amirhossein.jalalian@gmail.com
- GitHub: [لینک ریپازیتوری]

---

**نکته**: این سیستم به‌طور مداوم به‌روزرسانی می‌شود. برای آخرین تغییرات، فایل README را بررسی کنید.
