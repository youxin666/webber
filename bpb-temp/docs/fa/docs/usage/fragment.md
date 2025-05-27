# :material-playlist-check:{ .md .middle } اشتراک Fragment

![Fragment subscription](../images/fragment-sub.jpg)

!!! tip "**مزایای کانفیگ‌های Fragment**"
    - حتی اگه دامنه اختصاصی یا دامنه Worker توسط ISP فیلتر بشه، بازم وصل می‌شه.
    - پایداری و سرعت رو برای همه اپراتورها، به‌خصوص اونایی که با Cloudflare مشکل دارن، بهبود می‌ده.

## Fragment برای Xray

این بخش برای برنامه‌هایی که از هسته Xray استفاده می‌کنن، مثل v2rayNG، NikaNG و v2rayN PRO، کاربرد داره. کانفیگ‌های واردشده با یه علامت `F` توی اسمشون مشخص شدن. این اشتراک همون تعداد کانفیگ‌های اشتراک **Full Normal** رو داره، اما با تنظیمات Fragment که توی پنل قابل تنظیمن، به‌علاوه کانفیگ‌های **Best Fragment** و **Workerless**. هر تغییری توی تنظیمات پنل با به‌روزرسانی اشتراک روی همه کانفیگ‌ها اعمال می‌شه.

???+ question "کانفیگ Workerless چیه؟"
    کانفیگ Workerless بدون استفاده از Worker، خیلی از وب‌سایت‌ها و برنامه‌های محدودشده (مثل YouTube، Twitter، Google Play و...) رو باز می‌کنه. توجه کنید که این کانفیگ IP شما رو تغییر نمی‌ده، پس برای فعالیت‌هایی که به امنیت یا ناشناس بودن نیاز دارن، مناسب نیست. تنظیمات پنل روی این کانفیگ اعمال می‌شه، به جز Chain Proxy.

???+ question "کانفیگ Best Fragment چیه؟"
    کانفیگ Best Fragment هجده تنظیم مختلف Fragment رو تست می‌کنه و بر اساس عملکرد اپراتور شما، سریع‌ترین رو انتخاب می‌کنه. این حالت‌های Fragment برای پوشش همه سناریوهای ممکن طراحی شدن و کانفیگ هر 30 ثانیه همه حالت‌ها رو تست می‌کنه و به بهترینش متصل می‌شه. جزئیات پیشرفته تنظیمات Fragment رو می‌تونید [اینجا](../configuration/fragment.md) ببینید.

## Fragment برای Hiddify

خیلی از تنظیمات پنل توی این اشتراک اعمال نمی‌شن، چون Hiddify بیشتر تنظیمات رو خودش کنترل می‌کنه. موارد زیر باید به‌صورت دستی توی Hiddify تنظیم بشن:

1. Remote DNS
2. Local DNS
3. Routing

!!! warning "هشدار"
    تنظیمات Fragment پنل، فقط اگه حالت Fragment رو توی Hiddify غیرفعال کنید، اعمال می‌شن.

!!! danger "خطر"
    مطمئن بشید Remote DNS توی Hiddify روی یه سرور DNS از نوع DoH، DoT یا TCP تنظیم شده. چند مثال:
    ```title="DoH"
    https://8.8.8.8/dns-query
    ```
    ```title="DoT"
    tls://8.8.8.8  
    ```
    ```title="TCP"
    tcp://8.8.8.8  
    ```

یا می‌تونید اشتراک **Normal** رو توی Hiddify وارد کنید و Fragment رو به‌صورت دستی فعال کنید، همون‌طور که توی تصویر زیر نشون داده شده:

![Fragment subscription for Hiddify](../images/hiddify-fragment.jpg)
