---
title: 'Contact'
layout: page
---

## Communication Channels

For most inquiries, you can email me at [anthony@ciccarello.me](mailto:anthony@ciccarello.me). Depending on the subject, my preferred channels include:

1. **Relevant discussion platform**: for example [IndieWeb chat](https://indieweb.org/discuss) or GitHub issues.
2. **[LinkedIn](https://www.linkedin.com/in/anthonyciccarello/)**: for
   business and career inquiries.
3. **Email**: [anthony@ciccarello.me](mailto:anthony@ciccarello.me) for
   general matters.
4. **Mastodon**: `@anthony@ciccarello.me`
    - Public replies and mentions only. DM's are not received.
4. **Bluesky**: [@ciccarello.me](https://bsky.app/profile/ciccarello.me.web.brid.gy)
    - Public replies and mentions only. DM's are not received.
5. **Facebook or Instagram**: _Discouraged. I check these infrequently, so don't
   expect a quick reply._

## Availability

I'm typically in the **US Pacific** timezone.<span id="local-time" hidden> My local time right now is <time></time>.</span>

My working hours are Monday–Friday, 9 AM–5 PM, though I typically respond to personal messages into the evening.
For non-urgent messages, I typically try to respond within a few days.

## Communication Preferences

My preferred communication styles include

- **I prefer video over audio-only** when a call has the option to help with non-verbal communication.
- **Be clear with your ask** so I know how I can best respond.
- **Ask your question early**, preferably in your first message so I'm not guessing what you need. See [nohello.net](https://nohello.net/) for some examples.
- **Assume best intentions** to avoid a misunderstanding turning into a conflict.

## Reaching out by phone

For friends and family who have my phone number, you're welcome to text, call, or video call.
I usually try to respond within a few hours.
If I don't pick up and your issue is urgent, please leave a voicemail or send me a text.
For video calls, WhatsApp and Google Meet are usually the easiest way to reach my phone.
If you are a business reaching out unsolicited, I may block your number.

<script>
(function () {
	var wrap = document.getElementById('local-time');
	if (!wrap) return;
	var timeEl = wrap.querySelector('time');
	function update() {
		var now = new Date();
		timeEl.textContent = new Intl.DateTimeFormat('en-US', {
			timeZone: 'America/Los_Angeles',
			hour: 'numeric',
			minute: '2-digit',
			timeZoneName: 'short',
		}).format(now);
		timeEl.dateTime = now.toISOString();
	}
	update();
	wrap.hidden = false;
	setInterval(update, 30000);
})();
</script>
