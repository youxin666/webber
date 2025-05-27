import { Authenticate, generateJWTToken, resetPassword } from "../authentication/auth";
import { getClashNormalConfig, getClashWarpConfig } from "../cores-configs/clash";
import { extractWireguardParams } from "../cores-configs/helpers";
import { getHiddifyWarpConfigs, getNormalConfigs } from "../cores-configs/normalConfigs";
import { getSingBoxCustomConfig, getSingBoxWarpConfig } from "../cores-configs/sing-box";
import { getXrayCustomConfigs, getXrayWarpConfigs } from "../cores-configs/xray";
import { getDataset, updateDataset } from "../kv/handlers";
import JSZip from "jszip";
import { fetchWarpConfigs } from "../protocols/warp";

export function isValidUUID(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}

export async function handlePanel(request, env) {

    switch (pathName) {
        case '/panel':
            return await renderPanel(request, env);

        case '/panel/settings':
            return await getSettings(request, env);

        case '/panel/update-settings':
            return await updateSettings(request, env);

        case '/panel/reset-settings':
            return await resetSettings(request, env);

        case '/panel/reset-password':
            return await resetPassword(request, env);

        case '/panel/my-ip':
            return await getMyIP(request);

        case '/panel/update-warp':
            return await updateWarpConfigs(request, env);

        case '/panel/get-warp-configs':
            return await getWarpConfigs(request, env);

        default:
            return await fallback(request);
    }
}

export async function handleError(error) {
    const message = encodeURIComponent(error.message);
    return Response.redirect(`${urlOrigin}/error?message=${message}`, 302);
}

export async function handleLogin(request, env) {
    if (pathName === '/login') return await renderLogin(request, env);
    if (pathName === '/login/authenticate') return await generateJWTToken(request, env);
    return await fallback(request);
}

export async function handleSubscriptions(request, env) {
    const { proxySettings } = await getDataset(request, env);
    Object.entries(proxySettings).forEach(([Key, Value]) => {
        globalThis[Key] = Value;
    })

    switch (decodeURIComponent(pathName)) {
        case `/sub/normal/${subPath}`:
            return await getNormalConfigs(false);

        case `/sub/full-normal/${subPath}`:
            if (client === 'sfa') return await getSingBoxCustomConfig(env);
            if (client === 'clash') return await getClashNormalConfig(env);
            if (client === 'xray') return await getXrayCustomConfigs(env, false);

        case `/sub/fragment/${subPath}`:
            if (client === 'hiddify-frag') return await getNormalConfigs(true);
            return await getXrayCustomConfigs(env, true);

        case `/sub/warp/${subPath}`:
            if (client === 'clash') return await getClashWarpConfig(request, env, false);
            if (client === 'singbox') return await getSingBoxWarpConfig(request, env);
            if (client === 'hiddify') return await getHiddifyWarpConfigs(false);
            return await getXrayWarpConfigs(request, env, false);

        case `/sub/warp-pro/${subPath}`:
            if (client === 'clash-pro') return await getClashWarpConfig(request, env, true);
            if (client === 'hiddify-pro') return await getHiddifyWarpConfigs(true);
            return await getXrayWarpConfigs(request, env, true);

        default:
            return await fallback(request);
    }
}

async function updateSettings(request, env) {
    if (request.method === 'POST') {
        const auth = await Authenticate(request, env);
        if (!auth) return await respond(false, 401, 'Unauthorized or expired session.');
        const proxySettings = await updateDataset(request, env);
        return await respond(true, 200, null, proxySettings);
    }

    return await respond(false, 405, 'Method not allowed.');
}

async function resetSettings(request, env) {
    if (request.method === 'POST') {
        const auth = await Authenticate(request, env);
        if (!auth) return await respond(false, 401, 'Unauthorized or expired session.');
        const proxySettings = await updateDataset(request, env);
        return await respond(true, 200, null, proxySettings);
    }

    return await respond(false, 405, 'Method not allowed!');
}

async function getSettings(request, env) {
    try {
        const isPassSet = await env.kv.get('pwd') ? true : false;
        const auth = await Authenticate(request, env);
        if (!auth) return await respond(false, 401, 'Unauthorized or expired session.', { isPassSet });
        const { proxySettings } = await getDataset(request, env);
        const settings = {
            proxySettings,
            isPassSet,
            subPath: subPath
        };

        return await respond(true, 200, null, settings);
    } catch (error) {
        throw new Error(error);
    }
}

export async function fallback(request) {
    const url = new URL(request.url);
    url.hostname = fallbackDomain;
    url.protocol = 'https:';
    const newRequest = new Request(url.toString(), {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: 'manual'
    });

    return await fetch(newRequest);
}

