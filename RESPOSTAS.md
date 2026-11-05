## Respostas teóricas

### 1. Como identificar o banco pelo JSON

Podemos identificar o banco observando o nome do identificador. No MongoDB, geralmente aparece o campo `_id`, que possui um valor chamado ObjectId, formado por 24 caracteres hexadecimais. Já nos bancos SQL, é mais comum encontrar o campo `id`, que pode ser numérico ou UUID.

Porém, isso não é uma regra absoluta, pois o backend pode modificar o nome dos campos. Por isso, o identificador é apenas uma pista para descobrir qual banco está sendo utilizado.

### 2. Documento do café

No JSON apresentado, o campo `_id` representa o identificador único do documento. Os campos `produto` e `preco` são informações simples, sendo um texto e um número, respectivamente.

O campo `tags` é um array, pois contém uma lista de valores dentro de um único campo. Já `fornecedor` é um subdocumento, porque possui um objeto dentro do documento principal, contendo as informações `nome` e `cidade`. Assim, podemos acessar, por exemplo, a cidade do fornecedor utilizando `fornecedor.cidade`.

### 3. Definições

- **Coleção:** é um conjunto de documentos no MongoDB, sendo semelhante a uma tabela dos bancos SQL.
- **Schemaless:** significa que o banco não exige que todos os documentos tenham exatamente os mesmos campos. Dessa forma, podemos armazenar documentos com estruturas diferentes dentro de uma mesma coleção.

### 4. Vantagens do SQL e do MongoDB

**SQL:**
1. Possui uma boa organização e garante a integridade dos dados.
2. Permite realizar consultas complexas utilizando JOINs.
3. Oferece transações confiáveis, sendo bastante utilizado em sistemas que precisam de segurança nos dados.

**MongoDB:**
1. Possui uma estrutura flexível, facilitando alterações nos dados.
2. Permite armazenar arrays e objetos dentro de um documento, facilitando o trabalho com JavaScript.
3. Possui recursos que permitem distribuir os dados entre diferentes servidores, facilitando o crescimento do sistema.

### 5. URL de acesso

A URL utilizada para acessar a listagem de produtos é:

`http://localhost:3000/produtos`

Nela, `localhost` representa o computador local, `3000` é a porta utilizada pelo servidor Express e `/produtos` é o caminho responsável por retornar a lista de produtos.

### 6. Componente consumidor

O componente React utiliza `useEffect`, `useState` e `fetch` para buscar os dados da API. Enquanto os dados estão sendo carregados, aparece uma mensagem de carregamento. Caso aconteça algum erro, uma mensagem é exibida na tela.

Quando a lista está vazia, o componente informa que não existem produtos cadastrados. Se houver produtos, eles são apresentados em uma lista, utilizando `key={item._id ?? item.id}` para identificar cada elemento.

### 7. Detetive de API

Quando um JSON apresenta um campo `_id` com 24 caracteres hexadecimais, existe uma grande possibilidade de o backend utilizar MongoDB, pois esse formato corresponde ao ObjectId utilizado pelo banco.

Além disso, quando os documentos apresentam campos diferentes entre si, isso também pode indicar o uso do MongoDB, já que ele permite estruturas mais flexíveis. Entretanto, essas características são apenas indícios, pois o backend pode modificar os dados antes de enviá-los.