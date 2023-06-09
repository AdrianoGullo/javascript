const menuBtn = document.getElementById("menu-btn");
const menuBox = document.getElementById("menu-box");

//ABA MENU LATERAL DIREITA APARECER E SAIR
menuBtn.addEventListener("click", function() {
  if (menuBox.style.right === "-200px") {
    menuBox.style.right = "0";
  } else {
    menuBox.style.right = "-200px";
  }
});

{//CRONÔMETRO:
const imagem1 = document.getElementById('imagem1');
const box1 = document.getElementById('box1');

imagem1.addEventListener('click', function() {

  if (box1.style.display === 'none') {
    box1.style.display = 'block';
  } else {
    box1.style.display = 'none';
  }

  if (boxCalculadora.style.display === 'block') {
    boxCalculadora.style.display = 'none';
  }

  box1.innerHTML = " CRONÔMETRO:";
    
  const iniciar = document.createElement('button');
  const pausar = document.createElement('button');
  const zerar = document.createElement('button');
  const relogio = document.createElement('p');  
  relogio.classList.add('relogio');
  relogio.style.fontWeight = 'bold';            
  relogio.textContent = '00:00:00';
  box1.appendChild(relogio);

  iniciar.textContent = 'Iniciar';
  pausar.textContent = 'Pausar';
  zerar.textContent = 'Zerar';

  let segundos = 0;
  let timer;

  function criaHoraSegundos (segundos){
    const data = new Date(segundos*1000);
    return data.toLocaleTimeString('pt-BR', {
        seconds: '2-digit',
        hour12: false,               //em vez de 6:24:10 PM, irá ser 18:24:10 (de 12 para 24hrs)
        timeZone: 'GMT'    
    });
  }

  function iniciaRelogio(){
    clearInterval(timer);
    timer = setInterval(function(){
        segundos++;
        relogio.innerHTML = criaHoraSegundos(segundos);        
    }, 1000)
  }; 

  iniciar.addEventListener('click', function(event){
    relogio.classList.remove('pausado');
    iniciaRelogio();
  });

  pausar.addEventListener('click', function(event){
    relogio.classList.add('pausado');
    clearInterval(timer); 
  });

  zerar.addEventListener('click', function(event){
    relogio.classList.remove('pausado');
    clearInterval(timer); 
    segundos = 0;
    relogio.innerHTML = '00:00:00'; 
  });
    
  box1.appendChild(iniciar);
  box1.appendChild(pausar);
  box1.appendChild(zerar);

  });
}

{//IMC:
const IMC = document.getElementById('ImgIMC');

IMC.addEventListener('click', function() {

  if (box1.style.display === 'block') {
    box1.style.display = 'none';
  } else {
    box1.style.display = 'block';
  }

  if (boxCalculadora.style.display === 'block') {
    boxCalculadora.style.display = 'none';
  }

  box1.classList.toggle("expandidoIMC");

  box1.innerHTML = "Cálculo de IMC:<br>";
  box1.innerHTML += "Menos do que 18,5: Abaixo do peso<br>";
  box1.innerHTML += "Entre 18,5 e 24,9: Peso normal<br>";
  box1.innerHTML += "Entre 25 e 29,9: Sobrepeso<br>";
  box1.innerHTML += "Entre 30 e 34,9: Obesidade de Grau 1<br>";
  box1.innerHTML += "Entre 35 e 39,9: Obesidade de Grau 2<br>";
  box1.innerHTML += "Mais do que 40: Obesidade de Grau 3";
  
});
}

