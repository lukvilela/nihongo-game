Original prompt: vamos fazer um jogo para aprender japones? use os mesmos principios do projeto Nihongo Start, mas um jogo simples que aprendamos o japones jogando e concluindo niveis

## 2026-03-07
- Criado esqueleto do projeto web com `index.html` e canvas central.
- Implementacao em andamento do jogo Nihongo Quest com niveis, HP, XP e quiz de kana.
- Implementado `game.js` funcional com loop de quiz (kana -> romaji), XP, vidas, timer e progressao por 3 niveis.
- Expansao concluida: 4 niveis, pool maior de kana (hiragana + katakana) e seletor de script no menu (tecla J).
- Novas mecanicas: combo com multiplicador de XP, estrelas por sequencia, fila de revisao de erros e tela de precisao por nivel.
- Novos controles: H (ou A) usa dica e remove alternativas erradas; P (ou B) pausa/despausa em jogo.
- Adicionado sistema de missao diaria com persistencia em localStorage (responde X perguntas com precisao minima para receber bonus).
- Recompensa da missao diaria ao concluir: +50 XP, +2 estrelas e +1 dica.
- Audio de pronuncia adicionado (V ou Space) com opcao auto-voz (T).
- Iniciado sistema de streak diario: estado da missao agora carrega com `streakDays` e avanca quando dias consecutivos sao cumpridos.
- Implementada loja de estrelas com persistencia local: +1 dica (2), escudo (3), +2s por nivel (2).
- Escudo integrado na logica de jogo (erro e dano por tempo), e estados de loja/streak expostos em `render_game_to_text`.
