import { Lesson } from '@/types/course';

export const lesson2: Lesson = {
  id: 2,
  title: 'Basic Editing: Cutting, Noise Removal, Levels',
  duration: '50 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/JdFsOUxUh0I',
    textContent: `
# Basic Editing: Cutting, Noise Removal, Levels

## **🧠 Why Basic Editing Matters**

Even the best content can lose impact if the **audio is distracting or unpleasant**. Basic editing helps:

* Improve clarity
* Reduce distractions
* Maintain listener engagement

---

## **🛠️ I. Cutting Audio (Trimming and Deleting)**

### **Purpose of Podcast Editing ✂️**

**Key Features: Remove mistakes, pauses, filler words, and tangents**  
Podcast editing aims to polish raw audio by removing mistakes, retakes, long pauses, filler words ("ums," "uhs"), and off-topic tangents, ensuring a professional, engaging episode. Mistakes, like misspoken lines, can disrupt listener flow, while long pauses or filler words reduce polish, especially in interviews recorded via Riverside.fm. Cutting off-topic tangents keeps content focused, crucial for narrative or solo podcasts. For example, editing a 30-minute Zencastr recording might involve trimming 5 seconds of silence or removing a 2-minute irrelevant discussion. This process enhances clarity and pacing, maintaining listener attention across platforms like Spotify. Effective editing, whether using Audacity or Adobe Audition, transforms raw recordings into cohesive episodes, balancing natural speech with professional quality to meet audience expectations and elevate your podcast's impact.

---

### **Tools & Methods: Audacity 🟢**

**Key Features: Selection, deletion, and non-destructive splitting**  
Audacity, a free, open-source editor, is ideal for podcast editing with simple, effective tools. Use the Selection Tool to highlight mistakes, pauses, or filler words (e.g., "ums" in a SquadCast recording), then press Delete or use Edit > Delete to remove them. For non-destructive edits, use Split (Ctrl+I) to divide clips without altering the original, allowing rearrangement or selective deletion. For example, split a track to isolate a cough at 3:45, then delete it without affecting surrounding audio. This method preserves raw files, ideal for beginners using a Rode PodMic setup. Audacity's straightforward interface suits basic cleanup, such as trimming long pauses or cutting tangents in solo episodes. While limited in advanced features compared to Adobe Audition, its accessibility makes it perfect for budget-conscious podcasters aiming to produce clean, professional audio with minimal cost.

---

### **Tools & Methods: Adobe Audition 🟡**

**Key Features: Razor Tool, multitrack editing, and markers**  
Adobe Audition, a professional DAW, offers advanced tools for podcast editing. Use the Razor Tool to cut specific sections, like mistakes or pauses, in Waveform or Multitrack View, enabling precise removal or rearrangement of clips. For example, slice a 2-second "uh" from a Zencastr interview track. Move or delete clips in Multitrack View for seamless transitions, ideal for multi-guest podcasts. Use Markers (M key) to plan edits, marking errors or tangents (e.g., an off-topic rant at 10:20) for quick navigation. Audition's non-destructive multitrack mode preserves original audio, unlike Audacity's limited undo options. Its advanced features, like spectral editing, allow pinpoint removal of clicks or hums, making it ideal for producers seeking pro-level polish on narrative or interview shows recorded with a Shure SM7B. Audition's power suits complex edits but requires a $20.99/month subscription.

---

### **Tools & Methods: Descript 🔵**

**Key Features: Text-based editing and filler word removal**  
Descript's AI-powered, text-based editing simplifies podcast cleanup. It auto-transcribes audio (e.g., from Riverside.fm) into editable text, allowing you to highlight and delete words like "ums" or tangents, instantly removing corresponding audio. For example, deleting "uh" from a transcript cuts it from the WAV file. The "Remove Filler Words" tool automatically detects and removes "uh," "like," or "you know" in bulk, streamlining editing for interviews or solo episodes. Multitrack support aligns guest tracks, making it easy to trim pauses or mistakes. Descript's intuitive interface suits beginners without waveform editing skills, unlike Audacity or Audition. For instance, you can edit a 30-minute podcast in minutes by cutting text, ideal for fast turnarounds or repurposing clips for social media. While less precise for mixing, its $12/month subscription offers efficiency for podcasters prioritizing speed and simplicity.

---

### **Best Practices 📝**

**Key Features: Backups, natural flow, and headphone monitoring**  
Follow these best practices for effective podcast editing. Always keep a backup of your original audio on cloud storage (e.g., Google Drive) or an external drive before editing to prevent data loss, especially for Audacity's destructive edits. Avoid over-editing to maintain natural flow; for example, preserve intentional pauses in narrative podcasts for dramatic effect, but trim excessive silences (e.g., >2 seconds) in interviews. Listen with headphones (e.g., Sony MDR-7506) to catch subtle issues like faint hums or clicks, ensuring clean audio in tools like Descript or Audition. For instance, monitor a SquadCast recording to detect a low-level fan noise missed in speakers. These practices apply across all platforms, balancing polish with authenticity. They minimize errors, streamline workflows, and ensure professional results, making your podcast engaging and enjoyable for listeners on platforms like Spotify or Apple Podcasts.

---

## **🎧 II. Noise Removal**

### **Purpose of Noise Reduction 🎯**

**Key Features: Eliminate room hums, fan noise, and background chatter**  
Noise reduction in podcasting aims to eliminate distracting sounds like room hums, static, fan or air conditioning noise, and background chatter or buzz, creating a clean, professional listening experience. These noises, often picked up by sensitive mics like the Audio-Technica AT2020 during recordings (e.g., via Riverside.fm), can detract from vocal clarity and listener engagement. For instance, a low hum from an air conditioner or chatter from a nearby room can disrupt an interview podcast. Removing these ensures polished audio for platforms like Spotify, enhancing focus on content. Effective noise reduction, whether using Audacity's free tools or Adobe Audition's advanced features, transforms raw recordings into professional episodes, maintaining quality for solo, interview, or narrative formats, and meeting audience expectations for clear, distraction-free sound.

---

### **Tools & Techniques: Audacity 🟢**

**Key Features: Noise profile-based reduction**  
Audacity, a free, open-source editor, offers effective noise reduction for podcasters on a budget. To remove room hums or fan noise, select a small portion of audio with only the noise (no talking) using the Selection Tool. Go to Effect > Noise Reduction > Get Noise Profile to capture the noise's characteristics. Then, select the entire track, return to Effect > Noise Reduction, and apply settings (e.g., 24-30 dB reduction) to remove the noise. For example, this can eliminate a low hum from a Zencastr recording made with a Rode PodMic. The process is straightforward, ideal for beginners, but requires careful selection to avoid affecting vocal quality. Audacity's accessibility makes it perfect for cleaning up solo or interview podcasts, ensuring professional audio without costly software, though it lacks the precision of advanced tools like Adobe Audition.

[https://youtu.be/JdFsOUxUh0I](https://youtu.be/JdFsOUxUh0I)

---

### **Tools & Techniques: Adobe Audition 🟡**

**Key Features: Spectral editing and advanced noise reduction**  
Adobe Audition, a professional DAW, provides powerful noise reduction tools. Use the Spectral Frequency Display to visually identify noise (e.g., hums or buzz) as distinct patterns, then select and remove them with precision. Apply Noise Reduction (Process) for static noise or Adaptive Noise Reduction for dynamic sounds like fans, adjusting thresholds to preserve vocal clarity. The Essential Sound Panel offers DeReverb and DeNoise presets to quickly clean up echo or hiss in multi-guest recordings (e.g., from SquadCast). For instance, DeNoise can remove air conditioning hum from a Shure SM7B recording. Audition's non-destructive multitrack mode ensures safe experimentation, ideal for narrative or sound-rich podcasts. While its $20.99/month subscription is costly, its advanced features deliver broadcast-quality results, making it a top choice for professionals seeking precise control over noise in complex audio projects.

[https://youtu.be/qNmLomSwIcY](https://youtu.be/qNmLomSwIcY)

---

### **Tools & Techniques: Descript 🔵**

**Key Features: AI-driven Studio Sound for noise removal**  
Descript's AI-powered Studio Sound feature enhances vocals and removes background noise, simplifying podcast cleanup. Accessible under the "Effects" sidebar, toggle Studio Sound to automatically reduce room hums, fan noise, or chatter in recordings (e.g., from Riverside.fm). The tool analyzes audio and boosts vocal clarity while suppressing noise, ideal for beginners without waveform editing skills. For example, applying Studio Sound to a USB mic recording can eliminate static in seconds. Descript's text-based interface complements this by allowing manual edits via transcriptions, streamlining removal of remaining issues. While less precise than Audition for mixing, its $12/month subscription offers fast, user-friendly noise reduction, perfect for interview or solo podcasts needing quick turnarounds or social media clips. Studio Sound's automation makes Descript a go-to for podcasters prioritizing efficiency over granular control.

[https://youtu.be/Os0QbipfI9M](https://youtu.be/Os0QbipfI9M)

---

### **Best Practices 📝**

**Key Features: Balanced reduction, source control, and room treatment**  
Follow these best practices for effective noise reduction. Don't overuse noise reduction tools, as excessive processing (e.g., >30 dB in Audacity) can make voices sound robotic or unnatural; aim for subtle adjustments to preserve vocal quality. Reduce noise at the source first by recording in a quiet room with a good mic (e.g., Rode PodMic) and using pop filters to minimize plosives. Treat echoey spaces with foam panels, blankets, or carpets to absorb reflections, preventing hums or reverb in recordings. For example, a carpeted closet setup reduces noise before editing in Descript or Audition. These practices, applicable across tools, ensure clean audio with minimal processing, maintaining natural sound for listeners on platforms like Apple Podcasts. They streamline workflows and enhance professionalism, especially for budget-conscious podcasters or those using remote platforms like Zencastr.

---

## **📶 III. Adjusting Levels (Volume and Balance)**

### **Purpose of Adjusting Levels 🎯**

**Key Features: Ensure clear voices, balanced music, and consistent loudness**  
Adjusting levels in podcasting ensures clear voice levels, prevents music or sound effects (SFX) from overpowering dialogue, and maintains consistent loudness throughout an episode. Clear voices, typically targeting -16 LUFS, keep speech intelligible on platforms like Spotify, while balanced music and SFX (e.g., intros or transitions) enhance engagement without drowning out vocals. Consistent loudness avoids jarring volume shifts, crucial for listener comfort in interviews or narrative podcasts recorded via Riverside.fm. For example, a loud intro track can be lowered to complement a Shure SM7B-recorded voice. Proper leveling, whether using Audacity or Adobe Audition, creates a polished, professional sound, meeting industry standards and ensuring a pleasant listening experience across devices like earbuds or car speakers.

---

### **Key Concepts 📝**

**Key Features: Understanding gain, volume, normalization, compression, LUFS**  
Understanding key audio concepts is essential for effective level adjustment. **Gain** controls input volume before effects, set via an interface like Focusrite Scarlett 2i2 to avoid clipping. **Volume** is the final output level after processing, adjusted in software like Descript. **Normalization** sets audio to a consistent peak (e.g., -1 dB), ensuring uniform amplitude. **Compression** evens out loud and soft parts, smoothing dynamic voices in interviews. **LUFS** (Loudness Units Full Scale) is the podcasting loudness standard, targeting -16 LUFS for stereo or -19 LUFS for mono to match platforms like Apple Podcasts. For example, normalizing a Zencastr recording to -16 LUFS ensures consistent playback. These concepts guide precise leveling, balancing clarity and dynamics across solo or multi-guest podcasts, ensuring professional audio quality regardless of the editing tool used.

---

### **Tools & Methods: Audacity 🟢**

**Key Features: Normalize and compress for consistent levels**  
Audacity, a free editor, offers accessible tools for adjusting podcast levels. Use Effect > Normalize to set a consistent peak volume (e.g., -1 dB) for tracks, ensuring voices (recorded via Rode PodMic) are clear without clipping. Apply the Compressor effect to smooth dynamic ranges, reducing loud peaks and boosting quieter parts (e.g., ratio 2:1, threshold -12 dB) for even vocal delivery in interviews. For example, normalize a SquadCast guest track to -1 dB, then compress to balance a soft-spoken voice. While Audacity doesn't directly measure LUFS, normalizing to -1 dB approximates -16 LUFS for stereo podcasts. Its simplicity suits beginners on a budget, though it lacks advanced automation compared to Adobe Audition. These tools ensure consistent, professional levels for solo or multi-track episodes with minimal cost.

[https://youtu.be/tDHgUOiuB34](https://youtu.be/tDHgUOiuB34)

---

### **Tools & Methods: Adobe Audition 🟡**

**Key Features: Advanced normalization and loudness matching**  
Adobe Audition, a professional DAW, provides precise level adjustment tools. Use Amplitude and Compression > Normalize to target -16 LUFS, ensuring industry-standard loudness for platforms like Spotify. Apply the Hard Limiter to prevent clipping, setting a ceiling at -0.1 dB for clean peaks. The Essential Sound Panel's Dialogue > Loudness > Auto-Match feature automatically adjusts tracks to -16 LUFS, ideal for multi-guest recordings from Zencastr. For example, Auto-Match balances a host's Shure SM7B track with a guest's USB mic. Audition's non-destructive multitrack mode allows safe adjustments, and its spectral tools ensure music or SFX don't overpower vocals. While its $20.99/month subscription is costly, Audition's automation and precision make it ideal for professionals crafting polished, dynamic audio for narrative or interview podcasts with complex soundscapes.

[https://youtu.be/YL-8J-MLgSk](https://youtu.be/YL-8J-MLgSk)

---

### **Tools & Methods: Descript 🔵**

**Key Features: AI-driven and manual level adjustments**  
Descript's AI-powered Studio Sound automatically levels audio, enhancing voices and balancing tracks (e.g., from Riverside.fm) to approximate -16 LUFS, ideal for quick turnarounds. Manual volume sliders on each track allow fine-tuning, such as lowering a loud music intro to complement a vocal track recorded with an Audio-Technica ATR2100x. For example, slide a guest's track down to balance with the host in a multi-track interview. Studio Sound simplifies leveling for beginners, reducing the need for waveform expertise compared to Audacity. Descript's text-based interface complements manual adjustments, enabling simultaneous content and level edits. While less precise for advanced mixing than Audition, its $12/month subscription offers efficiency for podcasters prioritizing speed, especially for solo or interview formats needing consistent, professional audio with minimal effort.

[https://youtu.be/caGP-Ps4kn4](https://youtu.be/caGP-Ps4kn4)

---

### **Best Practices 📝**

**Key Features: Headphone monitoring, LUFS standards, and device testing**  
Follow these best practices for effective level adjustment. Always monitor with headphones (e.g., Sony MDR-7506) to catch subtle volume imbalances, like overpowering SFX or faint voices, during editing in Audacity or Descript. Target -16 LUFS for stereo or -19 LUFS for mono podcasts to ensure consistent loudness across platforms like Apple Podcasts, preventing listener adjustments. Test the final mix on multiple devices (phone, laptop, car speakers) to confirm clarity and balance; for instance, car playback may reveal bass-heavy music overpowering vocals. These practices, applicable across tools, ensure professional, listener-friendly audio. For example, testing a Zencastr episode on earbuds ensures dialogue clarity. They streamline workflows, maintain natural dynamics, and meet industry standards, enhancing engagement for all podcast formats.

---

## **✅ Summary Checklist**

| Task | Done? |
| ----- | ----- |
| Trimmed silence, mistakes, and filler words | ✅ / ❌ |
| Applied noise removal (subtle, not harsh) | ✅ / ❌ |
| Normalized voice levels | ✅ / ❌ |
| Exported at correct volume (around -16 LUFS) | ✅ / ❌ |
| Listened to final cut on headphones | ✅ / ❌ |

---

## **📚 Additional Resources**

* Audacity Noise Reduction Tutorial
* Adobe Audition Essential Sound Panel Guide
* Descript's Studio Sound Feature
    `
  }
};