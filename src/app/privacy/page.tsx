import Link from "next/link";
import { ArrowLeft, Check, Mail } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — Lockin",
  description:
    "Lockin does not collect, transmit, sell, or share any personal data. Everything stays on your device.",
};

const INFO_TABLE = [
  {
    data: "List of installed apps",
    why: "So you can choose which apps to block in the app picker",
    where: "In memory while picking; your blocked-app selection is saved on-device",
  },
  {
    data: "Foreground app / window events (via the Accessibility Service)",
    why: "To detect when a blocked app opens and show the blocking overlay",
    where: "Not stored; evaluated in the moment and discarded",
  },
  {
    data: "Blocking sessions (start time, end time, duration, how it ended)",
    why: "To show your session summary and accumulate on-device history for stats",
    where: "On-device app storage",
  },
  {
    data: "Alarms (time, label, repeat days, enabled)",
    why: "To schedule and ring your alarms",
    where: "On-device app storage",
  },
  {
    data: "NFC tag data",
    why: "Reading your Lockin tag toggles blocking or dismisses an alarm",
    where: "Read at tap time; the tag's identifier is not collected or stored off-device",
  },
  {
    data: "App settings (theme, strict mode, emergency-unlock count, grace period)",
    why: "To run the app's features",
    where: "On-device app storage",
  },
];

