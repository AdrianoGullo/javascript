//-----Curso JavaScript-----//
//-------ANOTAÇÕES-3--------//

//JavaScript - Classes (POO):
    /*//Criando Classes:
    //Semelhante a função construtora
    class Pessoa{
        constructor(nome, sobrenome){
            this.nome = nome;
            this.sobrenome = sobrenome;
        }

        falar(){
            console.log(`${this.nome} está falando.`);
        }

        comer(){
            console.log(`${this.nome} está comendo.`);
        }
    };
    
    const p1 = new Pessoa('Adriano', 'Gullo');
    console.log(p1);
    p1.falar();
    p1.comer();
    */

    /*//Setter e Getter com Classes:
    const _velocidade = Symbol('velocidade');
    class Carro{
        constructor(nome){
            this.nome = nome;
            this[_velocidade] = 55;
        }

        set velocidade(valor){
            console.log('SETTER');
            if (typeof valor !== 'number') return;
            if (valor >= 100 || valor <= 0 ) return;
            this[_velocidade] = valor;
        }
        
        get velocidade(){
            console.log('GETTER');
            return this[_velocidade];
        }

        acelerar(){
            if (this[_velocidade] >= 100) return;
            this[_velocidade]++;
        }

        freiar(){
            if (this[_velocidade] <= 0) return;
            this[_velocidade]--;
        }
    }

    const carro1 = new Carro('Fusca');

    for (let i=0; i<= 200; i++){
        carro1.acelerar();
    }

    carro1.velocidade = 99
    console.log(carro1.velocidade);
    */
   
    /*//Herança com Classes:
    class DispositivoEletronico{
        constructor(nome){
            this.nome = nome;
            this.ligado = false;
        };

        ligar(){
            if (this.ligado){
                console.log(this.nome + ' já ligado');
                return;
            }
            this.ligado = true;
        };

        desligar(){
            if (!this.ligado){
                console.log(this.nome + ' desligado');
                return;
            }
            this.ligado = false;
        };
    }

    const dispositivo = new DispositivoEletronico('Celular');
    dispositivo.ligar();
    dispositivo.ligar();        //msg de aviso
    dispositivo.desligar();
    dispositivo.desligar();     //msg de aviso
    console.log(dispositivo);

    //Passando os parâmetros com base na função construtora da classe pai (DispositivoEletronico)
    class Smartphone extends DispositivoEletronico{
        constructor(nome, cor, modelo){
        //super: pega os parâmetros da classe pai (nesse caso, 'nome' para acessar a construtora que também retorna this.ligado)
            super(nome);            
            this.cor = cor;
            this.modelo = modelo;
        }
    }

    const s1 = new Smartphone('iPhone', 'Preto', '8-ProMax');
    s1.ligar();
    console.log(s1);

    //outra classe, herda info de DispositivoEletronico mas não tem nada relacionado com Smartphone
    class Tablet extends DispositivoEletronico{
        constructor(nome, wifi){
            super(nome);
            this.wifi = true;
        }

        ligar(){
            console.log("Olha, esse é o método ligar.")
            this.ligado = true;
        }
    }

    const t1 = new Tablet ('iPad', true);
    t1.ligar();
    console.log(t1.ligado);
    */

    /*//Métodos de instâncias e estáticos:
    class ControleRemoto{
        constructor(tv){
            this.tv = tv;
            this.volume = 0;
        }

        //Métodos de instância
        aumentarVolume(){
            this.volume++;
        }
        diminuirVolume(){
            this.volume--;
        }

        //Método estático
        static trocarPilha(){
            console.log('Ok, vou trocar');
        }
    };
    
    const controle1 = new ControleRemoto('LG');
    controle1.aumentarVolume();
    controle1.aumentarVolume();
    controle1.aumentarVolume();
    //controle1.trocarPilha();              //vai dar erro, controle1 não consegue alterar um método estático
    ControleRemoto.trocarPilha();           //troca é realizada por ser direto na classe, afetando controle1
    console.log(controle1);
    */

//JavaScript assíncrono - Promises, Ajax, Fetch e Async/Await:
    /*//Promises:
    function esperaAi(msg, tempo, cb){
        setTimeout(() =>{
            console.log(msg);
            if(cb) cb();
        }, tempo);
    }

    function aleatorio(min, max,){
        min *= 1000;
        max *= 1000;
        return Math.floor(Math.random()*(max-min)+min);
    }

    //Para sair na ordem, deve-se utilizar uma função callback, entretanto não é a melhor solução
    //esperaAi('Frase 1', aleatorio(1, 3), function(){
    //    esperaAi('Frase 2', aleatorio(1, 3), function(){
    //        esperaAi('Frase 3', aleatorio(1, 3));
    //    });
    //});

    //Com PROMISE e as devidas alterações para resolução:
    function esperaAi2(msg, tempo){
        return new Promise((resolve, reject) => {
            if (typeof msg !== 'string') reject('Bad Value');

            setTimeout(() =>{
                resolve(msg);
            }, tempo);
        });   
    }
    
    esperaAi2('Conexão com DB.', aleatorio(1,3))
        .then(resposta =>{
            console.log(resposta);
            return esperaAi2('Buscando dados da Base.', aleatorio(1, 3));
        })
        .then(resposta => {
            console.log(resposta);
            return esperaAi2('Tratando dados.', aleatorio(1, 3));
        })
        .then(resposta => {
            console.log(resposta);
        })
        .then(() => {
            console.log('Dados:')
        })
        .catch(e => {
            console.log('Erro:', e);            //caso em algum .then aconteça um erro, o catch mostraria
        });
        */

    //