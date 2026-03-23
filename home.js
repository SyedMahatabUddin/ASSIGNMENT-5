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
