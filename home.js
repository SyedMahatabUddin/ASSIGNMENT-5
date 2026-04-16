let defaultTab='all';

let allData =[];
let currentIssue= '0' ;
/* active & inactive tabs style */
const active = ['bg-[#4A00FF]', 'border-[#4A00FF]' ,'text-white'];
const inactive = ['bg-white', 'border-[#E4E4E7]','text-[#64748B]'];


function troggleFunc(tab) {

/* set half btn id name and match with loop */
          const buttons=['all','open', 'closed'];
          for (const btn of buttons) {
                    const btnname=document.getElementById(btn +'-btn')
/* set conditon for troggle tab style */
                    if (btn === tab) {
                        btnname.classList.remove(...inactive);
                        btnname.classList.add(...active);
                    }

                    else{
                              btnname.classList.add(...inactive);
                              btnname.classList.remove(...active);
                            }
                        }

/* put fetch data in allData and */
      view({data: allData},tab);
}

const fetchFunc = () => {
        const fetc ='https://phi-lab-server.vercel.app/api/v1/lab/issues';
         fetch(fetc) 
         .then((res) => res.json())
         .then((data) => {

            allData=data.data;
             view(data,'all');
            });
};

            const view = (values, tabName='all') => {

            const issueStatus =document.getElementById ("issue-status");
            const allCard = document.getElementById('all-section');
            const  loadingSpinner =document.getElementById('spinner');

            let currentIssue=0;      
            allCard.innerText =" ";


/* loading spinner  */    
            if (currentIssue) {
               
            loadingSpinner.classList.remove('hidden');        
            }

        

            values.data.forEach((value,modal) => {  
                // console.log(value);
                

/* get all card section  */
           if (tabName==='all'|| value.status.toLowerCase()===tabName) {
            
                const divForCards = document.createElement("div");


/* counting number when adding card and hide loading spinner */ 
               currentIssue++;  
               
               
                divForCards.innerHTML =`
         <div>  
                <input type="checkbox" id="${modal}" class="hidden peer">
      
                <label for="${modal}" class="block cursor-pointer">
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

               <div class="flex justify-between">
                  <div class="px-4 space-y-2 pb-4">
                     <p class="text-[12px] text-[#64748B]">#${modal+1} by  ${value.assignee || 'no name'}</p>
                     <p class="text-[12px] text-[#64748B] capitalize">assignee: ${value.assignee || 'no name'}</p>
                  </div>

                  <div class="px-4 space-y-2 text-right pb-4">
                     <p class="text-[12px] text-[#64748B] text-right">${value.createdAt || 'no date'}</p>
                     <p class="text-[12px] text-[#64748B] capitalize">updated ${value.updatedAt || 'no date'}</p>
                  </div>
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
                           <span class="${value.status.toLowerCase ==='open' ? 'bg-emerald-500' :'bg-[#A855F7]'} text-white px-3 py-1 rounded-full">${value.status}</span>
                           <span class = "capitalize">• Opened by ${value.assignee.replaceAll("_", " ")}</span> 
                           <p class="text-[12px] text-[#64748B]">• ${value.createdAt}</p>
                       </div>
                           <div class="flex gap-3">
                              <div class="flex items-center px-4 py-1 rounded-full gap-1 border-[2px]  ${value.labels[0].toLowerCase() === 'enhancement'?"text-[#00A96E] bg-green-200 border-[#84e2a5]":'text-[#EF4444] border-red-300 bg-red-100'}">
                                 <img class="size-[12px]" src="${value.labels[0].toLowerCase() === 'enhancement'? "./media/enhance.svg":" ./media/BugDroid.svg"}" alt="">
                                 <p class="text-[12px] uppercase">${value.labels[0]}</p>
                              </div>
                              <div  class="flex items-center px-4 py-1 border-orange-300 border-[2px] rounded-full bg-orange-100 gap-1">
                                 <img class="size-[12px]" src="./media/helpVector.svg" alt="">
                                 <p class="text-[#D97706] text-[12px] uppercase">${value.labels[1] ||''}</p>
                              </div>
                           </div>
                       <p class="text-slate-600 text-lg">${value.description}
                       </p>
               
                       <div class="bg-slate-50 rounded-2xl p-6 grid-cols-2 grid  items-center">
                           <div >
                               <p class="text-slate-400 text-sm">Assignee:</p>
                               <p class="text-slate-800 font-bold text-xl capitalize">${value.assignee.replaceAll('_',' ')||' name not found'}</p>
                           </div>
                           <div class="text-left space-y-1">
                               <p class="text-slate-400 text-sm">Priority:</p>
                               <span class="${value.priority.toLowerCase() === 'high'? 'text-white bg-red-400' :value.priority.toLowerCase() === 'medium'? 'bg-[#ffeeab] text-[#e49000]':'text-[#ffffff] bg-[#bdbdbd]'}  text-[12px] px-4 py-1 rounded-full font-medium">${value.priority.toUpperCase()}</span>
                           </div>
                       </div>
               
                       <div class="flex justify-end">
                           <label for="${modal}" class="cursor-pointer bg-[#4A00FF] text-white px-10 py-3 rounded-xl font-bold hover:bg-[#3b00cc] transition-all">
                               Close
                           </label>
                       </div>
                   </div>
              </div>
         </div>
               `;

        /* append divForCards in allCard */
                allCard.append(divForCards)
                } 

                        /*issue issueStatus number count */

            });

  
            issueStatus.innerText= currentIssue + ' Issues';
            loadingSpinner.classList.add('hidden');
            if (currentIssue === 0) {
               allCard.classList.remove('grid' ,'grid-cols-2','lg:grid-cols-3' ,'xl:grid-cols-4');
              allCard.innerHTML = `<p class="text-center text-gray-500  py-10">No Issues Found</p>`;
            }
            else{
                  allCard.classList.add('grid', 'grid-cols-2','lg:grid-cols-3','xl:grid-cols-4');
            }
            };

            
            fetchFunc();
            troggleFunc(defaultTab);



            const searchBtn = document.getElementById('search-btn');

            document.getElementById('search-btn').addEventListener('click',()=>{
              const searchInput = document.getElementById('search-input');
              const searchValue = searchInput.value.trim().toLowerCase();
              const loadingspinner = document.getElementById('spinner');

              
              
              if (searchValue==="") {
                 fetchFunc();
                 return;
               }
            loadingspinner.classList.remove('hidden');

              fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
              .then(result =>result.json())
              .then(data=>{
               const searchData = data.data;
               
               const filterWords=searchData.filter((word)=>word.title.toLowerCase().includes(searchValue));
              view({data: filterWords},'all');
              loadingspinner.classList.add('hidden');
            });
            
              
              
              
            })
            












