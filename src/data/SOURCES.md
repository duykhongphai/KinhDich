# Classical text provenance

`classical.json` contains the public-domain classical Chinese Zhouyi text (64 hexagrams, guaci, six base yaoci each, Tuan and Xiang, plus supplied additional classical sections).

Retrieved 2026-10-24 from https://raw.githubusercontent.com/muyen/decoding-iching/main/data/zhouyi-64gua/zhouyi_64gua.json . The source repository identifies bollwarm/ZHOUYI as its upstream transcription. This is a digital transcription, not a scholarly critical edition; source spelling is retained.

Existing `hexagrams.js` Vietnamese prose predates this redesign. Many records use identical generated templates. The reader suppresses those template judgments and line paraphrases and explicitly marks unavailable Vietnamese translations. General thematic guidance is labeled separately and is not presented as canonical translation. The share card uses the Chinese guaci.

`npm test` verifies 64 records, at least 384 base lines, complete trigram mapping and all 4096 six-line casts. These structural tests do not establish philological accuracy.
