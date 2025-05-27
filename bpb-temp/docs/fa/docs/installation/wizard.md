# :material-new-box:{ .md .middle } راه‌اندازی Workers و Pages - Wizard

برای ساده‌تر کردن فرآیند راه‌اندازی و جلوگیری از اشتباهات کاربرها، پروژه [BPB Wizard](https://github.com/bia-pain-bache/BPB-Wizard) راه‌اندازی شده. این ابزار از هر دو روش Workers و Pages پشتیبانی می‌کنه و استفاده ازش خیلی توصیه می‌شه.

![ویزارد BPB](../images/wizard.jpg)

## ۱. حساب Cloudflare

برای استفاده از این روش، فقط به یه حساب Cloudflare نیاز دارید. می‌تونید [از اینجا ثبت‌نام کنید](https://dash.cloudflare.com/sign-up/). بعدش یادتون نره ایمیلتون رو چک کنید تا حساب رو تأیید کنید.

## ۲. نصب پنل BPB

!!! warning
    اگه به VPN وصل هستید، قطعش کنید.

### Windows، Linux و macOS

بر اساس سیستم‌عاملتون، [فایل ZIP رو دانلود کنید](https://github.com/bia-pain-bache/BPB-Wizard/releases/latest)، از حالت فشرده خارج کنید و برنامه رو اجرا کنید.

### Android

کاربرای اندروید که Termux رو روی گوشیشون نصب کردن، می‌تونن با کپی کردن کد زیر توی Termux پنل BPB رو نصب کنن:

```bash title="ARM v8"
curl -L -# -o BPB-Wizard.tar.gz https://github.com/bia-pain-bache/BPB-Wizard/releases/latest/download/BPB-Wizard-linux-arm64.tar.gz && tar xzf BPB-Wizard.tar.gz && chmod +x ./BPB-Wizard-linux-arm64 && ./BPB-Wizard-linux-arm64
```

```bash title="ARM v7"
curl -L -# -o BPB-Wizard.tar.gz https://github.com/bia-pain-bache/BPB-Wizard/releases/latest/download/BPB-Wizard-linux-arm.tar.gz && tar xzf BPB-Wizard.tar.gz && chmod +x ./BPB-Wizard-linux-arm && ./BPB-Wizard-linux-arm
```

!!! warning
    حتماً Termux رو فقط از [منبع رسمی](https://github.com/termux/termux-app/releases/latest) دانلود و نصب کنید. نصب از گوگل پلی ممکنه مشکلاتی ایجاد کنه.

اولین سؤال اینه که می‌خواید یه پنل جدید بسازید یا پنل‌های موجود توی حساب رو ویرایش کنید.

بعدش وارد حساب Cloudflare شما می‌شه و ازتون اجازه دسترسی میخواد، به ترمینال برمی‌گرده و چندتا سؤال ازتون می‌پرسه.

اگه گزینه ۱ رو انتخاب کرده باشید، یه سری سؤال درباره تنظیمات می‌پرسه. می‌تونید از مقادیر پیش‌فرض استفاده کنید یا مقادیر خودتون رو وارد کنید. در نهایت، پنل رو توی مرورگرتون باز می‌کنه — همین!

!!! note
    برای هر تنظیماتی که می‌پرسه، یه مقدار امن و شخصی‌سازی‌شده از قبل براتون ساخته. می‌تونید فقط Enter بزنید تا همون رو قبول کنه و بره سؤال بعدی، یا مقادیر خودتون رو وارد کنید.

اگه گزینه ۲ رو انتخاب کرده باشید، لیست پروژه‌های Workers و Pages ساخته شده رو نشون می‌ده و می‌تونید انتخاب کنید کدوم رو ویرایش کنید.

## به‌روزرسانی پنل

فقط Wizard رو اجرا کنید و برای سؤال اول گزینه ۲ رو انتخاب کنید. یه لیست از اسم پروژه‌های توی حسابتون نشون می‌ده — می‌تونید هر کدوم رو به آخرین نسخه آپدیت کنید یا کلا حذف کنید.
