import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const API_KEY = "d7f67c6c858d4eecbc058cd521485d87"
export default function Home({articles}) {
  console.log(articles);
  return (
    <div className={styles.container}>
      <Head>
        <title>News API Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to My News API Blog
        </h1>
        </main>

        <h3>Top {articles.length} News On Bitcoin From NewsAPI</h3>
        <div className={styles.articles}>
            {articles.map((item) => {
             return (
              <div className={styles.articleItem}>
                  <img src={item.urlToImage || "https://static.coindesk.com/wp-content/uploads/2019/10/Bitcoin-chart.jpg"} alt={item.title} />
                  <div className={styles.articleText}>
                    <Link href={`posts/${item.title}`}>{item.title.substring(0, 100) + "..."}</Link>
                    <cite>- {item.author.substring(0, 30)}</cite>
                  </div>
              </div>
             )
            })}
        </div>
    </div>
  )

}

// author: "Cointelegraph By Mark Binns"
// content: "Mark my words: Governments and central banks will never care about your wealth and your privacy as much as you do. That reality is exactly why central bank digital currencies are dead in the water al… [+5996 chars]"
// description: "All that CBDCs are going to do is engage customers in a masquerade that blurs the line between decentralized and centralized finance."
// publishedAt: "2020-11-15T13:30:00Z"
// source: {id: null, name: "Cointelegraph"}
// title: "Central bank digital currencies are dead in the water"
// url: "https://cointelegraph.com/news/central-bank-digital-currencies-are-dead-in-the-water"
// urlToImage:
const date = new Date();
const month = date.getMonth();
const day = date.getDate();
const year = date.getFullYear();
export async function getStaticProps() {
  const res = await fetch(`http://newsapi.org/v2/everything?q=bitcoin&from=${year}-${month}-${day}&sortBy=publishedAt&apiKey=${API_KEY}`);

  const {articles} = await res.json();

  return {
    props: {
      articles,
    }
  }
}

