//Selector
const cart = document.querySelector('#carrito');
const courseList = document.querySelector('.container');
const cartContainer = document.querySelector('#lista-carrito tbody');
const emptyCartBtn = document.querySelector('#vaciar-carrito');
let cartItems = [];


loadEvents();

function loadEvents() {
    //click courses
    courseList.addEventListener('click', addCourse);

    //delete cart items
    cart.addEventListener('click', deleteCourse);

    emptyCartBtn.addEventListener('click', () => {
        cartItems = [];

        htmlClean();
    })
}


function deleteCourse (e) {
    if(e.target.classList.contains('borrar-curso')){
        const courseId = e.target.getAttribute('data-id');
    
   
    cartItems.forEach(course => {
        if(course.id === courseId){
            if(course.quantity > 1){
                course.quantity--
               htmlCart();
            }else{
    
    cartItems = cartItems.filter(course => 
        course.id !== courseId);
        htmlCart();
            }
        }
    })
    
    }
}

function addCourse(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const selectCourse = e.target.parentElement.parentElement;
        readCourseData(selectCourse)
    }

}


function readCourseData (course) {
    //create an object with the current course information
    const courseInfo = {
     img: course.querySelector('.card-img-top').src,
     title: course.querySelector('h4').textContent,
     price: course.querySelector('span').textContent,
     id: course.querySelector('h4').getAttribute('data-id'),
     quantity: 1
    }

    //Check if an item already exists in the cart
    const exists = cartItems.some(course => course.id === courseInfo.id);

    if(exists) {
        const courses = cartItems.map(course => {
            if(course.id === courseInfo.id) {
                course.quantity++
                return course;
            }else {
                return course;
            }
        });
        cartItems = [...courses];
    } else {
        cartItems = [...cartItems, courseInfo];
    }
    htmlCart();
}



function htmlCart() {
    //cart clean
    htmlClean();

    //Go through the cart and generate html
    cartItems.forEach(course => {
        const {img , title, price , quantity, id} = course;
        const row = document.createElement('tr');
        row.innerHTML =
        `<td><img src='${img}'></td>
        <td>${title}</td>
        <td>${price}</td>
        <td>${quantity}</td>
        <td> <a href='#' class='borrar-curso' data-id='${id}'> X </a>
        </td> `;

        //Adding html to the cart container
        cartContainer.appendChild(row);

    }) 
}

function htmlClean() {
    while (cartContainer.firstChild) {
        cartContainer.removeChild(cartContainer.firstChild)
    }
}