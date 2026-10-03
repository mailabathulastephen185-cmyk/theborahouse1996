const customers=[
{name:"Aarav Mehta",initial:"AM",visits:18,points:180,last:"Today",status:"VIP"},
{name:"Maya Shah",initial:"MS",visits:12,points:120,last:"Today",status:"Active"},
{name:"Rohan Kapoor",initial:"RK",visits:9,points:90,last:"Yesterday",status:"Active"},
{name:"Ananya Joshi",initial:"AJ",visits:7,points:70,last:"Sep 30",status:"Active"},
{name:"Kabir Singh",initial:"KS",visits:21,points:210,last:"Sep 29",status:"VIP"},
{name:"Isha Patel",initial:"IP",visits:4,points:40,last:"Sep 27",status:"New"}
];
const activities=[
["Aarav Mehta","Collected a visit","Free Signature Coffee","2 min ago"],
["Maya Shah","Collected a visit","—","18 min ago"],
["Kabir Singh","Redeemed reward","10% Off","42 min ago"],
["Ananya Joshi","Collected a visit","—","1 hr ago"],
["Rohan Kapoor","Collected a visit","—","2 hrs ago"]
];
const visits=[
["Aarav Mehta","Oct 03, 2026","18","Staff: Riya","4 / 6"],
["Maya Shah","Oct 03, 2026","12","Staff: Aman","3 / 6"],
["Rohan Kapoor","Oct 02, 2026","9","Staff: Riya","3 / 6"],
["Kabir Singh","Oct 02, 2026","21","Staff: Aman","6 / 6"],
["Isha Patel","Sep 27, 2026","4","Staff: Riya","4 / 6"]
];
function avatar(n,i){return `<div class="customer"><div class="avatar">${i}</div><strong>${n}</strong></div>`}
function renderActivities(){
 document.querySelector("#activityRows").innerHTML=activities.map(a=>`<tr><td>${avatar(a[0],a[0].split(" ").map(x=>x[0]).join(""))}</td><td>${a[1]}</td><td>${a[2]}</td><td>${a[3]}</td><td>•••</td></tr>`).join("");
}
function renderCustomers(list=customers){
 document.querySelector("#customerRows").innerHTML=list.map(c=>`<tr><td>${avatar(c.name,c.initial)}</td><td>${c.visits}</td><td>${c.points}</td><td>${c.last}</td><td><span class="status ${c.status==="VIP"?"vip":""}">${c.status}</span></td><td>•••</td></tr>`).join("");
}
function renderVisits(){
 document.querySelector("#visitRows").innerHTML=visits.map(v=>`<tr><td>${avatar(v[0],v[0].split(" ").map(x=>x[0]).join(""))}</td><td>${v[1]}</td><td>${v[2]}</td><td>${v[3]}</td><td>${v[4]}</td></tr>`).join("");
}
function renderBars(){
 const data=[420,540,470,680,590,740,810]; const labels=["Apr","May","Jun","Jul","Aug","Sep","Oct"];
 document.querySelector("#bars").innerHTML=data.map((x,i)=>`<div style="display:flex;align-items:flex-end;height:100%;position:relative"><div class="bar ${i===6?"gold":""}" style="height:${x/3.6}px" title="${x} visits"></div><span class="bar-label" style="left:-2px">${labels[i]}</span></div>`).join("");
}
function renderRewards(){
 const rewards=[["☕","Free Signature Coffee","6 visits","4,826 active customers"],["★","10% Off Your Next Visit","10 visits","2,104 active customers"],["♨","Free Dessert","8 visits","1,372 active customers"]];
 document.querySelector("#rewardGrid").innerHTML=rewards.map(r=>`<div class="card reward-card"><div><div class="reward-symbol">${r[0]}</div><h3>${r[1]}</h3><p>Unlock after <b>${r[2]}</b>. Available to loyalty members.</p></div><div><span class="badge live">ACTIVE</span><span style="float:right;font-size:10px;color:#999">${r[3]}</span></div></div>`).join("");
}
function showPage(name){
 document.querySelectorAll(".page").forEach(p=>p.classList.remove("active-page"));
 document.querySelector("#page-"+name).classList.add("active-page");
 document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===name));
 window.scrollTo({top:0,behavior:"smooth"});
 if(innerWidth<1000) document.querySelector("#sidebar").classList.remove("open");
}
document.addEventListener("click",e=>{
 const btn=e.target.closest("[data-page]"); if(btn) showPage(btn.dataset.page);
});
document.querySelector("#mobileMenu").onclick=()=>document.querySelector("#sidebar").classList.toggle("open");
function toast(msg){const t=document.querySelector("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function openModal(title,body,action="Save"){
 document.querySelector("#modalTitle").textContent=title;document.querySelector("#modalBody").innerHTML=body;document.querySelector("#modalAction").textContent=action;document.querySelector("#modal").classList.add("show");
}
document.querySelector(".modal-close").onclick=()=>document.querySelector("#modal").classList.remove("show");
document.querySelector("#modal").onclick=e=>{if(e.target.id==="modal")e.currentTarget.classList.remove("show")};
document.querySelector("#modalAction").onclick=()=>{document.querySelector("#modal").classList.remove("show");toast("Changes saved successfully.");};
document.querySelector("#addCustomer").onclick=()=>openModal("Add customer",`<label>Full name<input id="mName" placeholder="Customer name"></label><label>Phone number<input placeholder="+91 98xxxxxx"></label><label>Email<input placeholder="customer@email.com"></label>`,"Add customer");
document.querySelector("#recordVisit").onclick=()=>openModal("Record customer visit",`<label>Customer<input placeholder="Search customer name"></label><label>Visit type<select style="display:block;width:100%;padding:11px;border:1px solid #e8e7e2;border-radius:8px"><option>Regular visit</option><option>Reward redemption</option></select></label>`,"Record visit");
document.querySelector("#addReward").onclick=()=>openModal("Create reward",`<label>Reward name<input placeholder="e.g. Free Cappuccino"></label><label>Visits required<input type="number" value="6"></label><label>Description<input placeholder="Short reward description"></label>`,"Create reward");
document.querySelector("#newCampaign").onclick=()=>openModal("New campaign",`<label>Campaign name<input placeholder="Weekend special"></label><label>Message<input placeholder="Write your offer..."></label><label>Audience<input placeholder="All active members"></label>`,"Create campaign");
document.querySelector("#saveSettings").onclick=()=>toast("Business settings saved.");
document.querySelector("#fullscreenQr").onclick=()=>{document.querySelector("#qrBox").requestFullscreen?.()};
document.querySelector("#newQr").onclick=()=>{document.querySelector("#qrBox").style.transform=`rotate(${Math.random()*4-2}deg)`;toast("New QR code generated.")};
document.querySelector("#notifyBtn").onclick=()=>toast("3 new customer notifications");
document.querySelector("#profileMenu").onclick=()=>toast("Account menu opened");
document.querySelector("#globalSearch").oninput=e=>{const q=e.target.value.toLowerCase();if(q){showPage("customers");renderCustomers(customers.filter(c=>c.name.toLowerCase().includes(q))) }else renderCustomers()};
document.querySelector("#customerSearch").oninput=e=>{const q=e.target.value.toLowerCase();renderCustomers(customers.filter(c=>c.name.toLowerCase().includes(q)))};
document.querySelector("#visitSearch").oninput=e=>{const q=e.target.value.toLowerCase();document.querySelector("#visitRows").innerHTML=visits.filter(v=>v[0].toLowerCase().includes(q)).map(v=>`<tr><td>${avatar(v[0],v[0].split(" ").map(x=>x[0]).join(""))}</td><td>${v[1]}</td><td>${v[2]}</td><td>${v[3]}</td><td>${v[4]}</td></tr>`).join("")};
renderActivities();renderCustomers();renderVisits();renderBars();renderRewards();