{//ROTAÇÃO DOS GAMES NO PAINEL PRINCIPAL POR CLICK NA SETA:
const container = document.querySelector('.container');
const elemento = document.querySelectorAll('.elemento');
const SetaEsquerda = document.querySelector('.seta-esquerda');
const SetaDireita = document.querySelector('.seta-direita');

let Index = 0;

function rotateElemento() {
  const containerWidth = container.clientWidth;
  const elementoWidth = elemento.clientWidth;
  const spaceBetweenElemento = 10;
  const totalWidth = elemento.length * (elementoWidth + spaceBetweenElemento);
  const marginLeft = (containerWidth - totalWidth) / 2;
  
  elemento.forEach((elemento) => {
    elemento.style.transform = `translateX(-${Index * (elementoWidth + spaceBetweenElemento) + marginLeft}px)`;
  });
}

function updateVisibleElemento() {
  // oculta todos os elementos
  elemento.forEach((elemento) => {
    elemento.style.display = 'none';
  });

  // mostra os três elementos ativos
  for (let i=Index; i<Index+3; i++) {
    elemento[i].style.display = 'flex';
  }
  
  // oculta o elemento mais à esquerda
  if(Index > 0){
    elemento[Index-1].style.display = 'none';
  }
}

SetaEsquerda.addEventListener('click', () => {
  Index = Math.max(Index-1, 0);
  rotateElemento();
  updateVisibleElemento();
});

SetaDireita.addEventListener('click', () => {
  if (Index === elemento.length-3) {
    return;
  } else {
    Index = Math.min(Index+1, elemento.length-2);
    rotateElemento();
    updateVisibleElemento();
    elemento[Index+2].style.display = 'flex';
  }
});

for (let i = 0; i < Index; i++) {
  elemento[i].style.display = 'none';
}

// oculta os dois elementos adicionais
elemento[3].style.display = 'none';
elemento[4].style.display = 'none';

// inicia mostrando os três primeiros elementos
updateVisibleElemento();
}

{//CALCULADORA:
const calculadora = document.getElementById("ImgCalculadora");
const boxCalculadora = document.getElementById('boxCalculadora');

calculadora.addEventListener('click', function() {
  
  if (boxCalculadora.style.display === 'block') {
    boxCalculadora.style.display = 'none';
  } else {
    boxCalculadora.style.display = 'block';
  }
  if (box1.style.display === 'block') {
    box1.style.display = 'none';
  } 

  function criaCalculadora(){
    return {
      display: document.querySelector('.displayCalculadora'),
      botaoLimpa: document.querySelector('.botao-limpa'),

      inicia(){
        this.cliqueBotao();
        this.pressionaEnter();
      },

      pressionaEnter(){
        this.display.addEventListener('keyup', e=>{
          if(e.keyCode === 13){
            this.realizaConta();
          }
        });
      },

      limpaDisplay(){
        this.display.value = '';
      }, 

      deletaUltimo(){
        this.display.value = this.display.value.slice(0, -1);
      },

      botaoParaDisplay(valor){
        this.display.value += valor;
        this.display.focus();
      },

      realizaConta(){
        let conta = this.display.value;
        try{
          conta = eval(conta);

          if(!conta){
            this.limpaDisplay();
            this.botaoParaDisplay('Conta Inválida.');
            return;
          }

          this.display.value = conta;
        } catch(e){
          this.limpaDisplay();
          this.botaoParaDisplay('Conta Inválida.');
        }
      },

      cliqueBotao(){
        document.addEventListener('click', function(event){
          const clique = event.target;

          if (this.display.value === 'Conta Inválida.') {
            this.limpaDisplay();
          }
          
          if (clique.classList.contains('botao-limpa')){
            this.limpaDisplay();
          }else if (clique.classList.contains('botao-del')){
            this.deletaUltimo(clique.innerText);
          }else if (clique.classList.contains('botao-igual')){
            this.realizaConta();
          }else if (clique.classList.contains('botao-numero')){
            this.botaoParaDisplay(clique.innerText);
          }else if (clique.classList.contains('botao-ponto')){
            this.botaoParaDisplay(clique.innerText);
          }else if (clique.classList.contains('botao-vezes')){
            this.botaoParaDisplay(clique.innerText);
          }else if (clique.classList.contains('botao-mais')){
            this.botaoParaDisplay(clique.innerText);
          }else if (clique.classList.contains('botao-menos')){
            this.botaoParaDisplay(clique.innerText);
          }else if (clique.classList.contains('botao-barra1')){
            this.botaoParaDisplay(clique.innerText);
          }else if (clique.classList.contains('botao-parent1')){
            this.botaoParaDisplay(clique.innerText);
          }else if (clique.classList.contains('botao-parent2')){
            this.botaoParaDisplay(clique.innerText);
          }
          
        }.bind(this));
      },
    };
  }

  const calc = criaCalculadora();
  calc.inicia();
});
}

