class Produto {

    constructor(){ //funçao contrutora é a primeira a ser executada quando utiliza a classe acima
        this.id = 1;
        this.arrayProdutos = [];
    }

    salvar() { // aqui em baixo todas as funçoes e metodos
       let produto = this.lerDados(); // quando a funçao salvar for chamada o  primeiro item a ser lido é o "lerdados"

       if(this.validaCampos(produto)) {
           this.adicionar(produto);
           
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

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/delet.png';
            imgDelete.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id +")"); //setatribute deve receber dois parametros "", "" o segundo sera referencia ao produto, para poder relacionar a funçao deletar

            td_acoes.appendChild(imgEdit);
            //como se fosse <td><img></td> imgEdit sendo filho de td_acoes
            td_acoes.appendChild(imgDelete);

        }

    }

    adicionar(produto) {
        this.arrayProdutos.push(produto);// push vai pegar o elemento e aprimorar
        this.id++;
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
        
    }

    deletar(id) { //o parametro deve ser passado para funçao deletar
        alert('deletar o ID' + id);
    }

}

var produto = new Produto();// criando um objeto do tipo produto para poder instanciar com o botao de chamada
