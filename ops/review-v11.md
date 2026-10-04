# Guided preview intake

Removed sample BookingDemo from Approach and sample links. New /contact preview intake: business type/name/site, primary goal/current systems, optional notes and service interests, contact, editable review, explicit submission and receipt. Existing standalone service inquiry routes preserved. Brief stored through existing validated inquiry API as a bounded readable message; no new schema or automatic actions.

User chose a call before preview work. Scheduling link unavailable: live fallback explicitly arranges by email and never claims a booked call. Need owner's scheduling URL for direct booking. No calendar event or email sent by intake.

Independent review identified edit-during-send and changed-payload retry problems. Edit/Back disabled while sending; request ID now keyed to exact serialized payload. Reviewer verified closure. Browser checked goal/email validation, forward steps, preserved contact when editing, local synthetic save and honest confirmation. Local SQLite read verified synthetic brief and call next step. Prior in-memory API validation/idempotency/storage-failure tests passed. Desktop review screen and mobile first step visually checked. Preview tooling masks some email DOM properties; screenshot and visible review confirmed actual entry. No production test submissions.
