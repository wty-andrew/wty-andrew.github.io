import React from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

const Home = () => {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  return (
    <Layout>
      <header className="hero hero--primary" style={{ textAlign: 'center' }}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
        </div>
      </header>
      <main></main>
    </Layout>
  )
}

export default Home
