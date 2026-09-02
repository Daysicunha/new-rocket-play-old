# New Rocket Play

Integração do catálogo autogerenciável ao site da New Rocket Play.

## Branch de desenvolvimento

A integração está sendo construída em:

`integracao-catalogo-autogerenciavel`

A branch `main` permanece sem alterações até aprovação final.

## Arquitetura aprovada

A New Rocket é o primeiro catálogo de uma estrutura multiempresa compartilhada no Supabase. Cada catálogo é isolado por `catalogo_id` e por RLS.

- `catalogos` — identifica cada cliente/catálogo
- `catalogo_usuarios` — vincula usuários autorizados ao catálogo correto
- `catalogo_itens` — armazena os itens de todos os catálogos, sempre separados por `catalogo_id`
- `catalogo-media` — bucket compartilhado, com uma pasta por catálogo

Na New Rocket, os itens representam assessorados. O painel exibe apenas os campos necessários: nome artístico, função, foto, Instagram, vídeo/Reel, ordem e status.

## Estrutura do projeto

- `app/page.tsx` — página pública em Next.js
- `app/login/page.tsx` — login administrativo
- `app/admin/page.tsx` — autenticação e autorização por catálogo
- `app/admin/AdminDashboard.tsx` — gestão dos assessorados
- `lib/catalogo.ts` — adaptador entre o modelo multiempresa e a interface da New Rocket
- `lib/supabase/` — clientes SSR/browser e renovação de sessão
- `supabase/migrations/20260827_catalogos_multiempresa.sql` — estrutura multiempresa, RLS, Storage e dados iniciais
- `public/assets/img/` — imagens reaproveitadas do site atual

## O que o painel permite

- cadastrar assessorado
- editar dados
- publicar ou ocultar
- ordenar exibição
- informar Instagram e vídeo/Reel
- enviar foto JPG, PNG ou WebP de até 5 MB
- excluir cadastro

## Segurança

- o painel exige login Supabase
- login válido não concede acesso automaticamente
- o usuário precisa estar vinculado ao catálogo em `catalogo_usuarios`
- um usuário só pode gravar itens do catálogo ao qual pertence
- leitura pública retorna apenas itens ativos de catálogos ativos
- RLS está habilitado nas três tabelas multiempresa
- imagens são gravadas em `catalogo-media/<catalogo_id>/...`
- Storage valida o vínculo do usuário com a pasta do catálogo antes de permitir escrita
- nenhuma chave secreta é commitada

## New Rocket Play

Slug do catálogo:

`new-rocket-play`

Os sete assessorados que já estavam publicados no site foram usados como dados iniciais. Os demais nomes do briefing não foram publicados automaticamente porque ainda precisam de confirmação, foto e links oficiais.

## Variáveis de ambiente

Copiar `.env.example` para `.env.local` e preencher:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Nunca commitar `.env.local`.

## Validação local

Requer Node 22.13 ou superior.

```bash
npm install
npm run lint
npm run build
npm run dev
```

## Antes de aprovar a integração

1. Revisar o Pull Request em modo rascunho.
2. Conferir a página pública em desktop e mobile.
3. Entrar em `/login` com uma conta vinculada à New Rocket.
4. Criar um assessorado de teste.
5. Editar o cadastro.
6. Ocultar e confirmar que ele some da página pública.
7. Publicar novamente e confirmar que retorna.
8. Testar upload de foto.
9. Excluir o cadastro de teste.
10. Confirmar que a branch `main` não foi alterada.

## Pendência de mídia do site original

O site original referencia `sobre.jpg` e `1.jpg` a `6.jpg` na galeria, mas esses arquivos não estão presentes nos repositórios atuais. Essa inconsistência é anterior à integração e precisa ser resolvida antes da publicação final.
