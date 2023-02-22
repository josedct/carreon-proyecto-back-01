const socketClient = io()
const titleList = document.getElementById('titleList')
const contentList = document.getElementById('contentList')

socketClient.on('client:updateProducts',data => {
    console.log('si escucho algo')
    titleList.innerHTML = `list of products [${data.length}]`
    contentList.innerHTML = data.listProducts.map( product => {
        return `<tr class="d-table w-100" style="table-layout: fixed;">
                    <th scope="row"><span class="badge bg-secondary"> ${product.id} </span></th>
                    <th>
                        ${ product.thumbnails.length > 0 
                            ? `<img src="${product.thumbnails[0]}" class="card-img-top h-25" alt="...">` 
                            : `<img src="img/image-not-avalible.jpg" class="card-img-top h-25" alt="">` }
                    </th>
                    <th class="text-break">${product.title}</th>
                    <th class="text-break">${product.description}</th>
                    <th class="text-break">${product.category}</th>
                    <th>${product.code}</th>
                    <th>${product.price}</th>
                    <th>
                        ${ product.status 
                            ? `available`
                            : `unavailable`}
                    </th>
                    <th>${product.stock}</th>
                </tr>`
    }).join(' ')
})