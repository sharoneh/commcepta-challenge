const boxes = document.querySelectorAll('.box')

boxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    if (!box.classList.contains('active')) {
      const activeBox = document.querySelector('.active')
      activeBox && activeBox.classList.remove('active')

      box.classList.add('active')
    }
  })
})