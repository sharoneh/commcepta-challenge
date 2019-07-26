const loadJSON = (callback) => {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'dados.json', true);

  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);  
}

const fadeAnimation = (element, fade) => element.animate([
  // if (fade === true) fadeOut; else fadeIn
  { opacity: fade ? 1 : 0 },
  { opacity: fade ? 0 : 1 }
], {
  duration: 500,
  iterations: 1
})

// inserção dinâmica dos itens da grid de acordo com o arquivo dados.json
loadJSON(response => {
  const data = JSON.parse(response)
  const grid = document.querySelector('.grid')

  let html = ''

  data.forEach((item, index) => {
    if (index === 0) {
      html += `<div class="grid-item highlight-box">
        <div class="image" style="background-image: url(images/${item.foto});"></div>
    
        <div class="labels">
          <span>Nome:</span>
          <span>Cargo:</span>
          <span>Idade:</span>
        </div>
    
        <div class="values">
          <span class="name">${item.nome}</span>
          <span class="position">${item.cargo}</span>
          <span class="idade">${item.idade}</span>
        </div>
      </div>`
    }

    html += `<button class="grid-item box${index === 0 ? ' active' : ''}" id="${item.id}">
      <div class="image" style="background-image: url(images/${item.foto});">
        <div class="number">
          <span>${item.id}</span>
        </div>
      </div>
  
      <div class="content">
        <span class="name">${item.nome}</span>
        <span class="position">${item.cargo}</span>
      </div>
    </button>`;
  })
  
  grid.insertAdjacentHTML('beforeend', html)

  const boxes = document.querySelectorAll('.box')
  
  boxes.forEach(box => {
    box.addEventListener('click', () => {
      // ativação visual dos itens da grid
      if (!box.classList.contains('active')) {
        const activeBox = document.querySelector('.active')
        activeBox && activeBox.classList.remove('active')
  
        box.classList.add('active')
      }

      // buscar dados no .json pelo id
      const boxId = parseInt(box.getAttribute('id'))
      const dataItem = data.find(item => item.id === boxId)

      const image = document.querySelector('.highlight-box .image')
      const valuesElements = document.querySelectorAll('.values span')

      const labelsEl = document.querySelector('.labels')
      const valuesEl = document.querySelector('.values')
      
      // animação: fade out
      fadeAnimation(image, true)
      fadeAnimation(labelsEl, true)
      fadeAnimation(valuesEl, true)
      
      // alterar a imagem do box
      image.setAttribute('style', `background-image: url(images/${dataItem.foto});`)

      // alterar os dados
      const values = [dataItem.nome, dataItem.cargo, dataItem.idade]

      valuesElements.forEach((element, index) => {
        element.innerHTML = values[index]
      })

      // animação: fade in
      fadeAnimation(image, false)
      fadeAnimation(labelsEl, false)
      fadeAnimation(valuesEl, false)
    })
  })
})

// botão de menu para telas menores
const navButton = document.querySelector('.nav-button')
const nav = document.querySelector('nav')

navButton.addEventListener('click', () => {
  nav.classList.add('active')
})

// botão para fechar menu em telas menores
const closeNavBtn = document.querySelector('button.close-nav')

closeNavBtn.addEventListener('click', () => {
  nav.classList.remove('active')
})