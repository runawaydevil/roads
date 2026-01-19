# Roads

Renderize todas as ruas de qualquer cidade de uma só vez.

![demo](https://i.imgur.com/6bFhX3e.png)

> **Nota:** Este é um fork do [projeto original city-roads](https://github.com/anvaka/city-roads) criado por [Andrei Kashcha](https://github.com/anvaka). Todos os créditos ao autor original pela ideia e implementação inicial.

## Como funciona?

Os dados são obtidos do OpenStreetMap usando a [API overpass](http://overpass-turbo.eu/). Embora essa API seja gratuita (desde que você siga as licenças ODbL), ela pode ter limitação de taxa e às vezes é lenta. Afinal, estamos baixando milhares de ruas dentro de uma área!

Para melhorar o desempenho do download, cidades com população maior que 100.000 pessoas são indexadas e armazenadas em um formato protobuf muito simples. As cidades são armazenadas em um cache.

A resolução de nomes é feita pelo [nominatim](https://nominatim.openstreetmap.org/) - para qualquer consulta que você digite na caixa de pesquisa, ele retorna uma lista de IDs de área. Eu verifico primeiro o ID da área na minha lista de cidades em cache e recorro ao overpass se a área não estiver presente no cache.

## Scripting

Por trás da interface simples, engenheiros de software também encontrarão recursos de scripting. Você pode desenvolver programas em cima do city-roads. A API de cena está documentada aqui: https://github.com/runawaydevil/roads/blob/main/API.md

Por favor, compartilhe suas criações e não hesite em entrar em contato se tiver alguma dúvida.

## Limitações

A renderização da cidade é limitada pela capacidade de memória do navegador e da placa de vídeo. Consegui renderizar as ruas de Seattle sem problemas em um telefone Samsung muito antigo, mas quando tentei Tóquio (com 1,4 milhão de segmentos), o telefone ficou muito lento.

Selecionar uma área que tenha milhões de ruas (por exemplo, o estado de Washington) pode fazer com que a página trave mesmo em um dispositivo potente.

Felizmente, a maioria das cidades pode ser renderizada sem problemas, resultando em uma bela arte.

## Suporte

Se você gosta deste trabalho e quer usá-lo em seus projetos - você é mais do que bem-vindo para fazê-lo!

## Desenvolvimento local

``` bash
# instalar dependências
npm install

# servir com hot reload em localhost:8080
npm run dev

# build para produção com minificação
npm run build

# build para produção e visualizar o relatório do bundle analyzer
npm run build --report
```

## Licença

O código-fonte está licenciado sob a licença MIT

