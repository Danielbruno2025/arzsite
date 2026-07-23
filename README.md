# ⛧ AGAUREZ - Official Website ⛧

Site oficial da horda de Black Metal **Agaurez**, originária de Belo Horizonte, Minas Gerais. Este projeto une uma estética visual extrema, obscura e vanguardista a recursos modernos de desenvolvimento web responsivo e suporte multilíngue.

---

## 🖤 Direção de Arte & Estética Visual

O design foi concebido com uma vibe avant-garde, ocultista, psicodélica e underground:
- **Cores Dominantes**: Preto abissal (`#020202`), cinza carvão escuro, vermelho sangue e tons psicodélicos de roxo.
- **Efeitos Atmosféricos**:
  - Camada fixa de scanlines CRT analógicas e ruído de vídeo VHS para um visual analógico cru.
  - Pulso psicodélico de névoa animado via CSS no fundo.
- **Plano de Fundo Interativo**: Um canvas HTML5 renderiza um sigilo invertido girando lentamente com um gerador de brasas/partículas de fumaça que respondem dinamicamente às coordenadas do cursor do mouse.
- **Ritos em Vídeo**: Seção com filtros de tons escuros que revelam as cores normais dos vídeos dinamicamente ao passar o mouse.
- **Tipografia Gótica/Metaleira**: Cabeçalhos pesados e angulares com as fontes Google Fonts *UnifrakturMaguntia* e *Metal Mania*, com textos de leitura comuns legíveis em *Montserrat* e *Cinzel*.

---

## 🛠️ Recursos Implementados

1. **Multilíngue (i18n)**:
   - Suporte completo para **8 idiomas**: Português (PT), Inglês (EN), Francês (FR), Alemão (DE), Japonês (JA), Espanhol (ES), Italiano (IT) e Chinês Simplificado (ZH).
   - O seletor de idiomas fica no cabeçalho e as traduções ocorrem de forma dinâmica no lado do cliente (sem recarregamento da página).
   - O idioma preferido do usuário é guardado de forma persistente no `localStorage`.
2. **Reprodutor de Áudio Digital (Spotify)**:
   - Carregamento dinâmico otimizado (pre-loading sob demanda) do player do álbum oficial **"The Five Sigils"** (ID do Spotify: `0QSJYek6MTmoAGeMsChOxQ`).
   - O player tem altura adaptada de `352px` para navegação completa da tracklist diretamente no widget.
3. **Seção de Ritos Audiovisuais (Vídeos)**:
   - Grid de 3 colunas responsivas contendo os clipes e ritos oficiais do Agaurez no YouTube.
4. **Loja de Artefatos Profanos (Merchandising)**:
   - Grid de exibição de itens oficiais (Camisa, LP Splatter de Vinil e CD Jewelcase).
   - O botão de compra do CD Jewelcase redireciona o usuário para a página de vendas oficial na **Cogumelo Records** (`https://www.cogumelorecords.com/product-page/agaurez-cd-five-sigils`).
5. **Formulário de Convocação (Booking)**:
   - Contato direto para shows e imprensa.
   - Envio dinâmico com simulação realista e uma tela de confirmação personalizada ("Portal de Pacto Selado") traduzida automaticamente conforme o idioma escolhido.

---

## 👥 Formação Oficial da Horda

- **vocals**: Vocal / Ritos
- **guitar**: Guitarra
- **B.Brvm**: Baixo (Atualizado)
- **drums**: Bateria

---

## 📂 Estrutura de Arquivos

```
/
├── index.html       # Estrutura semântica e marcações i18n
├── style.css        # Folha de estilo principal com variáveis, efeitos e responsividade
├── script.js        # Canvas interativo, carregamento dinâmico de players e dicionário i18n
├── README.md        # Instruções e documentação do projeto
└── assets/          # Logo oficial, mockups de merch e mídias
    ├── arz logo fs images.jpg   # Logotipo oficial fornecido pela banda
    ├── band_members.png         # Foto da formação
    ├── album_five_sigils.png    # Capa do álbum
    ├── merch_tshirt.png         # Mockup da Camisa
    └── merch_vinyl.png          # Mockup do LP Vinil
```

---

## 🚀 Como Executar Localmente

Para evitar problemas de CORS no carregamento dinâmico de scripts e mídias locais, execute o site usando um servidor web simples.

**Usando Python**:
```powershell
python -m http.server 8080
```

Abra o navegador e acesse:
```
http://localhost:8080/index.html
```

---
*⛧ Projeto desenvolvido sob os preceitos do metal extremo de Belo Horizonte. ⛧*
