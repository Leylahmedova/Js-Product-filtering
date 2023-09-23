const search=document.getElementById("search")
const maxPrice=document.getElementById("max_price")
const minPrice=document.getElementById("min_price")
const products=document.querySelector(".products")
let data=[]
const showProducts=()=>{
  products.innerHTML=""
  data.sort((a,b)=>b.price-a.price)
  let filteredProducts=data.filter((a)=>{
    
    return a.title.toLowerCase().includes(search.value.toLowerCase())

  })
  if(+maxPrice.value){
    filteredProducts=filteredProducts.filter((a)=>{
      return a.price <= +maxPrice.value
    })
  }
  if(+minPrice.value){
    filteredProducts=filteredProducts.filter((a)=>{
      return a.price >= +minPrice.value
    })
  }
  if(!filteredProducts.length){
    let h1=document.createElement("h1")
    h1.textContent=`${search.value} axtarisiniza uygun netice tapilmadi`
    products.append(h1)
    return
  }
  filteredProducts.map((a)=>{
    let card=document.createElement("div")
    card.classList.add("card")
    let imageDiv=document.createElement("div")
    imageDiv.classList.add("imageDiv")
    
    let image=document.createElement("img")
    image.classList.add("image")
    image.src=a.image
    imageDiv.append(image)
    let title=document.createElement("h3")
    title.textContent=a.title.slice(0,20)+"..."
    let price=document.createElement("h1")

    price.textContent=a.price+" AZN"
    card.append(imageDiv,title,price)
    products.append(card)
  })
}
maxPrice.addEventListener("input",showProducts)
minPrice.addEventListener("input",showProducts)
search.addEventListener("input",showProducts)

fetch("https://fakestoreapi.com/products").then((res)=>res.json()).then((responseData)=>{
    data=responseData
    showProducts()
    maxPrice.disabled=false
    minPrice.disabled=false
    search.disabled=false
})
