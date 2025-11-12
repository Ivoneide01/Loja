import React, { useState, useMemo } from "react";
import { initialProducts, sampleReviews, satisfiedImages } from "./data";

export default function MextillStore() { 
    const [products] = useState(initialProducts); 
    const [query, setQuery] = useState(""); 
    const [category, setCategory] = useState("Todos"); 
    const [brandFilter, setBrandFilter] = useState("Todos"); 
    const [onlyPromo, setOnlyPromo] = useState(false); 
    const [minPrice, setMinPrice] = useState(0); 
    const [maxPrice, setMaxPrice] = useState(10000); 
    const [cart, setCart] = useState([]); 
    const [checkoutOpen, setCheckoutOpen] = useState(false); 
    const [customer, setCustomer] = useState({ name: "", cpf: "", cep: "", address: "" }); 
    const [lightboxImg, setLightboxImg] = useState(null);

    const categories = useMemo(() => ["Todos", "Tecnologia", "Brinquedos", "Casa", "Ferramentas", "Automotivos"], []);

    const filtered = useMemo(() => { 
        return products.filter(p => { 
            if (category !== "Todos" && p.category !== category) return false; 
            if (brandFilter !== "Todos" && p.brand !== brandFilter) return false; 
            if (onlyPromo && !p.promo) return false; 
            const price = parseFloat(p.price); 
            if (price < minPrice || price > maxPrice) return false; 
            if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false; 
            return true; 
        }); 
    }, [products, category, brandFilter, onlyPromo, minPrice, maxPrice, query]);

    function addToCart(product) { 
        const existing = cart.find(c => c.id === product.id); 
        if (existing) setCart(cart.map(c => c.id === product.id ? { ...c, qty: c.qty + 1 } : c)); 
        else setCart([...cart, { ...product, qty: 1 }]); 
    } 
    function removeFromCart(id) { 
        setCart(cart.filter(c => c.id !== id)); 
    } 
    function updateQty(id, qty) { 
        setCart(cart.map(c => c.id === id ? { ...c, qty } : c)); 
    } 
    function startCheckout() { 
        setCheckoutOpen(true); 
    } 
    function confirmPayment() { 
        alert("Confirme o pagamento via PIX para: maxtilleletronicos4@gmail.com. Após o pagamento, envie o comprovante pelo WhatsApp."); 
        setCart([]); 
        setCheckoutOpen(false); 
    }

    return ( 
        <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 p-6"> 
            <header className="max-w-6xl mx-auto flex items-center justify-between py-4"> 
                <div className="flex items-center gap-4"> 
                    <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold">M</div> 
                    <div> 
                        <h1 className="text-2xl font-extrabold text-orange-600">Mextill Eletrônicos</h1> 
                        <p className="text-sm text-gray-600">Imersão em tecnologia e luxo • Entregamos para todo o Brasil</p> 
                    </div> 
                </div> 
                <div className="text-sm">Suporte: WhatsApp (11) 98326-1493 • 0800 • maxtilleletronicos4@gmail.com</div> 
            </header>

            <main className="max-w-6xl mx-auto grid grid-cols-4 gap-6">
                <aside className="col-span-1 bg-white rounded-2xl p-4 shadow">
                    <h2 className="font-bold text-lg text-orange-600">Filtros</h2>
                    <div className="mt-3">
                        <label className="block text-sm">Pesquisar</label>
                        <input value={query} onChange={e => setQuery(e.target.value)} className="w-full border rounded p-2 mt-1" placeholder="Buscar produto..." />
                    </div>
                    <div className="mt-3">
                        <label className="block text-sm">Categoria</label>
                        <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border rounded p-2 mt-1">
                            {categories.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="mt-3">
                        <label className="block text-sm">Marca</label>
                        <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} className="w-full border rounded p-2 mt-1">
                            <option>Todos</option>
                            <option>Apple</option>
                            <option>Xiaomi</option>
                            <option>Samsung</option>
                            <option>Motorola</option>
                            <option>Bosch</option>
                            <option>Makita</option>
                            <option>Bonvink</option>
                        </select>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                        <input id="promo" type="checkbox" checked={onlyPromo} onChange={e => setOnlyPromo(e.target.checked)} />
                        <label htmlFor="promo" className="text-sm">Somente promoções</label>
                    </div>
                    <div className="mt-3">
                        <label className="block text-sm">Preço</label>
                        <div className="flex gap-2">
                            <input type="number" value={minPrice} onChange={e => setMinPrice(Number(e.target.value))} className="w-1/2 border rounded p-2" placeholder="Min" />
                            <input type="number" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-1/2 border rounded p-2" placeholder="Max" />
                        </div>
                    </div>
                    <button className="mt-6 w-full bg-orange-600 text-white p-2 rounded-lg" onClick={() => { setCategory("Todos"); setBrandFilter("Todos"); setOnlyPromo(false); setQuery(""); setMinPrice(0); setMaxPrice(10000); }}>Limpar filtros</button>

                    <div className="mt-6 text-sm text-gray-600">
                        <p className="font-semibold">Comentários de clientes</p>
                        <ul className="mt-2 space-y-2">
                            {sampleReviews.map(r => (
                                <li key={r.name} className="bg-orange-50 p-2 rounded">
                                    <div className="font-semibold">{r.name} <span className="text-xs text-gray-500">{r.date}</span></div>
                                    <div className="text-sm">{r.text}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <section className="col-span-3">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-orange-600">Produtos</h2>
                        <div className="text-sm">Resultados: {filtered.length}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {filtered.slice(0, 60).map(p => (
                            <article key={p.id} className="bg-white rounded-2xl p-4 shadow flex flex-col justify-between">
                                <div>
                                    <div className="h-36 bg-gray-100 rounded mb-3 flex items-center justify-center">Imagem</div>
                                    <h3 className="font-semibold">{p.title}</h3>
                                    <p className="text-sm text-gray-500">{p.brand} • {p.category}</p>
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                    <div>
                                        <div className="text-lg font-bold">R$ {p.price}</div>
                                        {p.promo && <div className="text-xs text-orange-600">Em promoção</div>}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button className="px-3 py-1 bg-orange-600 text-white rounded-md" onClick={() => addToCart(p)}>Adicionar</button>
                                        <button className="px-3 py-1 border rounded-md text-sm" onClick={() => alert('Página do produto (a criar)')}>Ver</button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <aside className="fixed right-6 bottom-6 w-96 bg-white rounded-2xl shadow p-4">
                    <h3 className="font-bold text-orange-600">Carrinho ({cart.length})</h3>
                    <div className="mt-2 max-h-48 overflow-auto">
                        {cart.length === 0 && <div className="text-sm text-gray-500">Seu carrinho está vazio.</div>}
                        {cart.map(item => (
                            <div key={item.id} className="flex items-center justify-between py-2 border-b">
                                <div>
                                    <div className="font-semibold">{item.title}</div>
                                    <div className="text-sm text-gray-500">R$ {item.price} x {item.qty}</div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <input type="number" className="w-16 border rounded p-1" value={item.qty} onChange={e => updateQty(item.id, Number(e.target.value))} />
                                    <button className="text-xs text-red-500" onClick={() => removeFromCart(item.id)}>Remover</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                        <div className="font-bold">Total</div>
                        <div className="font-bold">R$ {cart.reduce((s, c) => s + parseFloat(c.price) * c.qty, 0).toFixed(2)}</div>
                    </div>
                    <button disabled={cart.length===0} className="mt-3 w-full bg-orange-600 text-white p-2 rounded-lg" onClick={startCheckout}>Finalizar Compra</button>
                </aside>

                {checkoutOpen && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-6 w-2/3 max-w-3xl">
                            <h3 className="text-xl font-bold text-orange-600">Cadastro - Entrega para todo o Brasil</h3>
                            <div className="grid grid-cols-2 gap-3 mt-4">
                                <input placeholder="Nome completo" className="p-2 border rounded" value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} />
                                <input placeholder="CPF" className="p-2 border rounded" value={customer.cpf} onChange={e => setCustomer({...customer, cpf: e.target.value})} />
                                <input placeholder="CEP" className="p-2 border rounded" value={customer.cep} onChange={e => setCustomer({...customer, cep: e.target.value})} />
                                <input placeholder="Endereço completo" className="p-2 border rounded" value={customer.address} onChange={e => setCustomer({...customer, address: e.target.value})} />
                            </div>
                            <div className="mt-4 bg-orange-50 p-3 rounded">
                                <p className="font-semibold">Pagamento via PIX</p>
                                <p className="text-sm">Chave PIX: <span className="font-medium">maxtilleletronicos4@gmail.com</span></p>
                                <p className="text-xs text-gray-500">Após o pagamento, envie o comprovante pelo WhatsApp de suporte.</p>
                            </div>
                            <div className="mt-4 flex gap-2 justify-end">
                                <button className="px-4 py-2 border rounded" onClick={() => setCheckoutOpen(false)}>Voltar</button>
                                <button className="px-4 py-2 bg-orange-600 text-white rounded" onClick={confirmPayment}>Confirmar e mostrar PIX</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <section className="max-w-6xl mx-auto mt-12">
                <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">📸 Clientes Satisfeitos</h2>
                <div className="grid grid-cols-3 gap-4">
                    {satisfiedImages.map((src, i) => (
                        <img key={i} src={src} alt={`Cliente ${i+1}`} className="rounded-xl shadow cursor-pointer hover:scale-105 transition-transform" onClick={() => setLightboxImg(src)} />
                    ))}
                </div>
            </section>

            {lightboxImg && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100]" onClick={() => setLightboxImg(null)}>
                    <img src={lightboxImg} alt="Imagem de cliente satisfeito" className="max-w-4xl max-h-[90vh] rounded-lg shadow-2xl" onClick={e => e.stopPropagation()} />
                </div>
            )}
        </div>
    );
}
