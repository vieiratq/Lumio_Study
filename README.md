<h1>Lumio study</h1>
https://lumiostudy.netlify.app
<h2>Sobre o Projeto</h2>

Lumio é uma plataforma open source e sem fins lucrativos, projetada para os meus estudos e portfólio. Ele foi desenvolvido após eu iniciar o curso de Engenharia de Software, sendo meu primeiro projeto com HTML, CSS e JS juntos.

Basicamente, esses são os principais pontos sobre a criação do sistema. Neste momento, estou na terceira semana da faculdade, porém estou há 3 meses aprendendo desenvolvimento de sistemas com JS, CSS, Python, HTML e SQL sozinho.

<h3>Funcionamento do Sistema</h3>

Foi usado como API o localStorage. O sistema inicia checando se há algum cache salvo no navegador, como níveis, nomes de usuários e XP. Por exemplo, o "if (storageLevel)". Decidi colocar as const separadas em cada parte do código.
A lógica da troca de nome é basicamente um display: none que, após o clique do botão, o JS transforma em flex. O usuário insere o nome e é checado se ele tem a quantidade de letras permitida. Coloquei o máximo de 12 letras, pois após esse número ocorria um bug em que o texto saía do container principal. Se não houver nada escrito, nenhuma ação acontece.

<h3>Funcionamento do Sistema</h3>
O timer é um pouco mais complexo, usando várias funções para ter a funcionalidade atual. Ele pega um valor inicial, definido ou escolhido pelo usuário no menu de configuração, e transforma em segundos. Após isso, é dividido em duas variáveis: minutos e segundos, que aparecerão para o usuário. Ambos passam por cálculos matemáticos para serem, enfim, injetados no HTML, tudo com Math.floor para garantir apenas números inteiros.

Ao fim da contagem, entra na função ganharXp(). Ela basicamente pega o tempo que foi utilizado no timer, multiplica por 8 e salva no localStorage.
<h3>Niveis</h3>
O sistema de níveis deu um pouco de trabalho, pois comecei fazendo um levelCheck, onde, após cada chamada da função ganharXP(), o levelCheck era chamado junto. Ele checava se o level estava no limite de XP; caso sim, chamava a função levelUp, que aumentava o nível e resetava o XP. Caso contrário, o código continuava normalmente.

Também deixei que, após o levelUp, ele inicie um levelCheck para garantir que todo o XP seja convertido em level sempre que for possível.#
<h3>Organização de pastas</h3>
<img width="2048" height="2048" alt="Gemini_Generated_Image_sj3m2psj3m2psj3m (2)" src="https://github.com/user-attachments/assets/7eb94572-7153-4c54-aa50-d96b8d75c2df" />

