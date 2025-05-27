# :material-playlist-check:{ .md .middle } Fragment subscription

![Fragment subscription](../images/fragment-sub.jpg)

!!! tip "**Benefits of Fragment configs**"
    - Maintains connectivity even if the Custom Domain or Worker domain is blocked by the ISP.
    - Enhances stability and speed across all ISPs, particularly those experiencing disruptions with Cloudflare.

## Fragment for Xray

This applies to clients using the Xray core, such as v2rayNG, NikaNG, and v2rayN PRO. Imported configs are marked with an `F` flag in their names. This subscription provides the same number of configs as the **Full Normal** subscription, enhanced with fragment settings adjustable in the panel, plus **Best Fragment** and **Workerless** configs. Any panel setting changes are applied to all configs upon subscription update.

???+ question "What is the Workerless config?"
    The Workerless config unblocks many restricted websites and applications (e.g., YouTube, Twitter, Google Play...) without using a Worker. Note that this config does not change your local IP, so avoid using it for activities requiring security or anonymity. Fragment setting changes apply to this config, except for Chain Proxy.

???+ question "What is the Best Fragment config?"
    The Best Fragment config tests 18 different fragment settings, selecting the fastest based on your ISP’s performance. These modes are designed to cover all primary scenarios, with the config testing all modes every 30s and connecting to the optimal one. Advanced fragment settings are detailed [here](../configuration/fragment.md).

## Fragment for Hiddify

Many panel settings are not applied to this subscription, as Hiddify overrides most settings. The following must be configured manually in Hiddify:

1. Remote DNS
2. Local DNS
3. Routing

!!! warning
    Fragment settings from the panel are applied only if you disable fragment mode in Hiddify.

!!! danger
    Ensure the Remote DNS in Hiddify is set to a DoH, DoT, or TCP DNS server. Examples:
    ```title="DoH"
    https://8.8.8.8/dns-query
    ```
    ```title="DoT"
    tls://8.8.8.8  
    ```
    ```title="TCP"
    tcp://8.8.8.8  
    ```

Alternatively, you can import the **Normal** subscription into Hiddify and manually enable fragment, as shown below:

![Fragment subscription for Hiddify](../images/hiddify-fragment.jpg)
