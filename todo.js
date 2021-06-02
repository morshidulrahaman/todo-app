const todoInput = document.querySelector("#todoInput")
const tododesc = document.querySelector("#tododesc")
const Addbtn = document.querySelector("#add-btn")
const tableBody = document.querySelector("#tablebody")

if (!localStorage.getItem("todo")) {
    let maketodo = []
    localStorage.setItem("todo", JSON.stringify(maketodo))
}

document.querySelector("#cancel").addEventListener("click",()=>{
  
  document.querySelector("#editinput").value=""
  document.querySelector("#editdesc").value=""
  document.querySelector("#editfrom").style.display="none"
})

const looptodo = () => {
    tableBody.innerHTML = ""
    let serial = 1
      
   let alldata=JSON.parse(localStorage.getItem("todo"))

    alldata.map((value,index)=>{
        tableBody.innerHTML+=`
        <tr data-id="${index}" id="singledata">
        <td>${serial}</td>
        <td>${value.title}</td>
        <td>${value.desc}</td>
        <td>
          <button id="editBtn" class="btn btn-edit">
            Edit
          </button>
          <button id="dltBtn" class="btn btn-dlt">
            Delete
          </button>
        </td>
      </tr>
        `
        serial++
    })
    deletdata()
    modify()
}
 looptodo()

const addtodo = () => {
    Addbtn.addEventListener("click", () => {
        let currentitems = JSON.parse(localStorage.getItem("todo"))
        const todoINput = todoInput.value.trim()
        const todoDesc = tododesc.value.trim()

        let makedata = {
            title: todoINput,
            desc: todoDesc
        }
        currentitems.push(makedata)

        localStorage.clear()

        localStorage.setItem("todo", JSON.stringify(currentitems))
        todoInput.value = ""
        tododesc.value = ""
        looptodo()
         
    })

}
addtodo()

 function deletdata(){
     
   const alldatas = document.querySelectorAll("#singledata")

   alldatas.forEach(value=>{
     value.querySelector("#dltBtn").addEventListener("click",()=>{
        
      let currentitems=JSON.parse(localStorage.getItem("todo"))

       let curentindex=Number(value.getAttribute("#data-id"))

       let remaingdata=currentitems.filter((value,index)=>{

          return index !== curentindex

       })
         localStorage.clear()
         localStorage.setItem("todo",JSON.stringify(remaingdata))

         looptodo()
     })
   })
    
 }
 deletdata()

 function modify() {
         
   const alldatas = document.querySelectorAll("#singledata")

      alldatas.forEach(value=>{
        value.querySelector('#editBtn').addEventListener("click",()=>{
            let currentdata=JSON.parse(localStorage.getItem("todo"))
            let curentindex=Number(value.getAttribute("data-id"))

           document.querySelector("#editinput").value=currentdata[curentindex].title

             document.querySelector("#editdesc").value=currentdata[curentindex].desc

             document.querySelector("#editfrom").style.display="block"

             document.querySelector("#chekindex").value=curentindex
        })
      })
 }
 modify()

 const updatedata=()=>{
    document.querySelector("#update").addEventListener("click",()=>{
      let currentdata=JSON.parse(localStorage.getItem("todo"))
      let todoedit=document.querySelector("#editinput").value
      let tododesc=document.querySelector("#editdesc").value

      let newobj={
        title:todoedit,
        desc:tododesc
      }
         let updateindex=document.querySelector("#chekindex").value

         currentdata[updateindex]=newobj

         localStorage.clear()

         localStorage.setItem('todo',JSON.stringify(currentdata))
 
         document.querySelector("#editinput").value=""
       document.querySelector("#editdesc").value=""
       document.querySelector("#editfrom").style.display="none"

       looptodo()

    })
 }
 updatedata()