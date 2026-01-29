import type { Lesson } from '@/types/course';

export const lesson3TextPreprocessingTechniquesInPython: Lesson = {
  id: 3,
  title: 'Text Preprocessing Techniques in Python',
  duration: '35 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=AqS3WRBMyEc',
    textContent: `<div class="lesson-content">

<h1>Text Preprocessing Techniques in Python</h1>

<p><strong>Text preprocessing transforms raw text into a format suitable for NLP models. Below are key techniques implemented in Python using libraries like NLTK and spaCy.</strong></p>

<h2>Example Code:</h2>
<pre><code>import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer, WordNetLemmatizer

# Download required NLTK data
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

# Sample text
text = "ChatGPT is changing the future of AI with advanced algorithms."

# 1. Tokenization
tokens = word_tokenize(text)
print("Tokens:", tokens)

# 2. Stop Words Removal
stop_words = set(stopwords.words('english'))
filtered = [word for word in tokens if word.lower() not in stop_words]
print("Filtered Tokens:", filtered)

# 3. Stemming
stemmer = PorterStemmer()
stemmed = [stemmer.stem(word) for word in filtered]
print("Stemmed:", stemmed)

# 4. Lemmatization
lemmatizer = WordNetLemmatizer()
lemmatized = [lemmatizer.lemmatize(word, pos='v') for word in filtered]
print("Lemmatized:", lemmatized)</code></pre>

<h2>Explanation:</h2>
<ul>
  <li><strong>Tokenization</strong>: Splits text into words (e.g., ["ChatGPT", "is", "changing", ...]).</li>
  <li><strong>Stop Words Removal</strong>: Removes words like "is" and "the" to focus on meaningful terms.</li>
  <li><strong>Stemming</strong>: Reduces words to their root (e.g., "changing" → "chang").</li>
  <li><strong>Lemmatization</strong>: Reduces words to their base form with context (e.g., "changing" → "change").</li>
</ul>

<h2>Additional Preprocessing:</h2>
<ul>
  <li><strong>Lowercasing</strong>: Convert text to lowercase for consistency.</li>
</ul>
<pre><code>text = text.lower()</code></pre>

<ul>
  <li><strong>Remove Punctuation</strong>: Eliminate symbols like commas or periods.</li>
</ul>
<pre><code>import string
text = text.translate(str.maketrans("", "", string.punctuation))</code></pre>

<ul>
  <li><strong>Remove Numbers or Special Characters</strong>: Use regex for cleaning.</li>
</ul>
<pre><code>import re
text = re.sub(r'\\d+', '', text)  # Remove numbers</code></pre>

<h2>spaCy Alternative:</h2>
<p>spaCy offers faster, production-ready preprocessing.</p>
<pre><code>import spacy
nlp = spacy.load("en_core_web_sm")
doc = nlp(text)
tokens = [token.text for token in doc]
lemmatized = [token.lemma_ for token in doc]</code></pre>

</div>`
  }
};
