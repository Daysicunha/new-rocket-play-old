# New Rocket Play

Integração do catálogo autogerenciável ao site da New Rocket Play.

## Branch de desenvolvimento

A integração está sendo construída em:

`integracao-catalogo-autogerenciavel`

A branch `main` permanece sem alterações até aprovação final.

## Estrutura atual

- `app/page.tsx` — página pública em Next.js
- `app/login/page.tsx` — login administrativo
- `app/admin/page.tsx` — proteção e autorização do painel
- `app/admin/AdminDashboard.tsx` — gestão de assessorados
- `lib/assessorados.ts` — leitura pública e fallback seguro
- `lib/supabase/` — clientes SSR/browser e renovação de sessão
- `supabase/migrations/20260827_assessorados.sql` — banco, RLS, Storage e dados iniciais
- `public/assets/img/` — imagens reaproveitadas do site atual

## O que o painel permite

- cadastrar assessorado
- editar dados
- publicar ou ocultar
- marcar como destaque
- ordenar exibição
- informar Instagram e vídeo/Reel
- enviar foto JPG, PNG ou WebP de até 5 MB
- excluir cadastro

## Segurança

- o painel exige login Supabase
- login válido não concede administração automaticamente
- somente usuários registrados em `public.admin_users` podem gerenciar dados e imagens
- leitura pública da tabela retorna somente assessorados ativos
- RLS está habilitado nas tabelas expostas
- Storage permite escrita somente a administradores autorizados
- nenhuma chave secreta deve ser commitada; o projeto usa apenas variáveis públicas necessárias ao cliente

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
3. Entrar em `/login` com uma conta administrativa autorizada.
4. Criar um assessorado de teste.
5. Editar o cadastro.
6. Ocultar e confirmar que ele some da página pública.
7. Publicar novamente e confirmar que retorna.
8. Testar upload de foto.
9. Excluir o cadastro de teste.
10. Confirmar que a branch `main` não foi alterada.

## Pendência de mídia do site original

O site original referencia `sobre.jpg` e `1.jpg` a `6.jpg` na galeria, mas esses arquivos não estão presentes nos repositórios atuais. Essa inconsistência é anterior à integração e precisa ser resolvida antes da publicação final.
