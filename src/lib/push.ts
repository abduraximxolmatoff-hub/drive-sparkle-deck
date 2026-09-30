import { supabase } from "@/integrations/supabase/client";
import { VAPID_PUBLIC_KEY } from "@/lib/reminders";

export type PushResult = "registered" | "unsupported" | "open-in-new-tab" | "denied" | "error";

function urlBase64ToUint8Array(base64: string) {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const raw = atob((base64 + padding).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

/** Call from a click handler. Saves the device subscription for the signed-in user. */
export async function enablePush(userId: string): Promise<PushResult> {
  if (!("Notification" in window) || !("serviceWorker" in navigator) || !("PushManager" in window))
    return "unsupported";
  if (window.top !== window.self) return "open-in-new-tab";
  const perm =
    Notification.permission === "granted" ? "granted" : await Notification.requestPermission();
  if (perm !== "granted") return "denied";
  try {
    const reg = await navigator.serviceWorker.register("/sw.js");
    await navigator.serviceWorker.ready;
    const sub =
      (await reg.pushManager.getSubscription()) ??
      (await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      }));
    const json = sub.toJSON();
    const { error } = await supabase.from("push_subscriptions").upsert(
      {
        user_id: userId,
        endpoint: sub.endpoint,
        p256dh: json.keys?.p256dh ?? "",
        auth: json.keys?.auth ?? "",
      },
      { onConflict: "endpoint" },
    );
    if (error) throw error;
    return "registered";
  } catch (e) {
    console.error("Push setup failed", e);
    return "error";
  }
}
