const navbar = document.querySelector('#navbar')
const textDesc = document.getElementById('text-desc')
const textName = document.getElementById('text-name')
const textDescName = document.getElementById('text-desc-name')

const animateTxt = (enter) => {
    enter.forEach((Enter) => {
        if(Enter.isIntersecting){
            textDesc.classList.add("animate__animated","animate__fadeIn","txt-color")
        }
    })
}

const animateTxtDesc = (enter) => {
    enter.forEach((Enter) => {
        if(Enter.isIntersecting){
            textDescName.classList.add("animate__animated", "animate__fadeInLeft", "txt-color")
            textName.classList.add("animate__animated", "animate__fadeInLeft", "txt-color")
            console.log("equisde")
        }
    })
}

const observerTxt = new IntersectionObserver(animateTxt, {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.3
})

const observerDesc = new IntersectionObserver(animateTxtDesc, {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 1.0
})

observerTxt.observe(textDesc)
observerDesc.observe(textName)
observerDesc.observe(textDescName)