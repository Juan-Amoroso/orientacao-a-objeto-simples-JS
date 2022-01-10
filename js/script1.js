class Produto {

    constructor(){ //funçao contrutora é a primeira a ser executada quando utiliza a classe acima
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null
    }

    salvar() { // aqui em baixo todas as funçoes e metodos
       let produto = this.lerDados(); // quando a funçao salvar for chamada o  primeiro item a ser lido é o "lerdados"

       if(this.validaCampos(produto)) {
            if(this.editId == null) {
                this.adicionar(produto);
            } else {
                this.atualizar(this.editId, produto);
            } 
       }

      this.listaTabela();
      this.cancelar();

    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++ ) {
            let tr = tbody.insertRow();// depois de percorrer cada array teremos que criar cada linha "insertRow" cria uma nova linha na nossa tabela
            // noo caso dentro do "tbody"
            let td_id = tr.insertCell();//esta funçao ira inserir uma nova coluna, e atribuir esta nova coluna a este "td_id"
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = this.arrayProdutos[i].preco;

            td_id.classList.add('center');//para adicionar uma classe do CSS de forma dinamica
            td_acoes.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/edit.png';
            imgEdit.setAttribute("onclick", "produto.preparaEdicao("+ JSON.stringify(this.arrayProdutos[i]) +")");// para mandar todos esss dados para o HTML, por isso estamos convertendo para stringfy

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/delet.png';
            imgDelete.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id +")"); //setatribute deve receber dois parametros "", "" o segundo sera referencia ao produto, para poder relacionar a funçao deletar

            td_acoes.appendChild(imgEdit);
            //como se fosse <td><img></td> imgEdit sendo filho de td_acoes
            td_acoes.appendChild(imgDelete);

        }

    }

    adicionar(produto) {
        produto.preco = parseFloat(produto.preco) //para converter para números decimais
        this.arrayProdutos.push(produto);// push vai pegar o elemento e aprimorar
        this.id++;
    }

    atualizar(id, produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preco = produto.preco;
            }
        }
    }

    preparaEdicao(dados) {
        this.editId = dados.id;

        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('preco').value = dados.preco;

        document.getElementById('btn1').innerText = 'Atualizar';

    }
 
    lerDados() {
        let produto = {} // a chave significa que será um objeto

        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.preco = document.getElementById('preco').value;

        return produto;


    }

    validaCampos(produto) {
        let msg = '';

        if(produto.nomeProduto == '') {
            msg += '- Informe o nome do produto \n';
        }

        if(produto.preco == '') {
            msg += '- Informe o preco do produto \n';
        }

        if(msg != '') {
            alert(msg);
            return false
        }

        return true;
    }

    cancelar() {
        document.getElementById('produto').value = '';
        document.getElementById('preco').value = '';

        document.getElementById('btn1').innerText = 'Salvar';
        this.editId = null;
        
    }

    deletar(id) { //o parametro deve ser passado para funçao deletar

        if(confirm('Deseja deletar o produto do ID' +  id)) {
        
            let tbody = document.getElementById('tbody');

            for(let i = 0; i < this.arrayProdutos.length; i++) {
                if(this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1); //com slice é necessario passar dois argumentos para fazer a remoçao, o primeiro é o  indice que a gente quer deletar, o segundo é quantos registros a gente quer deletar
                    tbody.deleteRow(i);// para atualizar a tabela quando o item é deletado, excluir a linha "TR" dentro da funçao é necessario passar o indice a ser deletado
                }
            } 
        }    
    }

}

var produto = new Produto();// criando um objeto do tipo produto para poder instanciar com o botao de chamada
