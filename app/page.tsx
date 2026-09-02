import { getAssessorados } from "@/lib/catalogo";

export const dynamic = "force-dynamic";

const services = [
  ["Assessoria de ministérios", "Acompanhamento estratégico e suporte aos ministros."],
  ["Gestão de agendas", "Organização, negociação e acompanhamento das agendas."],
  ["Logística", "Planejamento e organização de deslocamentos e compromissos."],
  ["Divulgação", "Divulgação de ministros, agendas, eventos e projetos."],
  ["Gestão de redes sociais", "Planejamento e estratégias para fortalecer a presença digital."],
  ["Criação de artes", "Cartazes, divulgações e materiais para redes sociais."],
  ["Produção de conteúdo", "Planejamento e criação de conteúdos para divulgação."],
  ["Videomaker", "Cobertura de eventos, ministrações, bastidores e produção de vídeos."],
  ["Conexão com igrejas e eventos", "Aproximação entre ministros e igrejas para novas oportunidades de agenda."],
];

const audiences = ["Cantores Gospel", "Pregadores", "Igrejas", "Ministérios", "Eventos Cristãos", "Influenciadores"];

const plans = [
  {
    name: "Básico",
    items: [
      "Edição de fotos e vídeos gravados em cultos e eventos",
      "Criação de legendas",
      "Estratégias para ganhar seguidores",
      "Organização de agendas, shows e eventos",
      "Criação da bio e do Linktr.ee",
      "2 cartazes por mês",
    ],
  },
  {
    name: "Pro",
    items: [
      "Edição de fotos e vídeos gravados em cultos e eventos",
      "Criação de legendas",
      "Estratégias para ganhar seguidores",
      "Organização de agendas, shows e eventos",
      "Monitoramento de interações e comentários",
      "5 cartazes por mês",
      "Captação de vídeos externa",
    ],
  },
  {
    name: "Plus",
    items: [
      "Edição de fotos e vídeos gravados em cultos e eventos",
      "Criação de legendas",
      "Estratégias para ganhar seguidores",
      "Organização de agendas, shows e eventos",
      "Monitoramento de interações e comentários",
      "5 cartazes por mês",
      "Captação de vídeos externa",
      "Gestão de redes sociais",
    ],
  },
];

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
            <a href="#planos">Planos</a>
            <a href="#assessorados">Assessorados</a>
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
              <p>Comunicação, criatividade e estratégia para servir, conectar e fortalecer ministérios.</p>
              <div className="hero-buttons">
                <a href="#contato" className="btn-primary">Solicitar orçamento</a>
                <a href="https://wa.me/5531983511454" className="btn-outline" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
            </div>
            <figure className="hero-image">
              <img src="/assets/img/silas.png" alt="New Rocket Play" />
            </figure>
          </div>
        </section>

        <section className="numbers" aria-label="Resultados da New Rocket Play">
          <div className="container stats">
            <article><h2>400+</h2><p>Eventos realizados</p></article>
            <article><h2>350+</h2><p>Conteúdos produzidos</p></article>
            <article><h2>20+</h2><p>Clientes fixos e outros indiretos</p></article>
            <article><h2>2 anos</h2><p>de atuação</p></article>
          </div>
        </section>

        <section className="about" id="sobre">
          <div className="container about-story">
            <div className="about-content">
              <span className="section-tag">NOSSA HISTÓRIA</span>
              <h2>Comunicação que serve, conecta e fortalece ministérios.</h2>
              <p>A New Rocket Play nasceu em 2024 com o propósito de utilizar a comunicação, a criatividade e o marketing para fortalecer e ampliar o alcance de ministérios cristãos.</p>
              <p>O projeto ganhou força a partir do trabalho desenvolvido com o cantor Diego Marçal e cresceu com novos ministros, igrejas, congressos e eventos. Hoje, a atuação reúne gestão e assessoria, videomaker e design para cuidar de agendas, logística, divulgação, estratégias digitais e registros audiovisuais.</p>
              <p>Mais do que uma empresa de marketing, a New Rocket Play existe para servir, conectar e fortalecer ministérios, criando pontes entre ministros e igrejas através da comunicação, da criatividade e da excelência.</p>
            </div>
            <aside className="about-facts">
              <div><strong>Desde 2024</strong><span>Uma história construída a serviço do Reino.</span></div>
              <div><strong>Minas Gerais</strong><span>Atuação em todo o estado.</span></div>
              <div><strong>Todo o Brasil</strong><span>Atendimento de agendas em diferentes estados.</span></div>
              <div><strong>3 profissionais</strong><span>Gestão e assessoria, videomaker e designer.</span></div>
            </aside>
          </div>
        </section>

        <section className="services" id="servicos">
          <div className="container">
            <div className="section-title"><span>NOSSOS SERVIÇOS</span><h2>Estrutura para fortalecer cada ministério</h2></div>
            <div className="services-grid">
              {services.map(([title, description]) => (
                <article className="card" key={title}><h3>{title}</h3><p>{description}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="audience">
          <div className="container">
            <div className="section-title"><span>PARA QUEM</span><h2>Atendemos</h2></div>
            <div className="audience-grid">
              {audiences.map((audience) => <div key={audience}>{audience}</div>)}
            </div>
          </div>
        </section>

        <section className="plans" id="planos">
          <div className="container">
            <div className="section-title"><span>PLANOS</span><h2>Pacotes de acompanhamento</h2></div>
            <div className="plans-grid">
              {plans.map((plan) => (
                <article className="plan-card" key={plan.name}>
                  <span>Pacote</span>
                  <h3>{plan.name}</h3>
                  <ul>{plan.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  <a href="https://wa.me/5531983511454" target="_blank" rel="noopener noreferrer" className="btn-outline">Consultar este plano</a>
                </article>
              ))}
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
                      {assessorado.video_url ? "Assistir vídeo" : "Ver Instagram"}
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="steps">
          <div className="container">
            <div className="section-title"><span>PROCESSO</span><h2>Como funciona a contratação</h2></div>
            <div className="timeline"><div>1. Contato</div><div>2. Reunião</div><div>3. Planejamento</div><div>4. Contrato</div><div>5. Produção</div></div>
          </div>
        </section>

        <section className="contact" id="contato">
          <div className="container contact-grid">
            <div>
              <span className="section-tag">CONTATO</span>
              <h2>Vamos fortalecer a sua mensagem?</h2>
              <p>Fale com a New Rocket Play para entender qual formato de acompanhamento faz sentido para seu ministério, igreja ou projeto.</p>
              <a href="https://wa.me/5531983511454" target="_blank" rel="noopener noreferrer" className="btn-primary">Falar no WhatsApp</a>
            </div>
            <div className="contact-card">
              <span>WhatsApp</span><strong>(31) 9 8351-1454</strong>
              <span>E-mail</span><a href="mailto:newrocketplay@gmail.com">newrocketplay@gmail.com</a>
              <span>TikTok</span><strong>New.rocket.play</strong>
              <span>Atendimento</span><strong>Minas Gerais + agendas em todo o Brasil</strong>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <a href="#inicio" aria-label="Voltar ao início"><img src="/assets/img/IMG_1661.PNG" className="footer-logo" alt="New Rocket Play" /></a>
          <p>newrocketplay@gmail.com · (31) 9 8351-1454 · TikTok: New.rocket.play</p>
          <p>© 2026 New Rocket Play</p>
        </div>
      </footer>
    </>
  );
}
