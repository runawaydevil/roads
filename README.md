# Roads

Renderize todas as ruas de qualquer cidade de uma só vez.

![demo](images/roads.png)

## Sobre este Projeto

Roads é um fork desenvolvido e mantido por Pablo Murad (runawaydevil@pm.me), baseado no projeto original city-roads criado por Andrei Kashcha (https://github.com/anvaka/city-roads).

Este fork inclui melhorias significativas:

- Interface completamente traduzida para português brasileiro
- Sistema de fallback inteligente com múltiplos servidores
- Cache otimizado com fallback automático
- Melhorias na experiência do usuário
- Tratamento robusto de erros e timeouts

Todos os créditos pela ideia e implementação original vão para Andrei Kashcha.

## Como funciona?

Os dados são obtidos do OpenStreetMap usando a API Overpass (http://overpass-turbo.eu/). Embora essa API seja gratuita (desde que você siga as licenças ODbL), ela pode ter limitação de taxa e às vezes é lenta. Afinal, estamos baixando milhares de ruas dentro de uma área!

Para melhorar o desempenho do download, cidades com população maior que 100.000 pessoas são indexadas e armazenadas em um formato protobuf muito simples. O sistema tenta primeiro carregar do cache e, se não estiver disponível, busca diretamente da API do OpenStreetMap.

A resolução de nomes é feita pelo Nominatim (https://nominatim.openstreetmap.org/) - para qualquer consulta que você digite na caixa de pesquisa, ele retorna uma lista de IDs de área. O sistema verifica primeiro o ID da área no cache e recorre ao Overpass se a área não estiver presente.

## Recursos

- Visualização de todas as ruas de qualquer cidade
- Personalização de cores (ruas, fundo, rótulos)
- Exportação para PNG e SVG
- API de console para desenvolvedores
- Suporte a múltiplos servidores Overpass
- Sistema de cache inteligente com fallback automático

## Scripting

Por trás da interface simples, engenheiros de software também encontrarão recursos de scripting. Você pode desenvolver programas em cima do Roads. A API de cena está documentada aqui: https://github.com/runawaydevil/roads/blob/main/API.md

Por favor, compartilhe suas criações e não hesite em entrar em contato se tiver alguma dúvida.

## Limitações

A renderização da cidade é limitada pela capacidade de memória do navegador e da placa de vídeo. É possível renderizar as ruas de cidades médias sem problemas em dispositivos comuns, mas cidades muito grandes (como Tóquio, com 1,4 milhão de segmentos) podem deixar dispositivos mais antigos lentos.

Selecionar uma área que tenha milhões de ruas (por exemplo, um estado inteiro) pode fazer com que a página trave mesmo em um dispositivo potente.

Felizmente, a maioria das cidades pode ser renderizada sem problemas, resultando em uma bela arte.

## Desenvolvimento Local

```bash
# instalar dependências
npm install

# servir com hot reload em localhost
npm run dev

# build para produção com minificação
npm run build
```

## Tecnologias

- Vue.js 3
- WebGL (w-gl)
- OpenStreetMap / Overpass API
- Vite

## Contato

Desenvolvedor: Pablo Murad  
Email: runawaydevil@pm.me  
Repositório: https://github.com/runawaydevil/roads

## Licença

O código-fonte está licenciado sob a licença MIT.

---

Desenvolvido por Pablo Murad | Baseado no projeto original de Andrei Kashcha

