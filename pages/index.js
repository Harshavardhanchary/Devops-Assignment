import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.className = theme === 'light' ? styles.light : '';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const projects = [
    {
      title: 'Multi-Services Cloud Project',
      link: 'https://github.com/Harshavardhanchary/ultimate-devops-project-demo',
      description: 'Multi Micro-services project.',
      tech: ['EKS', 'Docker', 'Terraform', 'S3', 'VPC', 'Prometheus', 'Grafana'],
    },
    {
      title: 'Library Manager',
      link: 'https://github.com/Harshavardhanchary/Library-Manager.git',
      description: 'DevOpsified a two-tier application from scratch.',
      tech: ['Jenkins', 'EC2', 'Docker', 'k3s', 'ArgoCD'],
    },
    {
      title: 'Portfolio Pipeline Automation',
      link: 'https://github.com/Harshavardhanchary/Portfolio-pipeline.git',
      description: 'GitHub Actions-based portfolio pipeline with automated deployment.',
      tech: ['GitHub', 'GitHub Actions', 'S3', 'CloudFront', 'Route53', 'Docker'],
    },
  ];

  return (
    <>
      <Head>
        <title>Harsha Vardhan | DevOps Engineer</title>
      </Head>

      <button
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? '☀' : '☽'}
      </button>

      <main className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.name}>Harsha Vardhan</h1>
          <p className={styles.title}>DevOps Engineer</p>
          <p className={styles.bio}>
            Aspiring DevOps engineer with hands-on experience in cloud platforms,
            CI/CD pipelines, and automation. Passionate about building scalable
            systems and improving workflows.
          </p>
        </header>

        <nav className={styles.links}>
          <a href="https://github.com/Harshavardhanchary" className={styles.link} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/harshavardhanchary" className={styles.link} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:harshavardhanchary7@gmail.com" className={styles.link}>Gmail</a>
          <a href="https://drive.google.com/file/d/1CicriwnRx0pyxV86VL3OEhkFurKfOnPz/view?usp=drive_link" className={styles.link} target="_blank" rel="noopener noreferrer">Resume</a>
        </nav>

        <section className={styles.projects}>
          <h2 className={styles.sectionTitle}>Projects</h2>
          <div className={styles.projectGrid}>
            {projects.map((p, idx) => (
              <div className={styles.project} key={idx}>
                <h3>
                  <a href={p.link} target="_blank" rel="noopener noreferrer">{p.title}</a>
                </h3>
                <p>{p.description}</p>
                <div className={styles.techStack}>
                  {p.tech.map((t, i) => (
                    <span className={styles.tech} key={i}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

