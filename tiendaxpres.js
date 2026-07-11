// Inventario de productos
const productos = [
 { id: 1, nombre: "Café", categoria: "bebidas", precio: 12000, stock: 8 },
 { id: 2, nombre: "Arroz", categoria: "granos", precio: 4500, stock: 3 },
 { id: 3, nombre: "Jabón", categoria: "aseo", precio: 3500, stock: 25 },
 { id: 4, nombre: "Leche", categoria: "bebidas", precio: 4000, stock: 2 },
 { id: 5, nombre: "Lentejas", categoria: "granos", precio: 5000, stock: 15 },
 { id: 6, nombre: "Shampoo", categoria: "aseo", precio: 9500, stock: 1 },
 { id: 7, nombre: "Té", categoria: "bebidas", precio: 8000, stock: 12 },
];
// Pedidos del mes
const pedidos = [
 { id: 101, cliente: "Ana", items: [{ productoId: 1, cantidad: 2 }, { productoId: 3, 
cantidad: 1 }] },
 { id: 102, cliente: "Luis", items: [{ productoId: 2, cantidad: 5 }] },
 { id: 103, cliente: "Ana", items: [{ productoId: 4, cantidad: 3 }, { productoId: 7, 
cantidad: 2 }] },
 { id: 104, cliente: "Marta", items: [{ productoId: 1, cantidad: 1 }] },
 { id: 105, cliente: "Luis", items: [{ productoId: 5, cantidad: 4 }, { productoId: 6, 
cantidad: 1 }] },
];

//Mision numero1
const listaproductos = productos.map(({ nombre, precio }) => ({
  nombre,
  precio
}));

console.log("lista de productos");
listaproductos.forEach((producto) => {
  console.log(` ${producto.nombre}: $${producto.precio}`);
});


//Mision numero2
const stockBajo = productos.filter((producto) => producto.stock < 5);
const nombrebajo = stockBajo.map((producto) => producto.nombre);

console.log("\nProductos con stock bajo");
stockBajo.forEach((producto) => {
  console.log(` ${producto.nombre}: Stock ${producto.stock}`);

});
console.log(`Nombre del producto con stock bajo: ${nombrebajo.join(", ")}`);

//Mision numero3
const totalinventario = productos.reduce((acumulado, {precio, stock}) => acumulado + precio * stock, 0);
console.log(`\nValor total del inventario: $${totalinventario}`);

const totalpedidos = pedidos.reduce((acumulado, pedido) => {
  const totalPedido = pedido.items.reduce((total, item) => {
    const producto = productos.find((p) => p.id === item.productoId);
    return total + (producto ? producto.precio * item.cantidad : 0);
  }, 0);
  return acumulado + totalPedido;
}, 0);
console.log(`\nValor total de los pedidos: $${totalpedidos}`);

//Mision numero4
 const pedidosConTotal = pedidos.map((pedido) => {
  const totalPedido = pedido.items.reduce((total, item) => {
    const producto = productos.find((p) => p.id === item.productoId);
    return total + (producto ? producto.precio * item.cantidad : 0);
  }, 0);
  return { ...pedido, total: totalPedido };
});
console.log("\nPedidos con total:");

//mision numero5
const facturacionTotal = pedidosConTotal.reduce((acumulado, pedido) => acumulado + pedido.total, 0);
const numeroPedidos = pedidosConTotal.length;
const gastoPorCliente = pedidosConTotal.reduce((acumulado, pedido) => { 
  return { ...acumulado, [pedido.cliente]: (acumulado[pedido.cliente] || 0) + pedido.total };
}, {});
const resumenMes = {
  facturacionTotal,
  numeroPedidos,
  gastoPorCliente,
};
console.log(resumenMes);
//mision numero6
const obtenerClientesPotenciales = async () => {
  const url = "https://jsonplaceholder.typicode.com/users";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    } 
    const usuarios = await response.json();
    const clientesNuevos = usuarios.map((user) => ({
      id: user.id,
      nombre: user.name,
      email: user.email
    }));
    return clientesNuevos;
  } catch (error) {
    console.error("Error al obtener los clientes potenciales:", error);
  }
};
obtenerClientesPotenciales().then((clientes) => {
  console.log("lista de clientes potenciales:");
  console.log(clientes);
});

