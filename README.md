# l2j-spotify

A vibe-coded POC browser extension to add furigana over Japanese Spotify Web lyrics.

## To Do

- Add Kanji dictionary
- Add anki card creation
- Spotify application support

## Known Issues

> The kuromoji tokenizer interprets "2人" in lyrics seperately as "2" and "人" instead of being seen as "二人 (ふたり)".

There may not be a clean solution to this if Spotify's lyrics are not consistently written in a way where we can differenciate the lyric "2" being sung as "Two" or "に".
