import { getAssessorados } from "@/lib/assessorados";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const assessorados = await getAssessorados();

  return (
    <>
      <header className="site-header">
        <div className="container nav">
          <a href="#inicio" className="logo" aria-label="New Rocket Play - Página inicial">
            <img src="/assets/img/IMG_1661.PNG" alt="Logo New Rocket Play" />
          </a>
          <nav aria-label="Navegação principal">
            <a href="#sobre">Sobre</a>
            <a href="#servicos">Serviços</a>
            <a href="#assessorados">Assessorados</a>
            <a href="#galeria">Galeria</a>
            <a href="#contato">Contato</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="container hero-content">
            <div className="hero-text">
              <span className="tag">Assessoria Gospel &amp; Marketing</span>
              <h1>Sua mensagem merece alcançar mais pessoas.</h1>
              <p>Assessoria, agenciamento, produção de conteúdo e marketing digital para artistas, igrejas e ministérios.</p>
              <div className="hero-buttons">
                <a href="#contato" className="btn-primary">Solicitar Orçamento</a>
                <a href="https://wa.me/5531983511454" className="btn-outline" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
            </div>
            <figure className="hero-image">
              <img src="/assets/img/silas.png" alt="Artista assessorado pela New Rocket Play" />
            </figure>
          </div>
        </section>

        <section className="numbers" aria-label="Resultados da New Rocket Play">
          <div className="container stats">
            <article><h2>100+</h2><p>Eventos</p></article>
            <article><h2>300+</h2><p>Conteúdos</p></article>
            <article><h2>50+</h2><p>Clientes</p></article>
            <article><h2>100%</h2><p>Dedicação</p></article>
          </div>
        </section>

        <section className="about" id="sobre">
          <div className="container about-grid">
            <figure><img src="/assets/img/sobre.jpg" alt="Equipe e trabalho da New Rocket Play" /></figure>
            <div className="about-content">
              <span className="section-tag">QUEM SOMOS</span>
              <h2>Comunicação que fortalece ministérios.</h2>
              <p>A New Rocket Play nasceu para impulsionar projetos cristãos através da comunicação estratégica e da presença digital.</p>
              <p>Atuamos com assessoria, marketing, agenciamento e produção de conteúdo.</p>
            </div>
          </div>
        </section>

        <section className="services" id="servicos">
          <div className="container">
            <div className="section-title"><span>NOSSOS SERVIÇOS</span><h2>O que fazemos</h2></div>
            <div className="services-grid">
              <article className="card"><h3>🎤 Assessoria Gospel</h3><p>Posicionamento e suporte estratégico.</p></article>
              <article className="card"><h3>📱 Social Media</h3><p>Gestão profissional das redes sociais.</p></article>
              <article className="card"><h3>📸 Produção de Conteúdo</h3><p>Fotos, vídeos e reels.</p></article>
              <article className="card"><h3>📢 Marketing Digital</h3><p>Estratégias para ampliar alcance.</p></article>
              <article className="card"><h3>🎙️ Podcast</h3><p>Produção e divulgação.</p></article>
              <article className="card"><h3>📅 Agendamento</h3><p>Organização de agenda ministerial.</p></article>
            </div>
          </div>
        </section>

        <section className="audience">
          <div className="container">
            <div className="section-title"><span>PARA QUEM</span><h2>Atendemos</h2></div>
            <div className="audience-grid">
              <div>Cantores Gospel</div><div>Pregadores</div><div>Igrejas</div><div>Ministérios</div><div>Eventos Cristãos</div><div>Influenciadores</div>
            </div>
          </div>
        </section>

        <section className="artists" id="assessorados">
          <div className="container">
            <div className="section-title"><span>ASSESSORADOS</span><h2>Quem confia na New Rocket Play</h2></div>
            <div className="artists-grid">
              {assessorados.map((assessorado) => (
                <article className="artist-card" key={assessorado.id}>
                  <img src={assessorado.foto_url} alt={assessorado.nome} />
                  <h3>{assessorado.nome}</h3>
                  <p>{assessorado.funcao}</p>
                  {(assessorado.video_url || assessorado.instagram_url) && (
                    <a href={assessorado.video_url || assessorado.instagram_url || "#"} target="_blank" rel="noopener noreferrer" className="artist-btn">
                      {assessorado.video_url ? "Assistir Vídeo" : "Ver Instagram"}
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery" id="galeria">
          <div className="container">
            <div className="section-title"><span>GALERIA</span><h2>Alguns trabalhos</h2></div>
            <div className="gallery-grid">
              {[1,2,3,4,5,6].map((item) => <img key={item} src={`/assets/img/${item}.jpg`} alt="Trabalho realizado pela New Rocket Play" loading="lazy" />)}
            </div>
          </div>
        </section>

        <section className="steps">
          <div className="container">
            <div className="section-title"><span>PROCESSO</span><h2>Como funciona</h2></div>
            <div className="timeline"><div>1. Contato</div><div>2. Reunião</div><div>3. Planejamento</div><div>4. Produção</div><div>5. Crescimento</div></div>
          </div>
        </section>

        <section className="cta" id="contato">
          <div className="container">
            <h2>Vamos levar sua mensagem mais longe?</h2>
            <p>Comunicação estratégica para igrejas, artistas e ministérios.</p>
            <a href="https://wa.me/5531983511454" target="_blank" rel="noopener noreferrer" className="btn-primary">Falar no WhatsApp</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <a href="#inicio" aria-label="Voltar ao início"><img src="/assets/img/IMG_1661.PNG" className="footer-logo" alt="New Rocket Play" /></a>
          <p>Instagram • WhatsApp • E-mail</p>
          <p>© 2026 New Rocket Play</p>
        </div>
      </footer>
    </>
  );
}
