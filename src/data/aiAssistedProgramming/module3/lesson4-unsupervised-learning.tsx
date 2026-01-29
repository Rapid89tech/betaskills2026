import type { Lesson } from '@/types/course';

export const lesson4UnsupervisedLearning: Lesson = {
  id: 4,
  title: 'Unsupervised Learning',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=JnnaDNNb380',
    textContent: `<div class="lesson-content">

<h1>Unsupervised Learning</h1>

<p><strong>Unsupervised Learning works with unlabeled data to discover hidden patterns, structures, or relationships without predefined outputs.</strong></p>

<h2>Features:</h2>
<ul>
  <li><strong>No Labeled Outputs</strong>: The model infers patterns from the data itself.</li>
  <li><strong>Exploratory Analysis</strong>: Used to understand data structure or reduce complexity.</li>
  <li><strong>Applications</strong>: Market segmentation, data compression, and anomaly detection.</li>
</ul>

<h2>Common Algorithms:</h2>
<ul>
  <li><strong>K-Means Clustering</strong>: Groups data into k clusters based on similarity (e.g., segmenting customers by purchasing behavior).</li>
  <li><strong>Hierarchical Clustering</strong>: Builds a tree of clusters to represent data relationships (e.g., taxonomic grouping).</li>
  <li><strong>Principal Component Analysis (PCA)</strong>: Reduces data dimensionality while preserving variance (e.g., compressing images).</li>
  <li><strong>Autoencoders</strong>: Neural networks for unsupervised feature learning and data denoising.</li>
  <li><strong>DBSCAN</strong>: Clusters data based on density, effective for identifying outliers.</li>
</ul>

<h2>Example:</h2>
<pre><code>from sklearn.cluster import KMeans
X = [[1, 2], [1, 4], [1, 0], [10, 2], [10, 4]]  # Unlabeled data
kmeans = KMeans(n_clusters=2)
kmeans.fit(X)
print(kmeans.labels_)  # Output: [0, 0, 0, 1, 1]</code></pre>

<h2>Use Cases:</h2>
<ul>
  <li><strong>Customer Segmentation</strong>: Grouping users for targeted marketing.</li>
  <li><strong>Anomaly Detection</strong>: Identifying fraudulent transactions or defective products.</li>
  <li><strong>Dimensionality Reduction</strong>: Simplifying datasets for visualization or model training.</li>
</ul>

</div>`
  }
};
