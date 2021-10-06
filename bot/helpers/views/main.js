const views = document.getElementById('views')
const heart = document.getElementById('heart')
const comment = document.getElementById('comment')
const share = document.getElementById('share')
const save = document.getElementById('save')
const app = document.getElementById('app')

fetch('https://api.countapi.xyz/hit/dotson')
    .then(res => res.json())
    .then(view => {
      views.innerHTML = `<b>${view.value}</b> View(s)`
    })
    
heart.addEventListener('click', () => {
  heart.style = `color: #FF085E;animation: 600ms bounce`
  heart.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" /></svg>`
})
save.addEventListener('click', () => {

  save.style = `animation: 600ms bounce`

  const bookmarkFilled = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="30" height="30" x="0" y="0" viewBox="0 0 212.045 212.045" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path xmlns="http://www.w3.org/2000/svg" d="M167.871,0H44.84C34.82,0,26.022,8.243,26.022,18v182c0,3.266,0.909,5.988,2.374,8.091c1.752,2.514,4.573,3.955,7.598,3.954  c2.86,0,5.905-1.273,8.717-3.675l55.044-46.735c1.7-1.452,4.142-2.284,6.681-2.284c2.538,0,4.975,0.832,6.68,2.288l54.86,46.724  c2.822,2.409,5.657,3.683,8.512,3.683c4.828,0,9.534-3.724,9.534-12.045V18C186.022,8.243,177.891,0,167.871,0z" fill="#000000" data-original="#000000" style=""/></g></svg>`
  
  save.innerHTML = bookmarkFilled
})

const hehe = document.getElementById('hehe')

comment.addEventListener('click', () => {
  window.open('https://instagram.com/XariaDotson', '_blank')
})

share.addEventListener('click' , () => {
  hehe.style = `animation: open 700ms; bottom:0`
  app.style = `animation:blur 700ms;filter:blur(5px)`
})

const closeShare = document.getElementById('closeShare')

closeShare.addEventListener('click', () => {
  hehe.style = `animation: close 700ms ; bottom: -1000px`
  app.style = `filter:blur(0)`
})


 
const haha = document.getElementById('haha')

const dots = document.getElementById('threeDots')



dots.addEventListener('click' , () => {
  haha.style = `animation: open 700ms; bottom:0`
  app.style = `filter:blur(5px);animation:blur 700ms`
})

const info = document.getElementById('info')

info.addEventListener('click', () => {
  haha.style = `animation: close 700ms ; bottom: -1000px`
  app.style = `filter:blur(0)`
})
