# Sistema de Salão de Beleza

## Descrição
	Este é um projeto de sistema de salão de beleza

## Como rodar o projeto localmente
**Requisitos Para Rodar Localmente**
	Para rodar o projeto localmente é necessário ter um arquivo **.env** na pasta **/lib/API** com as seguintes variáveis locais: 
 - **DATABASE_URL**: Url do banco de dados que será utlizado
 - **private_key**: chave rs256 privada
 - **public_key**: chave rs256 pública 

Já na pasta **/lib/website** é necessário outro arquivo **.env** com as variável local **REACT_APP_API_URL** que é a url da API

**Comandos Iniciais**

**#### lib/API ####**

    yarn install && yarn prisma migrate deploy
	
 **#### lib/website ####**

    yarn install


**Website**

 - **Passo 1:** Primeiramente é necessário ter certeza de que o terminal está localizado do diretório /lib/website
 - **Passo 2:** Digite o comando **yarn start**

**API**

 - **Passo 1:** Entra o diretório /lib/API
 - **Passo 2:** Execute o comando **yarn dev:server**

## Link do deploy
[Deploy](https://sisbel-website.onrender.com/)