async function getMyIP(request) {
    const ip = await request.text();
    try {
        const response = await fetch(`http://ip-api.com/json/${ip}?nocache=${Date.now()}`);
        const geoLocation = await response.json();
        return await respond(true, 200, null, geoLocation);
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return await respond(false, 500, `Error fetching IP address: ${error}`)
    }
}

async function getWarpConfigs(request, env) {
    const isPro = client === 'amnezia';
    const auth = await Authenticate(request, env);
    if (!auth) return new Response('Unauthorized or expired session.', { status: 401 });
    const { warpConfigs } = await getDataset(request, env);
    const warpConfig = extractWireguardParams(warpConfigs, false);
    const { warpIPv6, publicKey, privateKey } = warpConfig;
    const zip = new JSZip();
    const trimLines = (string) => string.split("\n").map(line => line.trim()).join("\n");
    const amneziaNoise = isPro
        ?
        `Jc = ${amneziaNoiseCount}
        Jmin = ${amneziaNoiseSizeMin}
        Jmax = ${amneziaNoiseSizeMax}
        S1 = 0
        S2 = 0
        H1 = 0
        H2 = 0
        H3 = 0
        H4 = 0`
        : '';

    try {
        warpEndpoints.forEach((endpoint, index) => {
            zip.file(`BPB-Warp-${index + 1}.conf`, trimLines(
                `[Interface]
                PrivateKey = ${privateKey}
                Address = 172.16.0.2/32, ${warpIPv6}
                DNS = 1.1.1.1, 1.0.0.1
                MTU = 1280
                ${amneziaNoise}
                [Peer]
                PublicKey = ${publicKey}
                AllowedIPs = 0.0.0.0/0, ::/0
                Endpoint = ${endpoint}
                PersistentKeepalive = 25`
            ));
        });

        const zipBlob = await zip.generateAsync({ type: "blob" });
        const arrayBuffer = await zipBlob.arrayBuffer();
        return new Response(arrayBuffer, {
            headers: {
                "Content-Type": "application/zip",
                "Content-Disposition": `attachment; filename="BPB-Warp-${isPro ? "Pro-" : ""}configs.zip"`,
            },
        });
    } catch (error) {
        return new Response(`Error generating ZIP file: ${error}`, { status: 500 });
    }
}

export async function serveIcon() {
    const faviconBase64 = __ICON__;
    return new Response(Uint8Array.from(atob(faviconBase64), c => c.charCodeAt(0)), {
        headers: {
            'Content-Type': 'image/x-icon',
            'Cache-Control': 'public, max-age=86400',
        }
    });
}

async function renderPanel(request, env) {
    const pwd = await env.kv.get('pwd');
    if (pwd) {
        const auth = await Authenticate(request, env);
        if (!auth) return Response.redirect(`${urlOrigin}/login`, 302);
    }

    const html = __PANEL_HTML_CONTENT__.replace(/__PANEL_VERSION__/g, panelVersion);
    return new Response(html, {
        headers: { 'Content-Type': 'text/html' }
    });
}

async function renderLogin(request, env) {
    const auth = await Authenticate(request, env);
    if (auth) return Response.redirect(`${urlOrigin}/panel`, 302);

    const html = __LOGIN_HTML_CONTENT__.replace(/__PANEL_VERSION__/g, panelVersion);
    return new Response(html, {
        headers: { 'Content-Type': 'text/html' }
    });
}

export async function renderSecrets() {
    const html = __SECRETS_HTML_CONTENT__.replace(/__PANEL_VERSION__/g, panelVersion);
    return new Response(html, {
        headers: { 'Content-Type': 'text/html' },
    });
}

export async function renderError() {
    const html = __ERROR_HTML_CONTENT__.replace(/__PANEL_VERSION__/g, panelVersion);
    return new Response(html, {
        status: 200,
        headers: { 'Content-Type': 'text/html' }
    });
}

async function updateWarpConfigs(request, env) {
    if (request.method === 'POST') {
        const auth = await Authenticate(request, env);
        if (!auth) return await respond(false, 401, 'Unauthorized.');
        try {
            await fetchWarpConfigs(env);
            return await respond(true, 200, 'Warp configs updated successfully!');
        } catch (error) {
            console.log(error);
            return await respond(false, 500, `An error occurred while updating Warp configs: ${error}`);
        }
    }

    return await respond(false, 405, 'Method not allowd.');
}

export async function respond(success, status, message, body, customHeaders) {
    return new Response(JSON.stringify({
        success,
        status,
        message: message || '',
        body: body || ''
    }), {
        headers: customHeaders || {
            'Content-Type': message ? 'text/plain' : 'application/json'
        }
    });
}