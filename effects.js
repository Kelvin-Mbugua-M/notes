class NodeNotesBlueprint {
    constructor() {
        this.node_Notes_Blue_Print = document.createElement('section')
        this.node_Notes_Blue_Print.classList.add('textNode')

        this.node_Name_Button = document.createElement('button')
        this.node_Name_Button.classList.add('textNodeName')

        this.node_Edit_Button = document.createElement('button')
        this.node_Edit_Button.classList.add('textEdit')

        this.node_Delete_Button = document.createElement('button')
        this.node_Delete_Button.classList.add('textNodeDelete')

        this.node_Notes_Blue_Print.appendChild(this.node_Name_Button)
        this.node_Notes_Blue_Print.appendChild(this.node_Edit_Button)
        this.node_Notes_Blue_Print.appendChild(this.node_Delete_Button)
    }
 }
 let update_Node_button = document.querySelectorAll('.newNote')
 let DOM_Parent_Update_Node = document.querySelectorAll('.editGallery')
 let note_Name_Make = document.querySelectorAll('.nameOfNode')
 let storageObject = new Object()
 try{ 
 storageObject = JSON.parse(localStorage.getItem('storage'))
    if (Object.keys(storageObject).length >0){
        for(let i = 0;i<Object.keys(storageObject).length;i++){
            let object = Object.keys(storageObject)
            let thisChile = new NodeNotesBlueprint
            thisChile.node_Name_Button.innerHTML = object[i]
            DOM_Parent_Update_Node[0].appendChild(thisChile.node_Notes_Blue_Print)
            console.log('runnin')
        }
    }
}
catch(error){
    console.log('ERROR::note history could not be found')
}
finally {
    if(storageObject==null)
    {
        console.log('null')
        storageObject = {}
    }
}
 function delete_Note_Node(element){

 }
 let name_Data = null
 var section = 1
 function randomNameGenerator(){
    let randomizer = Math.ceil(Math.random()*5 +6)
    let loop_ASCII_Holder = []
    let word = ''
    for(let i = randomizer;i>=0;i--){
    
        let random_Ascii_value = 0
        while(random_Ascii_value <=97)
            {
                random_Ascii_value = Math.ceil((Math.random()*122)) 
            }   
        loop_ASCII_Holder[i]=random_Ascii_value
    }
    for(let j = 0;j<loop_ASCII_Holder.length;j++){
        if(j%3===1){            
            word += String.fromCharCode(loop_ASCII_Holder[j]-32)
        }
        else{
            word += String.fromCharCode(loop_ASCII_Holder[j])
        }      
    }
    return name_Data = word
}
function update_Node_Name_With_Counter(){
    if(document.querySelectorAll('.nameOfNode')[0].value == ''){
        randomNameGenerator()
    }
    else if(document.querySelectorAll('.nameOfNode')[0].value in storageObject){
        randomNameGenerator()
    }
    else{
        return name_Data = document.querySelectorAll('.nameOfNode')[0].value
    }
}
function createNewNoteObjects(element){
    if(document.querySelectorAll('.textEditContent')[0].value == ''){
        document.querySelectorAll('.textEditContent')[0].value = ' nothing has been set here yet'
    }
    storageObject[element]= document.querySelectorAll('.textEditContent')[0].value
}
function clearTextConsole(){
    document.querySelectorAll('.textEditContent')[0].value = ''
}
function updateDOMWithNewNoteElement(){
    DOM_Parent_Update_Node.forEach(element =>{                      
            let newChild =new NodeNotesBlueprint
            newChild.node_Name_Button.innerHTML =name_Data
            element.appendChild(newChild.node_Notes_Blue_Print)
            document.querySelectorAll('.textNodeDelete').forEach(ment=>{
                ment.addEventListener("click",()=>{
                    delete storageObject [ment.parentNode.firstChild.innerHTML]
                    localStorage.clear()
                    ment.parentNode.remove()
                    localStorage.setItem('storage',JSON.stringify(storageObject))
                })
            }
            )
            document.querySelectorAll('.textEdit').forEach(ele =>{
                ele.addEventListener('click', ()=>{
                    document.querySelectorAll('.nameOfNode')[0].value = ele.previousElementSibling.innerHTML
                    document.querySelectorAll('.textEditContent')[0].value = storageObject[ele.previousElementSibling.innerHTML]
                    localStorage.setItem('storage',JSON.stringify(storageObject))
                }
                
            )

            })
            document.querySelectorAll('.edit')[0].addEventListener("click",()=>{
                if(document.querySelectorAll('.nameOfNode')[0].value!==''){
                    storageObject[document.querySelectorAll('.nameOfNode')[0].value] = document.querySelectorAll('.textEditContent')[0].value
                }
                else{
                    console.error(error)
                }
            })
            delete newChild
        })
    }
 

 update_Node_button.forEach(element =>{
    element.addEventListener('click', function(){
        
        update_Node_Name_With_Counter()
        updateDOMWithNewNoteElement()
        createNewNoteObjects(name_Data)
        clearTextConsole()
        document.querySelectorAll('.nameOfNode')[0].value  = ''
        localStorage.setItem('storage',JSON.stringify(storageObject))
    })
 })
 document.querySelectorAll('.delete')[0].addEventListener("click",()=>{
     clearTextConsole()
     
  })