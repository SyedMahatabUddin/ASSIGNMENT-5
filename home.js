let defaultTab='all';

let allBtn = document.getElementById("all-btn");

let openBtn =document.getElementById("open-btn");

let closedBtn =document.getElementById("closed-btn");

/* active & inactive tabs style */
const active = ['bg-[#4A00FF]', 'border-[#4A00FF]' ,'text-white'];
const inactive = ['bg-white', 'border-[#E4E4E7]','text-[#64748B]'];


function troggleFunc(tab) {
    /* set all troggle default */
 
          // console.log(tab);
          const buttons=['all','open', 'closed' ];
          for (btn of buttons) {
                    const btnname=document.getElementById(btn +'-btn')
                    // console.log(btnname);
                    if (btn ===tab) {
                        btnname.classList.remove(...inactive);
                        btnname.classList.add(...active);
                    }
                    else{
                              btnname.classList.add(...inactive);
                              btnname.classList.remove(...active);
                    }
          }
          
}
troggleFunc(defaultTab);


// fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
// .then((respon)=>
//     respon.json()
// .then(
//     (dat)=>displayData(dat)   
    
// )
// );

const fetchFunc = () => {
        const fetc ='https://phi-lab-server.vercel.app/api/v1/lab/issues';
         fetch(fetc) 
         .then((res) => res.json())
         .then((data) => {
            // console.log(data);
             view(data);
            });
};

            const view = (values) => {
            // console.log(values);
            




            
            values.data.forEach((value) => {  
                // console.log(value);

        /* get all card section  */
                const allCard = document.getElementById('all-section');
                // console.log(allCard);
                const divForCards = document.createElement("div");
                divForCards.innerHTML =`
         <div>  
                <input type="checkbox" id="issue_modal_1" class="hidden peer">
      
                <label for="issue_modal_1" class="block cursor-pointer">
           <div class="space-y-3 rounded-xl border-t-4  bg-white shadow-sm ${value.status.toLowerCase() === 'open'? ' border-green-500': 'border-[#A855F7]'}">
               <div class=" p-4 space-y-4">
                  <div class=" flex justify-between items-center">
                    
                     <img  src= ${value.priority.toLowerCase()==='low'?"./media/Closed-Status.png":"./media/Open-Status.png"} alt="">
                     <p class="rounded-full font-medium text-[12px] uppercase px-6 py-1 ${value.priority.toLowerCase() === 'high'? 'text-[#EF4444] bg-red-100' :value.priority.toLowerCase() === 'medium'? 'bg-[#FFF6D1] text-[#F59E0B]':'text-[#9CA3AF] bg-[#EEEFF2]'}">${value.priority}</p>

                  </div>
                  <div>
                     <p class="text-[16px] font-semibold text-[#1F2937] mb-1">${value.title}</p>
                     <p class="text-[14px] text-[#64748B] mb-1">${value.description}</p>
                  </div>
                  <div class="flex flex-wrap gap-3">
                     <div class="flex items-center px-4 py-1 rounded-full gap-1 border-[2px]  ${value.labels[0].toLowerCase() === 'enhancement'?"text-[#00A96E] bg-green-200 border-[#84e2a5]":'text-[#EF4444] border-red-300 bg-red-100'} ">
                        <img class="size-[12px]" src= ${value.labels[0].toLowerCase() === 'enhancement'? "./media/enhance.svg":" ./media/BugDroid.svg"} alt="">
                        <p class=" text-[12px] uppercase">${value.labels[0]}</p>
                     </div>
                     <div  class="flex items-center px-4 py-1 border-orange-300 border-[2px] rounded-full bg-orange-100 gap-1">
                        <img class="size-[12px]" src="./media/helpVector.svg" alt="">
                        <p class="text-[#D97706] text-[12px] uppercase">${value.labels[1] ||''}</p>
                     </div>
                  </div>
               </div>
               <hr class="border-gray-200 border-1">
               <div class="px-4 space-y-2 pb-4">
                  <p class="text-[12px] text-[#64748B]">${value.assignee || 'no name'}</p>
                  <p class="text-[12px] text-[#64748B]">${value.createdAt || 'no name'}</p>
               </div>
            </div>
            </label>
            <!-- modal -->
          <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 
                           invisible opacity-0 transition-all duration-300 
                           peer-checked:visible peer-checked:opacity-100">
               
                   <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 space-y-6 transform scale-90 transition-all duration-300 peer-checked:scale-100">
               
                       <h2 class="text-3xl font-bold text-slate-800"> ${value.title}</h2>
               
                       <div class="flex items-center gap-3 text-sm text-slate-500">
                           <span class="bg-emerald-500 text-white px-3 py-1 rounded-full">${value.status}</span>
                           <span>• Opened by ${value.status}</span> 
                           <p class="text-[12px] text-[#64748B]">• 1/15/2024</p>
                       </div>
                           <div class="flex gap-3">
                              <div class="flex items-center px-4 py-1 border-red-300 border-[2px] rounded-full bg-red-100 gap-1">
                                 <img class="size-[12px]" src="./media/BugDroid.svg" alt="">
                                 <p class="text-[#EF4444] text-[12px] uppercase">Bug</p>
                              </div>
                              <div  class="flex items-center px-4 py-1 border-orange-300 border-[2px] rounded-full bg-orange-100 gap-1">
                                 <img class="size-[12px]" src="./media/helpVector.svg" alt="">
                                 <p class="text-[#D97706] text-[12px] uppercase">help wanted</p>
                              </div>
                           </div>
                       <p class="text-slate-600 text-lg">
                           The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.
                       </p>
               
                       <div class="bg-slate-50 rounded-2xl p-6 grid-cols-2 grid  items-center">
                           <div >
                               <p class="text-slate-400 text-sm">Assignee:</p>
                               <p class="text-slate-800 font-bold text-xl">Fahim Ahmed</p>
                           </div>
                           <div class="text-left space-y-1">
                               <p class="text-slate-400 text-sm">Priority:</p>
                               <span class="bg-red-500 text-white text-[12px] px-4 py-1 rounded-full font-medium">HIGH</span>
                           </div>
                       </div>
               
                       <div class="flex justify-end">
                           <label for="issue_modal_1" class="cursor-pointer bg-[#4A00FF] text-white px-10 py-3 rounded-xl font-bold hover:bg-[#3b00cc] transition-all">
                               Close
                           </label>
                       </div>
                   </div>
              </div>
         </div>
                `
                
        /* append divForCards in allCard */
                allCard.append(divForCards)

                        /*issue issueStatus number count */
                const issueStatus =document.getElementById ("issue-status");
                issueStatus.innerText= values.data.length;
                
            });
            };
            fetchFunc();






