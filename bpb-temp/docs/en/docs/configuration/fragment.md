# :material-cog-outline:{ .md .middle } Fragment settings

Fragment solution almost solves Clean IP issue for Cloudflare CDN by hiding SNI from MitM, however, settings should be obtained based on ISP.

![Fragment settings](../images/fragment-settings.jpg)

By default, settings are:

- **Length**: 100-200
- **Interval**: 1-1
- **Packets**: tlshello

You can set the parameters based on your ISP's situation.

!!! info

    * Packets have multiple modes. However, `tlshello` only applies to **TLS configurations**; ports like 80, 8080, etc., are not affected.
    * Mode `1-1` works on **NikaNG** and **MahsaNG** clients on **non-TLS** ports.

!!! tip "Tip for Iranians"
    Currently, fragment performance is significantly more efficient on clients using the **Xray Knocker core**, specifically **NikaNG**, **MahsaNG** and **v2rayN PRO** clients. This core was developed and customized for conditions in Iran.

!!! tip
    If you cannot find the optimum fragment settings for your ISP, there is a **Best fragment** configuration available in the subscription. Simply connect to it and wait a short while; it tests nearly all valid fragment settings and automatically connects to the best one.

!!! note
    Fragment values have maximum limits. The Length cannot exceed 500, and the Interval cannot exceed 30ms.
