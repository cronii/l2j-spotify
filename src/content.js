import kuromoji from 'kuromoji';
import * as wanakana from 'wanakana';

const PUNCTUATION = '記号';

// Function to wait for Spotify's lyrics to load
function waitForLyrics() {
  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      const lyricsLines = document.querySelectorAll(
        '[data-testid="fullscreen-lyric"]'
      );
      if (lyricsLines.length > 0) {
        observer.disconnect();
        resolve(lyricsLines);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

async function applyFurigana() {
  console.log('Waiting for Spotify lyrics...');
  const lyricsLines = await waitForLyrics();
  if (!lyricsLines || lyricsLines.length === 0) {
    console.error('Lyrics elements not found!');
    return;
  }

  kuromoji
    .builder({ dicPath: chrome.runtime.getURL('dict/') })
    .build((err, tokenizer) => {
      if (err) {
        console.error('Kuromoji.js error:', err);
        return;
      }
      console.log('Kuromoji tokenizer loaded!');

      lyricsLines.forEach((line) => {
        const lyricTextDiv = line.querySelector('div');
        if (!lyricTextDiv || !lyricTextDiv.innerText) return;

        const originalText = lyricTextDiv.innerText;
        const tokens = tokenizer.tokenize(originalText);

        console.log('Tokenized:', tokens);

        const processedLyrics = tokens
          .map((token) => {
            if (
              token.word_type === 'KNOWN' &&
              token.pos !== PUNCTUATION &&
              !wanakana.isHiragana(token.surface_form)
            ) {
              let hiraganaReading = wanakana.toHiragana(
                token.reading || token.surface_form
              );
              return `<ruby>${token.surface_form}<rt>${hiraganaReading}</rt></ruby>`;
            }
            return token.surface_form;
          })
          .join('');

        lyricTextDiv.innerHTML = processedLyrics;
      });
    });
}

applyFurigana();
