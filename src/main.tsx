import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

async function handleGoRedirect() {
  const path = window.location.pathname;

  if (!path.startsWith("/go/")) return;

  const slug = path.split("/")[2];

  try {
    const redirects = await fetch("/redirects.json").then(r => r.json());

    if (redirects[slug]) {
      window.location.replace(redirects[slug]);
    } else {
      document.body.innerText = "Unknown link";
    }
  } catch (e) {
    document.body.innerText = "Redirect error";
  }
}

handleGoRedirect();

