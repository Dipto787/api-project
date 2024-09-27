let loadPhoneData= async (phone=12)=>{
    let res= await fetch(`https://openapi.programming-hero.com/api/phones?search=${phone}`);
    let data= await res.json(); 
     displayPhone(data.data)
    
    
}

let displayPhone=phone=>{
    let phoneContainer=document.getElementById('phoneContainer');
    phoneContainer.textContent=' ';
    let hide=document.getElementById('phoneContainer');
    let show=document.getElementById('notDataAvailavle');
    if(phone.length===0){
      hide.classList.add('hidden');
      show.classList.remove('hidden');
    }else{
      hide.classList.remove('hidden')
      show.classList.add('hidden')
    }
    let showAll=document.getElementById('showAll');
    if(phone.length>12){
      showAll.classList.remove('hidden');
    }else{
      showAll.classList.add('hidden');
    }
    phone=phone.slice(0,12);
    phone.forEach(data => {
        // console.log(data);
        
        let div=document.createElement('div');
        div.classList='card hover:shadow-2xl duration-400 bg-base-100 p-10 shadow-xl';
         div.innerHTML=`
         
         
  <figure>
    <img
      src="${data.image}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${data.phone_name}</h2>
    <p>${data.slug}</p>
    <p>brand: ${data.brand}</p>
    <div class="card-actions justify-end">
      <button onclick="showDetails('${data.slug}')" class="btn btn-primary text-white bg-[#0D6EFD] border-none">Show Details</button>
    </div>
  </div> 
         `;
         
         phoneContainer.appendChild(div);
        
    });
    let loader=document.getElementById('loading');
    loader.classList.add('hidden');
}



let searchPhone=phone=>{
  let inputValue=document.getElementById('input');
  let loader=document.getElementById('loading');
  loader.classList.remove('hidden');
  let notData=document.getElementById('input-values');
  notData.innerText=inputValue.value;
  loadPhoneData(inputValue.value);
  
}

let showDetails=async id=>{
  let res=await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
  let data= await res.json(); 
  console.log(data);
 let showDetailsModal=document.getElementById('showDetailsContainer');
 showDetailsModal.innerHTML=`
    <div class="flex bg-[#F3F8FF] p-8 justify-center">
    <img src="${data.data.image}" />
    </div>
 <h3 id="phone-title" class="text-2xl mt-4 font-bold">${data.data.name}</h3>
 <h3 id="phone-title" class="text-lg mt-2 font-bold">Brand: ${data.data.brand}</h3>
 <h3 id="phone-title" class="text-lg mt-2 font-bold">Memory: ${data.data.mainFeatures.memory}</h3>
 <h3 id="phone-title" class="text-lg mt-2 font-bold">storage: ${data.data.mainFeatures.storage}</h3>
 <h3 id="phone-title" class="text-lg mt-2 font-bold">GPS: ${data.data.others.GPS}</h3> 

 <h3 id="phone-title" class="text-md"> DisplaySize: ${data.data.mainFeatures.displaySize}</h3>
 `; 
// memory
  show_Details.showModal();

}


loadPhoneData();