const PERMISSIONS_TABLE = [
  { perm: "NFC", purpose: "Read your Lockin tag to toggle blocking / dismiss alarms" },
  {
    perm: "QUERY_ALL_PACKAGES",
    purpose: "List your installed apps so you can select which to block",
  },
  {
    perm: "Accessibility Service",
    purpose: "Detect the foreground app and show the blocking overlay (see above)",
  },
  {
    perm: "SYSTEM_ALERT_WINDOW",
    purpose: "Draw the full-screen blocking overlay over blocked apps",
  },
  {
    perm: "SCHEDULE_EXACT_ALARM / USE_EXACT_ALARM",
    purpose: "Ring alarms at the exact time you set, even in Doze",
  },
  {
    perm: "RECEIVE_BOOT_COMPLETED",
    purpose: "Re-register your alarms after the device restarts",
  },
  { perm: "POST_NOTIFICATIONS", purpose: "Show the ongoing alarm notification" },
  { perm: "VIBRATE", purpose: "Vibrate when an alarm fires" },
  {
    perm: "FOREGROUND_SERVICE / FOREGROUND_SERVICE_MEDIA_PLAYBACK",
    purpose: "Reliably play the alarm sound as a foreground service",
  },
  {
    perm: "Device Administrator",
    purpose: "Prevent uninstall during a strict-mode session (see above)",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
          <div className="flex items-center gap-2 font-display">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-emerald-600" />
            <span className="font-semibold">Lockin</span>
          </div>
          <div className="w-[88px]" aria-hidden />
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <span className="text-xs md:text-sm uppercase tracking-[0.22em] text-emerald-700 mb-4 block">
          Legal
        </span>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter leading-tight">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-neutral-500">Last updated: 29 May 2026</p>

        <p className="mt-8 text-neutral-700 leading-relaxed">
          This Privacy Policy describes how the <strong>Lockin</strong> app (&ldquo;Lockin&rdquo;,
          &ldquo;the app&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) handles information. Lockin is
          an NFC-powered app blocker and alarm for Android (package{" "}
          <code className="px-1.5 py-0.5 rounded bg-neutral-100 text-sm font-mono">com.lockin.tap</code>).
        </p>

        <section className="mt-12 rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6 md:p-8">
          <h2 className="font-display text-xl md:text-2xl font-medium">Summary (plain language)</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            <strong>Lockin does not collect, transmit, sell, or share any personal data.</strong>{" "}
            Everything the app stores stays <strong>on your device</strong>. The app has{" "}
            <strong>no internet access</strong>: it does not include the <code className="px-1.5 py-0.5 rounded bg-white text-sm font-mono">INTERNET</code>{" "}
            permission, contains no analytics, advertising, or crash-reporting libraries, and makes
            no network connections. There are no servers and no third parties involved.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-medium">
            Information the app accesses (and why)
          </h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            All of the following is processed and stored <strong>locally on your device only</strong>.
            None of it is sent off the device, to us, or to anyone else.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50">
                <tr className="text-left">
                  <th className="px-4 py-3 font-medium text-neutral-700">Data</th>
                  <th className="px-4 py-3 font-medium text-neutral-700">Why the app uses it</th>
                  <th className="px-4 py-3 font-medium text-neutral-700">Where it lives</th>
                </tr>
              </thead>
              <tbody>
                {INFO_TABLE.map((row, i) => (
                  <tr key={i} className="border-t border-neutral-200 align-top">
                    <td className="px-4 py-3 font-medium text-neutral-900 min-w-[180px]">
                      {row.data}
                    </td>
                    <td className="px-4 py-3 text-neutral-700 min-w-[240px]">{row.why}</td>
                    <td className="px-4 py-3 text-neutral-700 min-w-[220px]">{row.where}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-neutral-700 leading-relaxed">
            Lockin does <strong>not</strong> access your contacts, location, camera, microphone,
            photos, messages, call logs, accounts, or any other personal content.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-medium">
            Accessibility Service disclosure
          </h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            Lockin uses Android&apos;s <strong>Accessibility Service</strong>{" "}
            (<code className="px-1.5 py-0.5 rounded bg-neutral-100 text-sm font-mono">AppBlockService</code>)
            solely to power its core app-blocking feature. With your explicit consent (you must
            manually enable it in system settings), the service observes <strong>window state
            change events</strong> so the app can tell which application is in the foreground and
            display a full-screen blocking overlay over apps you have chosen to block.
          </p>
          <ul className="mt-4 space-y-3 text-neutral-700 leading-relaxed list-disc pl-5">
            <li>
              The Accessibility Service <strong>does not read, collect, log, store, or transmit
              the content of your screen, what you type, or the contents of any app.</strong>
            </li>
            <li>
              It is used only to identify the foreground app package and to display the blocking
              screen.
            </li>
            <li>
              This data never leaves your device and is not retained after the moment it is
              evaluated.
            </li>
            <li>
              You can disable the service at any time in <strong>Settings → Accessibility</strong>,
              which stops all app-blocking behavior.
            </li>
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-medium">
            Device Administrator disclosure
          </h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            If you enable <strong>Strict Mode</strong>, Lockin registers as a{" "}
            <strong>Device Administrator</strong> for one purpose only: to prevent the app from
            being uninstalled during an active blocking session (so you can&apos;t bypass your own
            focus session). Lockin does not use any other device-admin capability: it does not
            access, lock, wipe, or manage your device beyond this. You can remove the
            administrator at any time via <strong>Settings → Security → Device admin apps</strong>.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-medium">
            Permissions and why they are requested
          </h2>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50">
                <tr className="text-left">
                  <th className="px-4 py-3 font-medium text-neutral-700">Permission</th>
                  <th className="px-4 py-3 font-medium text-neutral-700">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {PERMISSIONS_TABLE.map((row, i) => (
                  <tr key={i} className="border-t border-neutral-200 align-top">
                    <td className="px-4 py-3 font-mono text-neutral-900 min-w-[220px]">
                      {row.perm}
                    </td>
                    <td className="px-4 py-3 text-neutral-700">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-medium">
            Data storage, retention, and deletion
          </h2>
          <ul className="mt-4 space-y-3 text-neutral-700 leading-relaxed list-disc pl-5">
            <li>
              All data is stored in the app&apos;s{" "}
              <strong>private on-device storage</strong> (Android{" "}
              <code className="px-1.5 py-0.5 rounded bg-neutral-100 text-sm font-mono">SharedPreferences</code>).
              It is not accessible to other apps.
            </li>
            <li>
              Blocking session history accumulates on-device over time (for your stats and
              summaries).
            </li>
            <li>
              <strong>You can delete all app data</strong> at any time by either:
              <ul className="mt-2 space-y-1 list-disc pl-5">
                <li>
                  <strong>Uninstalling Lockin</strong>, or
                </li>
                <li>
                  Going to{" "}
                  <strong>Settings → Apps → Lockin → Storage → Clear data</strong>.
                </li>
              </ul>
            </li>
            <li>Because nothing is stored off-device, there is no server-side data for us to delete.</li>
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-medium">Data sharing and selling</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            We do <strong>not</strong> share, sell, rent, or disclose your information to any
            third party, because the app does not collect or transmit any data in the first place.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-medium">Children&apos;s privacy</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            Lockin is not directed at children and does not knowingly collect any information from
            anyone, including children under 13.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-medium">Security</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            Your data remains within the app&apos;s private, OS-protected storage on your own
            device. Because no data is transmitted over a network, there is no transmission to
            intercept. You are responsible for the physical security of your device.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-medium">Changes to this policy</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            If this policy changes, we will update the &ldquo;Last updated&rdquo; date above and
            post the revised policy at the same public URL. Material changes will be reflected
            before they take effect.
          </p>
        </section>

        <section className="mt-16 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 md:p-8">
          <h2 className="font-display text-2xl md:text-3xl font-medium">Contact</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            If you have questions about this Privacy Policy or Lockin&apos;s data practices,
            contact:
          </p>
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
              <dt className="uppercase tracking-[0.18em] text-xs text-neutral-500 sm:w-28">
                Developer
              </dt>
              <dd className="text-neutral-900">Gema Ilham Prakarsa</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
              <dt className="uppercase tracking-[0.18em] text-xs text-neutral-500 sm:w-28">
                Email
              </dt>
              <dd>
                <a
                  href="mailto:support@lockintap.com"
                  className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800"
                >
                  <Mail size={14} />
                  support@lockintap.com
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <div className="mt-20 pt-8 border-t border-neutral-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>
      </article>
    </div>
  );
}
