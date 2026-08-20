/* Construgil - interações, catálogo e WhatsApp */
const WHATSAPP_NUMBER = '5538999206995';
    const categories=[['🧱','Cimento e argamassa','Base da obra','cimento'],['◫','Areia, brita e blocos','Estrutura e alvenaria','alvenaria'],['⚡','Material elétrico','Instalação e segurança','eletrico'],['⌁','Material hidráulico','Água e instalações','hidraulico'],['🎨','Tintas','Pintura e acabamento','tintas'],['▣','Pisos e revestimentos','Ambientes e fachadas','pisos'],['🔩','Ferragens e ferramentas','Mais produtividade','ferragens'],['⌂','Telhas e cobertura','Proteção para sua obra','cobertura']];
    const products=[
      {icon:'🧱',name:'Cimento e argamassa',type:'cimento',label:'Cimento e argamassa',desc:'Opções para preparar, assentar e finalizar sua obra.'},
      {icon:'⚡',name:'Material elétrico',type:'eletrico',label:'Elétrica',desc:'Itens para instalação, manutenção e segurança elétrica.'},
      {icon:'⌁',name:'Material hidráulico',type:'hidraulico',label:'Hidráulica',desc:'Soluções para água, esgoto e instalações.'},
      {icon:'🎨',name:'Tintas e acessórios',type:'tintas',label:'Tintas',desc:'Cores, preparação e acabamento para seus ambientes.'},
      {icon:'▣',name:'Pisos e revestimentos',type:'pisos',label:'Revestimentos',desc:'Alternativas para transformar seus espaços.'},
      {icon:'🔩',name:'Ferragens e ferramentas',type:'ferragens',label:'Ferragens',desc:'Praticidade e resistência para cada etapa.'}
    ];
    document.getElementById('categoryGrid').innerHTML=categories.map(c=>`<button class="category" data-whatsapp-message="Olá! Tenho interesse em ${c[1]}. Gostaria de solicitar um orçamento e saber a disponibilidade."><div class="icon">${c[0]}</div><strong>${c[1]}</strong><span>${c[2]}</span><b>→</b></button>`).join('');
    const filters=['todos',...new Set(products.map(p=>p.type))]; const pretty={todos:'Todos',cimento:'Cimento',eletrico:'Elétrica',hidraulico:'Hidráulica',tintas:'Tintas',pisos:'Pisos',ferragens:'Ferragens'};
    document.getElementById('filters').innerHTML=filters.map((f,i)=>`<button class="filter ${i===0?'active':''}" data-filter="${f}">${pretty[f]}</button>`).join('');
    document.getElementById('productGrid').innerHTML=products.map(p=>`<article class="product" data-type="${p.type}"><div class="product-visual" aria-hidden="true">${p.icon}</div><div class="product-body"><div class="product-type">${p.label}</div><h3>${p.name}</h3><p>${p.desc}</p><button class="btn btn-dark" data-whatsapp-message="Olá! Gostaria de solicitar preço e disponibilidade para ${p.name}.">Solicitar orçamento</button></div></article>`).join('');
    function filterProducts(type){document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===type));document.querySelectorAll('.product').forEach(p=>p.classList.toggle('hidden',type!=='todos'&&p.dataset.type!==type));}
    document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>filterProducts(b.dataset.filter));
    function openWhatsApp(message){window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,'_blank','noopener');}
    document.getElementById('quoteForm').addEventListener('submit',e=>{e.preventDefault();const v=id=>document.getElementById(id).value.trim();const msg=`Olá! Sou ${v('name')}. Gostaria de orçar: ${v('material')}${v('quantity')?`, quantidade ${v('quantity')}`:''}${v('location')?`, para ${v('location')}`:''}.${v('notes')?` Observações: ${v('notes')}`:''} Pode me informar preço, disponibilidade e entrega?`;openWhatsApp(msg);});
    document.getElementById('year').textContent=new Date().getFullYear();


// Eventos de interface
document.getElementById('menuToggle').addEventListener('click', () => {
  document.querySelector('.navlinks').classList.toggle('open');
});

document.querySelectorAll('[data-whatsapp-message]').forEach((button) => {
  button.addEventListener('click', () => openWhatsApp(button.dataset.whatsappMessage));
});
