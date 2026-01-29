import type { Lesson } from '@/types/course';

export const lesson3StepsInDataPreprocessing: Lesson = {
  id: 3,
  title: 'Steps in Data Preprocessing',
  duration: '40 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=P8ERBy91Y90',
    textContent: `<div class="lesson-content">

<h1>Steps in Data Preprocessing</h1>

<p><strong>Data preprocessing involves multiple steps to prepare raw data for modeling. Each step addresses specific data challenges and is implemented using tools like Python's Pandas and Scikit-learn.</strong></p>

<h2>1. Data Cleaning</h2>
<p>Cleansing data to remove errors, inconsistencies, or irrelevant information.</p>

<h3>Handle Missing Values:</h3>
<ul>
  <li><strong>Remove</strong>: Drop rows or columns with excessive missing data.</li>
</ul>
<pre><code>import pandas as pd
df = pd.DataFrame({"A": [1, None, 3], "B": [4, 5, None]})
df = df.dropna()  # Remove rows with missing values</code></pre>

<ul>
  <li><strong>Impute</strong>: Replace missing values with statistical measures (mean, median, mode) or model-based predictions.</li>
</ul>
<pre><code>df["A"].fillna(df["A"].mean(), inplace=True)  # Fill with mean</code></pre>

<p><strong>Advanced Imputation</strong>: Use algorithms like KNN or interpolation for more accurate replacements.</p>
<pre><code>from sklearn.impute import KNNImputer
imputer = KNNImputer(n_neighbors=2)
df[["A", "B"]] = imputer.fit_transform(df[["A", "B"]])</code></pre>

<h3>Remove Duplicates:</h3>
<pre><code>df = df.drop_duplicates()</code></pre>

<h3>Fix Inconsistent Data:</h3>
<p>Correct typos, formatting issues, or inconsistent units (e.g., "USA" vs. "United States").</p>
<pre><code>df["country"] = df["country"].replace({"USA": "United States"})</code></pre>

<h3>Handle Outliers:</h3>
<p>Detect and remove or cap outliers using statistical methods (e.g., IQR or z-score).</p>
<pre><code>Q1 = df["A"].quantile(0.25)
Q3 = df["A"].quantile(0.75)
IQR = Q3 - Q1
df = df[~((df["A"] < (Q1 - 1.5 * IQR)) | (df["A"] > (Q3 + 1.5 * IQR)))]</code></pre>

<h2>2. Data Transformation</h2>
<p>Transforms data to ensure compatibility with ML algorithms.</p>

<h3>Scaling:</h3>
<p>Adjusts feature ranges to prevent algorithms from being biased toward larger values.</p>

<p><strong>Min-Max Scaling</strong>: Scales features to a fixed range (e.g., [0, 1]).</p>
<pre><code>from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler()
df[["A"]] = scaler.fit_transform(df[["A"]])</code></pre>

<p><strong>Standardization (Z-score Normalization)</strong>: Centers data around mean 0 with standard deviation 1.</p>
<pre><code>from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
df[["A"]] = scaler.fit_transform(df[["A"]])</code></pre>

<h3>Encoding Categorical Variables:</h3>
<p><strong>Label Encoding</strong>: Assigns integers to categories (e.g., "red" = 0, "blue" = 1).</p>
<pre><code>from sklearn.preprocessing import LabelEncoder
encoder = LabelEncoder()
df["color"] = encoder.fit_transform(df["color"])</code></pre>

<p><strong>One-Hot Encoding</strong>: Creates binary columns for each category.</p>
<pre><code>df = pd.get_dummies(df, columns=["category_column"], prefix="cat")</code></pre>

<h3>Text Processing:</h3>
<p>For NLP, tokenize text, remove stop words, or apply stemming/lemmatization.</p>
<pre><code>from nltk.tokenize import word_tokenize
df["text"] = df["text"].apply(lambda x: word_tokenize(x.lower()))</code></pre>

<h3>Datetime Parsing:</h3>
<p>Extract features from dates (e.g., year, month, day).</p>
<pre><code>df["year"] = pd.to_datetime(df["date"]).dt.year</code></pre>

<h2>3. Data Integration</h2>
<p>Combines data from multiple sources into a unified dataset.</p>

<p><strong>Merging Datasets</strong>: Join tables (e.g., SQL-like joins in Pandas).</p>
<pre><code>df1 = pd.DataFrame({"id": [1, 2], "name": ["Alice", "Bob"]})
df2 = pd.DataFrame({"id": [1, 2], "score": [85, 90]})
df = pd.merge(df1, df2, on="id")</code></pre>

<ul>
  <li><strong>Ensuring Consistency</strong>: Standardize formats (e.g., date formats, units) across sources.</li>
  <li><strong>Handling Conflicts</strong>: Resolve discrepancies (e.g., different scales or missing IDs).</li>
</ul>

<h2>4. Data Reduction</h2>
<p>Reduces dataset size or complexity to improve efficiency without significant loss of information.</p>

<h3>Feature Selection:</h3>
<p>Select the most relevant features using methods like:</p>
<ul>
  <li>Correlation analysis (remove highly correlated features).</li>
  <li>Recursive Feature Elimination (RFE).</li>
</ul>
<pre><code>from sklearn.feature_selection import RFE
from sklearn.linear_model import LogisticRegression
model = LogisticRegression()
rfe = RFE(model, n_features_to_select=3)
rfe.fit(X, y)
selected_features = X[:, rfe.support_]</code></pre>

<h3>Dimensionality Reduction:</h3>
<p>Reduce feature count while preserving information.</p>

<p><strong>Principal Component Analysis (PCA)</strong>: Projects data into lower-dimensional space.</p>
<pre><code>from sklearn.decomposition import PCA
pca = PCA(n_components=2)
reduced_data = pca.fit_transform(X)</code></pre>

<ul>
  <li><strong>t-SNE/UMAP</strong>: For visualization of high-dimensional data.</li>
</ul>

<h3>Sampling:</h3>
<p>Reduce dataset size by selecting representative subsets (e.g., stratified sampling).</p>

</div>`
  }
};
